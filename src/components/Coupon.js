import React, { useState, useEffect } from "react";
import "../components/SuperUser.css";
//popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";
import moment from "moment";
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function Coupon() {
  const classes = useStyles();
  const [coupons, setCoupons] = useState([]);
  const [ar, setAr] = useState([
    {
      id: 1,
      status: false,
    },
    {
      id: 2,
      status: false,
    },
  ]);
  const [vendor, setVendor] = useState([]);
  const [coupon_name, setCoupon_name] = useState("");
  const [coupon_description, setCoupon_description] = useState("");
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [id, setId] = useState(0);
  const [isCouponActive, setIsCouponActive] = useState(1)
  const [minimum_spend, setMinimum_spend] = useState(null);
  const [maximum_spend, setMaximum_spend] = useState(null);
  const [usage_limit_per_coupon, setUsage_limit_per_coupon] = useState(null)
  const [usage_limit_per_user, setUsage_limit_per_user] = useState(null);
  const [coupon_code, setCoupon_code] = useState(null);

  const routerHistory = useHistory()
  const handleChangeCoupon = (coupon) => {
    let body = {
      is_active: coupon?.is_active === 0 ? 1 : 0,
    };

    instance
      .patch(`${API.UPDATE_COUPON}/${coupon.id}`, body)
      .then(function (res) {
        toast.success(res.message);
        window.location.reload();
      });
  };
  const Submit = (e) => {
    e.preventDefault();
    let couponData = {
      coupon_name,
      coupon_description,
      coupon_code,
      start_date: start_date === null ? start_date : moment(start_date).format("YYYY-MM-DD HH:MM:SS"),
      end_date: end_date === null ? end_date : moment(end_date).format("YYYY-MM-DD HH:MM:SS"),
      coupon_type: 1,
      coupon_value: discount ? Number(discount) : null,
      ...(id > 0 ? { shop_id: id } : {}),
      is_active: isCouponActive,
      minimum_spend: minimum_spend ? Number(minimum_spend) : null,
      maximum_spend: maximum_spend ? Number(maximum_spend) : null,
      usage_limit_per_coupon: usage_limit_per_coupon ? Number(usage_limit_per_coupon) : null,
      usage_limit_per_user: usage_limit_per_user ? Number(usage_limit_per_user) : null
    };
    console.log(couponData);
    instance.post(API.POST_COUPONS_CREATE, couponData).then((res) => {
      toast.success(res.message)
      window.location.href = '/coupon'
    })

  };
  const handleDelete = (val) => {
    let newArray = [...ar];
    const filteredArr = newArray.filter((item) => item.id !== val.id);
    setAr(filteredArr);
  };
  const CouponDelete = (coupon) => {
    instance.delete(`${API.DELETE_COUPONS}/${coupon.id}`).then((res) => {
      toast.success(res.message)
      window.location.href = '/coupon';
    })

  }

  function getCoupons() {
    instance.get(API.GET_COUPONS).then(function (response) {
      setCoupons(response?.coupons);
    });
  }
  useEffect(() => {
    getCoupons();
    instance.get(API.GET_ALL_SHOP).then((res) => {
      setVendor(res.shop);
    });

  }, []);

  return (
    <>
      <div className="main-outer-div">
        <div className="innerDashboardHeading">
          <h1>Coupon</h1>
        </div>
        <div
          className="myorders-outer-div coupon-area-outer "
          style={{ background: "white" }}
        >
          <div className="coupon-area">
            <div className="coupon-form">
              <form>
                <div class="form-group">
                  <label for="title">Tittle</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Type here..."
                    onChange={(e) => setCoupon_name(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea
                    class="form-control"
                    id="description"
                    cols="10"
                    rows="5"
                    placeholder="Type here..."
                    onChange={(e) => setCoupon_description(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="title">Coupon code</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Type here..."
                    onChange={(e) => setCoupon_code(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="discount">Discount (%)</label>
                  <input
                    type="number"
                    class="form-control"
                    id="discount"
                    placeholder="Type here..."
                    onChange={(e) => {
                      setDiscount(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="startdate">Start Date</label>
                  <br />
                  <TextField
                    id="datetime-local"
                    label=""
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    onChange={(e) => setStart_date(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="startdate">End Date</label>
                  <br />
                  <TextField
                    id="datetime-local"
                    label=""
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    onChange={(e) => setEnd_date(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div style={{ display: 'flex' }}>
                  <div class="form-group">
                    <label>Vendor Name</label>

                    <select
                      value={id}
                      displayEmpty
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e) => {
                        setId(e.target.value);
                      }}
                    >
                      <option value={0}>
                        All
                      </option>
                      {vendor.map((items, index) => {
                        return (
                          <option key={index} value={items.id}>
                            {items.shop_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="isActiveCity">Is Active Coupon</label>
                    <select id="isActiveCity" onChange={(e) => setIsCouponActive(e.target.value)}>
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="title">Minimum spend</label>
                  <input
                    type="number"
                    class="form-control"
                    id="title"
                    placeholder="Type here..."
                    onChange={(e) => setMinimum_spend(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="title">Miximum spend</label>
                  <input
                    type="number"
                    class="form-control"
                    id="title"
                    placeholder="Type here..."
                    onChange={(e) => setMaximum_spend(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="title">Usage limit per coupon</label>
                  <input
                    type="number"
                    class="form-control"
                    id="title"
                    placeholder="Type here..."
                    onChange={(e) => setUsage_limit_per_coupon(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="title">Usage limit per user</label>
                  <input
                    type="number"
                    class="form-control"
                    id="title"
                    placeholder="Type here..."
                    onChange={(e) => setUsage_limit_per_user(e.target.value)}
                  />
                </div>
                <div
                  class="form-group "
                  style={{ paddingBottom: "10px", marginBottom: "12px" }}
                >
                  <button
                    type="submit"
                    class="btn btn-primary coupounBtn"
                    onClick={(e) => Submit(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="available-coupon">
              {coupons &&
                coupons.map((coupon, index) => {
                  return (
                    <div className="coupon-details">
                      <div className="coupon-details-text">
                        {coupon?.start_date && (
                          <h6>{`Start Date:- ${coupon?.start_date}`}</h6>
                        )}
                        {coupon?.end_date && (
                          <h6>{`End Date:- ${coupon?.end_date}`}</h6>
                        )}
                        <h6>{`CODE: ${coupon?.coupon_code}`}</h6>
                        <h6>{`Description: ${coupon?.coupon_description}`}</h6>
                        <h6>{`Coupon Value: ${coupon?.coupon_value}`}</h6>
                        {coupon?.maximum_spend && (
                          <h6>{`Maximum Spend: ${coupon?.maximum_spend}`}</h6>
                        )}
                        {coupon?.minimum_spend && (
                          <h6>{`Minimum Spend: ${coupon?.minimum_spend}`}</h6>
                        )}
                        <h6>Discounted Price:-</h6>
                      </div>
                      <div className="coupon-details-btn">
                        <Popup
                          Open
                          nested
                          className="my-popup"
                          trigger={
                            <button
                              className="btn btn-primary"
                              style={{ cursor: "pointer" }}
                            >
                              {/* {console.log(coupon.is_active)} */}
                              {coupon?.is_active === 1 ? "Deactive" : "Active"}
                            </button>
                          }
                          position="right center"
                          modal
                        >
                          {(close) => (
                            <div className="ReviewSure-text">
                              <h6
                                style={{
                                  marginBottom: "1rem",
                                  marginTop: "2rem",
                                }}
                              >
                                Are you Sure you want to{" "}
                                {coupon?.is_active === 0 ? "Activate" : "Deactivate"}{" "}
                                this coupon?
                              </h6>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  handleChangeCoupon(coupon);
                                  close();
                                }}
                              >
                                Yes
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  close();
                                }}
                              >
                                No
                              </button>
                            </div>
                          )}
                        </Popup>
                        <Popup
                          className="my-popup"
                          trigger={
                            <button
                              className="btn btn-primary"
                              style={{ cursor: "pointer" }}
                            >
                              Delete
                            </button>
                          }
                          position="right center"
                          modal
                        >
                          {(close) => (
                            <div className="ReviewSure-text">
                              <h6
                                style={{
                                  marginBottom: "1rem",
                                  marginTop: "2rem",
                                }}
                              >
                                Are you Sure you want to Delete this coupon?
                              </h6>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  CouponDelete(coupon)
                                  handleDelete(coupon);
                                  close();
                                }}
                              >
                                Yes
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  close();
                                }}
                              >
                                No
                              </button>
                            </div>
                          )}
                        </Popup>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Coupon;
