import api from "../../api";

export const ADD_ORDER = "ADD_ORDER";
export const GET_ORDERS = "GET_ORDERS";

/**
 * Add an order to the server
 * @param {Order} order The order to add to the server
 */
export const addOrder = (order) => {
  return async (dispatch) => {
    const orderKey = await api.orders.addOrder(order);
    const orderToAdd = order;

    orderToAdd.id = orderKey;
    dispatch({
      order: orderToAdd,
      type: ADD_ORDER,
    });
  };
};

export const fetchOrders = (userId) => {
  return async (dispatch) => {
    const orders = await api.orders.fetchOrders(userId);

    dispatch({
      orders,
      type: GET_ORDERS,
    });
  };
};
