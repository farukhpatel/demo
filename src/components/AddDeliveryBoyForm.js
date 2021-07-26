import React from 'react'
import './SuperUser.css'
import Back from './BackButton/Back'
//for Api

function AddDeliveryBoyForm() {
    return (
        <>
            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className=" deliveryboy-inner-div-form" style={{position:'relative'}}>
                        <div className="backButton">
                            <Back></Back>
                        </div>
                        <h1>Add Delivery Boy</h1>
                        <form className="addDeliveryboy-form">
                            <span className="customSpan"></span>
                            <div class="form-group">
                                <label for="deliverboyName">Name</label>
                                <input type="text" class="form-control" id="deliveryboyName" placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyPhone">Phone No</label>
                                <input type="text" class="form-control" id="deliveryboyPhone" placeholder="Phone" />
                            </div>
                            <div class="form-group">
                                <label for="deliveryboyAddress">Address</label>
                                <textarea class="form-control" id="deliveryboyAddress" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary submitBtn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDeliveryBoyForm
