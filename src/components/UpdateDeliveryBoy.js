import React from "react";
import "./SuperUser.css";
import Back from "./BackButton/Back";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import instance from "../Utils/axiosConstants";
import API from "../Utils/ApiConstant";
import { useParams } from "react-router-dom";
import MultiSelect from "react-multi-select-component";
//for Api

function UpdateDeliveryBoy(props) {
  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "😶 No Items Selected";
  };

  let { id } = useParams();
  const prop = props.location.state;
  let locality_value = prop?.delivery_boy?.locality_assigned?.split(",");
  let temp2 = [];
  locality_value?.forEach((value, index) => {
    temp2.push({ label: value, value: value });
  });
  const [selected, setSelected] = useState(temp2);
  const [options, setOptions] = useState([]);
  console.log(selected);
  const [name, setName] = useState(prop.name);
  const [phone, setPhone] = useState(prop.phone);
  const [aadhaar, setAadhaar] = useState(prop?.delivery_boy?.aadhaar_number);
  const [account_holder_name, setAccount_holder_name] = useState(
    prop?.delivery_boy?.account_holder_name
  );
  const [account_number, setAccount_number] = useState(
    prop?.delivery_boy?.account_number
  );
  const [bank_name, setBank_name] = useState(prop?.delivery_boy?.bank_name);
  const [ifsc_code, setIfsc_code] = useState(prop?.delivery_boy?.ifsc_code);
  const [email, setEmail] = useState(prop.email);
  const deliverBoyImageURL = prop?.profile_image;
  const [deliverBoyImage, setDeliverBoyImage] = useState(null);
  const [password, setPassword] = useState(
    prop?.password ? prop?.password : ""
  );
  const [range, setRange] = useState(prop?.delivery_boy?.delivery_range);
  const formSubmit = async (e) => {
    e.preventDefault();
    let temp = [];
    selected.forEach((value) => {
      temp.push(value.value);
    });
    let locality_assigned = temp.join();
    let formData;
    if (deliverBoyImage) {
      let formdata = new FormData();
      formdata.append("image", deliverBoyImage[0]);
      await instance.post(API.IMAGE_UPLOAD, formdata).then((res) => {
        formData = {
          name: name,
          phone: phone,
          email: email,
          aadhaar_number: Number(aadhaar),
          new_password: password,
          role_id: 4,
          bank_name,
          account_holder_name,
          account_number,
          ifsc_code,
          locality_assigned,
          profile_image: res.image_url,
        };
      });
    } else {
      formData = {
        name: name,
        phone: phone,
        email: email,
        aadhaar_number: Number(aadhaar),
        new_password: password,
        role_id: 4,
        bank_name,
        account_holder_name,
        account_number,
        ifsc_code,
        locality_assigned,
        profile_image: deliverBoyImageURL,
      };
    }
    //DELIVERY_BOYS_UPDATE
    console.log(formData);
    await instance
      .patch(`${API.DELIVERY_BOYS_UPDATE}/${id}`, formData)
      .then((res) => {
        toast.success(res.message);
        window.location.href = "/deliverymanage";
      });
  };
  let temp = [];
  useEffect(() => {
    instance.get(API.GET_LOCALITIES_ALL).then((res) => {
      res.localities.forEach((value, index) => {
        temp.push({ label: value.locality, value: value.locality });
      });
    });
    console.log("temp", temp);
    setOptions(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <h1>Update Delivery Boy</h1>
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
                  value={name}
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
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
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
                  value={email}
                />
              </div>
              <div class="form-group">
                <label for="deliveryboyAadhaar">Aadhaar No</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="deliveryboyAadhaar"
                  placeholder="Aadhaar"
                  onChange={(e) => setAadhaar(e.target.value)}
                  value={aadhaar}
                />
              </div>
              <div class="form-group">
                <label for="bank_name">Bank Name</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="bank_name"
                  placeholder="Bank Name"
                  onChange={(e) => setBank_name(e.target.value)}
                  value={bank_name}
                />
              </div>
              <div class="form-group">
                <label for="account_holder_name">Account Holder Name</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="account_holder_name"
                  placeholder="Account Holder Name"
                  onChange={(e) => setAccount_holder_name(e.target.value)}
                  value={account_holder_name}
                />
              </div>
              <div class="form-group">
                <label for="account_number">Account Number</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="account_number"
                  placeholder="Account Number"
                  onChange={(e) => setAccount_number(e.target.value)}
                  value={account_number}
                />
              </div>
              <div class="form-group">
                <label for="ifsc_code">IFSC Code</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="IFSC Code"
                  placeholder="Aadhaar"
                  onChange={(e) => setIfsc_code(e.target.value)}
                  value={ifsc_code}
                />
              </div>
              <div class="form-group">
                <label for="deliveryboyRange">Range</label>
                {console.log(range)}
                <input
                  type="text"
                  required
                  class="form-control"
                  id="deliveryboyAadhaar"
                  placeholder="Range in km"
                  value={range}
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
                <label for="deliveryImage">Delivey Boy Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="deliveryImage"
                  placeholder="Delivery Boy Image"
                  onChange={(e) => {
                    setDeliverBoyImage(e.target.files);
                  }}
                />
              </div>
              <div class="form-group">
                <label for="deliveryboyPhone">New Password</label>
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

export default UpdateDeliveryBoy;
