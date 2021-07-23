// import { FilePicker } from 'react-file-picker'
import React, { useState, useEffect } from "react";

import MultiSelect from "react-multi-select-component";
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid"; //clock
import MomentUtils from "@date-io/moment"; //clock
import moment from "moment"; //for clock time
import "date-fns";

import "./SuperUser.css";

//for Api
import API from "../Utils/ApiConstant";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import instance from "../Utils/axiosConstants";

function UpdateVendorForm(props) {
    const prop =props.location.state
  // multiselect
  const options = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ];
  const [selected, setSelected] = useState([]);

  // form fields var
  const [file, setFile] = useState(null);
  const [phone, setPhone] = useState(prop.shop_phone);
  const [description, setDescription] = useState(prop.shop_description);
  const [licenseNumber, setLicenseNumber] = useState(prop.shop_license_number);
  const [foundationDate, setFoundationDate] = useState(prop.shop_founding_date);
  const [deliveryRange, setDeliveryRange] = useState(prop.shop_delivery_range);
  const [shopName, setShopName] = useState(prop.shop_name);


  // date picker
  const handleDateChange = (e) => {
    setFoundationDate(e);
  };
console.log(prop);

  // form1
  const form1Submit = (e) => {
    e.preventDefault();
    let shopCreateBody = {
         user_id: prop.user_id,
          shop_name: shopName,
          shop_phone: phone,
          shop_description: description,
        //   shop_profile: response.image_url,
          shop_license_number: licenseNumber,
          shop_founding_date: moment(foundationDate).format("YYYY-MM-DD"),
          shop_delivery_range: deliveryRange,
        };

        // let error = false;
        console.log(shopCreateBody);
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    if (file) {
      let formdata = new FormData();
      formdata.append("image", file[0]);
      instance.post(API.IMAGE_UPLOAD, formdata).then(function (response) {

        
        // Object.keys(shopCreateBody).forEach((key) => {
        //   if (!error && shopCreateBody[key] === "") {
        //     toast.error("One or more fields are empty.");
        //     error = true;
        //   }
        // });
        // if (!error) {
          
        // //   instance.post(API.CREATE_USER, body).then(function (response) {
        // //     shopCreateBody = {...shopCreateBody,user_id: response.user.id,}
        // //     instance.post(API.CREATE_SHOP, shopCreateBody).then(function (shopCreateResponse) {
        // //       console.log(shopCreateResponse?.shop?.id);
        // //       toast.success("Vendor Updated");
        // //     });
        // //   });
          
        // }
      });
    } else {
      toast.error("No file Picked.");
    }
  };
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
            <>
              <div className="vendor-form-1 ">
                <h1>Edit Vendor</h1>
                <div className="vendor-update">
                <form className="vendor-form update-form">
                  <span className="customSpan"></span>
                    <div class="form-group">
                      <label for="vendorName">Shop Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="vendorName"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label for="shopPhone">Shop Phone</label>
                      <input
                        type="text"
                        class="form-control"
                        id="shopPhone"
                        placeholder={phone}
                        readOnly
                      />
                    </div>
                    <div class="form-group">
                      <label for="shopdescription">Shop Description</label>
                      <textarea
                        class="form-control"
                        id="shopdescription"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label for="profile">Profile:</label>
                      <input
                        type="file"
                        class="form-control"
                        id="profile"
                        name="profile"
                        onChange={(e) => setFile(e.target.files)}
                      />
                    </div>
                    <div class="form-group">
                      <label for="shoplicensenumber">Shop License Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="shoplicensenumber"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label for="shopfoundationdate">
                        Shop Foundation Date
                      </label>

                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container justify="space-around">
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="DD/MM/yyyy"
                            value={foundationDate}
                            maxDate={new Date()}
                            onChange={(e) => handleDateChange(e)}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </div>
                    <div class="form-group">
                      <label for="deliveryrange">Delivery Range</label>
                      <input
                        type="text"
                        class="form-control"
                        id="deliveryrange"
                        value={deliveryRange}
                        onChange={(e) => setDeliveryRange(e.target.value)}
                      />
                    </div>
                  <button
                    type="submit"
                    class="btn btn-primary submitBtn"
                    onClick={form1Submit}
                  >
                    Submit
                  </button>
                </form>
                </div>
              </div>
            </>
        </div>
      </div>
    </>
  );
}

export default UpdateVendorForm;
