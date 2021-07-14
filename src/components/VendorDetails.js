import React from "react";

function VendorDetails(props) {
  // const shopDetails = props?.location?.state?.order || {};
  // const orderProducts = props?.location?.state?.order?.order_products || [];
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="myorders-inner-div details-outer-div">
            <div className="details-div">
              <div className="details-div-left">
                <i class="fas fa-store fa-3x" style={{ color: "#575353" }}></i>
                <div className="details-content">
                  <h2>Vendor Name </h2>
                  <p>{`Something about the shop`}</p>
                  <h5>
                   Founding Date:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {`22/7/10`}
                    </span>
                  </h5>
                 
                  <h5>
                   Owner:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {`Atul Bhatt`}
                    </span>
                  </h5>

                  <h5>
                   Phone:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {`8958318394`}
                    </span>
                  </h5>
                 
                  <h5>
                   Licennce No:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {`UK0612Af`}
                    </span>
                  </h5>
                 
                  <h5>
                    Delivery Status:
                    <button className="assign-btn">Accepted</button>
                  </h5>
                </div>
              </div>
            </div>
            <div className="navigation-area">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link "
                  id="customers-details"
                  data-bs-toggle="tab"
                  data-bs-target="#customersdetails"
                  type="button"
                  role="tab"
                  aria-controls="customers-details"
                  aria-selected="false"
                >
                  Customer Details
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="orders-details"
                  data-bs-toggle="tab"
                  data-bs-target="#ordersdetails"
                  type="button"
                  role="tab"
                  aria-controls="orders-details"
                  aria-selected="true"
                >
                  Orders Details
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade "
                id="customersdetails"
                role="tabpanel"
                aria-labelledby="customer-details"
              >
                {/* <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                </div> */}
                {/* <div className="customer-details-content-outer-div">
                  <div className="customer-details-content-outer-div-top">
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Name</h4>
                      </div>
                      <div className="content">
                        <p>{orderDetails?.user?.name}</p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Phone No.</h4>
                      </div>
                      <div className="content">
                        <p>{orderDetails?.user?.phone}</p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Email</h4>
                      </div>
                      <div className="content">
                        <p>{orderDetails?.user?.email}</p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Address</h4>
                      </div>
                      <div className="content">
                      <p>{`${orderDetails?.address?.address_line_1||""}, ${orderDetails?.address?.address_line_2 || ""}, ${orderDetails?.address?.address_line_3 || ""}`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="customer-details-content-outer-div-bottom">
                    <button className="btn btn-primary">Blocked</button>
                    <button className="btn btn-primary">Reject</button>
                  </div>
                </div> */}

              </div>
{/* 

              <div
                class="tab-pane fade show active"
                id="ordersdetails"
                role="tabpanel"
                aria-labelledby="orders-details"
              >
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Item Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderProducts?.length > 0 &&
                      orderProducts.map((value, index) => {
                        return (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>
                              {value?.shop_product?.product?.product_name}
                            </td>
                            <td>₹{value?.product_total_amount}</td>
                            <td>{value?.product_quantity}</td>
                            <td>₹{value?.product_net_amount}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
       */}
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default VendorDetails;
