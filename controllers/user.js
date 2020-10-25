require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();
const { SECRET } = process.env;

router.post('/signup', async (req, res) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const newUser = await User.create(req.body);
		console.log(newUser);
		res.json({
			status: 200,
			data: newUser,
		});
	} catch (error) {
		res.json({
			status: 400,
			error: error,
		});
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(email, password);
		const user = await User.findOne({ email });
		if (user) {
			const match = await bcrypt.compare(password, user.password);
			if (match) {
				const token = await jwt.sign({ email }, SECRET);
				res.json({
					status: 200,
					token: token,
				});
			} else {
				res.json({
					status: 400,
					error: 'Password does not match.',
				});
			}
		} else {
			res.json({
				status: 400,
				error: 'User does not exist.',
			});
		}
	} catch (error) {
		res.json({
			status: 400,
			error: error,
		});
	}
});

module.exports = router;
