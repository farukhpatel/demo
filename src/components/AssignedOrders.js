import React from "react";
import TableData from "../Utils/TableData";

function AssignedOrders() {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const date = new Date();
  const Time = date.toLocaleTimeString();

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
                  Assigned Orders{" "}
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
                <TableData orderType="ASSIGNED_ORDERS" />

                {/* <table className=" table" style={{ background: "white" }}>
                                    <thead>
                                        <tr>

                                            <th scope="col">Order Id</th>
                                            <th scope="col">Cust. Id.</th>
                                            <th scope="col">Seller Name</th>
                                            <th scope="col">Time Alloted</th>
                                            <th scope="col">Delivery Slot</th>
                                            <th scope="col">Locality</th>
                                            <th scope="col">Order Status</th>
                                            <th scope="col">Payment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <td><a href="/orderdetails">{index + 1}</a></td>
                                                        <td><a href="/orderdetails">{index + 1}</a></td>
                                                        <td>Harish Dairy</td>
                                                        <td>{Time}</td>
                                                        <td>2pm to 5pm</td>
                                                        <td>146/A Umar Nagar Hapur Road Meerut</td>
                                                        <td>Out for Delivery</td>
                                                        <td>Paid</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AssignedOrders;
