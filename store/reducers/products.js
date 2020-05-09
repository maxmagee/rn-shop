import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      const availableProducts = state.availableProducts.filter(
        (product) => product.id !== action.product.id
      );
      return {
        ...state,
        availableProducts,
        userProducts: availableProducts.filter((product) => product.ownerId === "u1"),
      };
    }
    default:
      return state;
  }
};
