const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	//Authorization: "bearer abcdefghijklmnopqrstuvwxyzz"

	if (req.headers.authorization) {
	} else {
		res.json({
			status: 400,
			error: 'NO AUTHORIZATION HEADER',
		});
	}
};
