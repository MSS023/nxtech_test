import "./AdminLogin.css";
import Navbar from "../../components/navbar/Navbar";
import CustomButton from "../../components/button/CustomButton";
import CustomTextInput from "../../components/custom-text-input/CustomTextInput";
import { useState } from "react";
import { adminLogin } from "../../services/services";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../store/actions/admin-actions";

function AdminLogin(props) {
  const [adminID, setAdminID] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  function validateAdmnID(value) {
    if (value.length === 0) return false;
    return true;
  }
  function validatePassword(value) {
    if (value.length < 8) return false;
    return true;
  }
  async function handleLogin() {
    if (validateAdmnID(adminID) && validatePassword(password)) {
      const login = await adminLogin(adminID,password);
      if(login) {
        dispatch(setAdmin(adminID,password));
      }
      else {
        alert("You have entered username/password combination")
      }
    }
  }
  return (
    <div className="AdminLogin">
      <section className="Top">
        <Navbar buttons={[]} />
      </section>
      <section className="AdminBottom">
        <div className="LoginCard">
          <header>
            <h1 className="mainHeading">Admin Sign In</h1>
          </header>
          <CustomTextInput
            type="text"
            className="Mobile"
            placeholder="Enter Your Admin ID"
            validation={validateAdmnID}
            onChange={setAdminID}
            errorText={"Enter correct adminId"}
          />
          <CustomTextInput
            type="password"
            className="Mobile"
            placeholder="Enter Your Password"
            validation={validatePassword}
            onChange={setPassword}
            errorText={"Enter at least 8 characters."}
          />
          <CustomButton onClick={handleLogin}>Login</CustomButton>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
