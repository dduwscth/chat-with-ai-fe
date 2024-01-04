import React from "react";
import { Link} from "react-router-dom";
function Signup(){
    return(
        <div className="bg-[#161A30]">
        <div className=" my-auto max-w-[600px] mx-auto">
            <div className="flex flex-col items-center justify-center h-screen gap-4 w-full">
                <div className="border rounded-full border-gray-800 py-5 text-3xl text-center bg-white w-full text-gray-800 uppercase font-semibold">
                            dhs-chat
                    </div>
                    <div className="w-full max-w-xs uppercase text-white text-4xl font-semibold text-center my-12">
                        CHAT WITH AI
                    </div>
                    
                    <input type="text" name="user-name" className="p-4 border-gray-800 rounded-full w-full outline-none" placeholder="Username..."/>
                    <input type="password" name="user-password" className="mt-2 p-4 border-gray-800 rounded-full w-full outline-none" placeholder="Password..."/>
                    <input type="password" name="user-password" className="mt-2 p-4 border-gray-800 rounded-full w-full outline-none" placeholder="Confirm Password..."/>
                    
                    <button className="uppercase text-white text-xl text-center border rounded-lg bg-[#31304D] w-full py-4 border-transparent mt-12 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
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