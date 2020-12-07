import axios from "axios";
import {
  ADD_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  GET_COMMENTS_REQUEST
} from "../Constants/reviewConstants";

const deleteComment = (commentId) => async (dispatch) => {
  await axios
    .delete(`/products/comment/${commentId}`)
    .then((res) => {
      return res;
    });
  dispatch({ type: DELETE_COMMENT, payload: commentId });
};

const setComment = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COMMENT, payload: data });
  } catch (err) {
    console.error(err.message);
  }
};

const fetchComments = (productId) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENTS_REQUEST });
    const { data } = await axios.get(
      `/product/${productId}/comments`
    );
    dispatch({
      type: GET_COMMENTS,
      payload: data,
    });
  } catch (err) {
    console.error(err.message)
  }
};

export { setComment, fetchComments, deleteComment };
