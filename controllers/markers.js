const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
	getMarkers: (req, res, next) => {
		const collection = APP.mongoDB.collection('markers');
		collection.find({}).sort( { modifiedTime: -1 } ).toArray((err, docs) => {
			assert.equal(err, null);
			req.model.data = docs;
			return next();
		});
	},
	addMarker: (req, res, next) => {
		const collection = APP.mongoDB.collection('markers');
		const inputBody = req.body ? req.body : {};
		const {name, latitude, longitude, helper} = inputBody;
		if (!inputBody || !Object.keys(inputBody).length) {
			return next('Input parameters missing!');
		}
		collection.insertOne({
			name,
			latitude,
			longitude,
			helper,
			createdTime: Date.now(),
			modifiedTime: Date.now()
		}, (err, doc) => {
			assert.equal(err, null);
			const {result} = doc ? doc : {};
			let success = result && result.ok && result.ok === 1;
			req.model.data = {
				success
			};
			return next();
		})
	},
	deleteMarker: (req, res, next) => {
		const collection = APP.mongoDB.collection('markers');
		const params = req.params ? req.params : {};
		const {markerID} = params;
		if (!markerID) {
			return next('marker ID parameter missing!');
		}
		collection.remove({
			'_id': ObjectID(markerID)
		}, (err, doc) => {
			assert.equal(err, null);
			const {result} = doc ? doc : {};
			let success = result && result.ok && result.ok === 1;
			req.model.data = {
				success
			};
			return next();
		});
	},
	updateMarker: (req, res, next) => {
		const collection = APP.mongoDB.collection('markers');
		const params = req.params ? req.params : {};
		const {markerID} = params;
		const inputBody = req.body ? req.body : {};
		const {name, latitude, longitude} = inputBody;
		if (!inputBody || !Object.keys(inputBody).length) {
			return next('Input parameters missing!');
		}
		if (inputBody._id) {
			delete inputBody._id;
		}
		inputBody.modifiedTime = Date.now();
		collection.updateOne({
			'_id': ObjectID(markerID)
		}, { $set: inputBody },(err, doc) => {
			assert.equal(err, null);
			const {result} = doc ? doc : {};
			let success = result && result.ok && result.ok === 1;
			req.model.data = {
				success
			};
			return next();
		})
	},
};