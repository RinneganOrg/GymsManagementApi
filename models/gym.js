const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GymSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    address: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{
      type: String, required: true
    }],
    rating: { type: Number, required: true },
    reviews: [{
      type: String, required: true
    }]
  }
);

module.exports = mongoose.model('Gym', GymSchema);