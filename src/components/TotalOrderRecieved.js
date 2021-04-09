
import React, { useEffect, useState } from 'react';
// import List from './List';
import './SuperUser.css';

function TotalOrderRecieved() {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const date = new Date();
    const Time = date.toLocaleTimeString();

    return (
        <>
            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">

                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="total-orders-recieved" data-bs-toggle="tab" data-bs-target="#totalordersrecieved" type="button" role="tab" aria-controls="total-orders-recieved" aria-selected="true">Total Orders Recieved</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="totalorderrecieved" role="tabpanel" aria-labelledby="total-orders-recieved">
                                <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                </div>

                                <table class="table table-striped" style={{ overflow: "scroll" }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Customer Name</th>
                                            <th scope="col">Dairy Name</th>
                                            <th scope="col">Time Alloted</th>
                                            <th scope="col">Assigned</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td><a href="/orderdetails">{index + 1}</a></td>
                                                        <td><a href="/customerdetails"><p style={{ fontWeight: 'bold' }}>Anoop Soni</p></a></td>
                                                        <td>Harish Dairy</td>
                                                        <td>{Time}</td>
                                                        <td><button>Assign</button></td>
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
export default TotalOrderRecieved;