import React, {useState, useEffect} from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useSelector, useDispatch } from "react-redux";
import fetchMarkers, {addMarker, deleteMarker, editMarker} from './actions/action-markers';
import InputForm from './InputForm';
import * as config from './config.json';

function MapMarker() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.API_KEY
  });

  const init_options = {
    center: {lat: 19.866, lng: 80.146},
    zoom: 5
  };
  const dispatch = useDispatch();

  const [createMode, setCreateMode] = useState(false);
  const [editItem, setEditItem] = useState({});
  const markerStore = useSelector(state => state.markers);
  const {locations, loading, error, errMessage} = markerStore ? markerStore : {};
  const [options, setMapConfig] = useState(init_options);

  const addLocation = (data) => {
    if (editItem && Object.keys(editItem).length) {
      dispatch(editMarker(data, () => {
        dispatch(fetchMarkers());
        setCreateMode(false);
        setEditItem({});
      }));
      return;
    }
    dispatch(addMarker(data, () => {
      dispatch(fetchMarkers());
      setCreateMode(false);
      setEditItem({});
    }));
  }

  const editLocation = (index) => {
    setCreateMode(true);
    setEditItem(locations[index]);
  }

  const deleteLocation = (id) => {
    dispatch(deleteMarker(id, () => {
      dispatch(fetchMarkers());
    }));
  }

  const cancel = () => {
    setCreateMode(false);
    setEditItem({});
  }

  useEffect(() => {
    // update center whenever a marker is added
    if (locations && locations.length) {
      let {latitude, longitude} = locations[0];
      let new_options = {
        center: {
          lat: Number(latitude),
          lng: Number(longitude)
        },
        zoom: 7
      };
      setMapConfig(new_options);
    } else {
      // Call API
      dispatch(fetchMarkers());
    }
  }, [locations, dispatch]);

  if (error) {
    return <div className="error_panel">
      <h3 className="red-text text-darken-2">{errMessage}</h3>
    </div>;
  }

  return (
    <div className="MapMarker">
      <div className="row">
        <div className="col s6">
          <h3>Map Marker</h3>
          {locations && locations.length ? <p class="status_text">{locations.length} location entries found</p> : ''}
        </div>
        <div className="col s6">
          <button className="btn create-btn light-blue darken-4" onClick={() => setCreateMode(true)} disabled={createMode}>
            <i className="material-icons left">add</i>Create
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col s6">
          {isLoaded && !loadError ? 
            <GoogleMap id='example-map' mapContainerStyle={{width: '100%', height: '700px'}} options={options}>
              {
                locations.map((location, index) => {
                 return <Marker key={index}
                  position={{
                    lat: Number(location.latitude),
                    lng: Number(location.longitude)
                  }}
                />
                })
              }
            </GoogleMap> : <p>Loading..</p>}
          {loadError && <p>Something went wrong. Please try again later!</p>}
        </div>
        <div className="col s6">
          { 
            createMode ? 
              <InputForm editData={editItem} onCancel={() => cancel() } onSubmit={(data) => addLocation(data) }/> : 
                !loading && locations && locations.length ?
                  <div>
                    <table>
                      <thead>
                        <tr>
                            <th>Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          locations.map((location, index) => {
                           return (
                             <tr key={index}>
                              <td>{location.name} <span title={location.helper} className="tht helper_text">{location.helper}</span></td>
                              <td>{location.latitude}</td>
                              <td>{location.longitude}</td>
                              <td className="action-icons">
                                <button className="btn-small orange" onClick={() => editLocation(index)}><i className="material-icons">edit</i></button>
                                <button className="btn-small red" onClick={() => deleteLocation(location._id)}><i className="material-icons">delete</i></button>
                              </td>
                            </tr>
                           ) 
                          })
                        }
                      </tbody>
                    </table>
                  </div> : ''
          }
          {loading && <p>Loading..</p>}
        </div>
      </div>
    </div>
  );
}

export default MapMarker;
