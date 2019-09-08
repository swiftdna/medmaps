import axios from 'axios';
import C from '../constants/ActionTypes';
//import fptiHelper from '../lib/fptiHelper';

function loadingLocation() {
	return {
		type: C.FETCH_LOCATION
	};
}

function locationLoadingComplete() {
	return {
		type: C.FETCH_LOCATION_COMPLETE
	};
}

function serviceError(error) {
	return {
		type: C.FETCH_LOCATION_ERROR,
		payload: error && error.message ? error.message : error
	};
}

export default function fetchLocation(locationData, callback) {
	return (dispatch, getState) => {
		const {latitude, longitude} = locationData;
		dispatch(loadingLocation());
	    axios.get(`http://localhost:4000/api/location?latitude=${latitude}&longitude=${longitude}`).then(response => {
	 		let {data} = response;
	 		callback(data);
	 		dispatch(locationLoadingComplete());
	    }).catch(error => {
	    	dispatch(serviceError(error));
	    	dispatch(locationLoadingComplete());
	    });
	};
}