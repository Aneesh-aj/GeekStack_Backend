const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String },
  rating: { type: Number },
  langitude:{type:String},
  latitude: { type: String },
  phoneNumber: { type: Number, default: 35373838 },
  icon: { type: String },
  verified: { type: Boolean, default: false },
  secured: { type: Boolean, default: false }, 
  address: { type: String, default: "" },
  category: { type: Array, default: ['Veg food', 'Veg food', 'Veg food'] }
});

const restaurantModel = mongoose.model('restaurant', restaurantSchema);

module.exports = restaurantModel;
