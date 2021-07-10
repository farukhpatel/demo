
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { APICall } from '../Utils/CommonFunctions';
import API from '../Utils/ApiConstant'
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
    const [deliveryBoy, setDeliveryBoy] = React.useState({});

    const handleChange = (event, id) => {
        setDeliveryBoy({...deliveryBoy,[id]:event.target.value})
    };


    const [unassigned, setUnassigned] = useState([]);

    useEffect(() => {
        const tokenValue = localStorage.getItem("token");
        let object = {
            method: 'Get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenValue}`,
            },
        };
        APICall(API.UNASSIGNED_ORDERS, object, (error, result) => {
            if (error)
                console.log(error)

            else if (result.status) {
                console.log(result)
                setUnassigned(result.orders)
            }

            else
                alert("Something went wrong")

        })
        console.log(unassigned);
    }, [])

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

                                <table class="table table-striped " >
                                    <thead>
                                        <tr>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Customer Id</th>
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
                                            unassigned.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <td><a href="/orderdetails">{value?.order_id}</a></td>
                                                        <td><a href="/orderdetails">{value?.user_id}</a></td>
                                                        <td>{value?.shop?.shop_name}</td>
                                                        <td>{value?.delivery_date}</td>
                                                        <td>{value?.slot}</td>
                                                        <td>{value?.address?.locality?.locality}</td>
                                                        <td>
                                                            <FormControl variant="outlined" className={classes.formControl}>
                                                                <InputLabel id="demo-simple-select-outlined-label">Assign</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-outlined-label"
                                                                    id="demo-simple-select-outlined"
                                                                    value={deliveryBoy[value?.order_id] || ""}
                                                                    onChange={(event)=>handleChange(event,value?.order_id)}
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
                                                        <td>{value?.payment_status}</td>

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