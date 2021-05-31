import React, { useEffect, useState } from "react";
import API from "../Utils/ApiConstant";
import { APICall } from "../Utils/CommonFunctions";
import "./SuperUser.css";

function SignUp() {
  //    to hide navbar
  useEffect(() => {
    document.querySelector(".sidebar").classList.add("hide__navbar");
  }, []);

  // api
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    let object = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        phone: phoneNumber,
        password: password,
        device: "web",
      }),
    };
    // fetch(API.SIGNUP, )
    //     .then(res => console.log(res))
    //     .catch(e => console.log('e', e))
    //     .then(res => res.text())
    //     .then(result => {
    //         console.log(result)
    //     })
    APICall(API.SIGNUP, object, (error, result) => {
      console.log(result);
      if (error) console.log(error);
      else if (result.status) {
        console.log(result);
        // setVendors(result.shop)
      } else alert("Something went wrong");
    });
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
