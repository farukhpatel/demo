/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import avatar from "../assets/avatar3.png";
import reviewPhoto from "../assets/review.png";
import "../components/SuperUser.css";
//popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import instance from "../Utils/axiosConstants";
import API from "../Utils/ApiConstant";
import moment from "moment";

import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid"; //clock
import MomentUtils from "@date-io/moment";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Review() {
  const classes = useStyles();
  const date = new Date();
  const [reviews, setReviews] = useState([]);
  const [from, setFrom] = useState(moment(date).add(-1, "days").format());
  const [to, setTo] = useState(moment(date).format());
  const [vendor, setVendor] = useState([]);
  const [id, setId] = useState(0);

  function getReviews(url) {
    instance.get(url).then(function (response) {
      if (response?.reviews === null) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
      setReviews(response?.reviews);
    });
  }
  const Submits = (e) => {
    e.preventDefault();
    let start_date = moment(from).format("YYYY-MM-DD");
    let end_date = moment(to).format("YYYY-MM-DD");
    let url =
      `${API.GET_REVIEWS}?start_date=${start_date}&end_date=${end_date}&top_reviews=1` +
      (id > 0 ? "&shop_id=" + id : "");
    getReviews(url);
  };
  useEffect(() => {
    let start_date = moment(from).format("YYYY-MM-DD");
    let end_date = moment(to).format("YYYY-MM-DD");
    let id = 1;
    let url =
      `${API.GET_REVIEWS}?start_date=${start_date}&end_date=${end_date}&top_reviews=1` +
      (id > 0 ? "&shop_id=" + id : "");
    getReviews(url);
    //for vendor
    instance.get(API.GET_ALL_SHOP).then((res) => {
      setVendor(res.shop);
    });
  }, []);
  const [arr, setArr] = useState([
    {
      id: 1,
      status: false,
    },
    {
      id: 2,
      status: false,
    },
  ]);

  const handleChangeReview = (review) => {
    console.log(review);
    let body = {
      is_review_published: review?.is_review_published === 0 ? 1 : 0,
    };
    instance
      .patch(`${API.UPDATE_REVIEW}/${review.id}`, body)
      .then(function (response) {
        // window.location.reload();
        let start_date = moment(from).format("YYYY-MM-DD");
        let end_date = moment(to).format("YYYY-MM-DD");
        let url =
          `${API.GET_REVIEWS}?start_date=${start_date}&end_date=${end_date}&top_reviews=1` +
          (id > 0 ? "&shop_id=" + id : "");
        getReviews(url);
      });
  };

  const handleDelete = (val) => {
    let newArray = [...arr];
    const filteredArr = newArray.filter((item) => item.id !== val.id);
    setArr(filteredArr);
  };
  const DeleteReview = (review) => {
    // console.log(review)
    instance.delete(`${API.DELETE_REVIEWS}/${review.id}`).then((res) => {
      toast.success(res.message);
      window.location.href = "/review";
    });
  };
  return (
    <>
      <div className="main-outer-div">
        <div className="payment-settlement-inputs">
          <form className="payment-form">
            <div class="form-group">
              <label for="from">From</label>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    // label="Date picker dialog"
                    format="DD/MM/yyyy"
                    onChange={(e) => {
                      setFrom(e._d);
                    }}
                    value={from}
                    // onChange={e => handleDateChange(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <div class="form-group">
              <label for="to">To</label>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    // label="Date picker dialog"
                    format="DD/MM/yyyy"
                    onChange={(e) => {
                      setTo(e._d);
                    }}
                    value={to}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <div class="form-group">
              <label for="vendorName">Vendor Name</label>
              <FormControl className={classes.formControl}>
                <Select
                  value={id}
                  displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {vendor.map((items, index) => {
                    return (
                      <MenuItem key={index} value={items.id}>
                        {" "}
                        {items.shop_name}{" "}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <button
              type="submit"
              class="btn btn-primary DateSelectSubmitBtn"
              onClick={(e) => {
                Submits(e);
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="innerDashboardHeading">
          <h1>Review</h1>
        </div>
        <div className="">
          <div className="reviewMain-div">
            <img className="reviewImage" src={reviewPhoto} alt="" />

            {reviews?.length > 0
              ? reviews?.map((review, index) => {
                  return (
                    <div className="reviewDiv">
                      <div className="reviewImg">
                        <img
                          src={avatar}
                          alt=""
                          style={{
                            borderRadius: "50%",
                            width: "60px",
                            height: "60px",
                          }}
                        />
                      </div>
                      <div className="reviewDescription">
                        <div className="reviewDescription-text">
                          <h3>{review?.reviewed_by?.name}</h3>
                          <h>{review?.reviewable?.shop_name}</h>
                          <p>{review?.review}</p>
                        </div>

                        <div className="reviewDescription-Btn">
                          <Popup
                            Open
                            nested
                            className="my-popup"
                            trigger={
                              <button
                                className="btn btn-primary"
                                style={{ cursor: "pointer" }}
                              >
                                {review?.is_review_published === 1
                                  ? "UnPublish"
                                  : "Publish"}
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
                                  {review?.is_review_published === 1
                                    ? "Unpublish"
                                    : "Publish"}{" "}
                                  this review?
                                </h6>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    handleChangeReview(review);
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
                                  Are you Sure you want to Delete this review?
                                </h6>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    handleDelete(review);
                                    DeleteReview(review);
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
                    </div>
                  );
                })
              : "Review not found"}
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
