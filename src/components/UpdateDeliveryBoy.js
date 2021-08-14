import React from 'react'
import './SuperUser.css'
import Back from './BackButton/Back'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import instance from '../Utils/axiosConstants';
import API from '../Utils/ApiConstant';
import { useParams } from 'react-router-dom';
import { Select } from '@material-ui/core'
import MultiSelect from 'react-multi-select-component'
//for Api

function UpdateDeliveryBoy(props) {
    const customValueRenderer = (selected, _options) => {
        return selected.length
            ? selected.map(({ label }) => '✔️ ' + label)
            : '😶 No Items Selected'
    }

    let { id } = useParams();
    const prop = props.location.state;
    let locality_value = prop?.delivery_boy?.locality_assigned.split(',');
    let temp2 = []
    locality_value.map((value, index) => {
        temp2.push({ label: value, value: value })
    })
    const [selected, setSelected] = useState(temp2)
    const [options, setOptions] = useState([])
    console.log(selected)
    const [name, setName] = useState(prop.name);
    const [phone, setPhone] = useState(prop.phone);
    const [aadhaar, setAadhaar] = useState(prop?.delivery_boy?.aadhaar_number);
    const [email, setEmail] = useState(prop.email);
    const [password, setPassword] = useState(prop?.password ? prop?.password : "");
    const [range, setRange] = useState(prop?.delivery_boy?.delivery_range)
    const [localities, setLocalities] = useState(prop?.locality_assigned)
    const formSubmit = async (e) => {
        e.preventDefault();
        let formData = {
            name: name,
            phone: phone,
            email: email,
            aadhaar_number: Number(aadhaar),
            password: password,
            role_id: 4
        }
        //DELIVERY_BOYS_UPDATE
        console.log(formData)
        await instance.patch(`${API.DELIVERY_BOYS_UPDATE}/${id}`, formData).then((res) => {
            toast.success(res.message);
            window.location.href = "/deliverymanage";
        })

    }
    let temp = []
    useEffect(() => {
        instance.get(API.GET_LOCALITIES_ALL).then((res) => {
            res.localities.map((value, index) => {
                temp.push({ label: value.locality, value: value.locality })
            })
        })
        console.log('temp', temp)
        setOptions(temp)
    }, [])
    return (
        <>
            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className=" deliveryboy-inner-div-form" style={{ position: 'relative' }}>
                        <div className="backButton">
                            <Back></Back>
                        </div>
                        <h1>Update Delivery Boy</h1>
                        <form className="addDeliveryboy-form">
                            <span className="customSpan"></span>

                            <div class="form-group">
                                <label for="deliverboyName">Name</label>
                                <input type="text" class="form-control" id="deliveryboyName" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyPhone">Phone No</label>
                                <input type="text" required class="form-control" id="deliveryboyPhone" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyPhone">Email</label>
                                <input type="text" class="form-control" id="deliveryboyEmail" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyAadhaar">Aadhaar No</label>
                                <input type="text" required class="form-control" id="deliveryboyAadhaar" placeholder="Aadhaar" onChange={(e) => setAadhaar(e.target.value)} value={aadhaar} />
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
                                {console.log('multi', options)}
                                <MultiSelect
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                    valueRenderer={customValueRenderer}
                                />
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyPhone">New Password</label>
                                <input type="password" class="form-control" id="deliveryboyPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" class="btn btn-primary submitBtn" onClick={(e) => formSubmit(e)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateDeliveryBoy
