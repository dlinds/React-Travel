import * as a from './../actions/ActionTypes'

let initialState = {
  isLoading: false,
  destinations: [],
  reviews: [],
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
    case a.REQUEST_REVIEWS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case a.GET_REVIEWS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        reviews: action.reviews
      });
    case a.GET_REVIEWS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
};
