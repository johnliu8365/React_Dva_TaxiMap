import React from 'react';
import { connect } from 'dva';
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, Circle, InfoWindow } from 'react-google-maps';
import raf from 'raf';
import taxi from '../../image/taxi.png';
import mylocation from '../../image/mylocation.png';

const geolocation = (
  navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure('Your browser doesn\'t support geolocation.');
    },
  }
);

function DriversMap({ dispatch, selectDestination, driversLocation, directions, myLocation }) {
  const SimpleMapExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={props.center}
    >

      {props.markers.map((marker, index) => {
        {/*console.log(marker);*/}
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
    geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      dispatch({
        type: 'destination/setMyLocation',
        payload: { lat, lng },
      });
    });
  }

  function SetDirections() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: { lat: myLocation.latitude, lng: myLocation.longitude },
      destination: { lat: selectDestination.latitude, lng: selectDestination.longitude },
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      // console.log(result);
      if (status === google.maps.DirectionsStatus.OK) {
        dispatch({
          type: 'destination/setDirections',
          payload: result,
        });
        // return result;
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  // function handleMarkerClick(targetMarker) {
  //   targetMarker.showInfo = true;
  //   return targetMarker;
  // }

  if (!selectDestination) {
    SetMyLocation();
    return <div>請選擇司機目的地</div>;
  }
  SetDirections();
  // console.log(SetDirections());

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
  // console.log(state);
  const { selectDestination, driversLocation, directions, myLocation } = state.destination;
  return {
    selectDestination,
    driversLocation,
    directions,
    myLocation,
  };
}

export default connect(mapStateToProps)(DriversMap);
