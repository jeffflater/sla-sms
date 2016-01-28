var express = require('express');
var app = express();

var JSONStore = require('json-store');
var db = JSONStore(__dirname+'/index.json');
var smsConvo = require(__dirname+'/convo.js');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/sms/reply', function(request, response) {
  response.set('Content-Type', 'text/xml');

  var key = request.query['Body'].trim().toLowerCase();
  var phone = request.query['From'];

  var messageNumber = 0;
  var taskNumber = 1;

  var store = db.get(phone);

  if (!store) {
    db.set(phone, {
      messageNumber: messageNumber,
      taskNumber: taskNumber
    });
  } else {
    messageNumber = store.messageNumber;
    taskNumber = store.taskNumber;
  }

  var message = 'you didnt send me a color that i know of...';
  var media = 'https://cloud.githubusercontent.com/assets/1641348/12624053/fd8c2d88-c4fa-11e5-9c7c-cb88e9d55f6f.png';

  switch(key){

    // case 'green':
    //   message = 'thanks i like green too';
    //   break;
    //
    // case 'yellow':
    //   message = 'thanks yellow is ok';
    //   break;

    case 'red':

      message = smsConvo.messages[0].message;
      message += smsConvo.messages[0].options;
      media = smsConvo.messages[0].media;

      break;

    /*
    when its one it will do the following:
     - will always do something and take you to the next task
    */
    case '1':
    break;

    /*
    when its one it will do the following:
     - will always do something and take you to the next person or task
    */
    case '2':
    break;

    /*
    when its one it will do the following:
     - will always take you to the assign person path
    */
    case '3':
    break;

    /*
    when its one it will do the following:
     - will take you to the  second step in the person path (is bob buel the right person)
    */
    case 'bob':
    break;

    case 'release':
      message = 'Task is released!';
      break;

  }
  var xmlResponse = '';
  if (key === 'red') {
    xmlResponse = '<?xml version="1.0" encoding="UTF-8"?><Response><Message><Body>'+message+'</Body><Media>'+media+'</Media></Message></Response>';
  }else{
    xmlResponse = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>'+message+'</Sms></Response>';
  }
  response.send(xmlResponse)
});

app.get('/sms/release', function(request, response) {
  response.redirect('sms:3345305694?body=release');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
