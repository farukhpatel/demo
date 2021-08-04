import React, { useEffect, useState } from "react";
import "./SuperUser.css";

import dairy from "../assets/dairy.jpg";

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'           //clock
import MomentUtils from '@date-io/moment'

//for Api
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";
import moment from "moment";

function Home() {
  const date = new Date();
  const [from, setFrom] = useState(new Date);
  const [to, setTo] = useState(moment(date).add(+1, 'days').format());
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
    // {{Base URL}}/api/admin/dashboard?start_date=2019-05-05&end_date=2021-01-01
    let start_date = moment(from).format('YYYY-MM-DD');
    let end_date = moment(to).format('YYYY-MM-DD');
    console.log(`${API.GET_DASHBOARD_DATA}start_date=${start_date}&end_date=${end_date}`)
    instance.get(`${API.GET_DASHBOARD_DATA}start_date=${start_date}&end_date=${end_date}`).then(function (response) {
      const data = {
        active_users: response.active_users,
        total_delivery_boys: response.total_delivery_boys,
        total_orders: response.total_orders,
        total_orders_delivered: response.total_orders_delivered,
        total_vendors: response.total_vendors,
        total_subscription_orders: response.total_subscription_orders,
        Accepted: response?.order_status_count?.Accepted,
        Assigned: response?.order_status_count?.Assigned,
        Delivered: response?.order_status_count?.Delivered,
        Picked: response?.order_status_count?.Picked,
      };
      setDashboardData(data);
    });
  }, [from, to]);

  return (
    <>
      <div className="mainDashboardHeading">
        <div className="innerDashboardHeading">
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="main-outer-div">
        {/* This is for from-to time */}
        <div className="dashboard_time">

          <div className="payment-settlement-inputs">
            <form className="payment-form">
              <div class="form-group">
                <label for="from">From</label>
                <MuiPickersUtilsProvider
                  utils={MomentUtils}
                >
                  <Grid container justify='space-around'>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      format="DD/MM/yyyy"
                      onChange={(e) => { setFrom(e._d) }}
                      value={from}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
              <div class="form-group">
                <label for="to">To</label>
                <MuiPickersUtilsProvider
                  utils={MomentUtils}
                >
                  <Grid container justify='space-around'>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      format="DD/MM/yyyy"
                      onChange={(e) => { setTo(e._d) }}
                      value={to}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>

              {/* <button type="submit" onClick={(e) => Submits(e)}>Submit</button> */}

              {/* <button type="submit" class="btn btn-primary DateSelectSubmitBtn" onClick={(e) => { Submits(e) }} >Submit</button> */}
            </form>
          </div>


        </div>
        {/* {End of time } */}
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
                    class="fas fa-atom fa-2x "
                    style={{ color: "#D7DBDD" }}
                  ></i>
                </div>
                <div>
                  <a href="/totalorderrecieved">
                    {" "}
                    <h3>{dashboardData.total_subscription_orders}</h3>
                  </a>
                </div>
                <a href="/totalorderrecieved">
                  <div className="total_orders_received">
                    <h5>Total Subscription Received</h5>
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
                  <h5>Total Orders Delivered</h5>
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

              <div className="home-middle-left-bottom">
                <div className="icon-position">
                  <i
                    class="fas fa-store fa-2x"
                    style={{ color: "#D7DBDD" }}
                  ></i>
                </div>
                <div>
                  <a href="/totalorderrecieved">
                    {" "}
                    <h3>{dashboardData.total_vendors}</h3>
                  </a>
                </div>
                <a href="/totalorderrecieved">
                  <div className="total_orders_received">
                    <h5>Total Vendors</h5>
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
