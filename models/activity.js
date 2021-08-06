const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivitySchema = new Schema(
  {
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    trainerId: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true },
    maxAttendance: { type: Number, required: true },
    currentAttendance: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    userIds: [{
      type: Schema.Types.ObjectId, ref: 'User', required: true
    }]
  }
);

module.exports = mongoose.model('Activity', ActivitySchema);