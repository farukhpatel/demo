import React, { useEffect, useState } from "react"
import "./SuperUser.css";

// API IMPORT
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants"
import { useHistory } from "react-router-dom";

function User() {
  // API
  const [user, setUser] = useState([]);
  useEffect(() => {

    instance.get(API.USER)
      .then(function (response) {
        console.log(response);
        setUser(response.users)
      })
  }, [])
  const routerHistroy = useHistory();
  const OrderDetails = (value) => {
    console.log("OrderDetails");
    console.log(value);
    routerHistroy.push('/orderdetails', value)
  }




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
                  <thead style={{ textAlign: 'center' }}>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Order Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone No.</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: 'center' }}>
                    {
                      user.length > 0 ? user.map((value, index) => {
                        return (
                          <tr>
                            <th style={{}}><input type="checkbox" style={{ marginRight: "7%" }} />{index + 1}</th>
                            <td onClick={() => {
                              // (window.location.href = "/orderdetails")
                              OrderDetails(value)
                            }
                            }
                              style={{ cursor: "pointer" }}>{value?.id}</td>
                            <td onClick={() => {
                              // (window.location.href = "/orderdetails")
                              OrderDetails(value);
                            }
                            }
                              style={{ cursor: "pointer" }}>
                              <p >{value?.name}</p>
                            </td>
                            <td>{value?.phone}</td>
                          </tr>
                        );
                      }) : <> <tr> <td colSpan="4" > <h2> No record found </h2> </td> </tr>  </>}
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
