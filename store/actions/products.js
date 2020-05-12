export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const addProduct = (product) => {
  const { title, imageUrl, price, description } = product;
  return async (dispatch) => {
    // any async code you want can go here...
    const response = await fetch("https://rn-shop-de6c3.firebaseio.com/products.json", {
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

    dispatch({
      product: { ...product, id: responseData.name },
      type: ADD_PRODUCT,
    });
  };
};

export const deleteProduct = (product) => {
  return {
    product,
    type: DELETE_PRODUCT,
  };
};

export const updateProduct = (product) => {
  return {
    product,
    type: UPDATE_PRODUCT,
  };
};
