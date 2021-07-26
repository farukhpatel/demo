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
  let {id}=useParams();
  const prop =props.location.state
//   console.log(prop);
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState(prop.product_name);
  const [productImage, setProductImage] = useState(prop.product_image);
  const [baseUnit, setBaseUnit] = useState(prop.base_unit.match(/\d+/g)[0]);
  const [unitType, setUnitType] = useState(prop.base_unit.match(/[a-zA-Z]+/g)[0]);
 console.log(prop.base_unit.match(/[a-zA-Z]+/g));
  const submit = async(e) => {
    e.preventDefault();
    console.log("edit product");
    console.log(productImage);
    // console.log(productImage);
    console.log(localStorage.getItem("token"));
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    if (file) {
        console.log("is called")

        // console.log(file, "imgForm");
        // console.log(file);
        let formdata = new FormData();
        formdata.append("image", file[0]);
        await instance.post(API.IMAGE_UPLOAD,formdata)
        .then(function(response){
            setProductImage( response.image_url)})
            
        // console.log(file[0].name);
        // setProductImage(file[0].name);
    }
    
    let updateProductData={
        id:prop.id,
        product_name:productName,
        product_image:productImage,
        base_unit:`${baseUnit}${unitType}`,
        commission:prop.commission,
        is_percentage_commission:prop.is_percentage_commission,
        is_subscribable_product:prop.is_subscribable_product,

    }
    console.log("object");
    console.log(updateProductData);
    console.log(headers)
      instance.patch(`${API.UPDATE_PRODUCT}/${id}`,updateProductData)
      .then(res=>{
        toast.success("Successful edit of product");
        window.location.href = "/productlist";
      })
    //   .then(function(response){
    //     let body = {
    //       product_name: productName,
    //       product_image: response.image_url,
    //       commission: commission,
    //       is_percentage_commission: percentage,
    //       base_unit: `${baseUnit}${unitType}`,
    //     };

    //     let error = false;
    //     Object.keys(body).forEach((key) => {
    //       if (!error && body[key] === "") {
    //         toast.error("One or more fields are empty.");
    //         error = true;
    //       }
    //     });
    //     if (!error) {
    //       instance.post(API.CREATE_PRODUCT,body)
    //       .then(function(response){
    //         toast.success("Successful creation of shop");
    //         window.location.href = "/productlist";
    //       })
    //     }
    //   })
      
    // } else {
    //   toast.error("No file Picked.");
    // }
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
