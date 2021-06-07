import React, { useState, useEffect } from 'react'
import { APICall } from '../Utils/CommonFunctions'
import API from '../Utils/ApiConstant'

import '../components/SuperUser.css'




function SettleModal() {
    const arr = [1]
    return (
        <>
            <div className="main-outer-div Modal">
                <div className="myorders-outer-div">
                    <div className="paymentsettle-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="settle-details" data-bs-toggle="tab" data-bs-target="#settledetails" type="button" role="tab" aria-controls="settle-details" aria-selected="true">Settle </button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="settledetails" role="tabpanel" aria-labelledby="settle-details">
                                <div className="customer-details-content-outer-div">
                                    <div className="customer-details-content-outer-div-top no-box-shadow">
                                        <div className="customer-details-content">
                                            <div className="content"><h4>From</h4></div>
                                            <div className="content"><p>23-01-21</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>To</h4></div>
                                            <div className="content"><p>20-01-21</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Amount</h4></div>
                                            <div className="content"><p>₹75</p></div>
                                        </div>

                                        <button className=" btn btn-primary SettlePayBtn">Pay</button>

                                    </div>
                                    {/* <div className="customer-details-content-outer-div-bottom">
                                        <button>Blocked</button>
                                        <button>Reject</button>
                                    </div> */}
                                </div>

                                {/* <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">From</th>
                                            <th scope="col">To</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Pay</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>10-04-2021</td>

                                                        <td>15-04-2021</td>
                                                        <td>₹75</td>
                                                        <td><button className="paid">Pay</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SettleModal;
