/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './SuperUser.css';

function SalesReport() {
    let date = new Date();
    date = date.toLocaleDateString();
    const arr = [1, 2, 3, 4, 5, 6, 7]
    return (
        <>
            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">

                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="date-wise" data-bs-toggle="tab" data-bs-target="#datewise" type="button" role="tab" aria-controls="date-wise" aria-selected="true">Date Wise</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="seller-wise" data-bs-toggle="tab" data-bs-target="#sellerwise" type="button" role="tab" aria-controls="sellerwise" aria-selected="false">Seller Wise</button>
                            </li>

                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="datewise" role="tabpanel" aria-labelledby="date-wise">
                                <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                    {/* <button>New sales Order</button> */}
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">No of Orders</th>
                                            <th scope="col">Orders Net Amount</th>
                                            <th scope="col">Shipping Charges</th>
                                            <th scope="col">Commission</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td className="dateclass"><a href="#">{date}</a></td>
                                                        <td>5</td>
                                                        <td>$6</td>
                                                        <td>$0.5</td>
                                                        <td>$0.2</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="sellerwise" role="tabpanel" aria-labelledby="seller-wise">
                                <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                    {/* <button>New Sales Order</button> */}
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Total Sales</th>
                                            <th scope="col">Total Payout</th>
                                            <th scope="col">Total Pending Amount</th>
                                            <th scope="col">Commission</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td><p>$50 and 20</p></td>
                                                        <td>$100</td>
                                                        <td>$23</td>
                                                        <td>$5</td>                                                    </tr>
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
export default SalesReport