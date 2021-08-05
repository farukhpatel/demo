import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../../Utils/ApiConstant'
import instance from '../../Utils/axiosConstants'
import Back from '../BackButton/Back'
// import API from '../../Utils/ApiConstant'
// import instance from '../../Utils/ApiConstant'

function UpadteLocality(props) {
    const prop = props.location.state;
    let { id } = useParams();
    // const [selectCityValue, setSelectCityValue] = useState(prop.id);
    const [selectCity, setSelectCity] = useState([]);
    const [localities, setLocalities] = useState(prop.locality)
    const [city_id, setCity_id] = useState(prop.city_id)
    const [cityCode, setCityCode] = useState(prop.code)
    const [isCityActive, setIsCityActive] = useState(prop.is_active)
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
        instance.patch(`${API.PATCH_LOCALITY}/${id}`, addLocalitiesBody).then(function (response) {
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
                        <h1>Update Localities</h1>
                        <form className="vendor-form">
                            <span className="customSpan"></span>
                            <div class="form-group">
                                <label for="cityName">City Name</label>
                                <select name="city" id="cityName" form="carform" onChange={(e) => { setCity_id(e.target.value) }}>
                                    {selectCity.map((items, index) => {
                                        return <option key={index} value={items.id} selected={items.id === city_id ? 'selected' : ''}> {items.city} </option>
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
                                    value={localities}
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
                                    value={cityCode}
                                    onChange={(e) => setCityCode(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label for="isActiveCity">Is Active Localy</label>
                                <select id="isActiveCity" onChange={(e) => handleIsCityActiveSelect(e)}>
                                    <option value="1" selected={isCityActive === 1 ? 'selected' : ''}>Yes</option>
                                    <option value="0" selected={isCityActive === 0 ? 'selected' : ''}>No</option>
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

export default UpadteLocality;