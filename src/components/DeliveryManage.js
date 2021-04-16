import React, { useState, useEffect } from 'react'
import { APICall } from '../Utils/CommonFunctions'
import API from '../Utils/ApiConstant'

//popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DisableModal from '../Modal/DisableModal'


const DeliveryManage = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    return (
        <>
            <div className="main-outer-div">
                <div className="add-delivery-boy">
                    <a href="/adddeliveryboy"><button>Add Delivery Boy</button></a>
                </div>
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div deliveryboy-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="deliveryboy-list" data-bs-toggle="tab" data-bs-target="#deliveryboylist" type="button" role="tab" aria-controls="deliveryboy-list" aria-selected="true">Delivery Boy Details</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="deliveryboylist" role="tabpanel" aria-labelledby="deliveryboy-list">
                                <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Available</th>
                                            <th scope="col">Disable</th>
                                            <th scope="col">Block</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>Anuj</td>
                                                        <td>8877665577</td>
                                                        <td>Yes</td>
                                                        <Popup trigger={<td style={{ cursor: "pointer" }}><button>Disable</button></td>} position="right center" modal>
                                                            <DisableModal />
                                                        </Popup>

                                                        <td><button>Block</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default DeliveryManage
