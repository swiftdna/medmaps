import axios from 'axios';
import C from '../constants/ActionTypes';
//import fptiHelper from '../lib/fptiHelper';

function loadingMarkers() {
	return {
		type: C.FETCH_MARKERS
	};
}

function successResponse(data) {
	return {
		type: C.ADD_MARKERS,
		payload: data
	}
}

function serviceError(error) {
	return {
		type: C.FETCH_MARKERS_ERROR,
		payload: error && error.message ? error.message : error
	};
}

export function addMarker(data, callback) {
	return (dispatch, getState) => {
		axios.post(`http://localhost:4000/api/marker`, data).then(response => {
	 		let {data} = response;
	 		if (data.success) {
	 			return callback();
	 		}
	    }).catch(error => {
	    	dispatch(serviceError(error));
	    });
	};
}

export function editMarker(data, callback) {
	return (dispatch, getState) => {
		axios.put(`http://localhost:4000/api/marker/${data._id}`, data).then(response => {
	 		let {data} = response;
	 		if (data.success) {
	 			return callback();
	 		}
	    }).catch(error => {
	    	dispatch(serviceError(error));
	    });
	};
}

export function deleteMarker(id, callback) {
	return (dispatch, getState) => {
		axios.delete(`http://localhost:4000/api/marker/${id}`).then(response => {
	 		let {data} = response;
	 		if (data.success) {
	 			return callback();
	 		}
	    }).catch(error => {
	    	dispatch(serviceError(error));
	    });
	};
}

export default function fetchMarkers() {
	return (dispatch, getState) => {

		dispatch(loadingMarkers());
	    axios.get(`http://localhost:4000/api/markers`).then(response => {
	 		let {data} = response;
	 		dispatch(successResponse(data));
	    }).catch(error => {
	    	dispatch(serviceError(error));
	    });
	};
}