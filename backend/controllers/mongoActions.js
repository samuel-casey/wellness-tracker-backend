const mongoose = require('../db/connection');

// Show all documents
const index = (collection) => {
	return collection.find().populate('activities');
};

// Find a document by ID and display it
const show = (collection, id) => {
	return collection.findById(id);
};

// Create a new document
const create = (collection, item) => {
	return collection.create(item);
};

// Update a document
const update = (collection, id, newItem) => {
	switch (collection.modelName) {
		case 'activity':
			return collection.findByIdAndUpdate(
				id,
				{
					activity_type: newItem.activity_type,
					activity_mins: newItem.activity_mins,
					rating: newItem.rating,
				},
				{ new: true }
			);
		case 'day':
			return collection.findByIdAndUpdate(
				id,
				{
					date: newItem.date,
					activities: newItem.activities,
				},
				{ new: true }
			);
		default:
			return null;
	}
};

// Delete a document
const destroy = (collection, id) => {
	switch (collection.modelName) {
		case 'activity':
			return collection.findByIdAndDelete(id);
		case 'day':
			return collection.findByIdAndDelete(id);
		default:
			return null;
	}
};

// add a new activity to a day's activity array
const push = (collection, id, item) => {
	if (collection.modelName === 'day') {
		collection.findByIdAndUpdate(
			id,
			{ $push: { activities: item } },
			{ useFindAnyModify: false }
		);
	}
};

module.exports = { index, show, create, update, destroy, push };
