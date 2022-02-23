import { SET_ADMIN } from "../actions/admin-actions";

const initialState = {
  adminID: null,
  password: null,
  login: false,
};

export function adminReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN:
      const login = action.adminId ? true : false;
      return {
        adminID: action.adminId,
        password: action.password,
        login: login,
      };
    default:
      return state;
  }
}
