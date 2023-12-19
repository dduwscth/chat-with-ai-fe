import styles from "./LoginPage.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = () => {

    if (!handleValidation()) {
      alert("Please fill all fields");
      return;
    }

    axios.post('http://3.1.208.37/api/user/login', {
      username: username,
      password: password,
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      window.location.href = "google.com";
    })
    .catch(err => {
      console.log(err);
    });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleValidation = () => {
    let formIsValid = true;
    if (!username || !password) {
      formIsValid = false;
    }
    return formIsValid;
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.background} />
      <div className={styles.signupBtn}>
        <button className={styles.signupBtnChild}>REGIS NEW ACCOUNT</button>
      </div>
      <b className={styles.or}>OR</b>
      <div className={styles.loginBtn}>
        <button onClick={handleLogin} className={styles.signupBtnChild}>LOGIN</button>
      </div>
      <div className={styles.password}>
         <input
        className={styles.password1} 
        type="text"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password..."
      />
      </div>
      <div className={styles.username}>
         <input
        className={styles.password1} 
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username..."
      />
      </div>
      <b className={styles.chatWithAiContainer}>
        <span className={styles.chatWithAiContainer1}>
          <p className={styles.chatWith}>CHAT WITH</p>
          <p className={styles.chatWith}>AI</p>
        </span>
      </b>
      <div className={styles.logo}>
        <img className={styles.logoChild} alt="" src="/rectangle-2@2x.png" />
        <b className={styles.dhsChat}>DHS-CHAT</b>
      </div>
    </div>
  );
};

export default LoginPage;
