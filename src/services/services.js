import axios from "axios";
const baseUrl="http://localhost:3005";

export async function sendRequestRegistration(mobile,password,name,city) {
    const data = await axios.get(baseUrl+"/registrations?name="+name+"&mobile="+mobile);
    if(data.data.length>0) {
        return false;
    }
    const response = await axios.post(baseUrl+"/registrations",{mobile,password,name,city});
    return response;
}