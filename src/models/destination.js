import Location from '../data/sample_drivers_location';
import * as mapService from '../services/map';

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
    SaveMyLocation(state, { payload: MyLocation }) {
      // console.warn(MyLocation);
      return { ...state,
        myLocation: { latitude: MyLocation.MyLocation.lat, longitude: MyLocation.MyLocation.lng },
      };
    },
  },

  effects: {
    *getMyLocation(payload, { call, put }) {
      const MyLocation = yield call(mapService.SetMyLocation);
      // console.warn(MyLocation);
      yield put({
        type: 'SaveMyLocation',
        payload: {
          MyLocation,
        },
      });
    },
  },

  subscriptions: {
  },
};
