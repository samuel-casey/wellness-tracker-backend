const express = require('express');
const dotenv = require('dotenv').config();
// const mongoose = require('./db/connection');

const app = express();

// ENV Variables
const PORT = process.env.PORT || 8002;
const NODE_ENV = process.env.NODE_ENV;

//CORS
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const morgan = require('morgan');
const dayRouter = require('./controllers/day');
const activityRouter = require('./controllers/activity');

// Middleware
NODE_ENV === 'production' ? app.use(cors(corsOptions)) : app.use(cors());
app.use(express.json());
app.use(morgan('dev')); //logging

// Routes and Routers
// Route for testing server is working
app.get('/', (req, res) => {
	res.json({
		hello: 'Hello World! What have you done to improve your wellness today?',
	});
});

app.use('/api/day', dayRouter);
app.use('/api/activity', activityRouter);

//LISTENER
app.listen(PORT, () => {
	console.log(`Your are listening on port ${PORT}`);
});
