import React from 'react'
import './SuperUser.css'
import Back from './BackButton/Back'
import { useState } from 'react'
import { toast } from 'react-toastify';
import instance from '../Utils/axiosConstants';
import API from '../Utils/ApiConstant';
import { useParams } from 'react-router-dom';
//for Api

function UpdateDeliveryBoy(props) {
    let {id}=useParams();
    console.log(id);
    console.log(props.location.state);
    const prop=props.location.state;
    console.log(prop)
    const [name,setName]=useState(prop.name);
    const [phone,setPhone]=useState(prop.phone);
    const [email,setEmail]=useState(prop.email);
    const [password,setPassword]=useState(prop?.password ? prop?.password : "");
    const formSubmit=async(e)=>{
        e.preventDefault();     
        let formData={
            name:name, 
            phone:phone,
            email:email,
            password:password,
            role_id:4
        }
        console.log(formData);
        //DELIVERY_BOYS
        await instance.patch(`${API.DELIVERY_BOYS_UPDATE}/${id}`,formData).then((res)=>{
            console.log(res);
            toast.success("Delivery boy updated .");
            window.location.href="/deliverymanage";
        })
    
    }

    
    return (
        <>
            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className=" deliveryboy-inner-div-form" style={{position:'relative'}}>
                        <div className="backButton">
                            <Back></Back>
                        </div>
                        <h1>Update Delivery Boy</h1>
                        <form className="addDeliveryboy-form">
                            <span className="customSpan"></span>
                           
                            <div class="form-group">
                                <label for="deliverboyName">Name</label>
                                <input type="text" class="form-control" id="deliveryboyName" placeholder="Name" onChange={(e)=>setName(e.target.value)}  value={name}/>
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyPhone">Phone No</label>
                                <input type="text" required class="form-control" id="deliveryboyPhone" placeholder="Phone" onChange={(e)=>setPhone(e.target.value)}  value={phone}/>
                            </div>
                            
                            
                            <div class="form-group">
                                <label for="deliveryboyPhone">Email</label>
                                <input type="text" class="form-control" id="deliveryboyEmail" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}  value={email}/>
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyPhone">New Password</label>
                                <input type="password" class="form-control" id="deliveryboyPassword" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            
                            
                            <button type="submit" class="btn btn-primary submitBtn" onClick={(e)=>formSubmit(e)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateDeliveryBoy
