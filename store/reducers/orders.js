import { ADD_ORDER, GET_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      return {
        ...state,
        orders: [...state.orders, action.order],
      };
    }
    case GET_ORDERS: {
      return {
        ...state,
        orders: action.orders,
      };
    }
    default:
      return state;
  }
};
