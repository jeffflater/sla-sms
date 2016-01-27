var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.get('/sms/reply', function(request, response) {
  response.set('Content-Type', 'text/xml');
  var test = JSON.stringify(request.query);
  var xmlResponse = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>'+test+'</Sms></Response>';
  response.send(xmlResponse)
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
