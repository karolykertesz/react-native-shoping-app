import { LOGIN, SIGN_UP, LOG_OUT } from "../actions/auth";

const initialState = {
  token: null,
  uid: null,
  isGoogle: false,
  isAdmin: false,
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        token: action.accesToken,
        uid: action.uid,
        isGoogle: action.isGoogle,
        email: action.email,
      };
    case LOGIN:
      return {
        token: action.accesToken,
        uid: action.uid,
        isGoogle: action.isGoogle,
        isAdmin: action.isAdmin,
        email: action.email,
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default AuthReducer;
