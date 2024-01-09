import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.js";
import Signup from "./pages/login/Signup.js";
import Chat from "./pages/layouts/Chat.js";
import Setting from "./pages/layouts/Setting.js";
import Home from "./pages/layouts/Home.js";

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem('token');

  console.log(token);

  return token ? children : <Login />;
}

function PublicRoute({ children }) {
  const token = sessionStorage.getItem('token');

  return !token ? children : <Home />;
}

function App() {

  axios.defaults.baseURL = 'https://api.ducth.tech/';

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
