import React, { useState } from "react";
import "./SuperUser.css";
//for Api
import API from "../Utils/ApiConstant";
import { Select } from "@material-ui/core";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import instance from "../Utils/axiosConstants"
import { useParams } from "react-router-dom";

function UpdateProduct(props) {
  let { id } = useParams();
  const prop = props.location.state
  // console.log(prop.is_percentage_commission)
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState(prop.product_name);
  const [productImage, setProductImage] = useState(prop.product_image);
  const [baseUnit, setBaseUnit] = useState(prop.base_unit.match(/\d+/g)[0]);
  const [unitType, setUnitType] = useState(prop.base_unit.match(/[a-zA-Z]+/g)[0]);
  const [commission, setCommission] = useState(prop.commission);
  const [subscribable, setSubscribable] = useState(prop.is_subscribable_product);
  const [percentage, setPercentage] = useState(prop.is_percentage_commission);
  console.log(percentage)
  console.log(subscribable)
  const submit = async (e) => {
    e.preventDefault();
    let headers = new Headers();
    let updateProductData;
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    if (file) {
      let formdata = new FormData();
      formdata.append("image", file[0]);
      await instance.post(API.IMAGE_UPLOAD, formdata)
        .then((response) => {
          updateProductData = {
            id: prop.id,
            product_name: productName,
            product_image: response.image_url,
            base_unit: `${baseUnit}${unitType}`,
            commission: commission,
            is_percentage_commission: percentage,
            is_subscribable_product: subscribable,
          }
        })
    }
    let updateProductData2 = {
      id: prop.id,
      product_name: productName,
      product_image: productImage,
      base_unit: `${baseUnit}${unitType}`,
      commission: commission,
      is_percentage_commission: percentage,
      is_subscribable_product: subscribable,
    }
    console.log(updateProductData ? updateProductData : updateProductData2)
    instance.patch(`${API.UPDATE_PRODUCT}/${id}`, updateProductData ? updateProductData : updateProductData2)
      .then(res => {
        toast.success(res.message);
        window.location.href = "/productlist";
      })

  };
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className=" productlist-inner-div-form">
            <h1>Edit Product</h1>
            <form className="productadd-form">
              <span className="customSpan"></span>
              <div class="form-group">
                <label for="productName">Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  value={productName}
                  placeholder="Product Name"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div class="form-group">

                <label for="productImage" name="Change file">Product Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="productImage"
                  placeholder="Product Image"
                  onChange={(e) => setFile(e.target.files)}
                />
              </div>
              <div class="form-group">
                <label for="baseUnit">Commission</label>

                <input
                  type="text"
                  class="form-control"
                  id="baseUnit"
                  placeholder="eg: 10, 20 30"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="baseUnit">Commision in %</label>
                <Select
                  value={percentage}
                  onChange={(event) => setPercentage(event.target.value)}
                >
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </Select>
              </div>

              <div class="form-group">
                <label for="baseUnit">Base Unit</label>
                <input
                  type="number"
                  class="form-control"
                  id="baseUnit"
                  value={baseUnit}
                  placeholder="gm kg ml ltr"
                  onChange={(e) => setBaseUnit(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="baseUnit">Unit</label>
                <Select
                  value={unitType}
                  onChange={(event) => setUnitType(event.target.value)}
                >
                  <option value={"ml"}>ml</option>
                  <option value={"gm"}>gm</option>
                  <option value={"mg"}>mg</option>
                  <option value={"ltr"}>ltr</option>
                  <option value={"kg"}>kg</option>
                </Select>
              </div>
              <div class="form-group">
                <label for="baseUnit">Is Subscribable Product</label>
                <Select
                  value={subscribable}
                  onChange={(event) => setSubscribable(event.target.value)}
                >
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </Select>
              </div>
              <button
                type="submit"
                class="btn btn-primary submitBtn"
                onClick={submit}
              >
                Edit Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
