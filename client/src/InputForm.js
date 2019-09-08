import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import fetchLocation from './actions/action-location';

function InputForm({onCancel, onSubmit, editData}) {
	const dispatch = useDispatch();
	const initData = Object.assign({
		name: '',
		helper: '',
		latitude: '',
		longitude: ''
	}, editData);

	const [locationData, setLocationData] = useState(initData);
	const [error, setError] = useState();
	const [checkFlag, setCheck] = useState(false);
	const handleInputChange = (event) => {
	    event.persist();
	    setError('');
	    setLocationData(data => ({...data, [event.target.name]: event.target.value}));
	}

	const coordinatesValid = (latitude, longitude) => {
		return longitude >= -180 && longitude <= 180 && latitude >= -180 && latitude <= 180;
	}

	const handleSubmit = (event) => {
		if (event) {
		  event.preventDefault();
		}
		// Validate the input
		const {name, latitude, longitude} = locationData;
		if (!latitude || !longitude) {
			setError('Coordinates are missing!');
			return;
		}
		if (!coordinatesValid(latitude, longitude)) {
			setError('Coordinates are invalid!');
			return;
		}
		if (!checkFlag) {
			setError('Please check coordinates before you submit!');
			return;
		}
		if (!name) {
			setError('Name is missing!');
			return;
		}
		onSubmit(locationData);
	}

	const fetchReady = () => {
		const {longitude, latitude} = locationData;
		if (longitude && latitude && coordinatesValid(latitude, longitude)) {
			return false;
		}
		return true;
	}

	const getLocation = () => {
		dispatch(fetchLocation(locationData, data => {
			const {sub_locality, locality, political_name, original: {status}} = data;
			if (sub_locality)
				setLocationData({...locationData, helper: sub_locality});
			else if (locality)
				setLocationData({...locationData, helper: locality});
			else
				setLocationData({...locationData, helper: political_name});

			// Error handling
			if (status === 'INVALID_REQUEST') {
				setError('Coordinates are invalid!');
				return;
			}
			setCheck(true);
			setError('');
		}));
	}

	return (
		<div className="row">
		   {error ? <div className="error_panel">
		   	<p className="red-text text-darken-2">{error}</p>
		   </div> : ''}
		   <form className="col s12" onSubmit={handleSubmit}>
		      <div className="row">
		      	 <div className="input-field col s9">
		            <input placeholder="Name" name="name" type="text" className="validate" onChange={handleInputChange} value={locationData.name} />
		            <p className="helper_text">{locationData.helper}</p>
		         </div>
		         <div className="input-field col s3">
		            <button type="button" className="btn deep-purple darken-4" disabled={fetchReady()} onClick={() => getLocation()}>Check</button>
		         </div>
		         <div className="input-field col s6">
		            <input placeholder="Latitude" name="latitude" type="number" className="validate" onChange={handleInputChange} value={locationData.latitude} />
		         </div>
		         <div className="input-field col s6">
		            <input placeholder="Longitude" name="longitude" type="number" className="validate" onChange={handleInputChange} value={locationData.longitude} />
		         </div>
		         <div className="input-field col s6">
		            <button type="submit" className="btn green" disabled={error}>Submit</button>
		            <button type="button" className="btn blue-grey darken-2" onClick={() => onCancel()}>Cancel</button>
		         </div>
		      </div>
		   </form>
		</div>
	);
}

InputForm.propTypes = {
	editData: PropTypes.object,
	onCancel: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default InputForm;