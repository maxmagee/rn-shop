export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (product) => {
  return {
    product,
    type: ADD_TO_CART,
  };
};
