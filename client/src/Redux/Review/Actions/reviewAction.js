import axios from "axios";
import {
  ADD_REVIEW,
  UPDATE_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  GET_REVIEWS_REQUEST,
  UPDATE_RATING,
} from "../Constants/reviewConstants";

const deleteReview = (reviewId, productId) => async (dispatch) => {
  await axios
    .delete(`http://localhost:3001/products/${productId}/review/${reviewId}`)
    .then((res) => {
      return res;
    });
  dispatch({ type: DELETE_REVIEW, payload: reviewId });
};

const setReview = (productId, review) => async (dispatch) => {
  await axios
    .post(`http://localhost:3001/products/${productId}/review`, {
      title: `${review.title}`,
      description: `${review.description}`,
      star: `${review.star}`,
      idUser: JSON.parse(localStorage.getItem("user")).id,
    })
    .then((data) => {
      dispatch({ type: ADD_REVIEW, payload: data.data });
      return data;
    });
};

const updateReview = (productId, review) => async (dispatch) => {
  await axios
    .put(`http://localhost:3001/products/${productId}/review/${review.id}`, {
      title: `${review.title}`,
      description: `${review.description}`,
      star: `${review.star}`,
    })
    .then((data) => {
      console.log(data.data);
      dispatch({ type: UPDATE_REVIEW, payload: data.data });
      return data;
    });
  return window.history.back();
};

const setRating = (productId) => async (dispatch) => {
  dispatch({ type: UPDATE_RATING, payload: productId });
};

const fetchReviews = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:3001/products/${productId}/review`
    );
    dispatch({
      type: GET_REVIEWS,
      payload: data,
    });
  } catch (error) {}
};

export { setReview, fetchReviews, setRating, deleteReview, updateReview };
