export const SET_ADMIN = "SET_ADMIN";

export function setAdmin(adminId, password) {
  return { type: SET_ADMIN, adminId, password };
}
