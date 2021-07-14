import React, { useEffect, useState } from "react";
import "./SuperUser.css";

import dairy from "../assets/dairy.jpg";

//for Api
import { APICall } from "../Utils/CommonFunctions";
import API from "../Utils/ApiConstant";

function Home() {
  const [dashboardData, setDashboardData] = useState({
    active_users: "",
    total_delivery_boys: "",
    total_orders: "",
    total_orders_delivered: "",
    Accepted: "",
    Assigned: "",
    Delivered: "",
    Picked: "",
  });
  useEffect(() => {
    let obj = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    APICall(API.GET_DASHBOARD_DATA, obj, (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.status) {
        console.log(result);
        const data = {
          active_users: result.active_users,
          total_delivery_boys: result.total_delivery_boys,
          total_orders: result.total_orders,
          total_orders_delivered: result.total_orders_delivered,
          Accepted:result?.order_status_count?.Accepted,
          Assigned:result?.order_status_count?.Assigned,
          Delivered:result?.order_status_count?.Delivered,
          Picked:result?.order_status_count?.Picked,
        };
        setDashboardData(data);
      }
    });
  }, []);
  return (
    <>
      <div className="mainDashboardHeading">
        <div className="innerDashboardHeading">
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="main-outer-div">
        <div className="home-outer-div" style={{ paddingTop: "3%" }}>
          <div className="home-top">
            <div className="home-top-left">
              <a href="/unassignedorders">
                <div className="item-1">
                  <h3>{dashboardData.Accepted}</h3>
                  <h5>Unassigned Orders</h5>
                </div>
              </a>

              <a href="/assigned">
                <div className="item-1">
                  <h3>{dashboardData.Assigned}</h3>
                  <h5>Assigned Orders</h5>{" "}
                </div>
              </a>
            </div>

            <div className="home-top-right">
              {/* <a href="/notpicked"> */}
              <a href="/outfordelivery">
                <div className="item-1">
                  <h3>{dashboardData.Picked}</h3>
                  <h5>Picked</h5>{" "}
                </div>
              </a>
              {/* <a href="/unassignedorders"> */}
              <a href="/deliveredorders">
                <div className="item-1">
                  <h3>{dashboardData.Delivered}</h3>
                  <h5>Delivered</h5>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="home-outer-div">
          <div className="home-middle">
            <div className="home-middle-left">
              <div className="home-middle-left-top">
                <div className="icon-position">
                  <i
                    class="fas fa-atom fa-2x "
                    style={{ color: "#D7DBDD" }}
                  ></i>
                </div>
                <div>
                  <a href="/totalorderrecieved">
                    {" "}
                    <h3>{dashboardData.total_orders}</h3>
                  </a>
                </div>
                <a href="/totalorderrecieved">
                  <div className="total_orders_received">
                    <h5>Total Orders Received</h5>
                  </div>
                </a>
              </div>

              <div className="home-middle-left-bottom">
                <div className="icon-position">
                  <i
                    class="fas fa-chart-pie fa-2x "
                    style={{ color: " #D7DBDD" }}
                  ></i>
                </div>
                <div>
                  <h3>{dashboardData.total_orders_delivered}</h3>
                </div>
                <div className="total_orders_received">
                  <h5>Total Orders Deliverd</h5>
                </div>
              </div>
            </div>
            <div className="home-middle-right">
              <div className="home-middle-right-top">
                <div className="icon-position">
                  <i
                    class="fas fa-users fa-2x"
                    style={{ color: "#D7DBDD" }}
                  ></i>
                </div>
                <div>
                  <a href="/totalorderrecieved">
                    {" "}
                    <h3>{dashboardData.active_users}</h3>
                  </a>
                </div>
                <a href="/totalorderrecieved">
                  <div className="active_user_count">
                    <h5>Total Active Users</h5>
                  </div>
                </a>
              </div>
              <div className="home-middle-right-bottom">
                <div className="icon-position">
                  <i
                    class="fas fa-truck fa-2x"
                    style={{ color: "#D7DBDD" }}
                  ></i>
                </div>
                <div>
                  <a href="/deliverymanage">
                    {" "}
                    <h3>{dashboardData.total_delivery_boys}</h3>
                  </a>
                </div>
                <a href="/deliverymanage">
                  <div className="active_delivery_count">
                    <h5>Total Delivery Boys</h5>
                  </div>
                </a>
              </div>
            </div>
            <div className="home-middle-right">
              <img
                src={dairy}
                style={{ width: "400px", height: "400px" }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
