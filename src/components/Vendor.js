import React from 'react'

function Vendor() {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    return (
        <>

            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">

                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="current-orders" data-bs-toggle="tab" data-bs-target="#currentorders" type="button" role="tab" aria-controls="current-orders" aria-selected="true">Current Orders</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="previous-orders" data-bs-toggle="tab" data-bs-target="#previousorders" type="button" role="tab" aria-controls="previous-orders" aria-selected="false">Previous Orders</button>
                            </li>

                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="currentorders" role="tabpanel" aria-labelledby="current-orders">
                                <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                    <button>New sales Order</button>
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Owner Name</th>
                                            <th scope="col">Dairy Name</th>
                                            <th scope="col">Dairy Address</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Last Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>Shubham Kumar</td>
                                                        <td><p style={{ fontWeight: 'bold' }}>Panchamrat Dairy</p></td>
                                                        <td>302BF 27 Sica School Road</td>
                                                        <td style={{ color: 'green' }}>Online</td>
                                                        <td><button>Disabled</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="previousorders" role="tabpanel" aria-labelledby="previous-orders">
                                <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                    <button>New Sales Order</button>
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Company Name</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Created On</th>
                                            <th scope="col">Last Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>Shubham Kumar</td>
                                                        <td><p style={{ fontWeight: 'bold' }}>Panchamrat Dairy</p></td>
                                                        <td>302BF 27 Sica School Road</td>
                                                        <td style={{ color: 'red' }}>Offline</td>
                                                        <td><button>Disabled</button></td>
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

export default Vendor;