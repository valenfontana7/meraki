import {
  ADD_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  GET_REVIEWS_REQUEST,
  UPDATE_REVIEW,
  UPDATE_RATING,
} from "../Constants/reviewConstants";

import axios from "axios";

function getReviewReducer(state = { reviews: [] }, action) {
  const filter = (el) => {
    return el.id !== action.payload;
  };
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        loadingRev: true,
        reviews: [],
      };
    case GET_REVIEWS:
      return {
        reviews: action.payload,
        loadingRev: false,
      };
    case DELETE_REVIEW:
      return (state = {
        reviews: state.reviews.filter(filter),
      });
    case UPDATE_REVIEW:
      const newReview = action.payload[0];
      const oldReview = state.reviews.find(
        (review) => review.id === newReview.id
      );
      return {
        reviews: state.reviews.map((rev) => {
          return rev.id === oldReview.id ? newReview : rev;
        }),
      };
    case ADD_REVIEW:
      return (state = {
        reviews: [...state.reviews, action.payload],
      });
    case UPDATE_RATING:
      axios
        .put(`http://localhost:3001/products/${action.payload}`, {
          rating:
            state.reviews.reduce((acc, num) => {
              return acc + num.star;
            }, 0) / state.reviews.length,
        })
        .then((data) => {
          console.log(data.data);
          return data;
        });
      return state;
    default:
      return state;
  }
}

export { getReviewReducer };
