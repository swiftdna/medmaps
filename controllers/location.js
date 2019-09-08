const request = require('request');
const assert = require('assert');
const APP_CONSTANTS = require('../config/constants');

module.exports = {
	getLocation: (req, res, next) => {
		const {latitude, longitude} = req.query;
		request.get(`${APP_CONSTANTS.GMAPS_URL}/geocode/json?latlng=${latitude},${longitude}&key=${APP_CONSTANTS.API_KEY}`, (err, response) => {
			assert.equal(err, null);
			if (response && response.body) {
				const locationParams = JSON.parse(response.body);
				const {results} = locationParams ? locationParams : {};
				const sublocality = results.filter(location => location.types.indexOf('sublocality') !== -1);
				const locality = results.filter(location => location.types.indexOf('locality') !== -1);
				const political = results.filter(location => location.types.indexOf('political') !== -1);
				req.model.data = {
					sub_locality: sublocality && sublocality.length ? sublocality[sublocality.length - 1].formatted_address : '',
				 	locality: locality && locality.length ? locality[0].formatted_address : '',
				 	political_name: political && political.length ? political[political.length - 1].formatted_address : '',
				 	original: locationParams
				};
			}
			return next();
		});
	},
};