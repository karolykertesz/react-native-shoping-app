import { LOGIN, SIGN_UP } from "../actions/auth";

const initialState = {
  token: null,
  uid: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        token: action.accesToken,
        uid: action.uid,
      };
    case LOGIN:
      return {
        token: action.accesToken,
        uid: action.uid,
      };
    default:
      return state;
  }
};

export default authReducer;
