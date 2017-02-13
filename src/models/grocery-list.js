const mongoose = require('mongoose');

let groceryListSchema = new mongoose.Schema({
  slack_id: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      description: String,
    },
  ],
});

const GroceryList = mongoose.model('GroceryList', groceryListSchema);

module.exports = GroceryList;
