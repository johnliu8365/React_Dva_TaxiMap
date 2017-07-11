
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
      // console.warn(result);
      return result;
    })
    .catch(() => {
      console.log("Your browser doesn't support geolocation.");
    });
}
