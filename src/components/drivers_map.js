import React from 'react';
import { connect } from 'dva';
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, Circle, InfoWindow } from 'react-google-maps';

const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  />
));

function DriversMap({ dispatch, destination }) {
  return (
    <SimpleMapExampleGoogleMap
      containerElement={
        <div style={{ width: 900, height: 400 }} />
      }
      mapElement={
        <div style={{ height: '100%' }} />
      }

    />
  );
}

function mapStateToProps(state) {
  const { destination, selectDestination } = state.destination;
  return {
    destination,
    selectDestination,
  };
}

export default connect(mapStateToProps)(DriversMap);
