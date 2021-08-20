import React, { useState } from "react";
import API from "../Utils/ApiConstant";
import "./SuperUser.css";
import instance from "../Utils/axiosConstants"

function SignUp() {
  // api
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");


  const register = (e) => {
    e.preventDefault();
    let body = {
      name: userName,
      phone: phoneNumber,
      password: password,
      device: "web",
    }
    instance.post(API.SIGNUP, body)
      .then(function (response) {

      })
  };

  return (
    <>
      <div className="main-outer-div signup-login-outer-div">
        <div className="myorders-outer-div">
          <div className="signup-login-form-div">
            <h1>Sign Up</h1>
            <form className=" signup-login-form">
              <span className="customSpan"></span>
              <div class="form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Enter your name"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="phone">Phone No:</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  name="phone"
                  placeholder="1234567890"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                onClick={register}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
