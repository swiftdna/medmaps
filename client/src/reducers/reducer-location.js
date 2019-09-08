import C from '../constants/ActionTypes';

const initialState = {
  loading: false,
  error: false,
  errMessage: ''
};

export default function appinits(state = initialState, action) {
  switch (action.type) {
    case C.FETCH_LOCATION:
      return {
        ...state,
        loading: true
      };
    case C.FETCH_LOCATION_COMPLETE:
      return {
        ...state,
        loading: false
      };
    case C.FETCH_LOCATION_ERROR:
      return {
        ...state.
        error: true,
        errMessage: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
