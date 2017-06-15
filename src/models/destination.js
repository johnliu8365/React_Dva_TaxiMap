
export default {
  namespace: 'destination',
  state: {
    destination:
    [
      { title: '' },
      { title: 'Taipei 101', latitude: 25.033964, longitude: 121.564472 },
      { title: 'NTUT', latitude: 25.042233, longitude: 121.535497 },
      { title: 'Taipei Main Station', latitude: 25.047739, longitude: 121.517040 }
    ],
    selectDestination: null,
  },

  reducers: {
    save(state, { payload: { data: destination, selectDestination } }) {
      return { ...state, destination, selectDestination };
    },
    selectDestiantion(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    *select({ payload: id }, { call, put }) {
      yield call(usersService.remove, id);
      yield put({
        type: 'DESTINATION_SELECTED',
        payload: state.destination[id]
      });
    },
  },

  subscriptions: {
  },
};
