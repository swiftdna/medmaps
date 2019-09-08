import C from '../constants/ActionTypes';

const initialState = {
  locations: [],
  loading: false,
  error: false,
  errMessage: ''
};

export default function appinits(state = initialState, action) {
  switch (action.type) {
    case C.FETCH_MARKERS:
      return {
        ...state,
        loading: true
      };
    case C.ADD_MARKERS:
      return {
        ...state,
        locations: action.payload,
        loading: false
      };
    case C.FETCH_MARKERS_ERROR:
      return {
      	...state,
      	error: true,
      	errMessage: action.payload,
      	loading: false
      };
    default:
      return state;
  }
}
