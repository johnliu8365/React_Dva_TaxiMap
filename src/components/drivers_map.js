import React from 'react';
import { connect } from 'dva';
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from 'react-google-maps';
import taxi from '../../image/taxi.png';
import mylocation from '../../image/mylocation.png';

function DriversMap({ dispatch, selectDestination, driversLocation, directions, myLocation, targetMarker }) {
  const SimpleMapExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={props.center}
    >

      {props.markers}

      <Marker
        position={props.center}
        icon={mylocation}
      />

      {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
  ));

  function SetMyLocation() {
    dispatch({
      type: 'destination/getMyLocation',
    });
  }

  function SetDirections() {
    dispatch({
      type: 'destination/getDirections',
      payload: { selectDestination, myLocation },
    });
  }

  function onMarkerClick(target) {
    dispatch({
      type: 'destination/handleMarkerClick',
      payload: target,
    });
  }

  function markerLocation() {
    return driversLocation.driversLocation.map((info) => {
      // console.log('markerLocation', info.showInfo);
      return (
        <Marker
          key={info.id}
          icon={taxi}
          position={{ lat: info.latitude, lng: info.longitude }}
          onClick={() => onMarkerClick(info)}
        >
          { info.id === targetMarker.id && (
            <InfoWindow >
              <div>
                {info.DriverName}
                {info.License}
              </div>
            </InfoWindow>
          )}
        </Marker>
      );
    });
  }

  if (selectDestination === null) {
    SetMyLocation();
    return <div>請選擇司機目的地</div>;
  }
  SetDirections();

  return (
    <SimpleMapExampleGoogleMap
      containerElement={
        <div style={{ width: 900, height: 400 }} />
      }
      mapElement={
        <div style={{ height: '100%' }} />
      }
      center={{ lat: myLocation.latitude, lng: myLocation.longitude }}
      markers={markerLocation()}
      directions={directions}
    />

  );
}

function mapStateToProps(state) {
  // console.log('mapStateToProps:', state);
  const { selectDestination, driversLocation, directions,
     myLocation, targetMarker } = state.destination;
  return {
    selectDestination,
    driversLocation,
    directions,
    myLocation,
    targetMarker,
  };
}

export default connect(mapStateToProps)(DriversMap);
