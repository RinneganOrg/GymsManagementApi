const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
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
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true},
    trainersId: [{
      type: Schema.Types.ObjectId, ref: 'Trainer'
    }],
    price: { type: Number, required: true },
    color: { type: String, required: true },
    duration: { type: Number, required: true }
  }
);

module.exports = mongoose.model('Course', CourseSchema);