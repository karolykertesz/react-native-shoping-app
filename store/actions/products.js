export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const FETCH_FROM_DB = "FETCH_FROM_DB";
import axios from "axios";
import { Product } from "../../models/productModels";

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const request = await axios({
        method: "POST",
        url: "https://rn-shopping.herokuapp.com/delete",
        data: {
          id,
        },
        headers: { "Content-Type": "application/json" },
      });

      dispatch({
        type: DELETE_PRODUCT,
        id,
      });
    } catch (err) {
      console.log(err);
    }
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
  return async (dispatch) => {
    try {
      const request = await axios({
        method: "POST",
        url: "https://rn-shopping.herokuapp.com/update",
        data: {
          id,
          title,
          description,
          url: imageUrl,
        },
        headers: { "Content-Type": "application/json" },
      });
      if (request.status < 400) {
        dispatch({
          type: EDIT_PRODUCT,
          id,
          title,
          description,
          imageUrl,
        });
      }
    } catch (err) {
      if (err) {
        console.log(err);
        return;
      }
    }
  };
};

export const fetchFromDb = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-shopping.herokuapp.com/productsget"
      );
      if (response) {
        const dt = await response.json();
        const data = await dt.map(
          (item) =>
            new Product(
              item["pid"],
              "u1",
              item["title"],
              item["url"],
              item["description"],
              item["price"]
            )
        );

        dispatch({ type: FETCH_FROM_DB, products: data });
      } else {
        throw new Error("Check for errors!");
      }
    } catch (err) {
      throw err;
    }
  };
};
