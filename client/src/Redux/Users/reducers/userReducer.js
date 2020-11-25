import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DELETE_SUCCESS,
  USER_MAKE_ADMIN,
} from "../constantes/userConstants";

function userListReducer(state = { users: [] }, action) {
  const filter = (el) => {
    return el.id !== action.payload;
  };
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_SUCCESS:
      return (state = { users: state.users.filter(filter) });
    case USER_MAKE_ADMIN:
      const oldUser = state.users.find((user) => user.id === action.payload);
      const newUser = oldUser;
   return {
        users: state.users.map((user) => {
          if(oldUser.rol === "user"){
            newUser.rol = "admin";
          } else {
            newUser.rol = "user"
          }
          return user.id === oldUser.id ? newUser : user;
        }), 
      }; 
    default:
      return state;
  } 
}

function userDetailsReducer(state = { userDet: [] }, action) {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loadingUserDet: true };
    case USER_DETAILS_SUCCESS:
      return { loadingUserDet: false, userDet: action.payload };
    case USER_DETAILS_FAIL:
      return { loadingUserDet: false, errorUserDet: action.payload };
    default:
      return state;
  }
}

export { userListReducer, userDetailsReducer };
