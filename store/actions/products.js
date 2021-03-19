export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id,
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  fetch("https://rn-shopping.herokuapp.com/products", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      url: imageUrl,
      price,
    }),
  })
    .then((response) => console.log(response))
    .catch((e) => console.log(e));
  return (dispatch) => {
    dispatch({
      type: CREATE_PRODUCT,
      title,
      description,
      imageUrl,
      price,
    });
  };
};

export const editProduct = (id, title, description, imageUrl) => {
  fetch("http://192.168.0.121:3001/products", { method: "GET" })
    .then((response) => response.json())
    .then((res) => console.log(res));
  return {
    type: EDIT_PRODUCT,
    id,
    title,
    description,
    imageUrl,
  };
};
