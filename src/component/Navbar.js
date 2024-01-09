import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  // Kiểm tra xem có đang ở trang 'setting' hay không
  const isSettingPage = location.pathname === '/setting';

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="fixed w-full z-20 top-2 start-0 end-0 border rounded-full border-gray-200 bg-white p-2">
      <div className="flex items-center justify-between">
        {isSettingPage ? (
          <button
            onClick={() => window.history.back()}
            className="bg-[#31304D] px-6 py-2 border rounded-full text-center text-white w-[150px] hover:bg-[#161A30]"
          >
            Back
          </button>
        ) : (
          <Link
            to="/setting"
            className="bg-[#31304D] px-6 py-2 border rounded-full text-center text-white w-[150px] hover:bg-[#161A30]"
          >
            Setting
          </Link>
        )}

        <Link to="/home" className="text-gray-800 uppercase text-4xl font-semibold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
          dhs-chat
        </Link>

        <div className="flex items-center">
          <span className="text-gray-800 uppercase text-xl font-semibold me-2">
            User Name
          </span>
          <button onClick={handleLogout} className="bg-[#31304D] px-6 py-2 border rounded-full text-center text-white hover:bg-[#161A30]">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
