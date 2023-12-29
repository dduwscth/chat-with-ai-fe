import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    userName: "",
    name: "",
    password: "",
    confirmPassword: ""
  });

  const [nameError, setNameError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');


  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    if (!state.name) {
      formIsValid = false;
      setNameError('Please enter your name');
    }
    if (!state.userName) {
      formIsValid = false;
      setUserNameError('Please enter your username');
    }

    if (!state.password) {
      formIsValid = false;
      setPasswordError('Please enter your password');
    }
    if (!state.confirmPassword) {
      formIsValid = false;
      setConfirmPasswordError('Please enter your confirm password');
    }
    return formIsValid;
  }

  const handleOnSubmit = evt => {
    evt.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios.post('/api/user/regis', {
      username: state.userName,
      name: state.name,
      password: state.password,
      confirm_password: state.confirmPassword
    })
      .then(function (response) {
        console.log(response);
        toast.success(response.data.result);

        setInterval(() => {
          window.location.reload();
        }, 2000);


      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.detail);
      });

  };

  return (
    <div className="form-container sign-up-container">
      <ToastContainer />
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>


        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {nameError && <div className="errorMsg" style={{ color: "red" }}>{nameError}</div>}
        <input
          type="text"
          name="userName"
          value={state.userName}
          onChange={handleChange}
          placeholder="Username"
        />
        {userNameError && <div className="errorMsg" style={{ color: "red" }}>{userNameError}</div>}
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {passwordError && <div className="errorMsg" style={{ color: "red" }}>{passwordError}</div>}
        <input
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {confirmPasswordError && <div className="errorMsg" style={{ color: "red" }}>{confirmPasswordError}</div>}
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
