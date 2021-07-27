import React from "react";

function OrderDetails(props) {
  console.log(props.location.state);
  const orderDetails = props?.location?.state?.order || {};
  const orderProducts = props?.location?.state?.order?.order_products || [];
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="myorders-inner-div details-outer-div">
            <div className="details-div">
              <div className="details-div-left">
                <i class="fas fa-store fa-3x" style={{ color: "#575353" }}></i>
                <div className="details-content">
                  <h2>Shop Name {orderDetails?.shop?.shop_name  ? orderDetails?.shop?.shop_name : "Not found"}</h2>
                  <p>{`${orderDetails?.shop?.address?.address_line_1||"Not found"} ${orderDetails?.shop?.address?.address_line_2 || ""} ${orderDetails?.shop?.address?.address_line_3 || ""}`}</p>
                  <p>{`${orderDetails?.shop?.address?.locality?.locality||"Not found"} ${orderDetails?.shop?.address?.city?.city||""} ${orderDetails?.shop?.address?.state||""}`}</p>
                  <h5>
                    Delivery Boy:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {orderDetails?.assigned_to?.name ? orderDetails?.assigned_to?.name:"Not found" }
                    </span>
                  </h5>
                  <h5>
                    Delivery Status:
                    <button className="assign-btn">Status</button>
                  </h5>
                </div>
              </div>
            </div>

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
                <div className="customer-details-content-outer-div">
                  <div className="customer-details-content-outer-div-top">
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Name</h4>
                      </div>
                      <div className="content">
                        <p>{props.location.state.name ? props.location.state.name : "Not found" }</p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Phone No.</h4>
                      </div>
                      <div className="content">
                        <p>{props.location.state.phone ? props.location.state.phone : "Not found" }</p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Email</h4>
                      </div>
                      <div className="content">
                        <p>{props.location.state.email ? props.location.state.email : "Not found" }</p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Address</h4>
                      </div>
                      <div className="content">
                      <p>{`${orderDetails?.address?.address_line_1||"Not found"} ${orderDetails?.address?.address_line_2 || ""} ${orderDetails?.address?.address_line_3 || ""}`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="customer-details-content-outer-div-bottom">
                    <button className="btn btn-primary">Blocked</button>
                    <button className="btn btn-primary">Reject</button>
                  </div>
                </div>
              </div>

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
                  <tbody style={{textAlign:"center"}}>
                    {orderProducts && orderProducts?.length > 0 ?
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
                      }) :<> <tr> <td colSpan="5" > <h2> No record found </h2> </td> </tr>  </>  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderDetails;
