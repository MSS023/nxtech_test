import LoginCard from "../../components/login-card/LoginCard";
import Navbar from "../../components/navbar/Navbar";
import "./UserLogin.css";

function UserLogin(props) {
  return (
    <div className="UserLogin">
      <section className="Top">
        <Navbar />
      </section>
      <section className="Bottom">
        <LoginCard header="Register or Sign In for Vaccination" />
      </section>
    </div>
  );
}

export default UserLogin;
