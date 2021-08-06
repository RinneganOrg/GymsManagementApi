const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym' },
    trainerId: { type: Schema.Types.ObjectId, ref: 'Trainer' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    comment: { type: String, required: true },
    rating: { type: Number, required: true }
  }
);

module.exports = mongoose.model('Comment', CommentSchema);