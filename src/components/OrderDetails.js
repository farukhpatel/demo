import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import RefundModal from "../Modal/RefundModal";
import SettleModal from "../Modal/SettleModal";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";

function OrderDetails(props) {
  console.log("orderDetails", props);
  const [orderDetails, setOrderDetails] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [filterId, setFilterId] = useState([]);
  const [checked, setChecked] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (props.location.state.orderId) {
      instance
        .get(`${API.ORDER_DETAIL}${props?.location?.state?.orderId}`)
        .then((res) => {
          console.log(res);
          setOrderDetails(res.orders[0]);
          setOrderProducts(res.orders[0].order_products);
          let l = res.orders[0].order_products?.length;
          if (l > 0) {
            let a = new Array(l).fill(false);
            console.log(a);
            setChecked(a);
          }
        });
    } else {
      setOrderDetails(props?.location?.state?.order);
      setOrderProducts(props?.location?.state?.order?.order_products);
      let l = props?.location?.state?.order?.order_products.length;
      if (l > 0) {
        let a = new Array(l).fill(false);
        console.log(a);
        setChecked(a);
      }
    }
  }, []);
  useEffect(() => {
    console.log("total amount", totalAmount);
    console.log("filter id", filterId);
  }, [filterId, totalAmount]);

  const CheckboxHandle = (value, index) => {
    if (!checked[index]) {
      console.log("if", totalAmount);
      let tempFilterId = filterId;
      tempFilterId.push(value?.id);
      setFilterId(tempFilterId);
      setTotalAmount(totalAmount + value?.product_total_amount);
    } else {
      console.log("else", totalAmount);
      let tempFilterId = filterId;
      setFilterId(
        tempFilterId.filter((v, i) => {
          return v !== value.id;
        })
      );
      setTotalAmount(totalAmount - value?.product_total_amount);
    }
    let tempArray = [...checked];
    tempArray[index] === true
      ? (tempArray[index] = false)
      : (tempArray[index] = true);
    setChecked(tempArray);
  };
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="myorders-inner-div details-outer-div">
            <div className="details-div">
              <div className="details-div-left">
                <i class="fas fa-store fa-3x" style={{ color: "#575353" }}></i>
                <div className="details-content">
                  <h2>
                    Shop Name{" "}
                    {orderDetails?.shop?.shop_name
                      ? orderDetails?.shop?.shop_name
                      : " "}
                  </h2>
                  <p>{`${orderDetails?.shop?.address?.address_line_1 || " "} ${
                    orderDetails?.shop?.address?.address_line_2 || ""
                  } ${orderDetails?.shop?.address?.address_line_3 || ""}`}</p>
                  <p>{`${
                    orderDetails?.shop?.address?.locality?.locality || " "
                  } ${orderDetails?.shop?.address?.city?.city || ""} ${
                    orderDetails?.shop?.address?.state || ""
                  }`}</p>
                  <h5>
                    Delivery Boy:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {orderDetails?.assigned_to?.name
                        ? orderDetails?.assigned_to?.name
                        : " "}
                    </span>
                  </h5>
                  <h5>
                    Delivery Status:
                    <button className="assign-btn">
                      {orderDetails?.delivered_at === null
                        ? "Pending"
                        : "Delivered"}
                    </button>
                  </h5>
                  <div className="customer-details-content-outer-div-bottom">
                    <Popup
                      trigger={
                        <td style={{ cursor: "pointer" }}>
                          <button
                            type="submit"
                            class="btn btn-primary SettlePayBtn"
                            onClick={() => {
                              setModalOpen(true);
                            }}
                          >
                            Refund
                          </button>
                        </td>
                      }
                      position="right center"
                      modal={modalOpen}
                    >
                      {modalOpen && (
                        <RefundModal
                          refund_amount={totalAmount}
                          order_product_ids={filterId}
                          id={orderDetails?.id}
                          handleModal={setModalOpen}
                        />
                      )}
                    </Popup>
                  </div>
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
                <div className="customer-details-content-outer-div">
                  <div className="customer-details-content-outer-div-top">
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Name</h4>
                      </div>
                      <div className="content">
                        <p>
                          {orderDetails.user?.name
                            ? orderDetails.user?.name
                            : " "}
                        </p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Phone No.</h4>
                      </div>
                      <div className="content">
                        <p>
                          {orderDetails.user?.phone
                            ? orderDetails.user?.phone
                            : " "}
                        </p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Email</h4>
                      </div>
                      <div className="content">
                        <p>
                          {orderDetails.user?.email
                            ? orderDetails.user?.email
                            : " "}
                        </p>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Address</h4>
                      </div>
                      <div className="content">
                        <p>{`${orderDetails?.address?.address_line_1 || " "} ${
                          orderDetails?.address?.address_line_2 || ""
                        } ${orderDetails?.address?.address_line_3 || ""}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="tab-pane fade show active "
                id="ordersdetails"
                role="tabpanel"
                aria-labelledby="orders-details"
              >
                <div className="table-responsive">
                  <table
                    class="table table-striped"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Item Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Base unit</th>
                        <th scope="col">Total Price</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {orderProducts && orderProducts?.length > 0 ? (
                        orderProducts.map((value, index) => {
                          console.log("v", value);
                          return (
                            <tr>
                              <th scope="row">
                                <input
                                  type="checkbox"
                                  onClick={(e) => CheckboxHandle(value, index)}
                                  checked={checked[index]}
                                  disabled={
                                    value.is_product_amount_refunded === 0
                                      ? false
                                      : true
                                  }
                                />{" "}
                                {index + 1}
                              </th>
                              <td>
                                {value?.shop_product?.product?.product_name}
                              </td>
                              <td>₹{value?.product_total_amount}</td>
                              <td>{value?.product_quantity}</td>
                              <td>{value?.shop_product?.product?.base_unit}</td>
                              <td>₹{value?.product_net_amount}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <>
                          {" "}
                          <tr>
                            {" "}
                            <td colSpan="5">
                              {" "}
                              <h2> No record found </h2>{" "}
                            </td>{" "}
                          </tr>{" "}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* other details*/}
                <div style={{ marginLeft: "20px" }}>
                  {console.log("orderDetails", orderDetails)}
                  <h5>Tax: {orderDetails?.order_tax}</h5>
                  <h5>Discount: {orderDetails?.order_discount}</h5>
                  <h5>Delivery Charge: {orderDetails?.delivery_charge}</h5>
                  <h4>Total amount: {orderDetails?.order_total_amount}</h4>
                </div>
                {/* others details end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderDetails;
