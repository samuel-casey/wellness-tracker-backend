const { Schema } = require('mongoose');
const mongoose = require('../db/connection');

const activitySchema = new Schema(
	{
		activity_type: { type: String, required: true },
		activity_mins: { type: Number, required: true },
		rating: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Activity = mongoose.model('activity', activitySchema);

module.exports = Activity;
