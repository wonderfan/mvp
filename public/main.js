window.appUrl = "https://blockchain-wonderfan.c9users.io";

function getUrl(path){
    return window.appUrl + path;
}

jQuery(document).ready(function(){
    GetToken();
    RegisterHandler();
    var socket = io();
    socket.on("message",(data) => {
        var template = jQuery("#alert").html().replace("{{uid}}",data);
        jQuery("#result").append(template);        
    })
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
                setTimeout(function(){
                    jQuery("#request").empty();
                },1000)
            }
        });        
    });
}


