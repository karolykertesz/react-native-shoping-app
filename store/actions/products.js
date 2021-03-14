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
  return {
    type: CREATE_PRODUCT,
    title,
    description,
    imageUrl,
    price,
  };
};

export const editProduct = (id, title, description, imageUrl) => {
  return {
    type: EDIT_PRODUCT,
    id,
    title,
    description,
    imageUrl,
  };
};
