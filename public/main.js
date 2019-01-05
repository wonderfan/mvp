jQuery(document).ready(function(){
    GetToken();
});

function GetToken(){
    var url = "https://blockchain-wonderfan.c9users.io/token"
    var data = {
        username: "Alice",
        orgName: "Org1"
    };
    jQuery.post(url,data,function(result){
        window.token = result.token;
    });
}
