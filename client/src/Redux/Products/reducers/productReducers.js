import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  //PRODUCT_LIST_FILTER,
} from "../constantes/productConstants";

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // case PRODUCT_LIST_FILTER:
    //   return {
    //     products: state.products.filter(
    //       (product) =>
    //         product.name.includes(action.payload) ||
    //         product.description.includes(action.payload)
    //     ),
    //   };
    default:
      return state;
  }
}

function productDetailsReducer(state = { productDet: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loadingDet: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loadingDet: false, productDet: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loadingDet: false, errorDet: action.payload };
    default:
      return state;
  }
}

export { productListReducer, productDetailsReducer };
