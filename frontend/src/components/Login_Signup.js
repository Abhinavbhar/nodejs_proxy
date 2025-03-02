import React, { useState } from "react";
import axios from "axios";
import "../login.css";  // Ensure the correct path to the CSS
import { useNavigate } from "react-router";


const API_URL = process.env.REACT_APP_BACKEND_URL;  // Read backend URL from .env

const LoginComponent = ({ initialMode }) => {
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
        <LoginForm mode={mode} />
      </section>
    </div>
  );
};

const LoginForm = ({ mode }) => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    createpassword: "",
    repeatpassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let response;
      if (mode === "login") {
        response = await axios.post(`${API_URL}/api/login`, {
          email: formData.username,
          password: formData.password,
        });
        console.log(response)
        localStorage.setItem("token", response.data.token); // Store token
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        if (formData.createpassword !== formData.repeatpassword) {
          setError("Passwords do not match!");
          alert("Passwords do not match!"); // Added alert
          return;
        }

        response = await axios.post(`${API_URL}/api/signup`, {
          email: formData.email,
          password: formData.createpassword,
        });
        
        localStorage.setItem("token", response.data.token); // Store token
        alert("Signup successful!");
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      setError(errorMessage);
      console.log(err)
      alert(errorMessage); // Show error alert
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-block__input-wrapper">
        {mode === "login" ? (
          <div className="form-group form-group--login">
            <Input type="text" id="username" label="User Name" value={formData.username} onChange={handleChange} />
            <Input type="password" id="password" label="Password" value={formData.password} onChange={handleChange} />
          </div>
        ) : (
          <div className="form-group form-group--signup">
            <Input type="email" id="email" label="Email" value={formData.email} onChange={handleChange} />
            <Input type="password" id="createpassword" label="Password" value={formData.createpassword} onChange={handleChange} />
            <Input type="password" id="repeatpassword" label="Repeat Password" value={formData.repeatpassword} onChange={handleChange} />
          </div>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      <button className="button button--primary full-width" type="submit">
        {mode === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
};

const Input = ({ id, type, label, value, onChange }) => (
  <input className="form-group__input" type={type} id={id} placeholder={label} value={value} onChange={onChange} />
);

const Login_Signup = () => {
  return (
    <div className={`app app--is-login`}>
      <LoginComponent initialMode="login" />
    </div>
  );
};

export default Login_Signup;
