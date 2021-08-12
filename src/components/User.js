import React, { useEffect, useState } from "react";
import "./SuperUser.css";

// API IMPORT
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function User() {
  // API
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    instance.get(API.USER).then(function (response) {
      setUser(response.users);
    });
  }, []);
  const routerHistroy = useHistory();
  const UserDetails = (value) => {
    routerHistroy.push("/userdetails", {
      userDetails: value,
      isDeliveryBoy: false,
    });
  };
  const orderDetails = (value) => {
    routerHistroy.push("/orderdetails", value);
  };
  const SearchUser = (e) => {
    e.preventDefault();
    instance.get(`${API.USER}&user_name=${search}`).then(function (response) {
      if (response.users?.length > 0) {
        toast.success(response.message);
        setUser(response.users);
      } else {
        toast.error("User not found");
      }
    });
  };

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

                    <input
                      placeholder="Search..."
                      className="SearchInput"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      type="submit"
                      onClick={(e) => {
                        SearchUser(e);
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <table class="table table-striped">
                  <thead style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone No.</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {user.length > 0 ? (
                      user.map((value, index) => {
                        return (
                          <tr key={index}>
                            <th style={{}}>
                              <input
                                type="checkbox"
                                style={{ marginRight: "7%" }}
                              />
                              {index + 1}
                            </th>
                            <td
                              onClick={() => {
                                // (window.location.href = "/UserDetails")
                                UserDetails(value);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <p>{value?.name}</p>
                            </td>
                            <td>{value?.phone}</td>
                          </tr>
                        );
                      })
                    ) : (
                        <>
                          {" "}
                          <tr>
                            {" "}
                            <td colSpan="4">
                              {" "}
                              <h2> No record found </h2>{" "}
                            </td>{" "}
                          </tr>{" "}
                        </>
                      )}
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
