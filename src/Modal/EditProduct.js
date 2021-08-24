import React, { useState } from "react";
import API from "../Utils/ApiConstant";

import "../components/SuperUser.css";

// import moment from 'moment'   //for clock time
import "date-fns";
import { toast } from "react-toastify";
import instance from "../Utils/axiosConstants";

function EditProduct(props) {
  const productDetails = props?.productDetails;
  const [editProductData, setEditProductdata] = useState({
    shop_id: props?.shopId,
    product_id: productDetails?.product?.id,
    product_price: productDetails?.original_price,
    original_price: productDetails?.original_price,
    product_discount: productDetails?.product_discount,
    product_daily_stock: productDetails?.product_daily_stock,
    product_approval: "Accepted",
    product_discount_in_percentage:
      productDetails?.product_discount_in_percentage,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setEditProductdata({
      ...editProductData,
      [name]: value,
    });
  }

  function handleAddProduct() {
    console.log(editProductData);
    let error = false;
    Object.keys(editProductData).forEach((key) => {
      if (!error && editProductData[key] === "") {
        toast.error(`${key} can't be empty`);
        error = true;
      }
    });
    if (!error) {
      instance
        .patch(
          `${API.UPDATE_SHOP_PRODUCT}/${props?.productId}`,
          editProductData
        )
        .then(function (response) {
          toast.success(response.message);
          window.location.href = "/vendordetails";
        });
    }
  }
  return (
    <>
      <div className="main-outer-div Modal">
        <div className="myorders-outer-div">
          <div className=" paymentsettle-inner-div">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="disable"
                  data-bs-toggle="tab"
                  data-bs-target="#disable"
                  type="button"
                  role="tab"
                  aria-controls="item-details"
                  aria-selected="true"
                >
                  Edit Product
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active "
                id="disable"
                role="tabpanel"
                aria-labelledby="disable"
              >
                <div className="customer-details-content-outer-div">
                  <div className="customer-details-content-outer-div-top no-box-shadow">
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Product Original Price</h4>
                      </div>
                      <div className="content">
                        <input
                          type="number"
                          name="product_price"
                          defaultValue={editProductData?.original_price}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                    </div>

                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Product Discount(%)</h4>
                      </div>
                      <div className="content">
                        <input
                          type="number"
                          name="product_discount"
                          defaultValue={
                            editProductData?.product_discount_in_percentage
                          }
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Product Daily Stock</h4>
                      </div>
                      <div className="content">
                        <input
                          type="number"
                          name="product_daily_stock"
                          value={editProductData?.product_daily_stock}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>Product Approval</h4>
                      </div>
                      <div className="content">
                        <input type="text" value="Accepted" readOnly />
                      </div>
                    </div>
                    <button
                      className=" btn btn-primary DisableDeliveryBoyBtn"
                      onClick={handleAddProduct}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditProduct;
