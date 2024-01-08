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
            console.log(response);
            setState({
                ...state,
                name: response.data.name,
                useName: response.data.username,
                google_api_key: response.data.google_api_key,
                chatgpt_api_key: response.data.chatgpt_api_key,
            });

            console.log(state);
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

        axios.put('/api/user/information', {
            name: state.name,
            google_api_key: state.google_api_key,
            chatgpt_api_key: state.chatgpt_api_key,
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

    const handleUserInformationValidate = () => {
        let formIsValid = true;
        if (!state.name) {
            formIsValid = false;
            toast.error('Please enter your name');
        }
        if (!state.google_api_key) {
            formIsValid = false;
            toast.error('Please enter your google api key');
        }
        if (!state.chatgpt_api_key) {
            formIsValid = false;
            toast.error('Please enter your chatgpt api key');
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
                                value={state.google_api_key}
                                placeholder="google api key"
                                disabled
                                onChange={handleChange}
                            />
                            <button className="bg-[#31304D] w-[100px] px-6 py-2 border rounded-full text-center text-white hover:bg-[#161A30]">
                                Edit
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
                                value={state.chatgpt_api_key}
                                placeholder="chatgpt api key"
                                disabled
                                onChange={handleChange}
                            />
                            <button className="bg-[#31304D] w-[100px] px-6 py-2 border rounded-full text-center text-white hover:bg-[#161A30]">
                                Edit
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
                                Edit
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
                        <label for="current-pwd-ke" className="text-gray-700 text-sm font-semibold uppercase">
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
                        <label for="new-pwd-ke" className="text-gray-700 text-sm font-semibold uppercase">
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
                        <label for="confirm-pwd-ke" className="text-gray-700 text-sm font-semibold uppercase">
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
                            <button className="bg-[#31304D] px-6 py-3 border rounded-full text-center text-white justify-self-center hover:bg-[#161A30]">
                                update password
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Setting;