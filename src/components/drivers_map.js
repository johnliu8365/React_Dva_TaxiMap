import React from 'react';
import { connect } from 'dva';
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, Circle, InfoWindow } from 'react-google-maps';

function DriversMap({ dispatch, selectDestination, driversLocation, directions }) {

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
            title={(index + 1).toString()}
            onClick={() => props.onMarkerClick(marker)}
          >

            {marker.showInfo && (
              <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                <div>Hello</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}

      {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
  ));

  if (!selectDestination) {
    return <div>請選擇司機目的地</div>;
  }

  function DriversMarkerList() {
    return driversLocation.driversLocation.map((info) => {
      return {
        position: { lat: info.latitude, lng: info.longitude },
        showInfo: false,
        infoContent: (
          <div>Hello</div>
        ),
      };
    });
  }

  function SetDirections() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: { lat: 25.033964, lng: 121.564472 },
      destination: { lat: selectDestination.latitude, lng: selectDestination.longitude },
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        dispatch({
          type: 'destination/setDirections',
          payload: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
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
      center={{ lat: selectDestination.latitude, lng: selectDestination.longitude }}
      markers={DriversMarkerList()}
      directions={directions}
    />
  );
}

function mapStateToProps(state) {
  console.warn(state);
  const { selectDestination, driversLocation, directions } = state.destination;
  return {
    selectDestination,
    driversLocation,
    directions,
  };
}

export default connect(mapStateToProps)(DriversMap);
