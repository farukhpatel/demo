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

function Reward() {
  const [coupon_value, setCoupon_value] = useState(null);
  const [usage_limit_per_coupon, setUsage_limit_per_coupon] = useState(null);
  const [usage_limit_per_user, setUsage_limit_per_user] = useState(null);
  useEffect(() => {
    instance.get(API.GET_REWARD_COUPOUN).then(function (response) {
      setCoupon_value(Number(response.tax[0].value.coupon_value));
      setUsage_limit_per_coupon(
        Number(response.tax[0].value.usage_limit_per_coupon)
      );
      setUsage_limit_per_user(
        Number(response.tax[0].value.usage_limit_per_user)
      );
    });
  }, []);
  // time picker
  const form2Submit = (e) => {
    e.preventDefault();
    let data = {
      coupon_value: Number(coupon_value),
      usage_limit_per_coupon: Number(usage_limit_per_coupon),
      usage_limit_per_user: Number(usage_limit_per_user),
    };

    instance.post(API.POST_REWARD_COUPOUN, data).then(function (response) {
      toast.success(response.message);
      window.location.href = "/settings";
    });
  };

  return (
    <div>
      <div className="deliverySlot-container">
        <form>
          <div className="scheduels-container">
            <div>
              <label for="vendorName">Coupon value</label>
              <input
                type="number"
                class="form-control"
                id="vendorName"
                placeholder="Type here..."
                value={coupon_value}
                onChange={(e) => setCoupon_value(e.target.value)}
              />
            </div>

            <div>
              <label for="vendorName">Usage limit per coupon</label>
              <input
                type="number"
                class="form-control"
                id="vendorName"
                placeholder="Type here..."
                value={usage_limit_per_coupon}
                onChange={(e) => setUsage_limit_per_coupon(e.target.value)}
              />
            </div>
            <div>
              <label for="vendorName">Usage limit per user</label>
              <input
                type="number"
                class="form-control"
                id="vendorName"
                placeholder="Type here..."
                value={usage_limit_per_user}
                onChange={(e) => setUsage_limit_per_user(e.target.value)}
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

export default Reward;
