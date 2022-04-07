import { ReactComponent as Logo } from "../static/icons/logo.svg";
import "./sign-in.scss";

const SignIn = () => (
  <div className="sign-in">
    <div className="sign-in-container">
      <div className="sign-in-animation">
        <div
          className="sign-in-animation-shape sign-in-animation-circle"
          style={{ backgroundColor: "#b96ac5", animationDelay: "0ms" }}
        />
        <div
          className="sign-in-animation-shape"
          style={{ backgroundColor: "#252525", animationDelay: "200ms" }}
        />
        <div
          className="sign-in-animation-shape sign-in-animation-triangle"
          style={{ animationDelay: "400ms" }}
        />
      </div>
      <div className="sign-in-logo">
        <Logo />
      </div>
      <a
        role={"button"}
        className="sign-in-button"
        href="http://localhost:4000/login"
      >
        Login
      </a>
      <div className="sign-in-animation sign-in-animation-bottom">
        <div
          className="sign-in-animation-shape sign-in-animation-triangle"
          style={{ animationDelay: "400ms" }}
        />

        <div
          className="sign-in-animation-shape"
          style={{ backgroundColor: "#252525", animationDelay: "200ms" }}
        />
        <div
          className="sign-in-animation-shape sign-in-animation-circle"
          style={{ backgroundColor: "#b96ac5", animationDelay: "0ms" }}
        />
      </div>
    </div>
  </div>
);

export default SignIn;
