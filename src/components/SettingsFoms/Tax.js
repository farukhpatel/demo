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
  const [tax,setTax]=useState(null);
  // time picker
  const form2Submit = (e) => {
    e.preventDefault();
    let data={
      tax:tax
    }

    console.log(data);
    instance.post(API.SETTING_TAX, data).then(function (response) {
      toast.success("Tax Successfully Added.");
      window.location.href = "/settings";
    });
  };

  return (
    <div>
      <div className="deliverySlot-container">
        <form>
          <div className="scheduels-container">
            <div>
              <label for="vendorName">GST</label>
              <input
                type="number"
                class="form-control"
                id="vendorName"
                placeholder="Type here..."
                onChange={(e)=>setTax(e.target.value)}
              />
            </div>
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
