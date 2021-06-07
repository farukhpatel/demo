import React, { useState, useEffect } from "react";
import API from "../Utils/ApiConstant";
import { APICall } from "../Utils/CommonFunctions";
import "./SuperUser.css";

function LogIn() {
  //to hide navbar
  useEffect(() => {
    document.querySelector(".sidebar").classList.add("hide__navbar");
  }, []);

  // api
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    let object = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phoneno,
        password: password,
        device: "web",
      }),
    };

    APICall(API.LOGIN, object, (error, result) => {
      console.log(result);
      if (error) console.log(error);
      else if (result.status && result.code === 200) {
        console.log(result?.accessToken);
        localStorage.setItem("token", result?.accessToken.toString());
      } else alert("Something went wrong");
    });
  };

  return (
    <>
      <div className="main-outer-div signup-login-outer-div ">
        <div className="myorders-outer-div ">
          <div className="signup-login-form-div">
            <h1>Login</h1>
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
