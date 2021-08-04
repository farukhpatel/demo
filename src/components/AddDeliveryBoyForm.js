import React from 'react'
import './SuperUser.css'
import Back from './BackButton/Back'
import { useState } from 'react'
import { toast } from 'react-toastify';
import instance from '../Utils/axiosConstants';
import API from '../Utils/ApiConstant';
//for Api

function AddDeliveryBoyForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [aadhaar, setAadhaar] = useState(null);
    const [password, setPassword] = useState("");
    const formSubmit = async (e) => {
        e.preventDefault();
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
                password: password,
                role_id: 4
            }
            console.log(formData);
            //DELIVERY_BOYS
            await instance.post(API.DELIVERY_BOYS_ADD, formData).then((res) => {
                // console.log(res);
                toast.success(res.message);
                window.location.href = "/deliverymanage";
            })
        }
    }


    return (
        <>
            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className=" deliveryboy-inner-div-form" style={{ position: 'relative' }}>
                        <div className="backButton">
                            <Back></Back>
                        </div>
                        <h1>Add Delivery Boy</h1>
                        <form className="addDeliveryboy-form">
                            <span className="customSpan"></span>

                            <div class="form-group">
                                <label for="deliverboyName">Name</label>
                                <input type="text" class="form-control" id="deliveryboyName" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyPhone">Phone No</label>
                                <input type="text" required class="form-control" id="deliveryboyPhone" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyAadhar">Aadhaar No</label>
                                <input type="test" required class="form-control" id="deliveryboyAadhaar" placeholder="Aadhaar" onChange={(e) => setAadhaar(e.target.value)} />
                            </div>


                            <div class="form-group">
                                <label for="deliveryboyPhone">Email</label>
                                <input type="text" class="form-control" id="deliveryboyEmail" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyPhone">Password</label>
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

export default AddDeliveryBoyForm
