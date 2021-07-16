/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//for Api
import { APICall } from "../Utils/CommonFunctions";
import API from "../Utils/ApiConstant";
import Popup from "reactjs-popup";
import AddProductModal from "../Modal/AddProduct";

function VendorDetails(props) {
  console.log(props);
  const vendorDetails = props?.location?.state?.vendor || {};
  const [products, setProducts] = useState({});
  const [isSellingVisible, setIsSellingVisible] = useState(false);
  // const orderProducts = props?.location?.state?.order?.order_products || [];

  useEffect(() => {
    let obj = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    APICall(
      `${API.GET_SHOP_PRODUCTS}?shop_id=${vendorDetails?.id}&selling_products=true&non_selling_products=true`,
      obj,
      (err, result) => {
        if (err) {
          console.log(err);
        } else if (result.status) {
          console.log(result?.products?.nonselling_products);
          setProducts(result?.products);
        }
      }
    );
  }, []);
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="myorders-inner-div details-outer-div">
            <div className="details-div">
              <div className="details-div-left">
                <i class="fas fa-store fa-3x" style={{ color: "#575353" }}></i>
                <div className="details-content">
                  <h2>{vendorDetails?.shop_name}</h2>
                  <p>{vendorDetails?.shop_description}</p>
                  <h5>
                    Founding Date:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {vendorDetails?.shop_founding_date}
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
                      {vendorDetails?.shop_owner?.name}
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
                      {vendorDetails?.shop_phone}
                    </span>
                  </h5>

                  <h5>
                    Licence No:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {vendorDetails?.shop_license_number}
                    </span>
                  </h5>

                  <h5>
                    Shop Status:
                    <button className="assign-btn">
                      {vendorDetails?.is_shop_active ? "Active" : " InActive"}
                    </button>
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
                    onClick={() => setIsSellingVisible(true)}
                  >
                    Selling Products
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
                    onClick={() => setIsSellingVisible(false)}
                  >
                    Non-Selling Products
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
                  {isSellingVisible ? (
                    <div
                      class="tab-pane fade show active"
                      id="ordersdetails"
                      role="tabpanel"
                      aria-labelledby="orders-details"
                    >
                      <table class="table table-striped">
                        <thead>
                          <tr align="center">
                            <th scope="col">S.No</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Original Price</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Product Daily Stock</th>
                            <th scope="col">Product Daily Stock Remaining</th>
                            <th scope="col">Base Unit</th>
                            <th scope="col">Commission</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products?.selling_products?.length > 0 &&
                            products?.selling_products?.map((value, index) => {
                              return (
                                <tr align="center">
                                  <th scope="row">{index + 1}</th>
                                  <td>{value?.product?.product_name}</td>
                                  <td>₹{value?.original_price}</td>
                                  <td>₹{value?.product_price}</td>
                                  <td>{value?.product_daily_stock}</td>
                                  <td>
                                    {value?.product_daily_stock_remaining}
                                  </td>
                                  <td>{value?.product?.base_unit}</td>
                                  <td>
                                    {value?.product?.commission}
                                    {value?.product
                                      ?.is_percentage_commission === 1 && "%"}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div
                      class="tab-pane fade show active"
                      id="ordersdetails"
                      role="tabpanel"
                      aria-labelledby="orders-details"
                    >
                      <table class="table table-striped">
                        <thead>
                          <tr align="center">
                            <th scope="col">S.No</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Base Unit</th>
                            <th scope="col">Commission</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {products?.nonselling_products?.length > 0 &&
                            products?.nonselling_products?.map(
                              (value, index) => {
                                console.log(value);
                                return (
                                  <tr align="center">
                                    <th scope="row">{index + 1}</th>
                                    <td>{value?.product_name}</td>
                                    <td>
                                      <img
                                        src={value?.product_image}
                                        height="50"
                                        alt="product_image"
                                      />
                                    </td>
                                    <td>{value?.base_unit}</td>
                                    <td>
                                      {value?.commission}
                                      {value?.is_percentage_commission === 1 &&
                                        "%"}
                                    </td>
                                    <Popup
                                      trigger={
                                        <td style={{ cursor: "pointer" }}>
                                          <button>Add Product</button>
                                        </td>
                                      }
                                      position="right center"
                                      modal
                                    >
                                      <AddProductModal />
                                    </Popup>
                                  </tr>
                                );
                              }
                            )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* {!isSellingVisible && (
                  
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default VendorDetails;
