import React from 'react';
import { connect } from 'dva';
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, Circle, InfoWindow } from 'react-google-maps';
import raf from 'raf';
import taxi from '../../image/taxi.png';
import mylocation from '../../image/mylocation.png';

function DriversMap({ dispatch, selectDestination, driversLocation, directions, myLocation }) {
  const SimpleMapExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={props.center}
    >

      {props.markers.map((marker, index) => {
        return (
          <Marker
            key={index}
            position={marker.position}
            icon={taxi}
            title={(index + 1).toString()}
            onClick={() => handleMarkerClick(marker)}
          >
            {marker.showInfo && (
              <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                <div>
                  {marker.infoContent}
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}

      <Marker
        position={props.center}
        icon={mylocation}
      />

      {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
  ));

  function DriversMarkerList() {
    return driversLocation.driversLocation.map((info) => {
      return {
        position: { lat: info.latitude, lng: info.longitude },
        showInfo: false,
        infoContent: (
          <div>
            <li>司機姓名: {info.DriverName}</li>
            <li>司機車牌: {info.License}</li>
          </div>
        ),
      };
    });
  }

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
      markers={DriversMarkerList()}
      directions={directions}
    />

  );
}

function mapStateToProps(state) {
  console.log(state);
  const { selectDestination, driversLocation, directions, myLocation } = state.destination;
  return {
    selectDestination,
    driversLocation,
    directions,
    myLocation,
  };
}

export default connect(mapStateToProps)(DriversMap);
