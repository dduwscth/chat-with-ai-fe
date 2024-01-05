import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.js";
import Signup from "./pages/login/Signup.js";
import Chat from "./pages/layouts/Chat.js";
import Setting from "./pages/layouts/Setting.js";

function App() {
  axios.defaults.baseURL = 'https://api.ducth.tech/';
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
