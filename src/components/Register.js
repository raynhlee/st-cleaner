import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { register } from "../api";

const Register = ({
  username,
  setUsername,
  password,
  setPassword,
  setUserToken,
  setLoggedIn,
  loggedIn,
  history,
}) => {
  const fetchApi = async (event) => {
    event.preventDefault();
    try {
      const data = await register(username, password);
      if (data.success === false) {
        swal(data.error.message);
        setUsername("");
        setPassword("");
      } else {
        const token = data.data.token;
        localStorage.setItem(`Token`, token);
        localStorage.setItem(`Username`, username);
        setUsername(username);
        setUserToken(token);
        setLoggedIn(true);
        history.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loggedIn) {
    return <div>You are already logged in</div>;
  } else {
    return (
      <div className="misc-style">
        <h2>Register your account</h2>
        <form onSubmit={fetchApi}>
          <input
            type="text"
            minLength="6"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <input
            type="password"
            minLength="6"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
        <div>
          <label>Already have an account? </label>
          <Link to="/login">Sign in here.</Link>
        </div>
      </div>
    );
  }
};

export default Register;
