const express = require('express');
const router = express.Router();
const Day = require('../models/day');
// REQUIRE IN MONGO/MONGOOSE COMMANDS FOR USE IN ROUTES
const { index, show, create, update, destroy } = require('./mongoActions');

router.get('/', async (req, res) => {
	try {
		const days = await index(Day);
		res.json({
			status: 200,
			message: 'OK',
			data: days,
		});
	} catch (err) {
		console.log(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const days = await show(Day, req.params.id);
		res.json({
			status: 200,
			message: 'OK',
			data: days,
		});
	} catch (err) {
		console.log(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const newDay = await create(Day, req.body);
		res.json({
			status: 201,
			message: 'CREATED',
			data: newDay,
		});
	} catch (err) {
		console.log(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updatedDay = await update(Day, req.params.id, req.body);
		res.json({
			status: 200,
			message: 'OK',
			data: updatedDay,
		});
	} catch (err) {
		console.log(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const deletedDay = await destroy(Day, req.params.id);
		res.json({
			status: 200,
			message: 'DELETED',
			data: deletedDay,
		});
	} catch (err) {
		console.log(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const addedActivity = await push(Day, req.params.id, req.body);
		res.json({
			status: 201,
			message: 'OK',
			data: addedActivity,
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
