import React from "react";
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

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

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

    // const { email, password } = state;
    // alert(`You are login with email: ${email} and password: ${password}`);

    // for (const key in state) {
    //   setState({
    //     ...state,
    //     [key]: ""
    //   });
    // }
  };

  return (
    <div className="form-container sign-in-container">
      <ToastContainer />
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          {/* <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a> */}
        </div>
        {/* <span>or use your account</span> */}
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={state.userName}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
