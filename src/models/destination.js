import Location from '../data/sample_drivers_location';

export default {
  namespace: 'destination',
  state: {
    destination:
    [
      { title: '' },
      { title: 'Taipei 101', latitude: 25.033964, longitude: 121.564472 },
      { title: 'NTUT', latitude: 25.042233, longitude: 121.535497 },
      { title: 'Taipei Main Station', latitude: 25.047739, longitude: 121.517040 },
    ],
    selectDestination: null,
    driversLocation: Location,
    myLocation: { latitude: null, longitude: null },
    directions: null,
  },

  reducers: {
    save(state, { payload: { data: destination, selectDestination } }) {
      return { ...state, destination, selectDestination };
    },
    select(state, { payload: selectDestination }) {
      return { ...state,
        selectDestination,
      };
    },
    setDirections(state, { payload: result }) {
      return { ...state,
        directions: result,
      };
    },
    setMyLocation(state, { payload: result }) {
      return { ...state,
        myLocation: { latitude: result.lat, longitude: result.lng },
      };
    },
  },

  effects: {
  },

  subscriptions: {
  },
};
