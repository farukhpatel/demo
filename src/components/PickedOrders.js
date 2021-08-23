import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";
import TableData from "../Utils/TableData";
function OutForDelivery() {
  const [search, setSearch] = useState("");
  const [pickedOrder, setPickedOrder] = useState([]);
  const SearchPickedOrder = (e) => {
    e.preventDefault();
    if (search === "") {
      toast.error("order not found");
    } else {
      instance.get(`${API.PICKED}&order_id=${search}`).then((res) => {
        if (res?.orders?.length > 0) {
          toast.success(res.message);
          setPickedOrder(res.orders);
        } else {
          toast.error("not found");
        }
      });
    }
  };
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
                  Picked Orders{" "}
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

                    <input
                      type="text"
                      placeholder="Enter order ID"
                      className="SearchInput"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" onClick={SearchPickedOrder}>
                      Search
                    </button>
                  </div>
                </div>
                <TableData orderType="PICKED" searchKey={pickedOrder} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OutForDelivery;
