// import { FilePicker } from 'react-file-picker'
import React, { useState, useEffect } from "react";

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
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

function AddVendorForm() {
  // multiselect
  const options = [
    {
      key: "Monday",
      morning_start_time: moment(new Date()).format("HH:mm:ss"),
      morning_end_time: moment(new Date()).format("HH:mm:ss"),
      is_morning_slot_active: false,
      evening_start_time: moment(new Date()).format("HH:mm:ss"),
      evening_end_time: moment(new Date()).format("HH:mm:ss"),
      is_evening_slot_active: false,
    },
    {
      key: "Tuesday",
      morning_start_time: moment(new Date()).format("HH:mm:ss"),
      morning_end_time: moment(new Date()).format("HH:mm:ss"),
      is_morning_slot_active: false,
      evening_start_time: moment(new Date()).format("HH:mm:ss"),
      evening_end_time: moment(new Date()).format("HH:mm:ss"),
      is_evening_slot_active: false,
    },
    {
      key: "Wednesday",
      morning_start_time: moment(new Date()).format("HH:mm:ss"),
      morning_end_time: moment(new Date()).format("HH:mm:ss"),
      is_morning_slot_active: false,
      evening_start_time: moment(new Date()).format("HH:mm:ss"),
      evening_end_time: moment(new Date()).format("HH:mm:ss"),
      is_evening_slot_active: false,
    },
    {
      key: "Thursday",
      morning_start_time: moment(new Date()).format("HH:mm:ss"),
      morning_end_time: moment(new Date()).format("HH:mm:ss"),
      is_morning_slot_active: false,
      evening_start_time: moment(new Date()).format("HH:mm:ss"),
      evening_end_time: moment(new Date()).format("HH:mm:ss"),
      is_evening_slot_active: false,
    },
    {
      key: "Friday",
      morning_start_time: moment(new Date()).format("HH:mm:ss"),
      morning_end_time: moment(new Date()).format("HH:mm:ss"),
      is_morning_slot_active: false,
      evening_start_time: moment(new Date()).format("HH:mm:ss"),
      evening_end_time: moment(new Date()).format("HH:mm:ss"),
      is_evening_slot_active: false,
    },
    {
      key: "Saturday",
      morning_start_time: moment(new Date()).format("HH:mm:ss"),
      morning_end_time: moment(new Date()).format("HH:mm:ss"),
      is_morning_slot_active: false,
      evening_start_time: moment(new Date()).format("HH:mm:ss"),
      evening_end_time: moment(new Date()).format("HH:mm:ss"),
      is_evening_slot_active: false,
    },
    {
      key: "Sunday",
      morning_start_time: moment(new Date()).format("HH:mm:ss"),
      morning_end_time: moment(new Date()).format("HH:mm:ss"),
      is_morning_slot_active: false,
      evening_start_time: moment(new Date()).format("HH:mm:ss"),
      evening_end_time: moment(new Date()).format("HH:mm:ss"),
      is_evening_slot_active: false,
    },
  ];

  // form fields var
  const [bannerURL, setBannerURL] = useState([]);
  const [profileURL, setProfileURL] = useState([]);
  const [file, setFile] = useState(null);
  const [mFile, setMFile] = useState(null);
  const [vendorName, setVendorName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [foundationDate, setFoundationDate] = useState(new Date());
  const [deliveryRange, setDeliveryRange] = useState("");
  const [shopName, setShopName] = useState("");
  const [numberValidate, setNumberValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [numberAvailable, setNumberAvailable] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [password, setPassword] = useState("");
  const [localities, setLocalities] = useState([]);
  const [cities, setCities] = useState([]);
  const [addressableId, setAddressableID] = useState("");
  const [shopSchedule, setShopSchedule] = useState(options);
  const [addressForm, setAddressForm] = useState({
    addressable_id: addressableId,
    addressable_type: "Shop",
    name: "",
    address_type: "Shop",
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    locality_id: "",
    locality: "",
    city_id: "",
    city: "",
    pincode: "",
    state: "Madhya Pradesh",
    country: "India",
    latitude: "",
    longitude: "",
  });

  function handleCitySelect(event) {
    const { value } = event.target;

    if (value === "") {
      setAddressForm({
        ...addressForm,
        city_id: "",
        city: "",
        locality: "",
        locality_id: "",
      });
      setLocalities([]);
    } else if (value !== addressForm.city_id) {
      let index = event.nativeEvent.target.selectedIndex;
      let label = event.nativeEvent.target[index].label;
      setAddressForm({
        ...addressForm,
        city_id: value,
        city: label,
        locality: "",
        locality_id: "",
      });

      for (let i = 0; i < cities.length; i++) {
        if (cities[i].id.toString() === value) {
          setLocalities(cities[i].localities);
          break;
        }
      }
    }
  }

  function handleLocalitySelect(event) {
    const { value } = event.target;
    if (value === "") {
      setAddressForm({ ...addressForm, locality: "", locality_id: "" });
    } else {
      let index = event.nativeEvent.target.selectedIndex;
      let label = event.nativeEvent.target[index].label;
      setAddressForm({ ...addressForm, locality: label, locality_id: value });
    }
  }

  function handleAddressForm(event) {
    let { name, value } = event.target;
    if (name === "pincode" && value.length > 6) {
      value = value.slice(0, 6);
    }
    console.log(name);
    setAddressForm({
      ...addressForm,
      [name]:
        name === "latitude" || name === "longitude" ? Number(value) : value,
    });
  }

  function handleAddressFormSubmit(event) {
    event.preventDefault();
    console.log(addressForm);
    let error = false;
    Object.keys(addressForm).forEach((key) => {
      if (!error && addressForm[key] === "") {
        toast.error(`${key} can't be empty.`);
        error = true;
      }
    });
    if (!error) {
      instance.post(API.CREATE_ADDRESS, addressForm).then(function (response) {
        toast.success("Address Successfully Added.");
        window.location.href = "/vendor";
      });
    }
  }

  useEffect(() => {
    instance.get(API.GET_CITIES).then(function (response) {
      setCities(response.cities);
      if (cities.length > 0) setLocalities(cities[0]?.localities);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressableId]);

  // date picker
  const handleDateChange = (e) => {
    setFoundationDate(e);
  };
  const numberValidator = (number) => {
    setNumberValidate(false);
    instance.get(`${API.VALIDATE_PHONE}${number}`).then(function (response) {
      if (response.is_phone_already_available) setNumberAvailable(true);
      else {
        setNumberAvailable(false);
        setPhone(number);
      }
    });
  };
  function validateEmail(email) {
//     const re =
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
  }
  const emailValidator = (email) => {
    setEmailValidate(false);
    instance.get(`${API.VALIDATE_EMAIL}${email}`).then(function (response) {
      if (response.is_email_already_available) setEmailAvailable(true);
      else {
        setEmail(email);
        setEmailAvailable(false);
      }
    });
  };
  const handleTimeChange1 = (t, time, index) => {
    let temp = [...shopSchedule];

    temp[index][time] = moment(t).format("HH:mm:ss");
    setShopSchedule(temp);
  };
  const handleCheckbox = (e, name, index) => {
    const { checked } = e.target;
    let temp = [...shopSchedule];
    temp[index][name] = checked;
    setShopSchedule(temp);
  };
  // form1
  const form1Submit = (e) => {
    e.preventDefault();
    if (vendorName.length < 5) {
      toast.error("Shop name must be atleast 5 characters.");
    } else if (phone.length !== 10) {
      toast.error("Phone number should have exactly 10 digits.");
    } else if (password.length < 5) {
      toast.error("Password must be of atleast 5 charcaters");
    } else {
      document.querySelector(".vendor-form-1").classList.add("hide__form1");
      document.querySelector(".vendor-form-2").classList.add("show-form2");
    }
  };

  const form2Submit = async (e) => {
    e.preventDefault();
    let headers = new Headers();
    //check validation here for form-2
    let error = false;
    if (!(shopName !== "" && deliveryRange !== "")) {
      toast.error("shop name or shop delivety range are required");
      error = true;
    }
    if (mFile?.length > 3) {
      toast.error("You can choose only 3 images at a time");
      error = true;
      setMFile(null);
      return;
    }

    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    if (mFile && file && !error) {
      let formdata = new FormData();
      formdata.append("image", file[0]);
      await instance
        .post(API.IMAGE_UPLOAD, formdata)
        .then((res) => {
          let temp = profileURL;
          temp[0] = res.image_url;
          setProfileURL(res.image_url);
        })
        .catch((err) => {
          error = true;
        });

      let tempBannerURL = bannerURL;
      for (let i = 0; i < mFile.length; i++) {
        let formdata = new FormData();
        formdata.append("image", mFile[i]);
        await instance
          .post(API.IMAGE_UPLOAD, formdata)
          .then((res) => {
            tempBannerURL[i] = res.image_url;
          })
          // eslint-disable-next-line no-loop-func
          .catch((err) => {
            error = true;
            console.log(err);
          });
        setBannerURL(tempBannerURL);
      }
    }

    if (!error) {
      let shopCreateBody = {
        // user_id: userid,
        name: vendorName,
        phone,
        ...(email ? { email: email } : {}),
        password: password,
        shop_name: shopName,
        shop_phone: phone,
        shop_description: description,
        shop_banner: bannerURL,
        shop_profile: profileURL,
        shop_license_number: licenseNumber,
        //UPDATE FOUNDING DATE VALUE
        shop_founding_date: moment(foundationDate).format("YYYY-MM-DD"),
        shop_delivery_range: deliveryRange,
        shop_schedules: shopSchedule,
      };
      if (!error) {
        instance
          .post(API.CREATE_SHOP, shopCreateBody)
          .then(function (shopCreateResponse) {
            setAddressableID(shopCreateResponse?.shop?.id);
            setAddressForm({
              ...addressForm,
              addressable_id: shopCreateResponse?.shop?.id,
            });
            console.log(shopCreateResponse?.shop?.id);
            toast.success("Vendor Created. Add Address Details Now.");
          });
      }
    }
  };
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          {addressableId === "" ? (
            <>
              <div className="vendor-form-1">
                <div className="backButton">
                  <Back></Back>
                </div>
                <h1>Add Vendor</h1>
                <form className="vendor-form">
                  <span className="customSpan"></span>
                  <div class="form-group">
                    <label for="vendorName">Vendor Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="vendorName"
                      placeholder="Type here..."
                      onChange={(e) => setVendorName(e.target.value)}
                    />
                  </div>
                  <div class="form-group validatorDiv">
                    <div class="form-group">
                      <label for="phone">Phone Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="phone"
                        maxLength={10}
                        placeholder="Type here..."
                        onChange={(e) => {
                          if (e.target.value.length === 10)
                            numberValidator(e.target.value);
                          else {
                            setNumberValidate(true);
                            setNumberAvailable(false);
                          }
                        }}
                      />
                    </div>
                    <div className="validatorMessage">
                      {numberValidate ? (
                        <small
                          id="fileFormatError"
                          class="form-text text-danger"
                        >
                          <strong>Number should be of 10 digit</strong>
                        </small>
                      ) : null}
                      {numberAvailable ? (
                        <small
                          id="fileFormatError"
                          class="form-text text-danger"
                        >
                          <strong>Number already existed</strong>
                        </small>
                      ) : null}
                      {!numberAvailable && !numberValidate && phone !== "" ? (
                        <small id="fileFormatError" class="form-text">
                          <strong>Number Matched</strong>
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div class="form-group validatorDiv">
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Type here..."
                        onChange={(e) => {
                          if (validateEmail(e.target.value))
                            emailValidator(e.target.value);
                          else {
                            setEmailValidate(true);
                            setNumberAvailable(false);
                          }
                        }}
                      />
                    </div>
                    <div className="validatorMessage">
                      {emailValidate ? (
                        <small
                          id="fileFormatError"
                          class="form-text text-danger"
                        >
                          <strong>Please enter correct email</strong>
                        </small>
                      ) : null}
                      {emailAvailable ? (
                        <small
                          id="fileFormatError"
                          class="form-text text-danger"
                        >
                          <strong>Email already existed</strong>
                        </small>
                      ) : null}
                      {!emailAvailable && !emailValidate && email !== "" ? (
                        <small id="fileFormatError" class="form-text">
                          <strong>Email Matched</strong>
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Type here..."
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary submitBtn"
                    onClick={form1Submit}
                    disabled={
                      !numberAvailable &&
                      !numberValidate &&
                      phone !== "" &&
                      !emailAvailable &&
                      !emailValidate &&
                      email !== ""
                        ? false
                        : true
                    }
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="vendor-form-2">
                <div>
                  <Back></Back>
                </div>
                <h1>Add Vendor Details</h1>
                <div className="vendor-form2-container">
                  <form className="vendor-form">
                    <span className="customSpan"></span>
                    <div className="update-form-vendor">
                      <div class="form-group">
                        <label for="vendorName">Shop Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="vendorName"
                          placeholder={"Enter Shop Name"}
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
                    </div>
                    <div className="update-form-vendor">
                      <div class="form-group">
                        <label for="shoplicensenumber">
                          Shop License Number
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="shoplicensenumber"
                          onChange={(e) => setLicenseNumber(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="shopfoundationdate">
                          Shop Foundation Date
                        </label>

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <DatePicker
                            id="date-picker-dialog"
                            format="DD/MM/yyyy"
                            value={foundationDate}
                            maxDate={new Date()}
                            onChange={(e) => handleDateChange(e)}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="update-form-vendor">
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
                        <label for="banner">banner:</label>
                        <input
                          type="file"
                          class="form-control"
                          id="banner"
                          name="banner"
                          onChange={(e) => setMFile(e.target.files)}
                          multiple
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="shopdescription">Shop Description</label>
                      <textarea
                        class="form-control"
                        id="shopdescription"
                        rows="3"
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div class="form-group">
                      <label for="deliveryrange">Delivery Range</label>
                      <input
                        type="text"
                        class="form-control"
                        id="deliveryrange"
                        placeholder=" eg:- 1km"
                        onChange={(e) => setDeliveryRange(e.target.value)}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ width: "initial", overflowX: "scroll" }}
                    >
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
                        <tbody>
                          {shopSchedule.map((value, index) => {
                            return (
                              <tr>
                                <td>{value?.key}</td>
                                <td style={{ paddingLeft: "0 px !important" }}>
                                  <input
                                    type="checkbox"
                                    name="is_morning_slot_active"
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
                                    type="checkbox"
                                    name="is_evening_slot_active"
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
                      onClick={(e) => {
                        form2Submit(e);
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div className="vendor-form-1 address-form">
              <div className="backButtonAddAddress">
                <Back></Back>
              </div>
              <h1>Add Address</h1>
              <form className="vendor-form">
                <span className="customSpan"></span>
                <div class="form-group">
                  <label for="vendorName">Address Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    value={addressForm.name}
                    id="vendorName"
                    placeholder="Type here..."
                    onChange={(e) => handleAddressForm(e)}
                  />
                </div>
                <div class="form-group">
                  <label for="vendorName">Address Line 1</label>
                  <input
                    type="text"
                    class="form-control"
                    name="address_line_1"
                    value={addressForm.address_line_1}
                    id="vendorName"
                    placeholder="Type here..."
                    onChange={(e) => handleAddressForm(e)}
                  />
                </div>
                <div class="form-group">
                  <label for="phone">Address Line 2</label>
                  <input
                    type="text"
                    class="form-control"
                    name="address_line_2"
                    value={addressForm.address_line_2}
                    id="phone"
                    placeholder="Type here..."
                    onChange={(e) => handleAddressForm(e)}
                  />
                </div>
                <div class="form-group">
                  <label for="password">Address Line 3</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    name="address_line_3"
                    value={addressForm.address_line_3}
                    placeholder="Type here..."
                    onChange={(e) => handleAddressForm(e)}
                  />
                </div>

                <div class="form-group">
                  <label for="locality">City</label>
                  {cities && cities.length > 0 ? (
                    <select onChange={(event) => handleCitySelect(event)}>
                      <option value="">Select a City</option>
                      {cities.map((city) => {
                        return <option value={city?.id} label={city?.city} />;
                      })}
                    </select>
                  ) : (
                    "No Cities Found."
                  )}
                </div>

                <div class="form-group">
                  <label for="locality">Locality</label>

                  {localities && localities.length > 0 ? (
                    <select
                      onChange={(event) => {
                        handleLocalitySelect(event);
                      }}
                    >
                      <option value="">Select Locality</option>
                      {addressForm &&
                        addressForm?.city !== "" &&
                        localities.map((locality) => {
                          return (
                            <option
                              value={locality?.id}
                              label={locality?.locality}
                            />
                          );
                        })}
                    </select>
                  ) : (
                    "No Localities Found."
                  )}
                </div>

                <div class="form-group">
                  <label for="password">Pincode</label>
                  <input
                    type="number"
                    class="form-control"
                    maxLength="6"
                    minLength="6"
                    id="pincode"
                    name="pincode"
                    value={addressForm.pincode}
                    placeholder="Enter pincode"
                    onChange={(e) => handleAddressForm(e)}
                  />
                </div>

                <div class="form-group">
                  <label for="password">State</label>
                  <input
                    type="text"
                    class="form-control"
                    name="state"
                    readOnly
                    value={addressForm.state}
                  />
                </div>

                <div class="form-group">
                  <label for="password">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    value={addressForm.country}
                    name="country"
                    readOnly
                  />
                </div>
                <div class="form-group">
                  <label for="latitude">Latitude</label>
                  <input
                    type="number"
                    class="form-control"
                    name="latitude"
                    onChange={(e) => handleAddressForm(e)}
                  />
                </div>
                <div class="form-group">
                  <label for="longitude">Longitude</label>
                  <input
                    type="number"
                    class="form-control"
                    name="longitude"
                    onChange={(e) => handleAddressForm(e)}
                  />
                </div>

                <button
                  type="submit"
                  class="btn btn-primary submitBtn"
                  onClick={(event) => handleAddressFormSubmit(event)}
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AddVendorForm;
