import React, { useEffect, useState } from "react";
import "./SuperUser.css";
import cookie from "react-cookies";
import { Badge, Menu } from "@material-ui/core";
import instance from "../Utils/axiosConstants";
import API from "../Utils/ApiConstant";

function Home() {
  const getWindowsSize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [windowDimensions, setWindowDimensions] = useState(getWindowsSize());

  const signout = (next) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      cookie.remove("Authorization");
    }
  };
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowsSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Sidebar = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    useEffect(() => {
      instance.get(API.NOTIFICATIONS_COUNT).then((res) => {
        setNotificationCount(res.notifications);
      });
      // eslint-disable-next-line
    }, []);
    return (
      <div class="sidebar">
        <div className="headerText" onClick={handleClose}>
          <h1>Bandhify</h1>
        </div>
        <ul>
          <li>
            <a
              href="/dashboard"
              style={{
                borderTopWidth: "1px",
                borderTopColor: "#fff",
                borderTopStyle: "solid",
              }}
              onClick={handleClose}
            >
              <i class="fas fa-home"></i>Home
            </a>
          </li>
          <Badge badgeContent={notificationCount} color="primary">
            <li>
              <a href="/notification" onClick={handleClose}>
                <i class="fas fa-bell"></i>Notification
              </a>
            </li>
          </Badge>
          <li>
            <a href="/user" onClick={handleClose}>
              <i class="far fa-user"></i>User
            </a>
          </li>
          <li>
            <a href="/vendor" onClick={handleClose}>
              <i class="fas fa-link"></i>Vendor
            </a>
          </li>
          <li>
            <a href="/salesreport" onClick={handleClose}>
              <i class="far fa-address-book"></i>Sales Report
            </a>
          </li>
          <li>
            <a href="/productlist" onClick={handleClose}>
              <i class="far fa-file-alt"></i>Product List
            </a>
          </li>
          <li>
            <a href="/deliverymanage" onClick={handleClose}>
              <i class="fas fa-tasks"></i>Delivery Management
            </a>
          </li>
          <li>
            <a href="/paymentsettle" onClick={handleClose}>
              <i class="far fa-money-bill-alt"></i>Payment Settlement
            </a>
          </li>
          <li>
            <a href="/coupon" onClick={handleClose}>
              <i class="fas fa-tags"></i>Coupon
            </a>
          </li>
          <li>
            <a href="/review" onClick={handleClose}>
              <i class="far fa-comment-dots"></i>Review
            </a>
          </li>
          <li>
            <a href="/settings" onClick={handleClose}>
              <i class="fas fa-cogs"></i>Settings
            </a>
          </li>
          <li>
            <a href="/city" onClick={handleClose}>
              <i class="fas fa-city"></i>City
            </a>
          </li>
          <li>
            <a href="/locality" onClick={handleClose}>
              <i class="fas fa-location-arrow"></i>Locality
            </a>
          </li>
          <li
            onClick={() => {
              signout();
              handleClose();
            }}
          >
            <a href="/login">
              <i class="fas fa-sign-out-alt"></i>Logout
            </a>
          </li>
        </ul>
      </div>
    );
  };

  return windowDimensions.width > 500 ? (
    <>
      <Sidebar />
    </>
  ) : (
    <>
      <nav>
        <div className="navHeaderText">
          <i
            className="fas fa-bars "
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          ></i>

          <div className="company__name">
            <h1>Bandhify</h1>
          </div>
        </div>
      </nav>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="nav-menu"
      >
        <Sidebar />
      </Menu>
    </>
  );
}

export default Home;
