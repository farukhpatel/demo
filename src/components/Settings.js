import React, { useState } from "react";
import "date-fns";
//popup
import "reactjs-popup/dist/index.css";
// modal
import DeliverySlot from "./SettingsFoms/DeliverySlots";
import Tax from "./SettingsFoms/Tax";
import Banner from "./SettingsFoms/Banner";
import DeliveryCharge from "./SettingsFoms/DeliveryCharge";
import Referral from "./SettingsFoms/Referral";
import Reward from "./SettingsFoms/Reward";

function Settings() {
  const [visibleNav, setVisibleNav] = useState("delivery-slot");

  return (
    <>
      <div className="main-outer-div">
        <div className="payment-settlement-inputs">
          <h2>Settings</h2>
        </div>
        <div className="myorders-outer-div">
          <div className="myorders-inner-div paymentsettle-inner-div">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="remaining-payments"
                  data-bs-toggle="tab"
                  data-bs-target="#remainingpayments"
                  type="button"
                  role="tab"
                  aria-controls="remaining-payments"
                  aria-selected="true"
                  name="delivery-slot"
                  onClick={() => setVisibleNav("delivery-slot")}
                >
                  Delivery Slots
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link "
                  id="paid-payments"
                  data-bs-toggle="tab"
                  data-bs-target="#paidpayments"
                  type="button"
                  role="tab"
                  aria-controls="paid-payments"
                  aria-selected="false"
                  name="delivery-charge"
                  onClick={() => setVisibleNav("delivery-charge")}
                >
                  Delivery Charge
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  class="nav-link "
                  id="paid-payments"
                  data-bs-toggle="tab"
                  data-bs-target="#paidpayments"
                  type="button"
                  role="tab"
                  aria-controls="paid-payments"
                  aria-selected="false"
                  name="banner"
                  onClick={() => setVisibleNav("banner")}
                >
                  Banner
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  class="nav-link "
                  id="paid-payments"
                  data-bs-toggle="tab"
                  data-bs-target="#paidpayments"
                  type="button"
                  role="tab"
                  aria-controls="paid-payments"
                  aria-selected="false"
                  name="tax"
                  onClick={() => setVisibleNav("tax")}
                >
                  Tax
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  class="nav-link "
                  id="paid-payments"
                  data-bs-toggle="tab"
                  data-bs-target="#paidpayments"
                  type="button"
                  role="tab"
                  aria-controls="paid-payments"
                  aria-selected="false"
                  name="referral_coupon"
                  onClick={() => setVisibleNav("referral_coupon")}
                >
                  Referral coupon
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  class="nav-link "
                  id="paid-payments"
                  data-bs-toggle="tab"
                  data-bs-target="#paidpayments"
                  type="button"
                  role="tab"
                  aria-controls="paid-payments"
                  aria-selected="false"
                  name="reward_coupon"
                  onClick={() => setVisibleNav("reward_coupon")}
                >
                  Reward coupon
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              {visibleNav === "delivery-slot" ? (
                <DeliverySlot />
              ) : visibleNav === "delivery-charge" ? (
                <DeliveryCharge />
              ) : visibleNav === "tax" ? (
                <Tax />
              ) : visibleNav === "banner" ? (
                <Banner />
              ) : visibleNav === "referral_coupon" ? (
                <Referral />
              ) : (
                <Reward />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Settings;
