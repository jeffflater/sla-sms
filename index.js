var express = require('express');
var app = express();

var JSONStore = require('json-store');
var db = JSONStore('./index.json');
var smsConvo = JSONStore('./convo.js');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/sms/reply', function(request, response) {
  response.set('Content-Type', 'text/xml');

  var key = request.query['Body'].trim().toLowerCase();
  var phone = request.query['From'];


  db.get(phone);
  

  db.set(phone, {
    messageNumber: 0,
    taskNumber: 1
  });

  var message = 'you didnt send me a color that i know of...';

  switch(key){

    // case 'green':
    //   message = 'thanks i like green too';
    //   break;
    //
    // case 'yellow':
    //   message = 'thanks yellow is ok';
    //   break;

    case 'red':


      var task = smsConvo.red.tasks[0];

      message = '\n'+task.link+'\n';
      message += task.'\n';
      message += 'Rays\'s Auto\n';
      message += 'Pre Renewal Docs\n';
      message += 'Flow: WS CL Renewal\n';
      message += 'Step: Process Updated Information\n';

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
    var media = 'https://cloud.githubusercontent.com/assets/1641348/12624053/fd8c2d88-c4fa-11e5-9c7c-cb88e9d55f6f.png';
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
