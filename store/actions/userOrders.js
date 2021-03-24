export const ADD_USER_ORDER = "ADD_USER_ORDER";
export const DISPATCH_ORDER = "DISPATCH_ORDER";
export const CANCEL_ORDER = "CANCEL_ORDER";






export const addUserOrder = (items, total) => {
  return {
    type: ADD_USER_ORDER,
    items,
    total,
  };
};

export const cancelOrder = (id) => {
  return {
    type: CANCEL_ORDER,
    id
  };
};
