import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from '@reduxjs/toolkit'
import "./Login.css";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie';
import { authActions } from '../../store/index';


const Login = () => {
  const userFrom = useRef();
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useRef();

  const doLogin = createAsyncThunk("login", async (userCredentials) => {
    const res = await axios.post(
      "http://localhost:8081/api/v1/authenticate",
      userCredentials
    );
    console.log(res.data);
    return res.data;
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    const form = formData.current;
    const userCredentials = {
      email: form["email"].value,
      password: form["password"].value,
    };
    const result = await dispatch(doLogin(userCredentials));
    dispatch(authActions.loginSuccessful());
    Cookies.set("user", result.payload.accessToken);
    // add to default headers
    navigate("/");
  };

  return (
    <form ref={formData} className="form1">
      <fieldset>
        <legend>Login</legend>
        Email address
        <br />
        <input
          className="input1"
          name="email"
          type="email"
          required="required"
          placeholder="Enter your email address"
          onChange={(e) => setEmailState(e.target.value)}
        />
        <br />
        Password
        <br />
        <input
          className="input1"
          name="password"
          required="required"
          type="password"
          placeholder="Enter your password"
          defaultValue=""
          onChange={(e) => setPasswordState(e.target.value)}
        />
        <br />
        <input type="submit" id="button" onClick={loginHandler} />
      </fieldset>
    </form>
  );
};
export default Login;
