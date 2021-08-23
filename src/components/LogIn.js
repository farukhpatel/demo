/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import API from "../Utils/ApiConstant";
import "./SuperUser.css";
import instance from "../Utils/axiosConstants";
import cookie from "react-cookies";
import "react-toastify/dist/ReactToastify.css";
import firebase from "../components/firebase";
import { toast } from "react-toastify";
function LogIn(props) {
  // api
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const [device_token, setdevice_token] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.history.push("/dashboard");
    } else {
      if (window.Notification.permission === "denied") {
        toast.error("please allow notification permission");
      } else {
        const messaging = firebase.messaging();
        messaging.getToken().then((token) => {
          console.log("token", token);
          setdevice_token(token);
        });
      }
      if (cookie.load("Authorization")) props.history.push("/dashboard");
    }
  }, []);

  const login = (e) => {
    e.preventDefault();
    let body = {
      phone: phoneno,
      password: password,
      device: "web",
      device_token,
    };

    instance.post(API.LOGIN, body).then(function (response) {
      localStorage.setItem("token", response?.accessToken?.toString());
      cookie.save("Authorization", `Bearer ${response?.accessToken}`);

      props.history.push("/dashboard");
    });
  };

  return (
    <>
      <div className="main-outer-div signup-login-outer-div ">
        <div className="myorders-outer-div ">
          <div className="signup-login-form-div">
            <div className="heading-login">
              <h1>Login</h1>
            </div>
            <form className="signup-login-form">
              <span className="customSpan"></span>
              <div class="form-group">
                <label for="phone">Phone No:</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  name="phone"
                  placeholder="1234567890"
                  required
                  onChange={(e) => setPhoneno(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary signup-loginBtn "
                onClick={login}
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
