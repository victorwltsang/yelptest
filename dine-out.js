function yelpCallback(yelpData) {

    console.log(yelpData);
    var rawTemplate = $("#yelp-template").html();
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var generatedHTML = compiledTemplate(yelpData);

    $("#result").html(generatedHTML);


}

var auth = {
    //
    // Update with your auth tokens.
    //
    consumerKey: "KPxFaVMRGGEaRTwZGNz9hg",
    consumerSecret: "Aj3ersH4IUecJKWZQUQ9Vr0l4PQ",
    accessToken: "gobeLA8R3DdMcMjVCJYPvMEkjx-KLFog",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret: "BL8c0l-5KqIPAJJG8WFnCVZ-3rw",
    serviceProvider: {
        signatureMethod: "HMAC-SHA1"
    }
};

var terms = 'food';
var near = 'San+Francisco';
var limit = 10;

var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
};

var parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['limit', limit]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
    'action': 'https://api.yelp.com/v2/search',
    'method': 'GET',
    'parameters': parameters
};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);

$.ajax({
        'url': message.action,
        'data': parameterMap,
        'dataType': 'jsonp',
        'jsonpCallback': 'yelpCallback',
        'cache': true
    })
    .done(function(data, textStatus, jqXHR) {
        console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
    });
