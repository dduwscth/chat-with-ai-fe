import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar.js";
import { toast, ToastContainer } from "react-toastify";

function Setting() {

    const token = sessionStorage.getItem("token");

    const [state, setState] = React.useState({
        name: "",
        useName: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        google_api_key: "",
        chatgpt_api_key: "",
    });

    const [initialState, setInitialState] = React.useState({
        google_api_key: "",
        chatgpt_api_key: "",
    });

    let [editGoogleApiKey, setEditGoogleApiKey] = React.useState(true);
    let [editChatgptApiKey, setEditChatgptApiKey] = React.useState(true);

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    // call api get information user
    useEffect(() => {
        axios.get('/api/user/information/detail', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function (response) {
            setState({
                ...state,
                name: response.data.name,
                useName: response.data.username,
                google_api_key: response.data.google_api_key,
                chatgpt_api_key: response.data.chatgpt_api_key,
            });

            setInitialState({
                google_api_key: response.data.google_api_key,
                chatgpt_api_key: response.data.chatgpt_api_key,
            });
        }
        ).catch(function (error) {
            console.log(error);
        }
        );

    }, []);

    // call api update information user

    const handleUpdateInformation = evt => {

        evt.preventDefault();

        if (!handleUserInformationValidate()) {
            return;
        }

        const google_api_key = state.google_api_key === initialState.google_api_key ? "" : state.google_api_key;
        const chatgpt_api_key = state.chatgpt_api_key === initialState.chatgpt_api_key ? "" : state.chatgpt_api_key;

        axios.put('/api/user/information', {
            name: state.name,
            google_api_key: google_api_key,
            chatgpt_api_key: chatgpt_api_key,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function (response) {
            toast.success(response.data.result);
        }).catch(function (error) {
            toast.error(error.response.data.detail);
        });
    };

    const handleUpdatePassword = evt => {

        evt.preventDefault();

        if (!handlePasswordValidate()) {
            return;
        }

        axios.put('/api/user/password', {
            current_password: state.currentPassword,
            password: state.newPassword,
            confirm_password: state.confirmPassword,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function (response) {
            toast.success(response.data.result);
            window.location.reload();
        }).catch(function (error) {
            toast.error(error.response.data.detail);
        });
    };

    const handleGoogleApiKey = () => {
        if (editGoogleApiKey) {
            setState({
                ...state,
                google_api_key: "",
            });
        } else {
            setState({
                ...state,
                google_api_key: initialState.google_api_key,
            });
        }
        setEditGoogleApiKey(!editGoogleApiKey);
        setEditGoogleApiKey(!editGoogleApiKey);
    };

    const handleChatgptApiKey = () => {
        if (editChatgptApiKey) {
            setState({
                ...state,
                chatgpt_api_key: "",
            });
        } else {
            setState({
                ...state,
                chatgpt_api_key: initialState.chatgpt_api_key,
            });
        }
        setEditChatgptApiKey(!editChatgptApiKey);
    };

    //   handle validate user information
    const handleUserInformationValidate = () => {
        let formIsValid = true;
        if (!state.name) {
            formIsValid = false;
            toast.error('Please enter your name');
        }
        return formIsValid;
    }

    const handlePasswordValidate = () => {
        let formIsValid = true;
        if (!state.currentPassword) {
            formIsValid = false;
            toast.error('Please enter your current password');
        }
        if (!state.newPassword) {
            formIsValid = false;
            toast.error('Please enter your new password');
        }
        if (!state.confirmPassword) {
            formIsValid = false;
            toast.error('Please enter your confirm password');
        }
        if (state.newPassword !== state.confirmPassword) {
            formIsValid = false;
            toast.error('Confirm password does not match');
        }
        return formIsValid;
    }

    return (
        <div className="bg-[#161A30] max-h-screen h-screen p-2">
            <Navbar />
            <ToastContainer />
            <div className="h-full pt-[70px] w-full">
                <div className="border rounded-3xl bg-[#D9D9D9] px-[250px] py-[100px] h-full flex gap-4 justify-between">
                    <div className="w-6/12 flex flex-col gap-3">
                        {/* //////////////////////////////////// */}
                        <label className="text-gray-700 text-sm font-semibold uppercase">
                            google api key
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                className="border rounded-full border-transparent px-4 py-2 w-full disabled:opacity-75 disabled:cursor-not-allowed"
                                type="text"
                                name="google_api_key"
                                value={state.google_api_key}
                                placeholder="google api key"
                                disabled={editGoogleApiKey}
                                onChange={handleChange}
                            />
                            <button onClick={handleGoogleApiKey} className="bg-[#31304D] w-[100px] px-6 py-2 border rounded-full text-center text-white hover:bg-[#161A30]">
                                {editGoogleApiKey ? "Edit" : "Cancel"}
                            </button>
                        </div>
                        {/* //////////////////////////////////// */}
                        <label className="text-gray-700 text-sm font-semibold uppercase">
                            chatgpt api key
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                className="border rounded-full border-transparent px-4 py-2 w-full disabled:opacity-75 disabled:cursor-not-allowed"
                                type="text"
                                name="chatgpt_api_key"
                                value={state.chatgpt_api_key}
                                placeholder="chatgpt api key"
                                disabled={editChatgptApiKey}
                                onChange={handleChange}
                            />
                            <button onClick={handleChatgptApiKey} className="bg-[#31304D] w-[100px] px-6 py-2 border rounded-full text-center text-white hover:bg-[#161A30]">
                                {editChatgptApiKey ? "Edit" : "Cancel"}
                            </button>
                        </div>
                        {/* //////////////////////////////////// */}
                        <label className="text-gray-700 text-sm font-semibold uppercase">
                            Your name
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                className="border rounded-full border-transparent px-4 py-2 w-full disabled:opacity-75 disabled:cursor-not-allowed"
                                type="text"
                                name="name"
                                value={state.name}
                                placeholder="Your name"
                                onChange={handleChange}
                            />
                            <button className="bg-[#31304D] w-[100px] px-6 py-2 border rounded-full text-center text-white invisible hover:bg-[#161A30]">

                            </button>
                        </div>
                        {/* //////////////////////////////////// */}
                        <div className="flex justify-center mt-4">
                            <button onClick={handleUpdateInformation} className="bg-[#31304D] px-6 py-3 border rounded-full text-center text-white justify-self-center hover:bg-[#161A30]">
                                Update information
                            </button>
                        </div>
                    </div>

                    <div className="w-4/12 flex flex-col gap-3">

                        <label htmlFor="current-pwd-ke" className="text-gray-700 text-sm font-semibold uppercase">
                            current password
                        </label>
                        <input
                            className="border rounded-full border-transparent px-4 py-2 w-full disabled:opacity-75 disabled:cursor-not-allowed"
                            id="current-pwd-ke"
                            type="password"
                            name="currentPassword"
                            value={state.currentPassword}
                            placeholder="current password"
                            onChange={handleChange}
                        />
                        {/* //////////////////////////////////// */}
                        <label htmlFor="new-pwd-ke" className="text-gray-700 text-sm font-semibold uppercase">
                            new password
                        </label>
                        <input
                            className="border rounded-full border-transparent px-4 py-2 w-full disabled:opacity-75 disabled:cursor-not-allowed"
                            id="new-pwd-ke"
                            type="password"
                            name="newPassword"
                            value={state.newPassword}
                            placeholder="new password"
                            onChange={handleChange}
                        />
                        {/* //////////////////////////////////// */}
                        <label htmlFor="confirm-pwd-ke" className="text-gray-700 text-sm font-semibold uppercase">
                            confirm password
                        </label>
                        <input
                            className="border rounded-full border-transparent px-4 py-2 w-full disabled:opacity-75 disabled:cursor-not-allowed"
                            id="confirm-pwd-ke"
                            type="password"
                            name="confirmPassword"
                            value={state.confirmPassword}
                            placeholder="confirm password"
                            onChange={handleChange}
                        />

                        {/* //////////////////////////////////// */}
                        <div className="flex justify-center mt-4">
                            <button onClick={handleUpdatePassword} className="bg-[#31304D] px-6 py-3 border rounded-full text-center text-white justify-self-center hover:bg-[#161A30]">
                                Update password
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Setting;