const redis = require("redis");
var client = null;

module.exports.set = function(key,value){
    client = getClient();
    client.set(key,value);
};

module.exports.get = function(key){
    client.get(key, function(err, reply) {
        console.log(reply);
        if(err) console.error(err);
    });    
};

module.exports.close = function(){
    if(client) client.quit();
};

function getClient(){
    if(client) return client;
    client = redis.createClient();
    return client;
};
