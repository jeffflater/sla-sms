var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/sms/reply', function(request, response) {
  response.set('Content-Type', 'text/xml');
  var key = request.query['Body'].trim().toLowerCase();
  var message = 'you didnt send me a color that i know of...';
  console.log(key);
  switch(key){
    case 'green':
      message = 'thanks i like green too';
      break;
    case 'yellow':
      message = 'thanks yellow is ok';
      break;
    case 'red':
      message = '\nhttps://goo.gl/cv1Xll\n';
      message += '2110\n';
      message += 'Rays\'s Auto\n';
      message += 'Pre Renewal Docs\n';
      message += 'Flow: WS CL Renewal\n';
      message += 'Step: Process Updated Information\n';
      message += 'https://goo.gl/MmDCHx\n';
      break;
    case 'release':
      message = 'task is released!';
      break;
  }
  var xmlResponse = '';
  if (key === 'red') {
    var media = 'https://cloud.githubusercontent.com/assets/1641348/12624053/fd8c2d88-c4fa-11e5-9c7c-cb88e9d55f6f.png';
    xmlResponse = '<?xml version="1.0" encoding="UTF-8"?><Response><Message><Body>'+message+'</Body><Media>'+media+'</Media></Message></Response>';
  }else{
    xmlResponse = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>'+message+'</Sms></Response>';
  }
  response.send(xmlResponse)
});

app.get('/sms/release', function(request, response) {
  response.redirect('sms:3345305694?body=release!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
