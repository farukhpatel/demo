import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import API from "../../Utils/ApiConstant"
import instance from "../../Utils/axiosConstants"
import Back from '../BackButton/Back'

function UpdateCity(props){
    const prop =props.location.state
    console.log(prop);
    let { id } = useParams();
    console.log(id);
    const [cityName, setCityName] = useState(prop.city)
    const [cityCode, setCityCode] = useState(prop.code)
    const [isCityActive, setIsCityActive] = useState(prop.is_active)
    
    function handleIsCityActiveSelect(event) {
      const { value } = event.target
      setIsCityActive(parseInt(value))
    }

    function addCitySubmit(e) {
      e.preventDefault();
      console.log("Update submit");
      if (cityName.length < 2) {
        toast.error('City name must be atleast 2 characters.')
      } else if (cityCode.length < 2) {
        toast.error('City code must be atleast 2 characters.');
      }
      let headers = new Headers()
      headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
      let addCityBody = {
        city: cityName,
        code: cityCode.toUpperCase(),
        is_active: isCityActive
      }
     console.log(`${API.UPDATE_CITIES}/${id}`);
      instance.patch(`${API.UPDATE_CITIES}/${id}`, addCityBody).then(function (response) {
        toast.success(response.message)
        window.location.href = "/city";
      })
    }
  
      return (
          <>
            <div className="main-outer-div">
              <div className="myorders-outer-div">
                <div className="vendor-form-1" style={{position:'relative'}}>
                  <div className="backButton">
                    <Back></Back>
                  </div>
                  <h1>Update City</h1>
                  <form className="vendor-form">
                    <span className="customSpan"></span>
                    <div class="form-group">
                      <label for="cityName">City Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="cityName"
                        placeholder="Type here..."
                        value={cityName}
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
                      value={cityCode}
                      onChange={(e) => setCityCode(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label for="isActiveCity">Is Active City</label>
                      <select id="isActiveCity" onChange={(e) => handleIsCityActiveSelect(e)}>
                        <option value={isCityActive}>Yes</option>
                        <option value={isCityActive}>No</option>
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
export default UpdateCity;