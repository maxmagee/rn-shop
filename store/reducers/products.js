import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, UPDATE_PRODUCT, ADD_PRODUCT, SET_PRODUCTS } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      const updatedAvailableProducts = state.availableProducts.concat(action.product);

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedAvailableProducts.filter((product) => product.ownerId === "u1"),
      };
    }
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
    case SET_PRODUCTS: {
      const fetchedProducts = action.products;
      return {
        ...state,
        availableProducts: fetchedProducts,
        userProducts: fetchedProducts.filter((product) => product.ownerId === "u1"),
      };
    }
    case UPDATE_PRODUCT: {
      const indexOfProductToUpdate = state.availableProducts.indexOf(
        (product) => product.id === action.product.id
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[indexOfProductToUpdate] = action.product;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedAvailableProducts.filter((product) => product.ownerId === "u1"),
      };
    }
    default:
      return state;
  }
};
