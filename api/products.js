import Product from "../models/product";

const PRODUCTS_BASE_URL = "https://rn-shop-de6c3.firebaseio.com/products";

/**
 * Add a Product to the server.
 * @async
 * @param {string} product - The product to add to the server
 * @returns {string} Key value of product created
 */
export const addProduct = async (product) => {
  const { description, imageUrl, price, title } = product;
  const response = await fetch(`${PRODUCTS_BASE_URL}.json`, {
    body: JSON.stringify({
      description,
      imageUrl,
      price,
      title,
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
 * Delete a product from the server.
 * @async
 * @param {Product} product The Product to delete from the server
 */
export const deleteProduct = async (product) => {
  const response = await fetch(`${PRODUCTS_BASE_URL}/${product.id}.json`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
};

/**
 * Fetch all of the products from the server.
 * @async
 * @returns {array} Returns an array of Products
 */
export const fetchProducts = async () => {
  const response = await fetch(`${PRODUCTS_BASE_URL}.json`);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  const responseData = await response.json();

  return Object.keys(responseData || {}).map((key) => {
    const { description, imageUrl, price, title } = responseData[key];

    return new Product(key, "u1", title, imageUrl, description, price);
  });
};

/**
 * Update a product on the server with the passed-in data
 * @async
 * @param {Product} product The Product to update on the server
 */
export const updateProduct = async (product) => {
  const { description, id, imageUrl, title } = product;
  const response = await fetch(`${PRODUCTS_BASE_URL}/${id}.json`, {
    body: JSON.stringify({
      description,
      imageUrl,
      title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
};
