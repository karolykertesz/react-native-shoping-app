export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const FETCH_FROM_DB = "FETCH_FROM_DB";
import axios from "axios";
import { Product } from "../../models/productModels";

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id,
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const request = await axios({
      method: "POST",
      url: "https://rn-shopping.herokuapp.com/products",
      data: {
        title,
        description,
        url: imageUrl,
        price,
      },
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: CREATE_PRODUCT,
      id: request.data["pid"],
      title,
      description,
      imageUrl,
      price,
    });
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

export const fetchFromDb = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-shopping.herokuapp.com/productsget"
    );
    const dt = await response.json();
    console.log(dt);
    const data = [];
    console.log(data);

    for (let key in dt) {
      data.push(
        new Product(
          dt["pid"],
          "u1",
          dt["title"],
          dt["url"],
          dt["description"],
          dt["price"]
        )
      );
    }
    dispatch({ type: FETCH_FROM_DB, products: data });
  };
};
