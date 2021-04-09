import React, { useState } from 'react'
import MultiSelect from "react-multi-select-component";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'           //clock
import DateFnsUtils from '@date-io/date-fns'        //clock

import './SuperUser.css'

function AddVendorForm() {
    // multiselect
    const options = [
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
        { label: "Sunday", value: "sunday" },
    ];
    const [selected, setSelected] = useState([]);

    // clock
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    return (
        <>

            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div vendor-inner-div">
                        <form className="vendor-form">
                            <div class="form-group">
                                <label for="userid">User Id:</label>
                                <input type="text" class="form-control" id="userid" placeholder="Enter User Id" />
                            </div>
                            <div class="form-group">
                                <label for="shopname">Shop Name:</label>
                                <input type="text" class="form-control" id="shopname" placeholder="Enter Shop Name" />
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number:</label>
                                <input type="tel" class="form-control" id="phone" name="phone" placeholder="1234567890" pattern="[0-9]{3}-[0-9]{4}-[0-9]{3}" required />
                            </div>
                            <div class="form-group">
                                <label for="shopdescription">Shop Description</label>
                                <textarea class="form-control" id="shopdescription" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="shoplicensenumber">Shop License Number</label>
                                <input type="text" class="form-control" id="shoplicensenumber" />
                            </div>
                            <div class="form-group">
                                <label for="shopfoundationdate">Shop Foundation Date</label>
                                <input type="tel" class="form-control" id="shopfoundationdate" />
                            </div>
                            <div class="form-group">
                                <label for="deliveryrange">Delivery Range</label>
                                <input type="text" class="form-control" id="deliveryrange" placeholder=" eg:- 1km" />
                            </div>
                            <div class="form-group">
                                <label for="shopschedule">Shop Schedule</label>
                                {/* <input type="text" class="form-control" id="shopschedule" placeholder="" /> */}

                                {/* <pre>{JSON.stringify(selected)}</pre> */}
                                <MultiSelect
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                />
                            </div>
                            <div class="form-group">
                                <label for="shopschedulestart">Shop Schedule Start</label>
                                {/* <input type="text" class="form-control" id="shopschedulestart" placeholder="" /> */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify='space-around'>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Time picker"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div class="form-group">
                                <label for="shopscheduleend">Shop Schedule End</label>
                                <input type="text" class="form-control" id="shopscheduleend" placeholder="" />
                            </div>


                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddVendorForm
