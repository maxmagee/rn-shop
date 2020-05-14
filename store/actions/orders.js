import api from "../../api";

export const ADD_ORDER = "ADD_ORDER";

/**
 *
 * @param {Order} order The order to add to the server
 */
export const addOrder = (order) => {
  return async (dispatch) => {
    const orderKey = await api.orders.addOrder(order);

    dispatch({
      orderData: { ...order, id: orderKey },
      type: ADD_ORDER,
    });
  };
};
