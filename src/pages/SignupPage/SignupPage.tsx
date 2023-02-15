import { useRef, useState } from "react";
// import "./SignupPage.scss";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/FirebaseContext";

function SignupPage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const { signUp, updateUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>();

  const storage = getStorage();
  let navigate = useNavigate();

  const submitHandler = async (e: any) => {
    e.preventDefault();

    signUp(emailRef.current!.value, passwordRef.current!.value)
      .then(async (userCredential: any) => {
        const user = userCredential.user;
        await updateUser(nameRef.current!.value);
        // uploadBytes(avatarRef, uploadAvatar!).then(async (snapshot) => {
        //   // const newUser: User = {
        //   //   id: user.uid,
        //   //   displayName: nameRef.current!.value,
        //   //   email: emailRef.current!.value,
        //   // };

        //   // await updateUser(newUser.displayName, newUser.avatar);

        // })
        navigate("/challenge");
      })

      .catch((error: any) => {
        const errorCode = error.code;
        // const errorMessage = error.message;

        if (errorCode === "auth/weak-password") {
          setErrorMessage("Password needs to be at least 6 characters");
        } else if ("auth/email-already-in-use") {
          setErrorMessage("Email already in use");
        } else {
          setErrorMessage("Error Logging In");
        }
      });
  };

  return (
    <form
      className="signup"
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <div className="signup__form-container">
        <h1 className="signup__title">Sign Up</h1>
        <p className="signup__text">{errorMessage}</p>

        <div className="signup__input-section">
          <label className="signup__label">Email</label>
          <input className="signup__input" ref={emailRef} type="email" placeholder="Email" required />
        </div>

        <div className="signup__input-section">
          <label className="signup__label">Password</label>
          <input className="signup__input" ref={passwordRef} type="password" placeholder="Password" required />
        </div>

        <div className="signup__input-section">
          <label className="signup__label">Name</label>
          <input className="signup__input" ref={nameRef} type="text" placeholder="Name" required />
        </div>

        <button className="signup__button">Create Account</button>
      </div>
    </form>
  );
}

export default SignupPage;
