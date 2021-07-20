import React from "react";
import "./SuperUser.css";
import TableData from "../Utils/TableData";
function TotalOrderRecieved() {

  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="myorders-inner-div">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="total-orders-recieved"
                  data-bs-toggle="tab"
                  data-bs-target="#totalordersrecieved"
                  type="button"
                  role="tab"
                  aria-controls="total-orders-recieved"
                  aria-selected="true"
                >
                  Total Orders Recieved
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active "
                id="totalorderrecieved"
                role="tabpanel"
                aria-labelledby="total-orders-recieved"
              >
                <div className="btn-position">
                  <div className="searchStyle">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input placeholder="Search..." className="SearchInput" />
                  </div>
                </div>
                <TableData orderType="TOTAL_ORDER_RECIEVED" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TotalOrderRecieved;
