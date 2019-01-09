jQuery(document).ready(function(){
    GetToken();
    RegisterHandler();
    var socket = io();
    socket.on("message",(data) => {
        var result = JSON.parse(data);
        var template = jQuery("#info").html().replace("{{txid}}",result.txid);
        template = template.replace("{{uid}}",result.uid);
        jQuery("#result").append(template);        
    })
    setInterval(function(){
        if(jQuery("#result .alert").length > 5){
            //jQuery("#result").empty();
        }
        if(jQuery("#request .alert").length > 5){
            //jQuery("#request").empty();
        }
    },6000);
    jQuery("#prune").click(function(){
        jQuery("#result").empty();
        jQuery("#request").empty();
    });
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
        var delay = 0
        for(var i = 0; i < 50; i++){
            setTimeout(function(){
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
            },delay);
            delay = delay + 500;
        }
    });
    
    jQuery("#batch").click(function(){
        var url = getUrl("/channels/mychannel/chaincodes/mycc")
        var data = {
        	"peers": ["peer0.org1.example.com","peer0.org2.example.com"],
        	"fcn":"move",
        	"args":["a","b","1"]
        }
        var delay = 0
        for(var i = 0; i < 100; i++){
            setTimeout(function(){
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
            },delay);
            delay = delay + 500;
        }
    });
}


