import "./AdminLogin.css";
import Navbar from "../../components/navbar/Navbar";
import CustomButton from "../../components/button/CustomButton";
import CustomTextInput from "../../components/custom-text-input/CustomTextInput";

function AdminLogin(props) {
  return (
    <div className="AdminLogin">
      <section className="Top">
        <Navbar />
      </section>
      <section className="Bottom">
        <div className="LoginCard">
          <header>
            <h1 className="mainHeading">Admin Sign In</h1>
          </header>
          <CustomTextInput
            type="text"
            className="Mobile"
            placeholder="Enter Your Admin ID"
          />
          <CustomTextInput
            type="password"
            className="Mobile"
            placeholder="Enter Your Password"
          />
          <CustomButton>Login</CustomButton>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
