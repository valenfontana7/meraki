import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_LIST_FILTER,
} from "../constantes/productConstants";
import axios from "axios";

const listProduct = (keyword) => async (dispatch) => {
  if (!keyword || keyword.length === 1) {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:3002/items/");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    if (!data) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: "se ha producido un error",
      });
    }
  } else if (keyword) {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `http://localhost:3002/item/search?query=${keyword}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    if (!data) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: "se ha producido un error",
      });
    }
  }
};

const filterProduct = (keyword) => (dispatch) => {
  dispatch({ type: PRODUCT_LIST_FILTER, payload: keyword });
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(
      "http://localhost:3002/item/" + productId
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const editProduct = (product) => async (dispatch) => {
  axios
    .put(`http://localhost:3001/item/${product.id}`, {
      name: `${product.name}`,
      description: `${product.description}`,
      category: `${product.category}`,
      price: `${product.price}`,
      img: `${product.img}`,
      stock: `${product.stock}`,
    })
    .then((data) => {
      return data;
    });
  return (window.location = "http://localhost:3000/admin");
};

export { listProduct, detailsProduct, editProduct, filterProduct };
