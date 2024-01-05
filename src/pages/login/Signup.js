import React ,{ useState } from "react";
import { Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
function Signup(){
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
    
    return(
        <div className="bg-[#161A30] h-fit">
               <ToastContainer />
        <div className=" my-auto max-w-[600px] mx-auto h-auto">
            <div className="flex flex-col items-center justify-center min-h-screen gap-3 w-full py-4">
                <div className="border rounded-full border-gray-800 py-5 text-2xl text-center bg-white w-full text-gray-800 uppercase font-semibold">
                            dhs-chat
                    </div>
                    <div className="w-full max-w-xs uppercase text-white text-4xl font-semibold text-center my-9">
                        CHAT WITH AI
                    </div>
                   
                    <input type="text" name="name" className={`p-4 border-2 rounded-full w-full outline-none ${nameError ? 'border-red-600' : ''}`} placeholder="Name..."
                        value={state.name} onChange={handleChange}
                    />
                    {nameError && <div className="text-red-600 italic text-sm">{nameError}</div>}
                   
                    <input type="text" name="userName" className={`p-4 border-2 rounded-full w-full outline-none ${userNameError ? 'border-red-600' : ''}`} placeholder="Username..."
                        value={state.userName} onChange={handleChange}
                    />
                    {userNameError && <div className="text-red-600 italic text-sm">{userNameError}</div>}

                    <input type="password" name="password" className={`p-4 border-2 rounded-full w-full outline-none ${passwordError ? 'border-red-600' : ''}`} placeholder="Password..."
                        value={state.password} onChange={handleChange}
                    />
                    {passwordError && <div className="text-red-600 italic text-sm">{passwordError}</div>}
                    
                    <input type="password" name="confirmPassword"className={`p-4 border-2 rounded-full w-full outline-none ${confirmPasswordError ? 'border-red-600' : ''}`} placeholder="Confirm Password..."
                        value={state.confirmPassword} onChange={handleChange}
                    />
                    {confirmPasswordError && <div className="text-red-600 italic text-sm">{confirmPasswordError}</div>}
                    <button className="uppercase text-white text-xl text-center border rounded-lg bg-[#31304D] w-full py-4 border-transparent mt-12 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105"
                        onClick={handleOnSubmit}
                    >
                        sign up
                    </button>     
                    <span className="uppercase text-white text-xl">or</span> 
                       <Link to={'/login'} className="uppercase text-white text-xl text-center border rounded-lg bg-[#31304D] w-full py-4 border-transparent transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
                       login into your account
                       </Link>
            </div>
        </div>
    </div>
    );
}
export default Signup;