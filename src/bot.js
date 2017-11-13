const Bot = require('./lib/Bot')
const SOFA = require('sofa-js')
const Fiat = require('./lib/Fiat')
const ajaxRequest = require("request");
const Clarifai = require('clarifai');
var dietPlans = require('./food-profiles.json');

// initialize with your api key. This will also work in your browser via http://browserify.org/
const clarafaiApp = new Clarifai.App({
 apiKey: 'b236548bcc354eb8997086372a784a0c'
});

let bot = new Bot()

// ROUTING
bot.onEvent = function(session, message) {
  switch (message.type) {
    case 'Init':
      welcome(session);
      break
    case 'Message':
      onMessage(session, message);
      break
    case 'Command':
      onCommand(session, message);
      break
    case 'Payment':
      onPayment(session, message);
      break
    case 'PaymentRequest':
      welcome(session)
      break
    default:
      sendMessage(session,"Hmm, I don't know what you mean -- tell me something else");
      break;
  }
}

function onMessage(session, message) {
  var myHabit = session.get("h2ohabit");
  var readyForH2O = myHabit && session.get("h2obalance");
  if (!readyForH2O){
    welcome(session);
  }else if (message.body.indexOf("https://cdn.filestackcontent.com") === -1){
    sendMessage(session,"Sorry, I don't understand you -- pick something from the menu!");
  }else{
    var myHabitGoodFoods = dietPlans[myHabit];
    sendMessage(session, "Good job! Let me find what your reward is for this meal...");
    // food model https://clarifai.com/models/food-image-recognition-model/bd367be194cf45149e75f01d59f77ba7
    clarafaiApp.models.predict("bd367be194cf45149e75f01d59f77ba7", message.body).then(
      function(response) {
        // do something with response
        var foundSomethingGood = 0;
        //
        var foodItems = "";
        var foundData = response.outputs[0].data.concepts;
        for (var i = 0;i<foundData.length;i++){
          if (foundData[i].value >= 0.75){
            if (myHabitGoodFoods.indexOf(foundData[i].name) != -1){
              foundSomethingGood++;
              foodItems += " 👍 " + foundData[i].name + " ("+(Math.round(foundData[i].value*1000)/10)+"%)" + "\n";
            }else{
              foodItems += " 👎 " + foundData[i].name + " ("+(Math.round(foundData[i].value*1000)/10)+"%)" + "\n";
            }
          }
        }
        //
        var dietPlan = session.get("h2ohabit");
        sendMessage(session, "Let's examine the key ingredients: \n" + foodItems);
        //
        if (foundSomethingGood > 0){
          sendMessage(session, "Yay! You've got some rewards coming your way! :)");
          Fiat.fetch().then((toEth) => {
            // convert 20 US dollars to ETH.
            var h2obalance = session.get('h2obalance') || 0;
            var h2orewardamount = h2obalance/4; // give them a quarter back! :D
            if (foundSomethingGood >= 5){
              sendMessage(session, "Oh, by the way -- you ate really well there. Great habits get greater rewards!");
              h2orewardamount = h2obalance/2; // give a special reward for a REALLY good mean! :)
            }
            session.set("h2orewardamount",h2orewardamount);
            //
            session.sendEth(h2orewardamount, "paid back");
            //
          });
        }else{
          sendMessage(session, "Hmmm... looks like you should be eating healthier. Sorry, can't reward you this time.");
        }

      },
      function(err) {
        // there was an error
        console.log(err);
      }
    );
  }
}

