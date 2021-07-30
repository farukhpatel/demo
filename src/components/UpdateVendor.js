// import { FilePicker } from 'react-file-picker'
import React, { useState, useEffect } from "react";

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
import MultiSelect from "react-multi-select-component";

function UpdateVendorForm(props) {
    const prop =props.location.state
  // form fields var
  console.log(prop.shop_schedules)
  const [timePicker, setTimePicker] = useState(new Date);
  const [file, setFile] = useState(null);
  const [phone, setPhone] = useState(prop.shop_phone);
  const [description, setDescription] = useState(prop.shop_description);
  const [licenseNumber, setLicenseNumber] = useState(prop.shop_license_number);
  const [profileImage, setProfileImage] = useState(prop.shop_profile);
  const [foundationDate, setFoundationDate] = useState(prop.shop_founding_date);
  const [deliveryRange, setDeliveryRange] = useState(prop.shop_delivery_range);
  const [shopName, setShopName] = useState(prop.shop_name);
  const [shopSchedule, setShopSchedule] = useState(prop.shop_schedules.filter((value)=>value.key!=="Holiday"));
  // date picker
  const handleDateChange = (e) => {
    setFoundationDate(e);
  };
  const handleTimeChange1 = (t, time,index) => {
    if (time === "start") setShopSchedule((e)=>{
      setTimePicker(t);
      e[index].start=moment(t).format("HH:mm:ss");
      return e
    })
    else setShopSchedule((e)=>{e[index].end=e[index].start=moment(t).format("HH:mm:ss");  console.log(e); return e})
  };
  // form1
  const form1Submit = async(e) => {
    e.preventDefault();
   
    let headers = new Headers();
  headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  let shopUpdateBody;
  if (file) {
    let formdata = new FormData();
    formdata.append("image", file[0]);
    await instance.post(API.IMAGE_UPLOAD, formdata).then(function (response) {
    // setProfileImage(response.image_url)
    shopUpdateBody = {
      shop_name: shopName,
      shop_phone: phone,
      shop_description: description,
      shop_profile: response.image_url,
      shop_license_number: licenseNumber,
      shop_founding_date: moment(foundationDate).format("YYYY-MM-DD"),
      shop_delivery_range: deliveryRange,
      shop_schedules:shopSchedule
    }
    });
  } 
    let shopUpdateBody2 = {
          shop_name: shopName,
          shop_phone: phone,
          shop_description: description,
          shop_profile: profileImage,
          shop_license_number: licenseNumber,
          shop_founding_date: moment(foundationDate).format("YYYY-MM-DD"),
          shop_delivery_range: deliveryRange,
          shop_schedules:shopSchedule
        };
       console.log(shopUpdateBody)
        instance.patch(`${API.VENDOR_UPDATE}/${prop.id}`, shopUpdateBody ? shopUpdateBody : shopUpdateBody2)
              .then(function (shopCreateResponse) {
                toast.success("Vendor Details Updated Now.");
                window.location.href="/vendor"
              });

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

                  <div className="update-form-vendor">

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

                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    </div>
                    <div className="update-form-vendor">
                    <div class="form-group ">
                      <label for="shoplicensenumber">Shop License Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="shoplicensenumber"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                      />
                    </div>
                    <div class="form-group datePicker-vendor">
                      <label for="shopfoundationdate">
                        Shop Foundation Date
                      </label>
                      <MuiPickersUtilsProvider utils={MomentUtils} >
                        <Grid container justify="space-around">
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
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
                    </div>
                    <div className="update-form-vendor">
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
                      <label for="shopdescription">Shop Description</label>
                      <textarea
                        class="form-control"
                        id="shopdescription"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                    <table class="table table-striped ">
                  <thead>
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Morning Schedule Start</th>
                      <th scope="col">Morning Schedule End</th>
                      <th scope="col">Evening Schedule Start</th>
                      <th scope="col">Evening Schedule End</th>
                    </tr>
                  </thead>
                  <tbody>
                   {shopSchedule.map((value, index) => {
                     console.log(value);
                      return (
                        <tr>
                          <td>{value?.key}</td>
                          <td className="datePicker-vendor">
                        <MuiPickersUtilsProvider utils={MomentUtils} >
                          <Grid container justify="space-around">
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              ampm={true}
                              value={moment(value.start, "HH:mm:ss").format()}
                              onChange={(t) =>{console.log(t); handleTimeChange1(t,"start",index)}}
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                          </td>
                          <td><MuiPickersUtilsProvider utils={MomentUtils} >
                          <Grid container justify="space-around">
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              ampm={true}
                              value={moment(value.end, "HH:mm:ss").format()}
                              onChange={(t) =>handleTimeChange1(t,"end",index)}
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider></td>
                          <td className="datePicker-vendor">
                        <MuiPickersUtilsProvider utils={MomentUtils} >
                          <Grid container justify="space-around">
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              ampm={true}
                              value={moment(value.start, "HH:mm:ss").format()}
                              onChange={(t) =>handleTimeChange1(t,"start",index)}
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                          </td>
                          <td><MuiPickersUtilsProvider utils={MomentUtils} >
                          <Grid container justify="space-around">
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              ampm={true}
                              value={moment(value.end, "HH:mm:ss").format()}
                              onChange={(t) =>{console.log(t); handleTimeChange1(t,"end",index)}}
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider></td>
                        
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
