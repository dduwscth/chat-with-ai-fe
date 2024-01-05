import React ,{ useState } from "react";
import { Link} from "react-router-dom";
import Navbar from "../../component/Navbar.js";

function Setting(){

    return(
        <div className="bg-[#161A30] max-h-screen h-screen p-2">
            <Navbar />

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
                                value={'ioqựqeoịweoiqựeoiqưeoiqưeị'}
                                placeholder="google api key"
                                disabled
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
                                value={'adioặoidjaowidjăodjpặod'}
                                placeholder="chatgpt api key"
                                disabled
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
                                
                                placeholder="Your name"
                            />
                            <button className="bg-[#31304D] w-[100px] px-6 py-2 border rounded-full text-center text-white invisible hover:bg-[#161A30]">
                                Edit
                            </button>
                        </div>
                        {/* //////////////////////////////////// */}
                        <div className="flex justify-center mt-4">
                            <button className="bg-[#31304D] px-6 py-3 border rounded-full text-center text-white justify-self-center hover:bg-[#161A30]">
                                update information 
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

                            placeholder="current password"
                        />
                        {/* //////////////////////////////////// */}
                        <label for="new-pwd-ke" className="text-gray-700 text-sm font-semibold uppercase">
                            new password
                        </label>
                        <input
                            className="border rounded-full border-transparent px-4 py-2 w-full disabled:opacity-75 disabled:cursor-not-allowed"
                            id="new-pwd-ke"
                            type="password"
                            
                            placeholder="new password"
                        />
                        {/* //////////////////////////////////// */}
                        <label for="confirm-pwd-ke" className="text-gray-700 text-sm font-semibold uppercase">
                            confirm password
                        </label>
                        <input
                            className="border rounded-full border-transparent px-4 py-2 w-full disabled:opacity-75 disabled:cursor-not-allowed"
                            id="confirm-pwd-ke"
                            type="password"
                            
                            placeholder="confirm password"
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