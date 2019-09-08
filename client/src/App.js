import React from 'react';
import { Provider } from 'react-redux';
import store from './lib/Store';
import './App.css';
import MapMarker from './MapMarker';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MapMarker />
      </div>
    </Provider>
  );
}

export default App;
