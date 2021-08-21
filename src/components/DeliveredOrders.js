import React from "react";
// import List from './List';
import "./SuperUser.css";
import TableData from "../Utils/TableData";
function Delivered() {
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
                  Delivered Orders
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
                <TableData orderType="DELIVERED" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Delivered;
