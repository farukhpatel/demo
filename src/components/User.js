import React, { useEffect, useState } from "react"
import "./SuperUser.css";

// API IMPORT
import API from "../Utils/ApiConstant";
import { APICall } from '../Utils/CommonFunctions';

function User() {
  // assgin select
  // API
  const [user, setUser] = useState([]);
  useEffect(() => {
    const tokenValue = localStorage.getItem("token");
    let object = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenValue}`,
      },
    };
    APICall(API.USER, object, (error, result) => {
      if (error)
        console.log(error)

      else if (result.status) {
        console.log(result)
        setUser(result.users)
      }

      else
        alert("Something went wrong")
    })
  }, [])


  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="myorders-inner-div vendor-inner-div">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="current-orders"
                  data-bs-toggle="tab"
                  data-bs-target="#currentorders"
                  type="button"
                  role="tab"
                  aria-controls="current-orders"
                  aria-selected="true"
                >
                  Users List
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active "
                id="currentorders"
                role="tabpanel"
                aria-labelledby="current-orders"
              >
                <div className="btn-position">
                  <div className="searchStyle">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input placeholder="Search..." className="SearchInput" />
                  </div>
                </div>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Order Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      user.map((value, index) => {
                        return (
                          <tr>
                            <th style={{}}><input type="checkbox" style={{ marginRight: "7%" }} />{index + 1}</th>
                            <td onClick={() =>
                              (window.location.href = "/orderdetails")
                            }
                              style={{ cursor: "pointer" }}>{value?.id}</td>
                            <td onClick={() =>
                              (window.location.href = "/orderdetails")
                            }
                              style={{ cursor: "pointer" }}>
                              <p >{value?.name}</p>
                            </td>
                            <td>{value?.phone}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
