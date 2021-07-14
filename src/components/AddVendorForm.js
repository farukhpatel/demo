// import { FilePicker } from 'react-file-picker'
import React, { useState, useEffect } from "react";

import MultiSelect from "react-multi-select-component";
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Geocode from "react-geocode";
import Grid from "@material-ui/core/Grid"; //clock
import MomentUtils from "@date-io/moment"; //clock
import moment from "moment"; //for clock time
import "date-fns";

import "./SuperUser.css";

//for Api
import { APICall } from "../Utils/CommonFunctions";
import API from "../Utils/ApiConstant";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddVendorForm() {
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
  const [userid, setUserid] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [foundationDate, setFoundationDate] = useState(new Date());
  const [deliveryRange, setDeliveryRange] = useState("");
  const [shopName, setShopName] = useState("");
  const [password, setPassword] = useState("");
  const [localities, setLocalities] = useState([]);
  const [cities, setCities] = useState([]);
  const [addressableId, setAddressableID] = useState("");

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

  function getGeo() {
    // event.preventDefault();
    // Get latitude & longitude from address.
    const {
      address_line_1,
      address_line_2,
      address_line_3,
      locality,
      city,
      pincode,
      state,
      country,
    } = addressForm;
    const address = `${address_line_1}, ${address_line_2}, ${address_line_3}, ${locality}, ${city}, ${pincode}, ${state}, ${country}`;

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng, "no");
        if(lat==="" || lng ==="")
        toast.error("Something is wrong with the address provided")
        else
        setAddressForm({ ...addressForm, latitude: lat, longitude: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  }

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
    setAddressForm({ ...addressForm, [name]: value });
  }

  function createAddress() {
    let obj = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(addressForm),
    };

    APICall(API.CREATE_ADDRESS, obj, (error, res) => {
      if (error) {
        console.log(error);
      } else if (res.status) {
        toast.success("Address Successfully Added.");
        window.location.href = "/vendor";
      } else {
        toast.error(res?.error);
      }
    });
  }

  function handleAddressFormSubmit(event) {
    console.log("handleAddresss");
    event.preventDefault();

    let error = false;
    let optionalKeys = [
      "address_line_2",
      "address_line_3",
      "city_id",
      "locality_id",
      "latitude",
      "longitude",
    ];
    Object.keys(addressForm).forEach((key) => {
      if (!error && addressForm[key] === "" && !optionalKeys.includes(key)) {
        toast.error(`${key} can't be empty.`);
        error = true;
      }
    });
    if (!error) {
      getGeo();
    }
  }
  useEffect(() => {
      const tokenValue = localStorage.getItem("token");
      let object = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
      };
      APICall(API.GET_CITIES, object, (err, result) => {
        if (err) {
          toast.error(err);
        } else if (result.status) {
          setCities(result.cities);
          if (cities.length > 0) setLocalities(cities[0]?.localities);
          console.log(result);
        } else {
          toast.error(result?.error);
        }
      });
  }, [addressableId]);

  // date picker
  const handleDateChange = (e) => {
    setFoundationDate(e);
  };
  // time picker
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleTimeChange = (e, time) => {
    if (time === "start") setStartTime(e);
    else setEndTime(e);
  };

  // form1
  const submit = (e) => {
    e.preventDefault();
    if (vendorName.length < 5) {
      toast.error("Shop name must be atleast 5 characters.");
    } else if (phone.length !== 10) {
      toast.error("Phone number should have exactly 10 digits.");
    } else if (password.length < 5) {
      toast.error("Password must be of atleast 5 charcaters");
    } else if (email === "") toast.error("Email can't be empty");
    else {
      let object = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: vendorName,
          phone: phone,
          email: email,
          password: password,
          role_id: 2,
        }),
      };

      APICall(API.CREATE_USER, object, (err, result) => {
        if (err) {
          toast.error(err);
        } else if (result.status) {
          setUserid(result.user.id);
          document.querySelector(".vendor-form-1").classList.add("hide__form1");
          document.querySelector(".vendor-form-2").classList.add("show-form2");
        } else {
          toast.error(result?.error);
        }
      });
    }
  };

  const finalSubmit = (e) => {
    console.log("final submit??");
    e.preventDefault();
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    if (file) {
      let formdata = new FormData();
      formdata.append("image", file[0]);
      let object = {
        method: "POST",
        headers: headers,
        body: formdata,
        redirect: "follow",
      };

      APICall(API.IMAGE_UPLOAD, object, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result.status) {
          let temp = selected;
          let shop_schedules = temp.map((item) => {
            item.key = item.label;
            item.start = moment(startTime._d).format("HH:mm:ss");
            item.end = moment(endTime._d).format("HH:mm:ss");
            return item;
          });

          let body = {
            user_id: userid,
            shop_name: shopName,
            shop_phone: phone,
            shop_description: description,
            shop_profile: result.image_url,
            shop_license_number: licenseNumber,
            //UPDATE FOUNDING DATE VALUE
            shop_founding_date: moment(foundationDate).format("YYYY-MM-DD"),
            shop_delivery_range: deliveryRange,
            shop_schedules: shop_schedules,
          };

          let obj = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(body),
          };

          let error = false;
          Object.keys(body).forEach((key) => {
            if (!error && body[key] === "") {
              toast.error("One or more fields are empty.");
              error = true;
            }
          });
          if (!error) {
            APICall(API.CREATE_SHOP, obj, (error, res) => {
              if (error) {
                console.log(error);
              } else if (res.status) {
                setAddressableID(res?.shop?.id)
                setAddressForm({...addressForm, addressable_id:res?.shop?.id})
                console.log(res?.shop?.id)
                toast.success("Vendor Created. Add Address Details Now.");
              } else {
                toast.error(res?.error);
              }
            });
          }
        }
      });
    } else {
      toast.error("No file Picked.");
    }
  };

  useEffect(()=>{
    if(addressForm.latitude!=="" && addressForm.longitude!==""){
      createAddress()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[addressForm])
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          {addressableId === "" ? (
            <>
              <div className="vendor-form-1">
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
                  <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="phone"
                      placeholder="Type here..."
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Type here..."
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                    onClick={submit}
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="vendor-form-2">
                <h1>Add Vendor Details</h1>
                <div className="vendor-form2-container">
                  <form className="vendor-form">
                    <span className="customSpan"></span>
                    <div class="form-group">
                      <label for="userid">User Id:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="userid"
                        placeholder={userid}
                        readOnly
                      />
                    </div>
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
                        placeholder=" eg:- 1km"
                        onChange={(e) => setDeliveryRange(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label for="shopschedule">Shop Schedule</label>
                      <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                      />
                    </div>
                    <div class="form-group">
                      <label for="shopschedulestart">Shop Schedule Start</label>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container justify="space-around">
                          <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            ampm={false}
                            value={startTime}
                            onChange={(e) => handleTimeChange(e, "start")}
                            KeyboardButtonProps={{
                              "aria-label": "change time",
                            }}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </div>
                    <div class="form-group">
                      <label for="shopscheduleend">Shop Schedule End</label>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container justify="space-around">
                          <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            ampm={false}
                            value={endTime}
                            onChange={(e) => handleTimeChange(e, "end")}
                            KeyboardButtonProps={{
                              "aria-label": "change time",
                            }}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary submitBtn"
                      onClick={finalSubmit}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div className="vendor-form-1 address-form">
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
                  <label for="locality">Locality</label>

                  {localities.length > 0 ? (
                    <select
                      onChange={(event) => {
                        handleLocalitySelect(event);
                      }}
                    >
                      <option value="">Select Locality</option>
                      {localities.map((locality) => {
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
                  <label for="locality">City</label>
                  {cities.length > 0 ? (
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
