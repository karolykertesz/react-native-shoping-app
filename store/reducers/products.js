import PRODUCTS from "../../data/4.1 dummy-data";

const initial_state = {
  Allproducts: PRODUCTS,
  userProduct: PRODUCTS.filter((item) => {
    item.ownerId === "u1";
  }),
};

const ProductReducer = (state = initial_state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ProductReducer;
