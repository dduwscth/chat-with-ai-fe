import React from "react";
import { Link } from "react-router-dom";

function Home() {


    return (
        <div className="bg-[#F0ECE5] w-full h-full">
            <div className="max-w-[1100px] min-h-screen mx-auto">
                <div className="text-5xl font-semibold uppercase text-center text-gray-800 pt-[80px]">
                    chat with ai
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-[200px]">
                    <div className="w-full border rounded-2xl py-6 px-6 bg-[#D2E3C8] flex flex-col justify-center items-center">
                        <span className="text-center text-xl font-semibold text-gray-800">
                            Text Generator
                        </span>
                        <span className="w-full text-center text-sm font-semibold text-gray-800 mt-6">
                            This is a combination of two large AI systems including OpenAI ChatGPT and Google Gemini. Bringing better, more diverse returns
                        </span>
                        <Link
                            to="/chat"
                            className="w-[300px] bg-[#31304D] px-6 py-2 rounded-full text-center text-white mt-[50px] border-transparent transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
                            Generator it
                        </Link>
                    </div>
                    {/* ////////////////////////////// */}
                    <div className="w-full border rounded-2xl py-6 px-6 bg-[#86A789] flex flex-col justify-center items-center">
                        <span className="text-center text-xl font-semibold text-gray-800">
                            Text Translator
                        </span>
                        <span className="w-full text-center text-sm font-semibold text-gray-800 mt-6">
                            Using AI to translate text, providing higher accuracy and more suggestions for many different purposes.
                        </span>
                        <Link
                            to="/home"
                            className="w-[300px] bg-[#31304D] px-6 py-2 rounded-full text-center text-white mt-[50px] border-transparent transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
                            Imcoming
                        </Link>
                    </div>
                    {/* ////////////////////////////// */}
                    <div className="w-full border rounded-2xl py-6 px-6 bg-[#739072] flex flex-col justify-center items-center">
                        <span className="text-center text-xl font-semibold text-gray-800">
                            Image Generator
                        </span>
                        <span className="w-full text-center text-sm font-semibold text-gray-800 mt-6">
                            Using Dall - e - 2 technology to create unique, artistic photos like never before,...
                        </span>
                        <Link
                            to="/home"
                            className="w-[300px] bg-[#31304D] px-6 py-2 rounded-full text-center text-white mt-[50px] border-transparent transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
                            Imcoming
                        </Link>
                    </div>
                    {/* ////////////////////////////// */}
                    <div className="w-full border rounded-2xl py-6 px-6 bg-[#4F6F52] flex flex-col justify-center items-center">
                        <span className="text-center text-xl font-semibold text-gray-800">
                            Text Generator
                        </span>
                        <span className="w-full text-center text-sm font-semibold text-gray-800 mt-6">
                            Convert voice to text and vice versa with Text - Voice Switcher. Diverse languages and support for many file formats.
                        </span>
                        <Link
                            to="/home"
                            className="w-[300px] bg-[#31304D] px-6 py-2 rounded-full text-center text-white mt-[50px] border-transparent transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
                            Incoming
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;