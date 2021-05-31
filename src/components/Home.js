import React, { useState } from 'react';
import './SuperUser.css';
import { Avatar, IconButton } from '@material-ui/core';
import Calendar from 'react-calendar';

import dairy from '../assets/dairy.jpg';
import { Bar } from 'react-chartjs-2'
function Home() {

    // date
    let d = new Date();
    let date = d.toDateString();
    const arr = [1, 2, 3, 4, 5, 6, 7];

    // calender
    // const [value, onChange] = useState(new Date());

    // For Bar Graph
    // const state = {
    //     labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    //     datasets: [
    //         {
    //             backgroundColor: ['#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5', '#b687cb', '#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5', '#b687cb', '#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5', '#b687cb', '#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5', '#b687cb', '#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5', '#b687cb', '#9d5eb9', '#9550b3', '#a66cbf', '#ae79c5'],
    //             borderColor: '#b687cb',
    //             borderWidth: 4,
    //             data: [35, 45, 80, 81, 56, 54, 32, 5, 6]
    //         }
    //     ]
    // }

    // const option = {

    //     title: {
    //         display: false,
    //         text: 'Sales Detail',
    //         fontSize: 20
    //     },
    //     legend: {
    //         display: false,
    //         position: 'right'
    //     }

    // }


    return (<>

        <div className="mainDashboardHeading">
            <div className="innerDashboardHeading">
                <h1>Dashboard</h1>
            </div>
        </div>
        <div className="main-outer-div">
            <div className="home-outer-div" style={{ paddingTop: '3%' }}>
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
                            <div className="icon-position">
                                <i class="fas fa-atom fa-2x " style={{ color: "#D7DBDD" }}></i>
                            </div>
                            <div>
                                <a href="/totalorderrecieved"> <h3>20</h3></a>
                            </div>
                            <a href="/totalorderrecieved">
                                <div className="total_orders_received">
                                    <h5>Total Orders Received</h5>
                                </div>
                            </a>
                        </div>

                        <div className="home-middle-left-bottom">
                            <div className="icon-position">
                                <i class="fas fa-chart-pie fa-2x " style={{ color: " #D7DBDD" }}></i>
                            </div>
                            <div>
                                <h3>0</h3>
                            </div>
                            <div className="total_orders_received">
                                <h5>Total Orders Deliverd</h5>
                            </div>
                        </div>
                    </div>
                    <div className="home-middle-right">
                        <div className="home-middle-right-top">
                            <div className="icon-position">
                                <i class="fas fa-users fa-2x" style={{ color: "#D7DBDD" }}></i>
                            </div>
                            <div>
                                <a href="/totalorderrecieved"> <h3>50</h3></a>
                            </div>
                            <a href="/totalorderrecieved">
                                <div className="active_user_count">
                                    <h5>Total Active Users</h5>
                                </div>
                            </a>
                        </div>
                        <div className="home-middle-right-bottom">
                            <div className="icon-position">
                                <i class="fas fa-truck fa-2x" style={{ color: "#D7DBDD" }}></i>
                            </div>
                            <div>
                                <a href="/deliverymanage"> <h3>6</h3></a>
                            </div>
                            <a href="/deliverymanage">
                                <div className="active_delivery_count">
                                    <h5>Total Delivery Boys</h5>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="home-middle-right">
                        <img src={dairy} style={{ width: "400px", height: "400px" }} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default Home;
