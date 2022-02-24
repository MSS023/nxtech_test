import axios from "axios";
const baseUrl = "http://localhost:3005";

export async function sendRequestRegistration(mobile, password, name, state) {
  const data = await axios.get(
    baseUrl + "/registrations?name=" + name + "&mobile=" + mobile
  );
  if (data.data.length > 0 && data.data[0].status!=="rejected") {
    return false;
  }
  const response = await axios.post(baseUrl + "/registrations", {
    status: "pending",
    mobile,
    password,
    name,
    state,
  });
  return response;
}

export async function adminLogin(adminId, password) {
  const data = await axios.get(
    baseUrl + "/administrators?adminId=" + adminId + "&password=" + password
  );
  if (data.data.length > 0) {
    return true;
  }
  return false;
}

export async function getActiveRegistrations(pageNo) {
  const response = await axios.get(
    baseUrl + "/registrations?_page=" + pageNo + "&status=pending"
  );
  return response;
}

export async function getActiveUsers(pageNo) {
  const response = await axios.get(
    baseUrl + "/users" + (pageNo ? "?_page=" + pageNo : "")
  );
  return response;
}

export async function approveRequest(id) {
  const response = await axios.patch(baseUrl + "/registrations/" + id, {
    status: "approved",
  });
  if (!response) {
    return false;
  }
  const post = await axios.post(baseUrl + "/users", {
    name: response.data.name,
    mobile: response.data.mobile,
    password: response.data.password,
    state: response.data.state,
  });
  if (!post) return false;
  let state = await axios.get(baseUrl + "/states?state=" + response.data.state);
  state = await axios.patch(baseUrl + "/states/" + state.data[0].id, {
    num: state.data[0].num + 1,
  });
  if(!state) {
    return false;
  }
  return true;
}

export async function rejectRequest(id) {
  const response = await axios.patch(baseUrl + "/registrations/" + id, {
    status: "rejected",
  });
  if (!response) return false;
  return true;
}

export async function getStates() {
  const response = await axios.get(baseUrl + "/states");
  return response.data;
}

export async function sendRemoveUser(id) {
  const user = await axios.get(baseUrl+"/users/"+id);
  const response = await axios.delete(baseUrl+"/users/"+id);
  if(!response)
    return false;
  const state = await axios.get(baseUrl+"/states?state="+user.data.state);
  if(!state)
    return false;
  const patch = await axios.patch(baseUrl+"/states/"+state.data[0].id,{
    num: state.data.num-1
  })
  console.log(patch);
  return true;
}