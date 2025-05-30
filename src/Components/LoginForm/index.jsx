import { useState } from "react";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie'

import "./index.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const navigate = useNavigate()

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

const onSubmitSuccess = (jwtToken) => {
  Cookies.set('jwt_token', jwtToken, {expires: 30})
  navigate('/',{replace:true})
}
  const onSubmitFailure = (error) => {
    setErrorMsg(error)
    setShowMessage(true)
  }

  const onLoginCLick = async (event) => {
    event.preventDefault();
    const userDetails = {username, password};
    const apiUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if(response.ok){
      onSubmitSuccess(data.jwt_token)
    }else{
      onSubmitFailure(data.error_msg)
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-conatiner">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="login-form-logo"
        />

        <form className="form-container" onSubmit={onLoginCLick}>
          <div className="login-form-username-container">
            <label className="login-form-label">Username</label>
            <input
              type="text"
              className="login-form-input"
              placeholder="Username"
              value={username}
              onChange={onUsernameChange}
              autoFocus
              autoComplete="username"
            />
          </div>
          <div className="login-form-password-container">
            <label className="login-form-label">Password</label>
            <input
              type="password"
              className="login-form-input"
              placeholder="Password"
              autoComplete="current-password"
              autoFocus
              onChange={onPasswordChange}
              value={password}
            />
          </div>
          <button type="submit" className="login-form-button">
            Login
          </button>
          {showMessage ? (<p className="error-message">**{errorMsg}</p>) : null}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
