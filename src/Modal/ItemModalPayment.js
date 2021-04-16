import React, { useState, useEffect } from 'react'
import { APICall } from '../Utils/CommonFunctions'
import API from '../Utils/ApiConstant'

import '../components/SuperUser.css'




function ItemModalPayment() {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    return (
        <>
            <div className="main-outer-div Modal">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div paymentsettle-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="item-details" data-bs-toggle="tab" data-bs-target="#itemdetails" type="button" role="tab" aria-controls="item-details" aria-selected="true">Item Details</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="itemdetails" role="tabpanel" aria-labelledby="item-details">
                                {/* <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                </div> */}
                                <div className="customer-details-content-outer-div">
                                    <div className="customer-details-content-outer-div-top no-box-shadow">
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Item</h4></div>
                                            <div className="content"><p>Milk</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Quantity</h4></div>
                                            <div className="content"><p>5</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Price</h4></div>
                                            <div className="content"><p>₹20</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Delivery Boy</h4></div>
                                            <div className="content"><p>Kishore</p></div>
                                        </div>

                                        {/* <button className=" btn btn-primary btn-vendor-sign-up-login">Pay</button> */}

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
                                            <th scope="col">Item</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Delivery Boy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>Milk</td>

                                                        <td>5</td>
                                                        <td>₹20</td>
                                                        <td>Suresh</td>
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
export default ItemModalPayment;
