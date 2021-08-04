import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import API from '../../Utils/ApiConstant'
import instance from '../../Utils/axiosConstants'
import Back from '../BackButton/Back'
// import API from '../../Utils/ApiConstant'
// import instance from '../../Utils/ApiConstant'

function AddLocalities() {
    const [selectCity, setSelectCity] = useState([]);
    const [localities, setLocalities] = useState("")
    const [city_id, setCity_id] = useState(1)
    const [cityCode, setCityCode] = useState("")
    const [isCityActive, setIsCityActive] = useState(1)
    useEffect(() => {
        instance.get(API.GET_CITIES).then(response => {
            setSelectCity(response.cities)
        })
    }, []);
    function handleIsCityActiveSelect(event) {
        const { value } = event.target
        setIsCityActive(parseInt(value))
    }

    function addLocalitiesSubmit(e) {
        e.preventDefault()
        if (localities.length < 2) {
            toast.error('Locality name must be atleast 2 characters.')
        } else if (localities.length < 2) {
            toast.error('Locality code must be atleast 2 characters.');
        }
        let headers = new Headers()
        headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
        let addLocalitiesBody = {
            city_id: city_id,
            locality: localities,
            code: cityCode.toUpperCase(),
            is_active: isCityActive
        }
        instance.post(API.POST_LOCALITY, addLocalitiesBody).then(function (response) {
            toast.success(response.message)
            window.location.href = "/locality";
        })
    }

    return (
        <>
            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className="vendor-form-1" style={{ position: 'relative' }}>
                        <div className="backButton">
                            <Back></Back>
                        </div>
                        <h1>Add Localities</h1>
                        <form className="vendor-form">
                            <span className="customSpan"></span>
                            <div class="form-group">
                                <label for="cityName">City Name</label>
                                <select name="city" id="isActiveCity" form="carform" onChange={(e) => { setCity_id(e.target.value) }}>
                                    {selectCity.map((items, index) => {
                                        return <option key={index} value={items.id}> {items.city} </option>
                                    })}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="cityName">Locality Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="localities"
                                    placeholder="Type here..."
                                    onChange={(e) => setLocalities(e.target.value)}
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
                                <select id="isActiveCity" onChange={(e) => handleIsCityActiveSelect(e)}>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                class="btn btn-primary submitBtn"
                                onClick={addLocalitiesSubmit}
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

export default AddLocalities;