import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  productListReducer,
  productDetailsReducer,
} from "../Products/reducers/productReducers";
import {
  categoryListReducer,
  categoryDetailsReducer,
} from "../Categories/reducers/categoryReducers";
import {
  getCommentReducer
} from "../Review/Reducers/reviewReducer";
import thunk from "redux-thunk";

const initialState = { };
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productEdit: initialState,
  categoryList: categoryListReducer,
  categoryEdit: initialState,
  categoryDetails: categoryDetailsReducer,
  commentList: getCommentReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
