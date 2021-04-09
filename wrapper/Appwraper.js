import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cart from "../store/reducers/cart";
import App from "../App";
import AuthReducer from "../store/reducers/auth";
import ProductReducer from "../store/reducers/products";
import UserOrders from "../store/reducers/UserOrder";
import Shipping from "../store/reducers/shipping";
import { composeWithDevTools } from "redux-devtools-extension";
import { registerRootComponent } from "expo";

const reducers = combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  cart: Cart,
  orders: UserOrders,
  shipping: Shipping,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
export default Appwrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(Appwrapper);
