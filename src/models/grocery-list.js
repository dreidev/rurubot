const mongoose = require('mongoose');
mongoose.Promise = Promise;

let groceryListSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  user_id: {
    type: String,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  state: {
    type: String,
    enum: ['checked', 'notChecked'],
  },
});

const GroceryList = mongoose.model('GroceryList', groceryListSchema);

module.exports = GroceryList;
