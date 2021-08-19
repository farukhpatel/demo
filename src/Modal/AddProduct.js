import React, { useState } from "react";
import API from "../Utils/ApiConstant";

import instance from "../Utils/axiosConstants";

import "../components/SuperUser.css";

import "date-fns";
import { toast } from "react-toastify";

function AddProduct(props) {
  const [addProductData, setAddProductData] = useState({
    shop_id: props?.shopId,
    product_id: props?.productId,
    product_price: "",
    product_discount: 0,
    product_daily_stock: "",
    product_approval: "Accepted",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setAddProductData({
      ...addProductData,
      [name]: value,
    });
  }

  function handleAddProduct() {
    console.log(addProductData);

    let error = false;
    Object.keys(addProductData).forEach((key) => {
      if (!error && addProductData[key] === "") {
        toast.error(`${key} can't be empty`);
        error = true;
      }
    });
    if (!error) {
      instance
        .post(API.ADD_SHOP_PRODUCT, addProductData)
        .then(function (response) {
          toast.success("Product Added Successdully.");
          window.location.href = "/vendordetails";
        });
    }
  }
  return (
    <>
      <div className="main-outer-div Modal popup-add-product">
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
                  Add Product
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
                        <h4>Product Price</h4>
                      </div>
                      <div className="content">
                        <input
                          type="number"
                          name="product_price"
                          value={addProductData?.product_price}
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
                          value={addProductData?.product_discount}
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
                          value={addProductData?.product_daily_stock}
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
                      Add
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
export default AddProduct;
