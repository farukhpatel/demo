import React, { useState, useEffect } from 'react'
import { APICall } from '../Utils/CommonFunctions'
import API from '../Utils/ApiConstant'
import { FormControl, makeStyles, MenuItem, Select } from '@material-ui/core';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'           //clock
import MomentUtils from '@date-io/moment'        //clock
// import moment from 'moment'   //for clock time
import 'date-fns';

//popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// modal
import ItemModal from '../Modal/ItemModalPayment'
import SettleModal from '../Modal/SettleModal'

// date pickers
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function PaymentSettlement() {
    const arr = [1, 2, 3, 4, 5, 6, 7]

    //for vendor name input
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <>
            <div className="main-outer-div">
                <div className="payment-settlement-inputs">
                    {/* <a href="/adddeliveryboy"><button>Add Delivery Boy</button></a> */}
                    <form className="payment-form">
                        <div class="form-group">
                            <label for="from">From</label>
                            <MuiPickersUtilsProvider
                                utils={MomentUtils}
                            >
                                <Grid container justify='space-around'>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        // label="Date picker dialog"
                                        format="DD/MM/yyyy"
                                        // value={foundationDate}
                                        // onChange={e => handleDateChange(e)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div class="form-group">
                            <label for="to">To</label>
                            <MuiPickersUtilsProvider
                                utils={MomentUtils}
                            >
                                <Grid container justify='space-around'>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        // label="Date picker dialog"
                                        format="DD/MM/yyyy"
                                        // value={foundationDate}
                                        // onChange={e => handleDateChange(e)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div class="form-group">
                            <label for="vendorName">Vendor Name</label>
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Sawan Collection</MenuItem>
                                    <MenuItem value={20}>Ganpati Mall</MenuItem>
                                    <MenuItem value={30}>Gupta Store</MenuItem>
                                </Select>
                                {/* <FormHelperText>Without label</FormHelperText> */}
                            </FormControl>
                        </div>
                        <button type="submit" class="btn btn-primary DateSelectSubmitBtn  " >Submit</button>
                    </form>
                </div>
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div paymentsettle-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="remaining-payments" data-bs-toggle="tab" data-bs-target="#remainingpayments" type="button" role="tab" aria-controls="remaining-payments" aria-selected="true">Remaining Payments</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link " id="paid-payments" data-bs-toggle="tab" data-bs-target="#paidpayments" type="button" role="tab" aria-controls="paid-payments" aria-selected="false">Paid Payments</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="remainingpayments" role="tabpanel" aria-labelledby="remaining-payments">
                                <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Item</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Commision</th>
                                            <th scope="col">Payable</th>
                                            <th scope="col">Settle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>#345</td>

                                                        <Popup trigger={<td style={{ cursor: "pointer" }}>Milk</td>} position="right center" modal>
                                                            <ItemModal />
                                                        </Popup>
                                                        <td>₹80</td>
                                                        <td>₹5</td>
                                                        <td>₹75</td>
                                                        <Popup trigger={<td style={{ cursor: "pointer" }}><button>Settle</button></td>} position="right center" modal>
                                                            <SettleModal />
                                                        </Popup>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade  " id="paidpayments" role="tabpanel" aria-labelledby="paid-payments">
                                <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Item</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Commision</th>
                                            <th scope="col">Settle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>#345</td>

                                                        <Popup trigger={<td style={{ cursor: "pointer" }}>Milk</td>} position="right center" modal>
                                                            <ItemModal />
                                                        </Popup>
                                                        <td>₹80</td>
                                                        <td>₹5</td>
                                                        <td style={{ color: "green" }}>Paid</td>
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
export default PaymentSettlement;
