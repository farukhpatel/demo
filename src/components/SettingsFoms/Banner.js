// import { FilePicker } from 'react-file-picker'
import React, { useState, useEffect } from "react";

import "date-fns";

import "../SuperUser.css";
import "./deliverySlot.css";

//for Api
import API from "../../Utils/ApiConstant";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import instance from "../../Utils/axiosConstants";

function DeliveryCharge() {
  // time picker
  const [images, setImages] = useState([]);
  const [imagesURL, setImagesURL] = useState("");
  const form2Submit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("image", images[0]);
    await instance.post(API.IMAGE_UPLOAD, formdata).then(
      (res) => {
        setImagesURL(res.image_url);
      }
    )
    let imgObj = {
      "banner": imagesURL
    }
    instance.post(API.SETTING_BANNER_IMG, imgObj).then(function (response) {
      toast.success("Image Upload Successfully");
      window.location.href = "/settings";
    });
  }

  const selectFile = (e) => {
    setImages(e.target.files);
    // let temp = [...images];
    // console.log(temp.length);
    // if (e.target.files.length > 0) {
    //   if (e.target.files.length > 5) alert("Cannot upload more than 5 images");
    //   else {
    //     let values = Object.values(e.target.files);
    //     values.forEach((image) => {
    //       temp.push(URL.createObjectURL(image));
    //     });
    //   }
    // }

  };
  return (
    <div>
      <div className="deliverySlot-container">
        <form className="banner-form">
          <div className="banner-form-group">
            <input
              type="file"
              class="form-control"
              id="addBanner"
              placeholder="Upload Banner"
              multiple
              readOnly
              onChange={selectFile}
            />
          </div>
        </form>
      </div>
      <button
        type="submit"
        class="btn btn-primary submitBtn"
        onClick={form2Submit}
      >
        Submit
      </button>
    </div>
  );
}

export default DeliveryCharge;
