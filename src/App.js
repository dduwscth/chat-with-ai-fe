import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Routes,
  Route,
} from "react-router-dom";
import SignUpIn from "./pages/layout/SignUpIn";
import Setting from "./component/Setting";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  axios.defaults.baseURL = 'https://api.ducth.tech/';

  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/authentication');
    }
  }, [navigate]);
  return (
    <div>
      <Routes>
        <Route path="/authentication" element={<SignUpIn />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
}
export default App;
