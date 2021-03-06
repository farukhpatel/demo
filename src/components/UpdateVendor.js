// import { FilePicker } from 'react-file-picker'
import React, { useState, useEffect } from "react";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
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
import Back from "./BackButton/Back";

function UpdateVendorForm(props) {
  const prop = props.location.state;
  console.log(prop.shop_schedules);
  // form fields var
  const [file, setFile] = useState(null);
  const [phone, setPhone] = useState(prop.shop_phone);
  const [description, setDescription] = useState(prop.shop_description);
  const [licenseNumber, setLicenseNumber] = useState(prop.shop_license_number);
  const [bank_name, setBank_name] = useState(prop.bank_name);
  const [account_holder_name, setAccount_holder_name] = useState(
    prop.account_holder_name
  );
  const [account_number, setAccount_number] = useState(prop.account_number);
  const [ifsc_code, setIfsc_code] = useState(prop.ifsc_code);
  const profileImage = prop.shop_profile;
  const [foundationDate, setFoundationDate] = useState(prop.shop_founding_date);
  const [deliveryRange, setDeliveryRange] = useState(prop.shop_delivery_range);
  const [shopName, setShopName] = useState(prop.shop_name);
  const [shopSchedule, setShopSchedule] = useState(
    prop.shop_schedules.filter((value) => value.key !== "Holiday")
  );
  // date picker
  const handleDateChange = (e) => {
    setFoundationDate(e);
  };
  const handleTimeChange1 = (t, time, index) => {
    console.log(t);
    console.log(time);
    console.log(index);
    let temp = [...shopSchedule];
    console.log(temp[index][time], "temp");
    temp[index][time] = moment(t).format("HH:mm:ss");
    setShopSchedule(temp);
  };
  const handleCheckbox = (e, name, index) => {
    const { checked } = e.target;
    console.log("name", name, "value", checked, index);
    // setShopSchedule((slots) => {
    //   slots[index][name] = checked;
    //   return slots;
    // });
    let temp = [...shopSchedule];
    console.log(temp[index][name], "temp");
    temp[index][name] = checked;
    setShopSchedule(temp);
  };

  useEffect(() => {
    console.log(shopSchedule, "shop schedules");
  }, [shopSchedule]);
  // form1
  const form1Submit = async (e) => {
    e.preventDefault();
    console.log(profileImage);
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    let shopUpdateBody;
    if (file) {
      let formdata = new FormData();
      formdata.append("image", file[0]);
      await instance.post(API.IMAGE_UPLOAD, formdata).then(function (response) {
        // setProfileImage(response.image_url)
        // let temp=[res]
        shopUpdateBody = {
          shop_name: shopName,
          shop_phone: phone,
          shop_description: description,
          shop_profile: [response.image_url],
          shop_license_number: licenseNumber,
          shop_founding_date: moment(foundationDate).format("YYYY-MM-DD"),
          shop_delivery_range: deliveryRange,
          shop_schedules: shopSchedule,
          bank_name,
          account_number,
          account_holder_name,
          ifsc_code,
        };
      });
    }
    let shopUpdateBody2 = {
      shop_name: shopName,
      shop_phone: phone,
      shop_description: description,
      shop_profile: [profileImage],
      shop_license_number: licenseNumber,
      shop_founding_date: moment(foundationDate).format("YYYY-MM-DD"),
      shop_delivery_range: deliveryRange,
      shop_schedules: shopSchedule,
      bank_name,
      account_number,
      account_holder_name,
      ifsc_code,
    };
    instance
      .patch(
        `${API.VENDOR_UPDATE}/${prop.id}`,
        shopUpdateBody ? shopUpdateBody : shopUpdateBody2
      )
      .then(function (shopCreateResponse) {
        toast.success(shopCreateResponse.message);
        window.location.href = "/vendor";
      });
  };
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <>
            <div className="vendor-form-1 ">
              <div className="backButton">
                <Back></Back>
              </div>
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
                      <MuiPickersUtilsProvider utils={MomentUtils}>
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

                  <div className="update-form-vendor">
                    <div class="form-group ">
                      <label for="shoplicensenumber">Bank Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="bankname"
                        value={bank_name}
                        onChange={(e) => setBank_name(e.target.value)}
                      />
                    </div>
                    <div class="form-group ">
                      <label for="shoplicensenumber">Account Holder Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="accountholdername"
                        value={account_holder_name}
                        onChange={(e) => setAccount_holder_name(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="update-form-vendor">
                    <div class="form-group ">
                      <label for="shoplicensenumber">IFSC Code</label>
                      <input
                        type="text"
                        class="form-control"
                        id="ifsccode"
                        value={ifsc_code}
                        onChange={(e) => setIfsc_code(e.target.value)}
                      />
                    </div>
                    <div class="form-group ">
                      <label for="shoplicensenumber">Account Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="accountNumber"
                        value={account_number}
                        onChange={(e) => setAccount_number(e.target.value)}
                      />
                    </div>
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
                  <div className="table-responsive">
                    <table class="table table-striped ">
                      <thead>
                        <tr>
                          <th scope="col">Day</th>
                          <th scope="col">Morning Slot Active</th>
                          <th scope="col">Morning Schedule Start</th>
                          <th scope="col">Morning Schedule End</th>
                          <th scope="col">Evening Schedule Start</th>
                          <th scope="col">Evening Schedule End</th>
                          <th scope="col">Evening Slot Active</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {shopSchedule.map((value, index) => {
                          console.log(value);
                          return (
                            <tr>
                              <td>{value?.key}</td>
                              <td>
                                <input
                                  style={{ width: "1.3rem" }}
                                  type="checkbox"
                                  name="is_morning_slot_active"
                                  defaultChecked={value?.is_morning_slot_active}
                                  onChange={(e) =>
                                    handleCheckbox(
                                      e,
                                      "is_morning_slot_active",
                                      index
                                    )
                                  }
                                  value={value?.is_morning_slot_active}
                                ></input>
                              </td>
                              <td className="datePicker-vendor">
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                  <TimePicker
                                    id="time-picker"
                                    ampm={true}
                                    value={moment(
                                      value.morning_start_time,
                                      "HH:mm:ss"
                                    ).format()}
                                    disabled={!value.is_morning_slot_active}
                                    onChange={(t) => {
                                      console.log(t);
                                      handleTimeChange1(
                                        t,
                                        "morning_start_time",
                                        index
                                      );
                                    }}
                                    KeyboardButtonProps={{
                                      "aria-label": "change time",
                                    }}
                                  />
                                </MuiPickersUtilsProvider>
                              </td>
                              <td>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                  <TimePicker
                                    id="time-picker"
                                    ampm={true}
                                    value={moment(
                                      value.morning_end_time,
                                      "HH:mm:ss"
                                    ).format()}
                                    disabled={!value.is_morning_slot_active}
                                    onChange={(t) =>
                                      handleTimeChange1(
                                        t,
                                        "morning_end_time",
                                        index
                                      )
                                    }
                                    KeyboardButtonProps={{
                                      "aria-label": "change time",
                                    }}
                                  />
                                </MuiPickersUtilsProvider>
                              </td>
                              <td>
                                <input
                                  style={{ width: "1.3rem" }}
                                  type="checkbox"
                                  name="is_evening_slot_active"
                                  defaultChecked={value?.is_evening_slot_active}
                                  onChange={(e) =>
                                    handleCheckbox(
                                      e,
                                      "is_evening_slot_active",
                                      index
                                    )
                                  }
                                  value={value?.is_evening_slot_active}
                                ></input>
                              </td>
                              <td className="datePicker-vendor">
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                  <TimePicker
                                    id="time-picker"
                                    ampm={true}
                                    disabled={!value.is_evening_slot_active}
                                    value={moment(
                                      value.evening_start_time,
                                      "HH:mm:ss"
                                    ).format()}
                                    onChange={(t) =>
                                      handleTimeChange1(
                                        t,
                                        "evening_start_time",
                                        index
                                      )
                                    }
                                    KeyboardButtonProps={{
                                      "aria-label": "change time",
                                    }}
                                  />
                                </MuiPickersUtilsProvider>
                              </td>
                              <td>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                  <TimePicker
                                    id="time-picker"
                                    ampm={true}
                                    value={moment(
                                      value.evening_end_time,
                                      "HH:mm:ss"
                                    ).format()}
                                    disabled={!value.is_evening_slot_active}
                                    onChange={(t) => {
                                      console.log(t);
                                      handleTimeChange1(
                                        t,
                                        "evening_end_time",
                                        index
                                      );
                                    }}
                                    KeyboardButtonProps={{
                                      "aria-label": "change time",
                                    }}
                                  />
                                </MuiPickersUtilsProvider>
                              </td>
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
