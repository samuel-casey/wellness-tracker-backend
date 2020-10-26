const express = require('express');
const router = express.Router();
const auth = require('../auth/index');
const Activity = require('../models/activity');
// REQUIRE IN MONGO/MONGOOSE COMMANDS FOR USE IN ROUTES
const { index, show, create, update, destroy } = require('./mongoActions');

router.get('/', auth, async (req, res) => {
	try {
		const { email } = req.payload;
		const activities = await index(Activity, email);
		res.json({
			status: 200,
			message: 'OK',
			data: activities,
		});
	} catch (err) {
		res.json({
			status: 400,
			error: err,
		});
	}
});

// // show specific post by id (no user email required bc using activity id)
// router.get('/:id', auth, async (req, res) => {
// 	try {
// 		const activities = await show(Activity, req.params.id);
// 		res.json({
// 			status: 200,
// 			message: 'OK',
// 			data: activities,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// Create a new post and attach user email
router.post('/', auth, async (req, res) => {
	try {
		const { email } = req.payload;
		req.body.email = email;
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

router.put('/:id', auth, async (req, res) => {
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

router.delete('/:id', auth, async (req, res) => {
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
