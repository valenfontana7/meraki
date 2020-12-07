import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS
} from "../constantes/userConstants";

function userListReducer(state = { users: {} }, action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return { loading: true };
    case AUTH_SUCCESS:
      return (state = { users: {rol: 'admin'}});
    case AUTH_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT_SUCCESS:
      return (state = { users: {} });
    default:
      return state;
  } 
}

export { userListReducer };
