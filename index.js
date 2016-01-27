var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.get('/sms/reply', function(request, response) {
  response.set('Content-Type', 'text/xml');
  var key = request.query['Body'].trim().toLowerCase();
  var message = 'you didnt send me a color that i know of...';
  switch(key){
    case 'green':
      message = 'thanks i like green too';
      break;
    case 'yellow':
      message = 'thanks yellow is ok';
      break;
    case 'red':
      message = 'thanks red is so hot';
      break;
  }
  var xmlResponse = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>'+message+'</Sms></Response>';
  response.send(xmlResponse)
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
