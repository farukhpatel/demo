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

  const [charge, setCharge] = useState(null);
  const [cart_cut_off_value, setCart_cut_off_value] = useState(null);
  useEffect(() => {

    instance.get(API.GET_SETTING_DELIVERY_CHARGE)
      .then(function (response) {
        // console.log(response.delivery_charge[0].value);
        setCharge(response.delivery_charge[0].value.charge)
        setCart_cut_off_value(response.delivery_charge[0].value.cart_cut_off_value);
      })
  }, []);
  // time picker
  const form2Submit = (e) => {
    e.preventDefault();
    let data = {
      charge,
      cart_cut_off_value
    }

    console.log(data);
    instance.post(API.SETTING_DELIVERY_CHARGE, data).then(function (response) {
      toast.success("Delivery Charge Successfully Added.");
      window.location.href = "/settings";
    });
  };

  return (
    <div>
      <div className="deliverySlot-container">
        <form>
          <div className="scheduels-container">
            <div>
              <label for="vendorName">Charge</label>
              <input
                type="number"
                class="form-control"
                id="vendorName"
                placeholder="Type here..."
                value={charge}
                onChange={(e) => setCharge(e.target.value)}
              />
            </div>

            <div>
              <label for="vendorName">Cart Value for Shipping</label>
              <input
                type="number"
                class="form-control"
                id="vendorName"
                placeholder="Type here..."
                value={cart_cut_off_value}
                onChange={(e) => setCart_cut_off_value(e.target.value)}
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
