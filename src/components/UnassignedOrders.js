
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import List from './List';
import './SuperUser.css';

// select 
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function UnassignedOrders() {
    // assgin select
    const classes = useStyles()
    const [deliveryBoy, setDeliveryBoy] = React.useState('');

    const handleChange = (event) => {
        setDeliveryBoy(event.target.value);
    };

    // array and date
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
                                <button class="nav-link active" id="total-orders-recieved" data-bs-toggle="tab" data-bs-target="#totalordersrecieved" type="button" role="tab" aria-controls="total-orders-recieved" aria-selected="true">Unassigned Orders</button>
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

                                <table class="table table-striped only-cards" >
                                    <thead>
                                        <tr>
                                            {/* <th scope="col">S.No</th> */}
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Customer Id</th>
                                            {/* <th scope="col">Customer Name</th> */}
                                            {/* <th scope="col">Dairy Name</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Time Alloted</th> */}
                                            {/* <th scope="col">Assigned</th> */}
                                            <th scope="col">Seller Name</th>
                                            <th scope="col">Time Alloted</th>
                                            <th scope="col">Delivery Slot</th>
                                            <th scope="col">Locality</th>
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
                                                        {/* <td><a href="/orderdetails"><p style={{ fontWeight: 'bold' }}>Anoop Soni</p></a></td> */}
                                                        <td>Harish Dairy</td>
                                                        {/* <td>Address</td> */}
                                                        <td>{Time}</td>
                                                        <td>9am to 12pm</td>
                                                        <td>Locality</td>
                                                        {/* <td><button>Assgin</button></td> */}
                                                        <td>
                                                            <FormControl variant="outlined" className={classes.formControl}>
                                                                <InputLabel id="demo-simple-select-outlined-label">Assign</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-outlined-label"
                                                                    id="demo-simple-select-outlined"
                                                                    value={deliveryBoy}
                                                                    onChange={handleChange}
                                                                    label="Age"
                                                                >
                                                                    <MenuItem value="">
                                                                        <em>None</em>
                                                                    </MenuItem>
                                                                    <MenuItem value={10}>Ramlal</MenuItem>
                                                                    <MenuItem value={20}>Babu</MenuItem>
                                                                    <MenuItem value={30}>Munshi</MenuItem>
                                                                </Select>
                                                            </FormControl>

                                                        </td>
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
export default UnassignedOrders;