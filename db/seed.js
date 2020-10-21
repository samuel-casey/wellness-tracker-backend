const mongoose = require('./connection');

const db = mongoose.connection;

const Activity = require('../models/activity');
const Day = require('../models/day');

const activitySeed = require('./activitySeed.json');
const daySeed = require('./daySeed.json');

const seedDB = async (collection, seedData) => {
	try {
		await collection.deleteMany({});
		const seededCollection = await collection.insertMany(seedData);
		console.log('seeded: ', seededCollection);
		return seededCollection;
	} catch (err) {
		console.log(err);
	} finally {
		// db.close();
	}
};

seedDB(Activity, activitySeed);
seedDB(Day, daySeed);
