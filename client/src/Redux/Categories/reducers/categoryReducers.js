import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DELETE_SUCCESS,
} from "../constantes/categoryConstants";

function categoryListReducer(state = { categories: [] }, action) {
  const filter = (el) => {
    return el.category_id !== action.payload;
  };
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loadingCat: true };
    case CATEGORY_LIST_SUCCESS:
      return { loadingCat: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loadingCat: false, errorCat: action.payload };
    case CATEGORY_DELETE_SUCCESS:
      return (state = { categories: state.categories.filter(filter) });
    default:
      return state;
  }
}

function categoryDetailsReducer(state = { categoryDet: {} }, action) {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { loadingCatDet: true };
    case CATEGORY_DETAILS_SUCCESS:
      return { loadingCatDet: false, categoryDet: action.payload };
    case CATEGORY_DETAILS_FAIL:
      return { loadingCatDet: false, errorCatDet: action.payload };
    default:
      return state;
  }
}

export { categoryListReducer, categoryDetailsReducer };
