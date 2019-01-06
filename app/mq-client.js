const amqp = require('amqplib');
const uuid = require('uuid/v4');
var invoke = require('./invoke-transaction.js');
var helper = require('./helper.js');
var logger = helper.getLogger('message-queue');
const queue = 'fabric';
var connection = null;
var channel = null;
//process.once('SIGINT', function(){ exports.close();});
module.exports.sendTx = async function(tx){
    channel = await getChannel();
    let uid = uuid();
    tx.uid = uid;
    if(global.socket) global.socket.send(uid);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(tx)));
    return uid;
};

module.exports.consume = async function(){
    channel = await getChannel();
    channel.consume(queue, async function(msg) {
        logger.info(">>> jiahe",msg);
        if (msg !== null) {
            let txString = msg.content.toString();
            let tx = JSON.parse(txString);
            let result = await invoke.invokeChaincode(tx.peers, tx.channelName, tx.chaincodeName, tx.fcn, tx.args, tx.username, tx.orgname);
            logger.info(">>> jiahe",result);
            if(global.socket) global.socket.send(JSON.stringify(result));
            channel.ack(msg);
        }
    });
};

module.exports.close = async function() {
    if(channel) await channel.close();
    if(connection) connection.close();
}


async function getChannel(){
    if(channel) return channel;
    try {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        await channel.assertQueue(queue);
        return channel;
    }catch(err){
        console.error(err);
    }
}