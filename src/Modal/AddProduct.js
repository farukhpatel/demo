import React, { useState, useEffect } from 'react'
import { APICall } from '../Utils/CommonFunctions'
import API from '../Utils/ApiConstant'

import '../components/SuperUser.css'

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { FormControl, makeStyles, MenuItem, Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import MomentUtils from '@date-io/moment'
// import moment from 'moment'   //for clock time
import 'date-fns';


function AddProduct() {
    return (
        <>
            <div className="main-outer-div Modal">
                <div className="myorders-outer-div">
                    <div className=" paymentsettle-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="disable" data-bs-toggle="tab" data-bs-target="#disable" type="button" role="tab" aria-controls="item-details" aria-selected="true">add Product</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="disable" role="tabpanel" aria-labelledby="disable">
                                <div className="customer-details-content-outer-div">
                                    <div className="customer-details-content-outer-div-top no-box-shadow">

                                        <div className="customer-details-content">
                                            <div className="content"><h4>Product Price</h4></div>
                                            <div className="content">
                                                <input type = "number"/>
                                            </div>

                                        </div>

                                        <div className="customer-details-content">
                                            <div className="content"><h4>Product Discount</h4></div>
                                            <div className="content">
                                                <input type = "number"/>
                                            </div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Product Daily Stcok</h4></div>
                                            <div className="content">
                                                <input type = "number"/>
                                            </div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Product Approval</h4></div>
                                            <div className="content">
                                                <input type = "text" value="Accepted" readOnly/>
                                            </div>
                                        </div>
                                        <button className=" btn btn-primary DisableDeliveryBoyBtn">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProduct;
