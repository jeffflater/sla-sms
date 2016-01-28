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
  var isAssigning = false;

  var store = db.get(phone);

  if (!store) {
    db.set(phone, {
      messageNumber: messageNumber,
      taskNumber: taskNumber,
      isAssigning: isAssigning
    });
  } else {
    messageNumber = store.messageNumber;
    taskNumber = store.taskNumber;
    isAssigning = store.isAssigning;
  }

  var message = 'you didnt send me a color that i know of...';
  var media = 'https://cloud.githubusercontent.com/assets/1641348/12624053/fd8c2d88-c4fa-11e5-9c7c-cb88e9d55f6f.png';
  var hasMedia = false;

  switch(key){

    case 'red':

      message = smsConvo.messages[0].message;
      message += smsConvo.messages[0].options;
      media = smsConvo.messages[0].media;
      hasMedia = true;

      db.set(phone, {
        messageNumber: 0,
        taskNumber: 1,
        isAssigning: false
      });

      break;

    case '1':
    case '2':
    case '3':



      var destinations = smsConvo.messages[messageNumber].destinations;
      var destination;


      var newMessageNumber = 0;

      console.log(messageNumber);
      console.log(isAssigning);
      console.log(key);

      if (key !== '1' || !isAssigning) {
        console.log('HERE');
        if (key === '1') {
          isAssigning = false;
          newMessageNumber = 0;
        } else if (key === '2') {
          newMessageNumber = 1;
        } else if (key === '3') {
          isAssigning = true;
          newMessageNumber = 2;
        }
        destination = smsConvo.messages[destinations[newMessageNumber]];
        console.log(destinations);
        console.log(newMessageNumber);
      } else {
        console.log('THERE');
        console.log(destinations);
        console.log(newMessageNumber);
        console.log(taskNumber);
        if (taskNumber === 1) {
          console.log('TEST');
          console.log(destinations[0][0]);
          destination = smsConvo.messages[destinations[0][0]];
        } else if (taskNumber === 2) {
          console.log(destinations[0][1]);
          destination = smsConvo.messages[destinations[0][1]];
        } else if (taskNumber === 3) {
          console.log(destinations[0][2]);
          destination = smsConvo.messages[destinations[0][2]];
        }
      }



      console.log(destination);

      if (messageNumber === 14) {
        isAssigning = false;
      }

      var task = taskNumber;
      if (!isAssigning) {
        task = taskNumber+1;
      }

      db.set(phone, {
        messageNumber: destinations[newMessageNumber],
        taskNumber: task,
        isAssigning: isAssigning
      });

      message = destination.message;
      if (destination.options) {
        message += destination.options;
      }
      if (destination.media) {
        media = destination.media;
        hasMedia = true;
      } else {
        hasMedia = false;
      }

    break;

    case 'luke':


    var destinations = smsConvo.messages[messageNumber].destinations;
    var destination =  smsConvo.messages[destinations[0]];

    message = destination.message;
    if (destination.options) {
      message += destination.options;
    }

    db.set(phone, {
      messageNumber: destinations[0],
      taskNumber: taskNumber,
      isAssigning: isAssigning
    });

    break;

    default:
      message = 'rebel scum...';
      hasMedia = false;
    break;

  }
  var xmlResponse = '';
  if (hasMedia) {
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
