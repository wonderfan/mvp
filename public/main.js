window.appUrl = "http://39.104.145.229:8080";

function getUrl(path){
    return window.appUrl + path;
}

jQuery(document).ready(function(){
    GetToken();
    RegisterHandler();
    var socket = io();
    socket.on("message",(data) => {
        var template = jQuery("#info").html().replace("{{uid}}",data);
        jQuery("#result").append(template);        
    })
    setInterval(function(){
        if(jQuery("#result .alert").length > 5){
            jQuery("#result").empty();
        }
        if(jQuery("#request .alert").length > 5){
            jQuery("#request").empty();
        }
    },2000);
});

function GetToken(){
    var url = getUrl("/token");
    var data = {
        username: "Alice",
        orgName: "Org1"
    };
    jQuery.post(url,data,function(result){
        window.token = result.token;
    });
}

function RegisterHandler(){
    jQuery("#alice").click(function(){
        var url = getUrl("/channels/mychannel/chaincodes/mycc")
        var data = {
        	"peers": ["peer0.org1.example.com","peer0.org2.example.com"],
        	"fcn":"move",
        	"args":["a","b","1"]
        }
        jQuery.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            headers: {
                "authorization": 'Bearer ' + window.token
            },
            processData: false,
            contentType: "application/json",
            dataType: 'json',
            success: function (data) {
                var template = jQuery("#alert").html().replace("{{uid}}",data.id);
                jQuery("#request").append(template);
            }
        });        
    });
    jQuery("#bob").click(function(){
        var url = getUrl("/channels/mychannel/chaincodes/mycc")
        var data = {
        	"peers": ["peer0.org1.example.com","peer0.org2.example.com"],
        	"fcn":"move",
        	"args":["b","a","1"]
        }
        jQuery.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            headers: {
                "authorization": 'Bearer ' + window.token
            },
            processData: false,
            contentType: "application/json",
            dataType: 'json',
            success: function (data) {
                var template = jQuery("#alert").html().replace("{{uid}}",data.id);
                jQuery("#request").append(template);
            }
        });        
    });
    
    jQuery("#bulk").click(function(){
        var url = getUrl("/channels/mychannel/chaincodes/mycc")
        var data = {
        	"peers": ["peer0.org1.example.com","peer0.org2.example.com"],
        	"fcn":"move",
        	"args":["a","b","1"]
        }
        for(var i = 0; i < 50; i++){
            jQuery.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                headers: {
                    "authorization": 'Bearer ' + window.token
                },
                processData: false,
                contentType: "application/json",
                dataType: 'json',
                success: function (data) {
                    var template = jQuery("#alert").html().replace("{{uid}}",data.id);
                    jQuery("#request").append(template);
                }
            });   
        }
    });
    
    jQuery("#batch").click(function(){
        var url = getUrl("/channels/mychannel/chaincodes/mycc")
        var data = {
        	"peers": ["peer0.org1.example.com","peer0.org2.example.com"],
        	"fcn":"move",
        	"args":["a","b","1"]
        }
        for(var i = 0; i < 100; i++){
            jQuery.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                headers: {
                    "authorization": 'Bearer ' + window.token
                },
                processData: false,
                contentType: "application/json",
                dataType: 'json',
                success: function (data) {
                    var template = jQuery("#alert").html().replace("{{uid}}",data.id);
                    jQuery("#request").append(template);
                }
            });
        }
    });
}


