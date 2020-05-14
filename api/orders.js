import Order from "../models/order";

const ORDERS_BASE_URL = "https://rn-shop-de6c3.firebaseio.com/orders";
const USER_ID = "u1";

/**
 * Add an Order to the server.
 * @async
 * @param {Order} order The order to add to the server
 * @returns {string} Key value of order created
 */
export const addOrder = async (order) => {
  const { date, items, totalAmount } = order;
  const response = await fetch(`${ORDERS_BASE_URL}/${USER_ID}.json`, {
    body: JSON.stringify({
      date: date.toISOString(),
      items,
      totalAmount,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const responseData = await response.json();

  return responseData.name;
};

/**
 * Fetch all of the orders from the server for a given user.
 * @async
 * @param {string} userId The user id associated to the orders.
 * @returns {array} Returns an array of Orders
 */
export const fetchOrders = async (userId) => {
  const response = await fetch(`${ORDERS_BASE_URL}/${userId}.json`);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  const responseData = await response.json();

  return Object.keys(responseData || {}).map((key) => {
    const { date, items, totalAmount } = responseData[key];

    return new Order(key, items, totalAmount, new Date(date));
  });
};
