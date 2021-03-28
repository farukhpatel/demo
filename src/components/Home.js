import React from 'react'
import './SuperUser.css';

import { Bar } from 'react-chartjs-2'
function Home() {
    let d = new Date();
    let date = d.toDateString();
    const arr = [1, 2, 3, 4, 5, 6, 7];

    // For Bar Graph
    const state = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        datasets: [
            {
                backgroundColor: ['#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5', '#b687cb', '#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5', '#b687cb', '#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5', '#b687cb', '#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5', '#b687cb', '#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5', '#b687cb', '#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5'],
                borderColor: '#b687cb',
                borderWidth: 4,
                data: [35, 45, 80, 81, 56, 54, 32, 5, 6]
            }
        ]
    }

    const option = {

        title: {
            display: false,
            text: 'Sales Detail',
            fontSize: 20
        },
        legend: {
            display: false,
            position: 'right'
        }

    }


    return (<>
        <div className="main-outer-div">
            <div className="home-outer-div" style={{ marginTop: '3%' }}>
                <div className="home-top">
                    <div className="home-top-left">
                        {/* <div className="item-1"><h3>20</h3><h5>Total Orders</h5></div> */}
                        <div className="item-1"><h3>12</h3><h5>Assigned Orders</h5></div>
                        <div className="item-1"><h3>7</h3><h5>Out For Delivery</h5> </div>
                    </div>
                    <div className="home-top-right">
                        <div className="item-1"><h3>5</h3><h5>Not Picked</h5>  </div>
                        <div className="item-1"><h3>8</h3><h5>Unassigned Orders</h5></div>
                        {/* <div className="item-1"><h3>12-7-5-8=0</h3><h5>Total Orders Deliverd</h5></div> */}
                    </div>
                </div>
            </div>

            <div className="home-outer-div">
                <div className="home-middle">
                    <div className="home-middle-left">
                        <div className="home-middle-left-top">
                            <div className="total_orders_received">
                                <h5>Total Orders Received</h5>
                            </div>
                            <div>
                                <h3>20</h3>
                                <h2>{date}</h2>
                            </div>
                        </div>
                        <div className="home-middle-left-bottom">
                            <div className="total_orders_received">
                                <h5>Total Orders Deliverd</h5>
                            </div>
                            <div>
                                <h3>0</h3>
                            </div>
                        </div>
                    </div>
                    <div className="home-middle-right">
                        <div className="home-middle-right-top">
                            <div className="home-middle-right-top-left">
                                <h5>Total Revenue</h5>
                            </div>
                            <div className="home-middle-right-top-right">
                                <button>Today</button>
                                <button>Last 7 days</button>
                                <button>Last 30 days</button>
                            </div>
                        </div>
                        <div className="home-middle-right-bottom">
                            <Bar data={state} options={option} />                        </div>
                    </div>
                </div>
            </div>

            <div className="home-outer-div">
                <div className="home-bottom">
                    <div className="div1">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="recentorders-tab" data-bs-toggle="tab" data-bs-target="#recentorders" type="button" role="tab" aria-controls="recentorders" aria-selected="true">RECENT ORDERS</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="toproducts-tab" data-bs-toggle="tab" data-bs-target="#toproducts" type="button" role="tab" aria-controls="toproducts" aria-selected="false">TOP PRODUCTS</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="topcustomers-tab" data-bs-toggle="tab" data-bs-target="#topcustomers" type="button" role="tab" aria-controls="topcustomers" aria-selected="false">TOP CUSTOMERS</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="recentorders" role="tabpanel" aria-labelledby="home-tab">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Product Details</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Customer Email</th>
                                            <th scope="col">Created On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>14x Hoddie with Pocket</td>
                                                        <td>$40</td>
                                                        <td>{index % 2 === 0 ? <p style={{ color: 'red' }}>Pending</p> : <p style={{ color: 'green' }}>Completed</p>}</td>
                                                        <td>Abc123@gmail.com</td>
                                                        <td>15 sept, 2021 1pm</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="toproducts" role="tabpanel" aria-labelledby="profile-tab">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Product Details</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Customer Email</th>
                                            <th scope="col">Created On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>14x Hoddie with Pocket</td>
                                                        <td>$40</td>
                                                        <td>{index % 2 === 0 ? <p style={{ color: 'red' }}>Pending</p> : <p style={{ color: 'green' }}>Completed</p>}</td>
                                                        <td>Abc123@gmail.com</td>
                                                        <td>15 sept, 2021 1pm</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="topcustomers" role="tabpanel" aria-labelledby="contact-tab">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Product Details</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Customer Email</th>
                                            <th scope="col">Created On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>14x Hoddie with Pocket</td>
                                                        <td>$40</td>
                                                        <td>{index % 2 === 0 ? <p style={{ color: 'red' }}>Pending</p> : <p style={{ color: 'green' }}>Completed</p>}</td>
                                                        <td>Abc123@gmail.com</td>
                                                        <td>15 sept, 2021 1pm</td>
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
        </div>
    </>
    )
}
export default Home;
