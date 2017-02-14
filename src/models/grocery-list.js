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
  state: {
    type: String,
    enum: ['checked', 'notChecked'],
  },
});

const GroceryListItem = mongoose.model('GroceryListItem', groceryListSchema);

module.exports = GroceryListItem;
