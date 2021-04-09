export const ADD_SHIPPING = "ADD_SHIPPING";

export const addShipping = (city, address, zip, country, state) => {
  return function (dispatch, getState) {
    dispatch({ type: ADD_SHIPPING, city, address, zip, country, state });
  };
};
