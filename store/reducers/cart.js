import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/cart";
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
    case CLEAR_CART: {
      return { ...initialState };
    }
    case REMOVE_FROM_CART: {
      const updatedCartItems = { ...state.items };

      if (state.items[action.cartItem.productId].quantity > 1) {
        updatedCartItems[action.cartItem.productId].quantity -= 1;
      } else {
        delete updatedCartItems[action.cartItem.productId];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - action.cartItem.productPrice,
      };
    }
    default:
      return state;
  }
};
