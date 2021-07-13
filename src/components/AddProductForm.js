// import { FilePicker } from 'react-file-picker'
import React, { useState } from "react";
import "./SuperUser.css";
//for Api
import { APICall } from "../Utils/CommonFunctions";
import API from "../Utils/ApiConstant";
import { Select } from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [baseUnit, setBaseUnit] = useState("");
  const [unitType, setUnitType] = useState("gm");
  const [percentage, setPercentage] = useState(1);
  const [commission, setCommission] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    if (productImage) {
      console.log(productImage, "prodcut");
      let formdata = new FormData();
      formdata.append("image", productImage[0]);
      let object = {
        method: "POST",
        headers: headers,
        body: formdata,
        redirect: "follow",
      };

      APICall(API.IMAGE_UPLOAD, object, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result.status) {
          let body = {
            product_name: productName,
            product_image: result.image_url,
            commission: commission,
            is_percentage_commission: percentage,
            base_unit: `${baseUnit}${unitType}`,
          };
          let obj = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(body),
          };

          let error = false;
          Object.keys(body).forEach((key) => {
            if (!error && body[key] === "") {
              toast.error("One or more fields are empty.");
              error = true;
            }
          });
          if (!error) {
            APICall(API.CREATE_PRODUCT, obj, (error, res) => {
              if (error) {
                console.log(error);
              } else if (result.status) {
                toast.success("Successful creation of shop");
                window.location.href = "/productlist";
              } else {
                toast.error(result?.error);
                // window.location.href = '/productlist'
              }
            });
          }
        }
      });
    } else {
      toast.error("No file Picked.");
    }
  };
  return (
    <>
      <div className="main-outer-div">
        <ToastContainer />
        <div className="myorders-outer-div">
          <div className=" productlist-inner-div-form">
            <h1>Add Product</h1>
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
                <label for="productImage">Product Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="productImage"
                  placeholder="Product Image"
                  onChange={(e) => setProductImage(e.target.files)}
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
                  placeholder="eg: 1KG,5L etc"
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
              <button
                type="submit"
                class="btn btn-primary submitBtn"
                onClick={submit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProductForm;
