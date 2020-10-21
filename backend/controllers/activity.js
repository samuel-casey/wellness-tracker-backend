const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
// REQUIRE IN MONGO/MONGOOSE COMMANDS FOR USE IN ROUTES
const { index, show, create, update, destroy } = require('./mongoActions');

router.get('/', async (req, res) => {
	try {
		const activities = await index(Activity);
		res.json({
			status: 200,
			message: 'OK',
			data: activities,
		});
	} catch (err) {
		console.log(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const activities = await show(Activity, req.params.id);
		res.json({
			status: 200,
			message: 'OK',
			data: activities,
		});
	} catch (err) {
		console.log(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const newActivity = await create(Activity, req.body);
		res.json({
			status: 201,
			message: 'CREATED',
			data: newActivity,
		});
	} catch (err) {
		console.log(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updatedActivity = await update(Activity, req.params.id, req.body);
		res.json({
			status: 200,
			message: 'OK',
			data: updatedActivity,
		});
	} catch (err) {
		console.log(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const deletedActivity = await destroy(Activity, req.params.id);
		res.json({
			status: 200,
			message: 'DELETED',
			data: deletedActivity,
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
