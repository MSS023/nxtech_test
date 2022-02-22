import CustomTextInput from "../../custom-text-input/CustomTextInput";
import CustomButton from "../button/CustomButton";
import "./LoginCard.css";

function LoginCard(props) {
  return (
    <div className="LoginCard">
      <header>
        <h1 className="mainHeading">{props.header}</h1>
        <p>An OTP will be sent to your mobile number for verification</p>
        <CustomTextInput type="number" className="Mobile" placeholder="Enter Your Mobile Phone" />
        <CustomButton>Get OTP</CustomButton>
        <p className="SignInFooter">
          By Sign In/Registration, I agree to the{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </header>
    </div>
  );
}

export default LoginCard;
