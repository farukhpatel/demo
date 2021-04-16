import React, { useState, useEffect } from 'react'
import { APICall } from '../Utils/CommonFunctions'
import API from '../Utils/ApiConstant'

import '../components/SuperUser.css'

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { FormControl, makeStyles, MenuItem, Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'           //clock
import MomentUtils from '@date-io/moment'        //clock
// import moment from 'moment'   //for clock time
import 'date-fns';



function DisableModal() {

    const arr = [1, 2, 3, 4, 5, 6, 7]
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
    return (
        <>
            <div className="main-outer-div Modal">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div paymentsettle-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="disable" data-bs-toggle="tab" data-bs-target="#disable" type="button" role="tab" aria-controls="item-details" aria-selected="true">Disable Delivery Boy</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="disable" role="tabpanel" aria-labelledby="disable">
                                <div className="customer-details-content-outer-div">
                                    <div className="customer-details-content-outer-div-top no-box-shadow">

                                        <div className="customer-details-content">
                                            <div className="content"><h4>From</h4></div>
                                            <div className="content"><MuiPickersUtilsProvider
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
                                            </MuiPickersUtilsProvider></div>

                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>To</h4></div>
                                            <div className="content"><MuiPickersUtilsProvider
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
                                            </MuiPickersUtilsProvider></div>
                                        </div>
                                        {/* <div className="customer-details-content">
                                            <div className="content"><h4>Delivery Boy</h4></div>
                                            <div className="content"><p>Kishore</p></div>
                                        </div> */}
                                        <button className=" btn btn-primary btn-vendor-sign-up-login">Disable</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DisableModal;
