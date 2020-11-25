import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDERPRODUCT_LIST_REQUEST,
  ORDERPRODUCT_LIST_SUCCESS,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_STATUS
} from "../constantes/cartConstant";
import Cookie from "js-cookie";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/products/${productId}`
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data.id,
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        stock: data.stock,
        img: data.img,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const fetchOrders = (id) => async (dispatch) => {
 
    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await axios.get(
      `http://localhost:3001/users/${id}/orders`
    );
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  
};

const fetchAllOrders = (status) => async (dispatch) => {
  if (status === "todos") {
   dispatch({ type: ORDER_LIST_ALL_REQUEST });
    const { data } = await axios.get(
      `http://localhost:3001/users/orders`
    );
    dispatch({
      type: ORDER_LIST_ALL_SUCCESS,
      payload: data,
    });}
    if(status === "pendiente") {
      dispatch({ type: ORDER_LIST_ALL_REQUEST });
    const { data } = await axios.get(
      `http://localhost:3001/users/orders/search?query=${status}`
    );
    dispatch({
      type: ORDER_LIST_ALL_SUCCESS,
      payload: data,
    });
    } 
    if (status === "confirmado"){
      dispatch({ type: ORDER_LIST_ALL_REQUEST });
    const { data } = await axios.get(
      `http://localhost:3001/users/orders/search?query=${status}`
    );
    dispatch({
      type: ORDER_LIST_ALL_SUCCESS,
      payload: data,
    });
    } 
    
};

const fetchOrderProducts = () => async (dispatch) => {

    dispatch({ type: ORDERPRODUCT_LIST_REQUEST});
    const {data } = await axios.get(
      `http://localhost:3001/orders/`
      );
      dispatch({
        type: ORDERPRODUCT_LIST_SUCCESS,
        payload: data,
      });
  
};

const getOrders = (orders) => {
  return {
    type: ORDER_LIST_SUCCESS,
    orders,
  };
};

const statusconfirm = (orderId) => (dispatch) => {
  dispatch({ type: ORDER_STATUS, payload: orderId });
};

const cancelOrder = (user, order) => async (dispatch) => {
  await axios
    .delete(`http://localhost:3001/users/${user}/orders/${order}`, {
     
    })
    .then((res) => {
      return res;
    });

};

export { addToCart, removeFromCart, getOrders, fetchOrders, fetchOrderProducts, fetchAllOrders, statusconfirm, cancelOrder };
