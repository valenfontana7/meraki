import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDERPRODUCT_LIST_REQUEST,
  ORDERPRODUCT_LIST_SUCCESS,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_LIST_ALL_REQUEST,
  ORDER_STATUS
} from "../constantes/cartConstant";

function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
}

function orderReducer(state = { orders: [] }, action) {
  // const filter = (el) => {
  //   return el.id !== action.payload;
  // };
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { orders: action.payload, loading: false };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function allOrderReducer(state = { allorders: [] }, action) {
  // const filter = (el) => {
  //   return el.id !== action.payload;
  // };
  switch (action.type) {
    case ORDER_LIST_ALL_REQUEST:
      return { loading: true };
    case ORDER_LIST_ALL_SUCCESS:
      return { allorders: action.payload, loading: false };
    case ORDER_STATUS:
      const oldOrder = state.allorders.find((allorder) => allorder.id === action.payload);
      const newOrder = oldOrder;
   return {
        allorders: state.allorders.map((allorder) => {
          if(oldOrder.status === "pendiente"){
            newOrder.status = "confirmado";
          } else {
            newOrder.status = "pendiente"
          }
          return allorder.id === oldOrder.id ? newOrder : allorder;
        }), 
      }; 
      default:
      return state;
  }
}

function orderproductReducer(state = { orderproducts: []}, action) {
  switch (action.type) {
    case ORDERPRODUCT_LIST_REQUEST:
      return { loading: true };
    case ORDERPRODUCT_LIST_SUCCESS:
      return {orderproducts: action.payload, loading: false};  
      default:
        return state;
  }
}

export { cartReducer, orderReducer, orderproductReducer, allOrderReducer };
