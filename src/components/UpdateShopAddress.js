import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";

const UpdateShopAddress = (props) => {
  let { id } = useParams();
  // console.log(id)
  console.log(props.location.state);
  const [addressForm, setAddressForm] = useState(props?.location?.state);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  console.log(addressForm);
  useEffect(() => {
    instance
      .get(`${API.GET_LOCALITIES_BY_CITY_ID}&city_id=${addressForm.city_id}`)
      .then((res) => {
        setLocalities(res.localities);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    instance.get(API.GET_CITIES).then(function (response) {
      setCities(response.cities);
      if (cities.length > 0) setLocalities(cities[0]?.localities);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddressForm(event) {
    let { name, value } = event.target;
    if (name === "pincode" && value.length > 6) {
      value = value.slice(0, 6);
    }
    setAddressForm({ ...addressForm, [name]: value });
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
  //from submit
  const UpdateShopAddressFormSubmit = (e) => {
    e.preventDefault();

    console.log(addressForm);

    instance
      .patch(`${API.UPDATE_SHOP_ADDRESS}/${id}`, addressForm)
      .then(function (response) {
        toast.success("Address Successfully Upadted.");
        window.location.href = "/vendor";
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="main-outer-div">
        <div className="vendor-form-1 address-form">
          <h1>Update Address</h1>
          <form className="vendor-form">
            <span className=""></span>
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
                  <option>Select a City</option>
                  {cities.map((city) => {
                    return (
                      <option
                        value={city?.id}
                        selected={
                          addressForm.city_id === city?.id ? "selected" : ""
                        }
                        label={city?.city}
                      />
                    );
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
                          selected={
                            addressForm?.locality_id === locality?.id
                              ? "selected"
                              : ""
                          }
                          label={locality?.locality}
                        />
                      );
                    })}
                </select>
              ) : (
                ""
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
              onClick={(event) => {
                UpdateShopAddressFormSubmit(event);
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default UpdateShopAddress;
