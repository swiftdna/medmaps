const express = require('express');
const router = express.Router();
const markers = require('./controllers/markers');
const location = require('./controllers/location');

const requestMapper = (req, res, next) => {
	req.model = {};
	return next();
}

const responseMapper = (req, res) => {
	return res.json(req.model.data);
}

router.get('/', (req, res) => {
	res.end('Welcome');
});

router.get('/api/markers', requestMapper, markers.getMarkers, responseMapper);
router.post('/api/marker', requestMapper, markers.addMarker, responseMapper);
router.put('/api/marker/:markerID', requestMapper, markers.updateMarker, responseMapper);
router.delete('/api/marker/:markerID', requestMapper, markers.deleteMarker, responseMapper);
router.get('/api/location', requestMapper, location.getLocation, responseMapper);

module.exports = router;
