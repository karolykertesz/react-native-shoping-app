import PRODUCTS from "../../data/4.1 dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initial_state = {
  Allproducts: PRODUCTS,
  userProduct: PRODUCTS.filter((item) => {
    return item.ownerId === "u1";
  }),
};

const ProductReducer = (state = initial_state, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProduct: state.userProduct.filter((item) => item.id !== action.id),
        Allproducts: state.Allproducts.filter((item) => item.id !== action.id),
      };

    default:
      return state;
  }
};

export default ProductReducer;
