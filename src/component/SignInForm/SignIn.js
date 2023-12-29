import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    userName: "",
    password: ""
  });

  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    if (!state.userName) {
      formIsValid = false;
      setUserNameError('Please enter your username');
    }
    if (!state.password) {
      formIsValid = false;
      setPasswordError('Please enter your password');
    }
    return formIsValid;
  }

  const handleOnSubmit = evt => {
    evt.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios.post('api/user/login', {
      username: state.userName,
      password: state.password
    })
      .then(function (response) {
        console.log(response);
        sessionStorage.setItem('token', response.data.token);
        navigate('/home');

      })
      .catch(function (error) {
        console.log(error);
        toast.error('Login failed');
      });
  };

  return (
    <div className="form-container sign-in-container">
      <ToastContainer />
      <form onSubmit={handleOnSubmit}>
        <h1>Login</h1>
        <div className="social-container">

        </div>

        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={state.userName}
          onChange={handleChange}
        />

        {userNameError && <span className="errorMsg" style={{
          color: 'red',
        }}>{userNameError}</span>}


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        {passwordError && <span className="errorMsg" style={{ color: 'red' }}>{passwordError}</span>}

        <a href="#">Forgot your password?</a>
        <button>Login</button>
      </form >
    </div >
  );
}

export default SignInForm;
