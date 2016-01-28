var smsConvo = {
  messages: [
    //task1
    { //0
      message: '\nhttps://goo.gl/cv1Xll\n2110\nRays\'s Auto\nPre Renewal Docs\nFlow: WS CL Renewal\nStep: Process Updated Information\n',
      media: 'https://cloud.githubusercontent.com/assets/1641348/12624053/fd8c2d88-c4fa-11e5-9c7c-cb88e9d55f6f.png',
      options: '\n1 - Go to next\n2 - Relase task\n3 - Assign To',
      destinations: [1,2,10]
    },
    //task2
    { //1
      message: '\nhttps://goo.gl/7Fqpa5\n2210\nLisa Fetrow\nPlease Review Audit Payment Not Received\nFlow: WS CL Renewal\nStep: Audit Process\n',
      media: 'https://cloud.githubusercontent.com/assets/1641348/12624730/8bf2672e-c4fe-11e5-8105-18c08ece93bd.png',
      options: '\n1 - Go to next\n2 - Relase task\n3 - Assign To',
      destinations: [4,5,10]
    },
    { //2
      message: '\nYour task was released, here is your next task:\nhttps://goo.gl/7Fqpa5\n2210\nLisa Fetrow\nPlease Review Audit Payment Not Received\nFlow: WS CL Renewal\nStep: Audit Process\n',
      media: 'https://cloud.githubusercontent.com/assets/1641348/12624730/8bf2672e-c4fe-11e5-8105-18c08ece93bd.png',
      options: '\n1 - Go to next\n2 - Relase task\n3 - Assign To',
      destinations: [4,5,10]
    },
    { //3
      message: '\nYour task was assgined, here is your next task:\nhttps://goo.gl/7Fqpa5\n2210\nLisa Fetrow\nPlease Review Audit Payment Not Received\nFlow: WS CL Renewal\nStep: Audit Process\n',
      media: 'https://cloud.githubusercontent.com/assets/1641348/12624730/8bf2672e-c4fe-11e5-8105-18c08ece93bd.png',
      options: '\n1 - Go to next\n2 - Relase task\n3 - Assign To',
      destinations: [4,5,10]
    },
    //task3
    { //4
      message: '\nhttps://goo.gl/h98YOI\n2110\nBrian Evans\nPlease Follow Up\nFlow: UW_Ne Business\nStep: Mail Policy\n',
      media: 'https://cloud.githubusercontent.com/assets/1641348/12625766/3215c142-c503-11e5-8c9b-cbefa0c482b3.png',
      options: '\n1 - Go to next\n2 - Relase task\n3 - Assign To',
      destinations: [7,8,10]
    },
    { //5
      message: '\nYour task was released, here is your next task:\nhttps://goo.gl/h98YOI\n2110\nBrian Evans\nPlease Follow Up\nFlow: UW_Ne Business\nStep: Mail Policy\n',
      media: 'https://cloud.githubusercontent.com/assets/1641348/12625766/3215c142-c503-11e5-8c9b-cbefa0c482b3.png',
      options: '\n1 - Go to next\n2 - Relase task\n3 - Assign To',
      destinations: [7,8,10]
    },
    { //6
      message: '\nYour task was assgined, here is your next task:\nhttps://goo.gl/h98YOI\n2110\nBrian Evans\nPlease Follow Up\nFlow: UW_Ne Business\nStep: Mail Policy\n',
      media: 'https://cloud.githubusercontent.com/assets/1641348/12625766/3215c142-c503-11e5-8c9b-cbefa0c482b3.png',
      options: '\n1 - Go to next\n2 - Relase task\n3 - Assign To',
      destinations: [7,8,10]
    },
    //ending
    { //7
      message: '\nYou have no more tasks.\n',
      destinations: [0]
    },
    { //8
      message: '\nYour task was released, you have no more tasks.\n',
      destinations: [0]
    },
    { //9
      message: '\nYour task was assigned, you have no more tasks.\n',
      destinations: [0]
    },
    //assigned to
    { //10
      message: '\nPlease type in the name of the person to assign.\n',
      destinations: [11]
    },
    { //11
      message: '\nIs Luke Buel the person you wish to assign?\n',
      options: '\n1 - Yes\n2 - No\n',
      destinations: [[3,6,9],12] //if context is 1 then 3, if 2 then 6, if 3 then 9
    },
    { //12
      message: '\nIs Luke Davis the person you wish to assign?\n',
      options: '\n1 - Yes\n2 - No\n',
      destinations: [[3,6,9],13] //if context is 1 then 3, if 2 then 6, if 3 then 9
    },
    { //13
      message: '\nIs Luke Skywalker the person you wish to assign?\n',
      options: '\n1 - Yes\n2 - No\n',
      destinations: [[3,6,9],14] //if context is 1 then 3, if 2 then 6, if 3 then 9
    },
    { //14
      message: '\nNo more people with this name.\n',
      options: '\n1 - Return to task\n',
      destinations: [[0,1,4]]
    }
  ]
};

module.exports = smsConvo;