function onCommand(session, command) {
  switch (command.content.value) {
    case 'add-money':
      addMoney(session)
      break
    case 'balance':
      balance(session)
      break
    case 'help':
      welcome(session)
      break
    case 'switch-habit':
      switchHabit(session);
      break
    case 'habit-drinkwater':
      recordHabit('Drinking more water', command.content.value, session);
      break
    case 'habit-healthyeats':
      recordHabit('Eating Healthy', command.content.value, session);
      break
    case 'habit-weightloss':
      recordHabit('Losing Weight', command.content.value, session);
      break
    case 'habit-diabetes':
      recordHabit('Diabetes',command.content.value, session);
      break
    case 'habit-comingsoon':
      sendMessage(session, "This diet plan is coming soon!");
      break
    default:
      sendMessage(session,"Hmm, I don't know what you mean -- tell me something else");
      break
    }
}

function onPayment(session, message) {
  if (message.fromAddress == session.config.paymentAddress) {
    // handle payments sent by the bot
    if (message.status == 'confirmed') {
      // perform special action once the payment has been confirmed
      // on the network
      var h2obalance = session.get('h2obalance');
      let h2orewardamount = session.get('h2orewardamount');
      //
      var ethers_in_hold = h2obalance-h2orewardamount;
      session.set('h2obalance', ethers_in_hold)
      sendMessage(session,"✅ Your habit wallet is now holding " + ethers_in_hold + " ETH")

    } else if (message.status == 'unconfirmed'){
      sendMessageBeforeConfirm(session,"⏳ Will let you know when the habit reward has been confirmed on the network. ");
    } else if (message.status == 'error') {
      // oops, something went wrong with a payment we tried to send!
      sendMessage(session, 'There was an error with getting money back! 🚫');
    }
  } else {
    // handle payments sent to the bot
    if (message.status == 'confirmed') {
      // handle when the payment is actually confirmed!
      var ethers_in_hold = (session.get('h2obalance') || 0);
      sendMessage(session,"🙏 Your habit wallet is holding " + ethers_in_hold + " ETH");
    } else if (message.status == 'unconfirmed') {
      // payment has been sent to the ethereum network, but is not yet confirmed
      sendMessageBeforeConfirm(session,"⏳ Will let you know when the habit stake has been confirmed on the network. ");
      //
    } else if (message.status == 'error') {
      sendMessage(session, `There was an error with your payment! 🚫`);
    }
  }
}

// STATES
// Works great for us to involve incentives
function welcome(session) {
  sendMessageWithImage(session, "myh2o-logo.png", "Hi, I'm @MyH2OBot - your healthy habit assistant. Stake money ($5) securely, send us pictures of what you eat to earn it back based on how healthy it is :) - remember not all ingredients are the same, and the faster you form a good eating habit, the quicker you recover the money! \n\nSo, let's build healthy habits & outcomes with @MyH2OBot! ")
}

function recordHabit(habitTitle, habitKey, session){
  session.set("h2ohabit",habitKey);
  session.set("h2ohabit_title",habitTitle);
  sendMessage(session, "Great! You've picked the health goal of " + habitTitle);
}

function switchHabit(session){
  let h2obalanceAmount = session.get('h2obalance');
  let h2orewardamount = h2obalanceAmount; // give them all back
  //
  session.set("h2orewardamount", h2orewardamount);
  session.set("h2ohabit", null);
  //
  console.log(h2obalanceAmount);
  //
  // session.set("h2ohabit", false);
  // session.set("h2obalance",0);
  // let's remove the holding
  Fiat.fetch().then((toEth) => {
    // convert 20 US dollars to ETH.
    sendMessage(session, "Refunding your current stake ("+h2orewardamount+" ETH) before starting a new habit...");
    //
    session.sendEth(h2orewardamount, "paid back");
    //
  });
}

// http://api.foodai.org/v1/classify?image_url=http://www.watscooking.com/images/dish/large/img_3167.jpg&uid=5a06f59c1561c41ba7614ab8
// testing -
function recordAction(session){
  sendMessage(session, "Let's check the activity/food provided against a table of ETH reward ratio and get that deducted based on how rapidly people are following those habits -- from Janya :)");
  Fiat.fetch().then((toEth) => {
    // convert 20 US dollars to ETH.
    var h2obalance = session.get('h2obalance') || 0;
    let amount = h2obalance/3; // give them a third back! :D
    //
    session.sendEth(amount, "paid back");
    //
  })
}

