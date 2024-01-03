import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Routes,
  Route,
} from "react-router-dom";
import SignUpIn from "./pages/layout/SignUpIn";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  axios.defaults.baseURL = 'https://api.ducth.tech/';

  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/authentication');
    } else {
      navigate('/chat');
    }
  }, [navigate]);
  return (
    <div>
      <Routes>
        <Route path="/authentication" element={<SignUpIn />} />
      </Routes>
    </div>
  );
}
export default App;
