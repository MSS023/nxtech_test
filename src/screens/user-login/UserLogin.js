import CustomButton from "../../components/button/CustomButton";
import CustomTextInput from "../../components/custom-text-input/CustomTextInput";
import Navbar from "../../components/navbar/Navbar";
import "./UserLogin.css";
import { useState } from "react";
import { sendRequestRegistration } from "../../services/services";

function UserLogin(props) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [next, setNext] = useState(false);
  function validateNumber(value) {
    if (value.length !== 10) return false;
    return true;
  }
  function validatePassword(value) {
    if (value.length < 8) return false;
    return true;
  }
  function validateConfirmPassword(value) {
    if (value.length === 0 || value !== password) {
      return false;
    }
    return true;
  }
  function validateName(value) {
    if (value.length === 0) {
      return false;
    }
    return true;
  }
  function validateCity(value) {
    if (value.length === 0) {
      return false;
    }
    return true;
  }
  function handleNext() {
    if (
      validateNumber(mobile) &&
      validatePassword(password) &&
      validateConfirmPassword(confimPassword)
    ) {
      setNext(true);
      return;
    }
    setNext(false);
  }
  async function handleRequest() {
    if(validateName(name) && validateCity(city))
    {
      const response = await sendRequestRegistration(mobile,password,name,city);
      if(response) {
        alert("Registration Request Made");
      }
      else {
        alert("User Already Exist");
      }
    }
  }

  return (
    <div className="UserLogin">
      <section className="Top">
        <Navbar />
      </section>
      <section className={"Bottom " + (!next ? "" : "hidden")}>
        <div className="LoginCard">
          <header>
            <h1 className="mainHeading">Register or Sign In</h1>
          </header>
          <CustomTextInput
            type="number"
            className="Mobile"
            placeholder="Enter Your Mobile Phone"
            validation={validateNumber}
            onChange={setMobile}
            errorText={"Enter Correct Number"}
          />
          <p>Please generate a password corresponding to the number</p>
          <CustomTextInput
            type="password"
            className="Mobile"
            placeholder="Enter Your Password"
            validation={validatePassword}
            onChange={setPassword}
            errorText={"Enter at least 8 characters"}
          />
          <CustomTextInput
            type="password"
            className="Mobile"
            placeholder="Confirm Your Password"
            validation={validateConfirmPassword}
            onChange={setConfirmPassword}
            errorText={"Password doesn't match"}
          />
          <CustomButton onClick={handleNext}>Next</CustomButton>
        </div>
      </section>
      <section className={"Bottom " + (!next ? "hidden" : "")}>
        <div className="LoginCard">
          <header>
            <h1 className="mainHeading">Please Enter Your Details</h1>
          </header>
          <CustomTextInput
            type="text"
            className="Mobile"
            placeholder="Name"
            validation={validateName}
            onChange={setName}
            errorText={"Please Enter Name"}
          />
          <CustomTextInput
            type="text"
            className="Mobile"
            placeholder="City"
            validation={validateCity}
            onChange={setCity}
            errorText={"Please Enter Your State"}
          />
          <CustomButton onClick={handleRequest}>Request to Register</CustomButton>
          <p className="SignInFooter">
            By Registration, I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default UserLogin;
