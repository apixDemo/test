
let Swagger = require('swagger-client');

exports.handler = function (event, context, callback) {

    Swagger.http({
        url: 'https://services.apixplatform.com/api-sandbox/application/token',
        method: 'post',
        query: {},
        headers: { "Accept": "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({
            "userName": "Your email address",
            "password": "Your password"
        })
    }).then((response) => {
        var access_token = "bearer " + response.body.access_token;


        Swagger.http({
            url: `https://api.apixplatform.com/sbbank/1.0/BanksService/banks/banks`,
            method: 'get',
            query: { "page": "0", "size": "1" },
            headers: { "X-Authorization": access_token, "Accept": "*/*" }
        }).then((response) => {
            callback(null, response);
        }).catch((err) => {
            // error handling goes here
        });



        
    }).catch((err) => {
        console.log(err);
        callback("Execution failed");
    });

}