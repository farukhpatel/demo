import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../../Utils/ApiConstant";
import instance from "../../Utils/axiosConstants";
import Back from "../BackButton/Back";
// import API from '../../Utils/ApiConstant'
// import instance from '../../Utils/ApiConstant'

function AddCity() {
  const [cityName, setCityName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [isCityActive, setIsCityActive] = useState(1);

  function handleIsCityActiveSelect(event) {
    const { value } = event.target;

    setIsCityActive(parseInt(value));
  }

  function addCitySubmit(e) {
    e.preventDefault();

    if (cityName.length < 2) {
      toast.error("City name must be atleast 2 characters.");
    } else if (cityCode.length < 2) {
      toast.error("City code must be atleast 2 characters.");
    }
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    let addCityBody = {
      city: cityName,
      code: cityCode.toUpperCase(),
      is_active: isCityActive,
    };

    instance.post(API.CREATE_CITIES, addCityBody).then(function (response) {
      toast.success(response.message);
      window.location.href = "/city";
    });
  }

  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="vendor-form-1">
            <div className="backButton">
              <Back></Back>
            </div>
            <h1>Add City</h1>
            <form className="vendor-form">
              <span className="customSpan"></span>
              <div class="form-group">
                <label for="cityName">City Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="cityName"
                  placeholder="Type here..."
                  onChange={(e) => setCityName(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="cityCode">City Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="cityCode"
                  placeholder="Type here..."
                  onChange={(e) => setCityCode(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="isActiveCity">Is Active City</label>
                <select
                  id="isActiveCity"
                  onChange={(e) => handleIsCityActiveSelect(e)}
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <button
                type="submit"
                class="btn btn-primary submitBtn"
                onClick={addCitySubmit}
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

export default AddCity;
