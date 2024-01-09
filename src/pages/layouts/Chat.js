import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar.js";

function Chat() {

    const [isOn, setIsOn] = useState(false);

    useEffect(() => {

    }, [isOn]);

    const [rows, setRows] = useState(1);
    const minRows = 1;
    const maxRows = 4;

    const handleChange = (event) => {
        const textareaRows = event.target.value.split('\n').length;
        setRows(Math.min(maxRows, Math.max(minRows, textareaRows)));
    };


    return (
        <div className="bg-[#161A30] max-h-screen h-screen p-2">
            <Navbar />
            <div className="h-full pt-[70px] w-full flex gap-2">
                <div className="w-2/12 border rounded-3xl p-2 flex flex-col gap-2 bg-[#B6BBC4]">
                    <button className="w-full border rounded-full text-white bg-[#31304D] text-center py-2 hover:bg-[#161A30]">
                        Create a new chat...
                    </button>
                    <div className="border-b-2 border-[#31304D]"></div>

                    <div className="w-full border rounded-full text-white bg-white p-1 flex justify-between items-center">
                        <span className="w-9/12 text-gray-700 truncate text-sm">
                            Chat history title....
                        </span>
                        <button className="w-3/12 border rounded-full bg-[#31304D] text-sm py-2 hover:bg-[#161A30]">
                            Delete
                        </button>
                    </div>
                </div>
                <div className="w-10/12 gap-2 flex flex-col justify-between">
                    <div className="w-full flex gap-2 h-full">
                        <div className="w-6/12 border rounded-3xl p-2 flex flex-col gap-2 bg-[#B6BBC4]">
                            <div className="w-full border-2 border-[#161A30] rounded-full flex items-center justify-between uppercase bg-white p-1">
                                <span className="text-gray-700 text-sm font-semibold">
                                    gemini pro
                                </span>
                                <button
                                    className={`relative w-16 h-8 rounded-full border border-[#161A30] overflow-hidden ${isOn ? 'bg-[#161A30]' : 'bg-gray-300'
                                        }`}
                                    onClick={() => setIsOn(!isOn)}
                                >
                                    <div
                                        className={`absolute top-1/2 transform -translate-y-1/2 ${isOn ? 'left-[1px]' : 'right-[1px]'
                                            } w-7 h-7 p-2 rounded-full transition-all duration-300 ${isOn ? 'bg-white' : 'bg-gray-400'
                                            }`}
                                    >
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-800 text-sm font-bold">
                                            {isOn ? 'ON' : 'OFF'}
                                        </span>
                                    </div>
                                </button>

                            </div>
                        </div>

                        <div className="w-6/12 border rounded-3xl p-2 flex flex-col gap-2 bg-[#B6BBC4]">

                        </div>
                    </div>
                    <div className="flex items-center justify-between border rounded-2xl bg-[#B6BBC4] w-full p-1">
                        <textarea
                            className="bg-[#B6BBC4] w-full border-0 outline-none rouded-2xl"
                            rows={rows}
                            onChange={handleChange}
                        >
                            Chat box
                        </textarea>
                        <button className="bg-[#31304D] px-6 py-2 border rounded-full text-center text-white hover:bg-[#161A30]">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;