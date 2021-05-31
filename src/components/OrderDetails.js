import React from 'react'

function OrderDetails() {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    return (
        <>
            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div details-outer-div">

                        <div className="details-div">
                            <div className="details-div-left">
                                <i class="fas fa-store fa-3x" style={{ color: '#575353' }}></i>
                                <div className="details-content">
                                    <h2>Shop Name XYZ</h2>
                                    <p>Lane 33A Amit Gram Gumaniwala, Rishikesh</p>
                                    <h5>Delivery Boy:<span style={{ marginLeft: "2%", fontWeight: "normal", color: "#7c7c7c" }}>Thakur Dada</span></h5>
                                    <h5>Delivery Status:<button className="assign-btn">Status</button></h5>
                                    {/* <div className="details-div-right">
                                        <button className="assign-btn">Status</button>
                                    </div> */}
                                </div>
                            </div>
                            {/* <div className="details-div-right">
                                <button className="assign-btn">Status</button>
                            </div> */}
                        </div>

                        <ul class="nav nav-tabs" id="myTab" role="tablist">

                            <li class="nav-item" role="presentation">
                                <button class="nav-link " id="customers-details" data-bs-toggle="tab" data-bs-target="#customersdetails" type="button" role="tab" aria-controls="customers-details" aria-selected="false">Customer Details</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="orders-details" data-bs-toggle="tab" data-bs-target="#ordersdetails" type="button" role="tab" aria-controls="orders-details" aria-selected="true">Orders Details</button>
                            </li>

                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade " id="customersdetails" role="tabpanel" aria-labelledby="customer-details">
                                {/* <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                </div> */}
                                <div className="customer-details-content-outer-div">
                                    <div className="customer-details-content-outer-div-top">
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Name</h4></div>
                                            <div className="content"><p>Abhishek</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Phone No.</h4></div>
                                            <div className="content"><p>9875447895</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Email</h4></div>
                                            <div className="content"><p>abcxyz@gmail.com</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Address</h4></div>
                                            <div className="content"><p>Ncr sector 15 govind vihar New,Delhi</p></div>
                                        </div>
                                    </div>
                                    <div className="customer-details-content-outer-div-bottom">
                                        <button className="btn btn-primary">Blocked</button>
                                        <button className="btn btn-primary">Reject</button>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade show active" id="ordersdetails" role="tabpanel" aria-labelledby="orders-details">
                                {/* <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>

                                </div> */}
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            {/* <th scope="col">Order Id</th>
                                            <th scope="col">Product Id</th> */}
                                            {/* <th scope="col">Email</th>
                                            <th scope="col">Address</th> */}
                                            <th scope="col">Item Name</th>
                                            <th scope="col">Item Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Delivery Boy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (

                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        {/* <td>{index + 1}</td>
                                                        <td><p>MNS101</p></td>
                                                        <td>yoyo@email.com</td>
                                                        <td>Address</td> */}
                                                        <td>Soap</td>
                                                        <td>₹15</td>
                                                        <td>₹3</td>
                                                        <td>₹45</td>
                                                        <td>Thakur Dada</td>
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
export default OrderDetails;