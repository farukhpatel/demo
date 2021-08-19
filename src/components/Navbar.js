import React from "react";
import "./SuperUser.css";
import cookie from "react-cookies";
import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  Toolbar,
} from "@material-ui/core";
import { Button } from "bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const signout = (next) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      cookie.remove("Authorization");
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Sidebar = () => {
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
          <li>
            <a href="/notification" onClick={handleClose}>
              <i class="fas fa-bell"></i>Notification
            </a>
          </li>
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

  return (
    <>
      <Sidebar />
      <button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div className="headerText">
          <h1>Bandhify</h1>
        </div>
      </button>
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
