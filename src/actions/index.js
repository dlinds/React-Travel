import * as a from './ActionTypes';

export const requestReviews = () => ({
  type: a.REQUEST_REVIEWS
});

export const getReviewsSuccess = (reviews) => ({
  type: a.GET_REVIEWS_SUCCESS,
  reviews
});

export const getReviewsFailure = (reviews) => ({
  type: a.GET_REVIEWS_FAILURE,
  reviews
});

export const requestDestinations = () => ({
  type: a.REQUEST_DESTINATIONS
});

export const getDestinationsSuccess = (destinations) => ({
  type: a.GET_DESTINATIONS_SUCCESS,
  destinations
});

export const getDestinationsFailure = (destinations) => ({
  type: a.GET_DESTINATIONS_FAILURE,
  destinations
});

export const makeApiCall = (search, name = '') => {
  return dispatch => {
    if (search === 'reviews') {
      dispatch(requestReviews);
    } else {
      dispatch(requestDestinations);
    }
    return fetch(`https://localhost:5001/api/${search}/?name=${name}`)
      .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          if (search === 'reviews') {
            dispatch(getReviewsSuccess(jsonifiedResponse));
          } else {
            dispatch(getDestinationsSuccess(jsonifiedResponse));
          }
        })
      .catch((error) => {
        if (search === 'reviews') {
          dispatch(getReviewsFailure(error));
        } else {
          dispatch(getDestinationsFailure(error));
        }
      });
  }
}
