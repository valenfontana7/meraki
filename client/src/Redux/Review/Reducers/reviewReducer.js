import {
  ADD_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  GET_COMMENTS_REQUEST,
} from "../Constants/reviewConstants";

function getCommentReducer(state = { comments: [] }, action) {
  const filter = (el) => {
    return el.item_comment_id !== action.payload;
  };
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return {
        loadingCom: true,
        comments: [],
      };
    case GET_COMMENTS:
      return {
        comments: action.payload,
        loadingCom: false,
      };
    case DELETE_COMMENT:
      return (state = {
        comments: state.comments.filter(filter),
      });
    case ADD_COMMENT:
      return (state = {
        comments: [...state.comments, action.payload],
      });
    default:
      return state;
  }
}

export { getCommentReducer };
