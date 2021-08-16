import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";
import TableData from "../Utils/TableData";

function AssignedOrders() {
  const [search, setSearch] = useState('');
  const [assignOrder, setAssignOrder] = useState([]);
  const SearchAssignerOrder = (e) => {
    e.preventDefault();
    console.log('work', search);
    if (search === '') {
      toast.error("order not found");
    }
    else {
      instance.get(`${API.ASSIGNED_ORDERS}&order_id=${search}`).then((res) => {

        if (res?.orders?.length > 0) {
          console.log('res search', res)
          toast.success(res.message);
          setAssignOrder(res.orders);
        }
        else {
          toast.error("not found");
        }
      });
    }

  }
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

                    <input
                      type="text"
                      placeholder="Enter order ID"
                      className="SearchInput"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      type="submit"
                      onClick={
                        SearchAssignerOrder
                      }
                    >
                      Search
                    </button>
                  </div>
                </div>

                <TableData orderType="ASSIGNED_ORDERS" searchKey={assignOrder} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AssignedOrders;
