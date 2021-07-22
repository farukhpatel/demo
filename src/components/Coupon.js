import React, { useState, useEffect } from "react";
import "../components/SuperUser.css";
//popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";

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
  const handleChangeCoupon = (coupon) => {
    let body = {
      is_active: coupon?.is_active === 0 ? 1 : 0,
    };
    instance
      .patch(`${API.UPDATE_REVIEW}/${coupon.id}`, body)
      .then(function (response) {
        window.location.reload();
      });
  };

  const handleDelete = (val) => {
    let newArray = [...ar];
    const filteredArr = newArray.filter((item) => item.id !== val.id);
    setAr(filteredArr);
  };

  function getCoupons() {
    instance.get(API.GET_COUPONS).then(function (response) {
      setCoupons(response?.coupons);
    });
  }
  useEffect(() => {
    getCoupons();
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
                  />
                </div>
                <div class="form-group">
                  <label for="discount">Discount</label>
                  <input
                    type="text"
                    class="form-control"
                    id="discount"
                    placeholder="Type here..."
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
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="startdate">Type of Discount</label>
                  <br />
                  <select className="form-group customSelect">
                    <option>Holi</option>
                    <option>GuruPrabh</option>
                    <option>Diwali</option>
                    <option>Eid</option>
                  </select>
                </div>
                <div
                  class="form-group "
                  style={{ paddingBottom: "10px", marginBottom: "12px" }}
                >
                  <button type="submit" class="btn btn-primary coupounBtn">
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
                              {coupon?.status ? "Activated" : "Activate"}
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
                                {coupon?.is_Active ? "Deactivate" : "Activate"}{" "}
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
                        {/* <button class="btn btn-primary">Activate</button> */}
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
                                Are you Sure you want to Delete this review?
                              </h6>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
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
