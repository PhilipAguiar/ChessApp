import { useRef, useState } from "react";
import { useAuth } from "../../contexts/FirebaseContext";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login } = useAuth();
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>();

  const submitHandler = (e: any) => {
    e.preventDefault();

    login(emailRef.current!.value, passwordRef.current!.value)
      .then(() => {
        navigate("/challenge");
      })
      .catch((error: any) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setErrorMessage("Error Logging In");
      });
  };

  return (
    <form
      className="login"
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <div className="login__form-container">
        <h1 className="login__title">Login</h1>
        <p className="login__text">{errorMessage}</p>

        <div className="login__input-section">
          <label className="login__label">Email</label>
          <input className="login__input" ref={emailRef} type="email" placeholder="Email" autoComplete="on" required />
        </div>

        <div className="login__input-section">
          <label className="login__label">Password</label>
          <input className="login__input" ref={passwordRef} type="password" placeholder="Password" autoComplete="off" required />
        </div>
        <button className="login__button">Login</button>

        <p className="login__text">Don't have an account?</p>
        <Link className="login__text" to={"/signup"}>
          Sign Up!
        </Link>
      </div>
    </form>
  );
}

export default LoginPage;
