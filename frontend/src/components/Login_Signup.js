import React, { useState } from "react";
import '../login.css';  // Ensure the correct path to the CSS

const LoginComponent = ({ initialMode, onSubmit }) => {
  const [mode, setMode] = useState(initialMode);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
  };

  return (
    <div>
      <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} ></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
          <h1>{mode === "login" ? "Welcome back!" : "Sign up"}</h1>
          <div className="form-block__toggle-block">
            <span>{mode === "login" ? "Don't" : "Already"} have an account? Click here →</span>
            <input id="form-toggler" type="checkbox" onClick={toggleMode} />
            <label htmlFor="form-toggler"></label>
          </div>
        </header>
        <LoginForm mode={mode} onSubmit={onSubmit} />
      </section>
    </div>
  );
};

const LoginForm = ({ mode, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-block__input-wrapper">
        <div className="form-group form-group--login">
          <Input type="text" id="username" label="User Name" disabled={mode === "signup"} />
          <Input type="password" id="password" label="Password" disabled={mode === "signup"} />
        </div>
        <div className="form-group form-group--signup">
          <Input type="text" id="fullname" label="Full Name" disabled={mode === "login"} />
          <Input type="email" id="email" label="Email" disabled={mode === "login"} />
          <Input type="password" id="createpassword" label="Password" disabled={mode === "login"} />
          <Input type="password" id="repeatpassword" label="Repeat Password" disabled={mode === "login"} />
        </div>
      </div>
      <button className="button button--primary full-width" type="submit">
        {mode === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
};

const Input = ({ id, type, label, disabled }) => (
  <input className="form-group__input" type={type} id={id} placeholder={label} disabled={disabled} />
);

const Login_Signup = () => {
  return (
    <div className={`app app--is-login`}>
      <LoginComponent initialMode="login" onSubmit={() => console.log("submit")} />
    </div>
  );
};

export default Login_Signup;  
