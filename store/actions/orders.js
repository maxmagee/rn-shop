export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => {
  return {
    orderData: { cartItems, totalAmount },
    type: ADD_ORDER,
  };
};
