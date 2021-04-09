import React, { useState } from 'react';
import './SuperUser.css';
import Calendar from 'react-calendar';

import { Bar } from 'react-chartjs-2'
function Home() {

    // date
    let d = new Date();
    let date = d.toDateString();
    const arr = [1, 2, 3, 4, 5, 6, 7];

    // calender
    const [value, onChange] = useState(new Date());

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
                        <a href="/assigned"><div className="item-1"><h3>12</h3><h5>Assigned Orders</h5></div></a>
                        <a href="/outfordelivery"><div className="item-1"><h3>7</h3><h5>Out For Delivery</h5> </div></a>
                    </div>
                    <div className="home-top-right">
                        <a href="/notpicked"><div className="item-1"><h3>5</h3><h5>Not Picked</h5>  </div></a>
                        <a href="/unassignedorders"><div className="item-1"><h3>8</h3><h5>Unassigned Orders</h5></div></a>
                    </div>
                </div>
            </div>

            <div className="home-outer-div">
                <div className="home-middle">
                    <div className="home-middle-left">

                        <div className="home-middle-left-top">
                            <a href="/totalorderrecieved">
                                <div className="total_orders_received">
                                    <h5>Total Orders Received</h5>
                                </div>
                            </a>
                            <div>
                                <a href="/totalorderrecieved"> <h3>20</h3></a>
                                {/* <h2>{date}</h2> */}
                                {/* <h2><Calendar /></h2> */}
                                <Calendar
                                    onChange={onChange}
                                    value={value}
                                />
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

        </div>
    </>
    )
}
export default Home;
