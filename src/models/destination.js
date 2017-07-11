import Location from '../services/sample_drivers_destination';
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
    driversLocation: [],
    myLocation: { latitude: null, longitude: null },
    directions: null,
  },

  reducers: {
    setDriversLocation(state, { payload: { data } }) {
      return { ...state,
        driversLocation: data,
      };
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
    saveMyLocation(state, { payload: MyLocation }) {
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
        type: 'saveMyLocation',
        payload: {
          MyLocation,
        },
      });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        const data = Location;
        dispatch({ type: 'setDriversLocation', payload: { data } });
      });
    },
  },
};
