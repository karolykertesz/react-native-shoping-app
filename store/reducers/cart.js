import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../actions/cart";
import { ADD_USER_ORDER } from "../actions/userOrders";
import { DELETE_PRODUCT } from "../actions/products";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  sumItems: 0,
};

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const product = action.product;
      const { price, title } = action.product;

      if (state.items[product.id]) {
        const itemUpdated = new CartItem(
          state.items[product.id].quantity + 1,
          price,
          title,
          price + state.items[product.id].total
        );
        return {
          ...state,
          items: {
            ...state.items,
            [product.id]: itemUpdated,
          },
          sumItems: state.sumItems + price,
        };
      } else {
        const newItem = new CartItem(1, price, title, price);
        return {
          ...state,
          items: {
            ...state.items,
            [product.id]: newItem,
          },
          sumItems: state.sumItems + price,
        };
      }
    case REMOVE_ITEM_FROM_CART:
      const quantityCurrent = state.items[action.id].quantity;
      let newCartItems;
      const selectedProduct = state.items[action.id];
      if (quantityCurrent > 1) {
        const oneCartItem = new CartItem(
          selectedProduct.quantity - 1,
          selectedProduct.price,
          selectedProduct.title,
          selectedProduct.total - selectedProduct.price
        );
        newCartItems = { ...state.items, [action.id]: oneCartItem };
      } else {
        newCartItems = { ...state.items };
        delete newCartItems[action.id];
      }
      return {
        ...state,
        items: newCartItems,
        sumItems: state.sumItems - selectedProduct.price,
      };
    case ADD_USER_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.id]) {
        return state;
      } else {
        const itemUpdated = { ...state.items };
        const totalCar = state.items[action.id].total;
        delete itemUpdated[action.id];
        return {
          ...state,
          items: itemUpdated,
          sumItems: state.sumItems - totalCar,
        };
      }

    default:
      return state;
  }
};

export default Cart;
