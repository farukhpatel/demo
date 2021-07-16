import React from "react";

import "../components/SuperUser.css";

function SettleModal() {
  return (
    <>
      <div className="main-outer-div Modal">
        <div className="myorders-outer-div">
          <div className="paymentsettle-inner-div">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="settle-details"
                  data-bs-toggle="tab"
                  data-bs-target="#settledetails"
                  type="button"
                  role="tab"
                  aria-controls="settle-details"
                  aria-selected="true"
                >
                  Settle{" "}
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active "
                id="settledetails"
                role="tabpanel"
                aria-labelledby="settle-details"
              >
                <div className="customer-details-content-outer-div">
                  <div className="customer-details-content-outer-div-top no-box-shadow">
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>From</h4>
                      </div>
                      <div className="content">
                        <p>23-01-21</p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>To</h4>
                      </div>
                      <div className="content">
                        <p>20-01-21</p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Amount</h4>
                      </div>
                      <div className="content">
                        <p>₹75</p>
                      </div>
                    </div>

                    <button className=" btn btn-primary SettlePayBtn">
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SettleModal;
