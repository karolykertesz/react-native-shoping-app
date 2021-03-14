import PRODUCTS from "../../data/4.1 dummy-data";
import { Product } from "../../models/productModels";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
} from "../actions/products";

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
    case CREATE_PRODUCT:
      const addingProduct = new Product(
        new Date().toString(),
        "u1",
        action.title,
        action.imageUrl,
        action.description,
        action.price
      );
      return {
        ...state,
        Allproducts: state.Allproducts.concat(addingProduct),
        userProduct: state.userProduct.concat(addingProduct),
      };
    case EDIT_PRODUCT:
      const edi = state.userProduct.findIndex((item) => item.id === action.id);

      const updatedPr = new Product(
        action.id,
        state.Allproducts[edi].ownerId,
        action.title,
        action.imageUrl,
        action.description,
        state.Allproducts[edi].price
      );
      const updatedAllPr = [...state.Allproducts];
      updatedAllPr[edi] = updatedPr;
      const userEdi = state.userProduct.findIndex(
        (item) => item.id === action.id
      );
      const updatedUserPr = [...state.userProduct];
      updatedUserPr[userEdi] = updatedPr;
      return {
        ...state,
        Allproducts: updatedAllPr,
        userProduct: updatedUserPr,
      };

    default:
      return state;
  }
};

export default ProductReducer;
