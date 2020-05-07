import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, price, title } = action.product;
      const getNewState = (cartItem) => {
        return {
          ...state,
          items: {
            ...state.items,
            [id]: cartItem,
          },
          totalAmount: state.totalAmount + price,
        };
      };

      if (state.items[id]) {
        const updatedCartItem = new CartItem(
          state.items[id].quantity + 1,
          price,
          title,
          state.items[id].sum + price
        );

        return getNewState(updatedCartItem);
      }

      const newCartItem = new CartItem(1, price, title, price);

      return getNewState(newCartItem);
    }
    default:
      return state;
  }
};