// example of how to store state on each user
function balance(session) {
  let h2obalance = (session.get('h2obalance') || 0)
  sendMessage(session, `🏦 ${h2obalance} ETH is your current balance.`)
}

function addMoney(session) {
  // request $1 USD at current exchange rates
  Fiat.fetch().then((toEth) => {
    let amount = toEth.USD(5);
    //
    var ethers_in_hold = (session.get('h2obalance') || 0)+amount;
    session.set('h2obalance_init', ethers_in_hold);
    session.set('h2obalance', ethers_in_hold);
    //
    session.requestEth(amount)
  })
}

// HELPERS
function getControls(session){
  let h2obalance = (session.get('h2obalance') || 0);
  let h2obalance_init =  (session.get('h2obalance_init') || 1);
  //
  var percentHabitMastered = Math.round((h2obalance_init-h2obalance)*1000/h2obalance_init)/10;
  //
  let imageFetcherURL = "Webview::https://apps.scad.ventures/myh2o/image-picker?tokenId=" + (session.get('tokenId') || 'proxy-niraj');
  console.log(session.get("h2ohabit") + " ... ETH = " + h2obalance);
  //
  var habitPicked = true;
  if (!session.get("h2ohabit")){
    habitPicked = false;
  }
  var moneyDeposited = h2obalance>0?true:false;
  //
  if (habitPicked && moneyDeposited){
    var foodIdeasURL = "Webview::https://apps.scad.ventures/myh2o/foodideas?habit="+habitPicked;
    return [
      {type: 'button', label: 'Record Food', action:imageFetcherURL}, // comes back with food URL that user must paste and trigger additional actions
      {
        type: "group",
        label: "Menu",
        controls: [
          //{type: 'button', label: 'Add Money', value: 'add-money'},
          {type: 'button', label: '🍽️ Food Ideas', action: foodIdeasURL},
          {type: 'button', label: percentHabitMastered +'% Habit Done (See ETH balance)', value: 'balance'},
          {type: 'button', label: 'Switch Habit', value: 'switch-habit'}
        ]
      },
      {type: 'button', label: '?', value: 'help'}
    ];
  }else if(!habitPicked){
    return [
      {
        type: "group",
        label: "Pick your health goal",
        controls: [
          {type: 'button', label: 'Drink more water', value: 'habit-drinkwater'},
          {type: 'button', label: 'Eat Healthy', value: 'habit-healthyeats'},
          {type: 'button', label: 'Lose Weight', value: 'habit-comingsoon'},
          {type: 'button', label: 'Diabetes Friendly', value: 'habit-comingsoon'},
          {type: 'button', label: '🤔 Suggest New ', action: 'Webview::http://apps.scad.ventures/myh2o/suggest-habits'},
        ]
      },
      {type: 'button', label: '?', value: 'help'}
    ];
  }else{
    return [
      {type: 'button', label: 'Add your $5 stake 💰', value: 'add-money'},
      {type: 'button', label: '?', value: 'help'}
    ];
  }
}

function sendMessage(session, message) {
  //
  let controls = getControls(session);
  session.reply(SOFA.Message({
    body: message,
    controls: controls,
    showKeyboard: false,
  }))
}

function sendMessageWithImage(session, imageName, message) {
  let controls = getControls(session);
  session.reply(SOFA.Message({
    body: message,
    attachments: [
      {
      	"type": "image",
       	"url": imageName
      }
    ],
    controls: controls,
    showKeyboard: false,
  }))
}

function sendMessageBeforeConfirm(session, message){
  session.reply(SOFA.Message({
    body: message,
    controls:[
      {type: 'button', label: '⏳ Waiting to confirm...', action: 'Webview::https://giphy.com/embed/tXL4FHPSnVJ0A'}
    ],
    showKeyboard: false,
  }))
}
