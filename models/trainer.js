const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrainerSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{
      type: String, required: true
    }],
    rating: { type: Number, required: true },
    reviews: [{
      type: String, required: true
    }],
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym' }
  }
);

module.exports = mongoose.model('Trainer', TrainerSchema);