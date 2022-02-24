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
      if (action.adminId) {
        localStorage.setItem(
          "admin",
          JSON.stringify({
            adminID: action.adminId,
            password: action.password,
          })
        );
      }
      else {
        localStorage.removeItem("admin");
      }
      return {
        adminID: action.adminId,
        password: action.password,
        login: login,
      };
    default:
      const exist = JSON.parse(localStorage.getItem("admin"));
      if (exist) {
        return {
          adminID: exist.adminID,
          password: exist.password,
          login: true,
        };
      }
      return state;
  }
}
