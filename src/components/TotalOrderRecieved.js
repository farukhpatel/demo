import React, { useState } from "react";
import "./SuperUser.css";
import TableData from "../Utils/TableData";
import instance from "../Utils/axiosConstants";
import API from "../Utils/ApiConstant";
import { toast } from "react-toastify";
function TotalOrderRecieved() {
  const [search, setSearch] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const searchOrder = (e) => {
    e.preventDefault();
    console.log(search)
    if (search === '') {
      toast.error("order not found");
    } else {
      instance.get(`${API.GET_TOTAL_ORDER}?order_id=${search}`).then(function (response) {
        console.log('search res', response);
        // setAssigned(response.orders);
        if (response?.orders?.length > 0) {
          toast.success(response.message);
          setSearchKey(response?.orders);
        } else {
          toast.error("order not found");
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
                {/* <div className="btn-position">
                  <div className="searchStyle">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input placeholder="Search..." className="SearchInput" />
                  </div>
                </div> */}
                <div className="btn-position">
                  <div className="searchStyle">
                    <i class="fa fa-search" aria-hidden="true"></i>

                    <input
                      type="text"
                      placeholder="Order Id"
                      className="SearchInput"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      type="submit"
                      onClick={(e) => {
                        searchOrder(e);
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>

                <TableData orderType="TOTAL_ORDER_RECIEVED" searchKey={searchKey} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TotalOrderRecieved;
