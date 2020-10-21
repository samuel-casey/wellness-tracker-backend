const { Schema } = require('mongoose');
const mongoose = require('../db/connection');

const daySchema = new Schema(
	{
		date: { type: Date, required: true },
		activities: [
			{
				ref: 'activity',
				type: Schema.Types.ObjectId,
			},
		],  
	},
	{ timestamps: true }
);

const Day = mongoose.model('day', daySchema);

module.exports = Day;
