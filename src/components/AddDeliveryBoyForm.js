import React from "react";
import "./SuperUser.css";
import Back from "./BackButton/Back";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import instance from "../Utils/axiosConstants";
import API from "../Utils/ApiConstant";
import { Select } from "@material-ui/core";

import MultiSelect from "react-multi-select-component";
import { useHistory } from "react-router-dom";

const customValueRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label }) => "✔️ " + label)
    : "😶 No Items Selected";
};

//for Api

function AddDeliveryBoyForm() {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [aadhaar, setAadhaar] = useState(null);
  const [password, setPassword] = useState("");
  const [range, setRange] = useState(null);
  const [localities, setLocalities] = useState([]);
  const routerHistroy = useHistory();
  const formSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error("Phone number should have exactly 10 digits.");
      return;
    }
    let temp = [];
    selected.map((value, index) => {
      temp.push(value.value);
    });

    let locality_assigned = temp.join();
    console.log("a", locality_assigned);

    console.log("temp", temp);
    let error = false;
    if (name.trim() === "" || password.trim() == "" || phone.trim() == "") {
      toast.error("name ,phone and password are required");
      error = true;
    }
    if (!error) {
      let formData = {
        name: name,
        phone: phone,
        email: email,
        aadhaar_number: Number(aadhaar),
        delivery_range: Number(range),
        locality_assigned,
        password: password,
        role_id: 4,
      };
      console.log(formData);
      //DELIVERY_BOYS

      await instance.post(API.DELIVERY_BOYS_ADD, formData).then((res) => {
        console.log(res);
        toast.success(res.message);
        window.location.href = "/deliverymanage";
        // routerHistroy.push(`/deliveryboydetails`, {
        //   userDetails: res.users,
        //   isDeliveryBoy: true,
        // })
      });
    }
  };
  let temp = [];
  useEffect(() => {
    instance.get(API.GET_LOCALITIES_ALL).then((res) => {
      res.localities.map((value, index) => {
        temp.push({ label: value.locality, value: value.locality });
      });
    });
    console.log("temp", temp);
    setOptions(temp);
  }, []);
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div
            className=" deliveryboy-inner-div-form"
            style={{ position: "relative" }}
          >
            <div className="backButton">
              <Back></Back>
            </div>
            <div className="add-vendor-details-heading">
              <h1>Add Delivery Boy</h1>
            </div>
            <form className="addDeliveryboy-form">
              <span className="customSpan"></span>

              <div class="form-group">
                <label for="deliverboyName">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="deliveryboyName"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="deliveryboyPhone">Phone No</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="deliveryboyPhone"
                  placeholder="Phone"
                  size="10"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="deliveryboyAadhar">Aadhaar No</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="deliveryboyAadhaar"
                  placeholder="Aadhaar"
                  onChange={(e) => setAadhaar(e.target.value)}
                />
              </div>

              <div class="form-group">
                <label for="deliveryboyPhone">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="deliveryboyEmail"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div class="form-group">
                <label for="deliveryboyRange">Range</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="deliveryboyAadhaar"
                  placeholder="Range in km"
                  onChange={(e) => setRange(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="shopschedule">Select localities</label>
                {console.log("multi", options)}
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                  valueRenderer={customValueRenderer}
                />
              </div>
              <div class="form-group">
                <label for="deliveryboyPhone">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="deliveryboyPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary submitBtn"
                onClick={(e) => formSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDeliveryBoyForm;
