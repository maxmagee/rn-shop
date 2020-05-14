import { ADD_ORDER } from "../actions/orders";

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
    default:
      return state;
  }
};
