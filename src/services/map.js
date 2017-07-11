
export function SetMyLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((success) => {
      const Location = {
        lat: success.coords.latitude,
        lng: success.coords.longitude,
      };
      resolve(Location);
    }, () => {
      reject();
    });
  })
    .then((result) => {
      return result;
    })
    .catch(() => {
      console.log("Your browser doesn't support geolocation.");
    });
}

export function SetDirections(data) {
  console.log(data);
  const DirectionsService = new google.maps.DirectionsService();

  return new Promise((resolve, reject) => {
    DirectionsService.route({
      origin: { lat: data.myLocation.latitude, lng: data.myLocation.longitude },
      destination: { lat: data.selectDestination.latitude, lng: data.selectDestination.longitude },
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result);
      } else {
        console.error(`error fetching directions.`);
        reject();
      }
    });
  })
    .then((result) => {
      return result;
    });
}
