'usestrict';

const mongoose = require('mongoose');
const config = require('../../config/config');

// models
const GroceryListItem = require('../models/grocery-list');


module.exports = function(controller) {
  // grocery list function
  controller.hears([
    'add (.*) to grocery list',
    'add (.*) to grocery-list',
    'add (.*) to groceries',
    'add (.*) to ([^"\r\n]*) grocery list',
  ], 'direct_message,direct_mention,mention', (bot, message) => {
      let itemName = message.match[1];
      bot.reply(message, `Okay I added ${itemName} to the grocery list.`);
      mongoose.connect(config.MONGO_URI);
      GroceryListItem.create({
        name: itemName,
        state: 'notChecked',
        user_id: message.user,
      }, (err, result)=>{
        if (err) {
          console.log(err);
          bot.reply(message, `uhm, Sorry but I couldn't add ${itemName} to the grocery list.`);
        } else {
          console.log(result);
        }
        mongoose.disconnect();
      });
  });
};
