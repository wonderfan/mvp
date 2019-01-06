const redis = require("redis");
const promisify = require("util").promisify;
var client = null;

module.exports.set = function(key,value){
    client = getClient();
    client.set(key,value);
};

module.exports.get = async function(key){
    client = getClient();
    let getAsync = promisify(client.get).bind(client);
    return await getAsync(key);
};

module.exports.close = function(){
    if(client) client.quit();
};

function getClient(){
    if(client) return client;
    client = redis.createClient();
    return client;
};
