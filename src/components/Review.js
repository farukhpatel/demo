import React, { useState, useEffect } from "react";
import avatar from "../assets/avatar3.png";
import reviewPhoto from "../assets/review.png";
import "../components/SuperUser.css";
//popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import instance from "../Utils/axiosConstants";
import API from "../Utils/ApiConstant";

function Review() {
  const [reviews, setReviews] = useState([]);
  function getReviews() {
    instance.get(API.GET_REVIEWS).then(function (response) {
      setReviews(response?.reviews);
    });
  }

  useEffect(() => {
    getReviews();
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
        window.location.reload();
      });
  };

  const handleDelete = (val) => {
    let newArray = [...arr];
    const filteredArr = newArray.filter((item) => item.id !== val.id);
    setArr(filteredArr);
  };

  return (
    <>
      <div className="main-outer-div">
        <div className="innerDashboardHeading">
          <h1>Review</h1>
        </div>
        <div className="myorders-outer-div ">
          <div className="reviewMain-div">
            <img className="reviewImage" src={reviewPhoto} alt="" />

            {reviews &&
              reviews?.map((review, index) => {
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
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
