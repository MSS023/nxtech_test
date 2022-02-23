import axios from "axios";
const baseUrl = "http://localhost:3005";

export async function sendRequestRegistration(mobile, password, name, city) {
  const data = await axios.get(
    baseUrl + "/registrations?name=" + name + "&mobile=" + mobile
  );
  if (data.data.length > 0) {
    return false;
  }
  const response = await axios.post(baseUrl + "/registrations", {
    mobile,
    password,
    name,
    city,
  });
  return response;
}

export async function adminLogin(adminId, password) {
  const data = await axios.get(
    baseUrl + "/admins?adminId=" + adminId + "&password=" + password
  );
  if (data.data.length > 0) {
    return true;
  }
  return false;
}
