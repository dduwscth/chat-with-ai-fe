import { useEffect } from "react";
import axios from "axios";
import {
  Routes,
  Route,
} from "react-router-dom";
import SignUpIn from "./pages/layout/SignUpIn";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  axios.defaults.baseURL = 'https://api.ducth.tech/';
  return (
    <div>
      <Routes>
        <Route path="/login" element={<SignUpIn />} />
      </Routes>
    </div>
  );
}
export default App;
