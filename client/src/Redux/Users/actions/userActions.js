import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  AUTH_CHECK
} from "../constantes/userConstants";

const auth = () => (dispatch) => {
  try {
    dispatch({ type: AUTH_SUCCESS });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.message });
  }
};

const checkauth = () => (dispatch) => {
  dispatch({ type: AUTH_CHECK});
}

const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS});
}

export { auth, logout, checkauth };
