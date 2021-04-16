import React from 'react'

function AssignedOrders() {
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
                                <button class="nav-link active" id="total-orders-recieved" data-bs-toggle="tab" data-bs-target="#totalordersrecieved" type="button" role="tab" aria-controls="total-orders-recieved" aria-selected="true">Assigned Orders </button>
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

                                {/* <List list = {list} /> */}
                                <table class="table table-striped only-cards">
                                    <thead>
                                        <tr>
                                            {/* <th scope="col">S.No</th> */}
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Customer Id.</th>
                                            {/* <th scope="col">Customer Name</th> */}
                                            {/* <th scope="col">Phone No.</th> */}
                                            <th scope="col">Seller Name</th>

                                            <th scope="col">Time Alloted</th>
                                            <th scope="col">Delivery Slot</th>
                                            <th scope="col">Locality</th>
                                            {/* <th scope="col">Assigned To</th> */}
                                            <th scope="col">Order Status</th>
                                            <th scope="col">Payment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        {/* <th scope="row">{index + 1}</th> */}
                                                        <td><a href="/orderdetails">{index + 1}</a></td>
                                                        <td><a href="/orderdetails">{index + 1}</a></td>
                                                        {/* <td><p style={{ fontWeight: 'bold' }}>Anoop Soni</p></td> */}
                                                        <td>Harish Dairy</td>
                                                        {/* <td>9898987876</td> */}
                                                        {/* <td>Address</td> */}

                                                        {/* <td>Ravi Kishan</td> */}
                                                        <td>{Time}</td>
                                                        <td>2pm to 5pm</td>
                                                        <td>Locality</td>
                                                        <td>Out for Delivery</td>
                                                        <td style={{ textAlign: 'center', color: 'green' }}>Paid</td>
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
export default AssignedOrders;