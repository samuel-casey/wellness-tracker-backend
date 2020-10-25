const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

const auth = async (req, res, next) => {
	try {
		//Authorization: "bearer abcdefghijklmnopqrstuvwxyzz"
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			const payload = await jwt.verify(token, SECRET);
			if (payload) {
				req.payload = payload;
				next();
			}
		} else {
			res.json({
				status: 400,
				error: 'NO AUTHORIZATION HEADER',
			});
		}
	} catch (error) {
		res.json({
			status: 400,
			error: error,
		});
	}
};

module.exports = auth;
