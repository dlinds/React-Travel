import * as a from './../actions/ActionTypes'

let initialState = {
  isLoading: false,
  destinations: [],
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.REQUEST_DESTINATIONS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case a.GET_DESTINATIONS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        destinations: action.destinations
      });
    case a.GET_DESTINATIONS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
};
