// import { FilePicker } from 'react-file-picker'
import moment from 'moment'
import React, { useState } from 'react'
import MultiSelect from "react-multi-select-component";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'           //clock
import MomentUtils from '@date-io/moment'        //clock
import 'date-fns';

import './SuperUser.css'
import { APICall } from '../Utils/CommonFunctions';
import API from '../Utils/ApiConstant';

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

    // form fields var 
    const [file, setFile] = useState(null)
    const [userid, setUserid] = useState('')
    const [shopname, setShopname] = useState('')
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const [licenseNumber, setLicenseNumber] = useState('')
    const [foundationDate, setFoundationDate] = useState('')
    const [deliveryRange, setDeliveryRange] = useState('')
    const [schedules, setSchedules] = useState([])

    // clock
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())

    const handleDateChange = (e, time) => {

        // const { _d } = e
        if (time === 'start')
            setStartTime(e)
        else
            setEndTime(e)
    }

    const submit = e => {
        e.preventDefault()

        let temp = selected
        let shop_schedules = temp.map(item => {
            item.key = item.label
            item.start = moment(startTime._d).format('hh:mm:ss A')
            item.end = moment(endTime._d).format('hh:mm:ss A')
            return item
        })
        // console.log(shop_schedules)
        // let object = {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         Authorization: '',
        //     },
        //     body: JSON.stringify({
        //         'user_id': userid,
        //         'shop_name': shopname,
        //         'shop_phone': phone,
        //         'shop_description': description,
        //         'shop_profile': '',
        //         'shop_license_number': licenseNumber,
        //         'shop_founding_date': foundationDate,
        //         'shop_delivery_range': deliveryRange,
        //         'shop_schedules': shop_schedules
        //     })
        // }

        let body = new FormData()
        body.append('image', file[0])
        console.log(file[0])
        let object = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer 73|h9StLsaj9kJik7CIYgrt1KjuCj1gVfL2NUimk7w5`
            },
            body: body
        }
        APICall(API.IMAGE_UPLOAD, object, (err, result) => {
            console.log(result)
        })
    }

    return (
        <>

            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div vendor-inner-div">
                        <form className="vendor-form">
                            <div class="form-group">
                                <label for="userid">User Id:</label>
                                <input type="text" class="form-control" id="userid" placeholder="Enter User Id" onChange={e => setUserid(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="shopname">Shop Name:</label>
                                <input type="text" class="form-control" id="shopname" placeholder="Enter Shop Name" onChange={e => setShopname(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number:</label>
                                <input type="tel" class="form-control" id="phone" name="phone" placeholder="1234567890" pattern="[0-9]{3}-[0-9]{4}-[0-9]{3}" required onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="shopdescription">Shop Description</label>
                                <textarea class="form-control" id="shopdescription" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                            <div class="form-group">
                                <label for="profile">Profile:</label>
                                <input type="file" class="form-control" id="profile" name="profile" onChange={e => setFile(e.target.files)} />
                            </div>

                            <div class="form-group">
                                <label for="shoplicensenumber">Shop License Number</label>
                                <input type="text" class="form-control" id="shoplicensenumber" onChange={e => setLicenseNumber(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="shopfoundationdate">Shop Foundation Date</label>
                                <input type="tel" class="form-control" id="shopfoundationdate" onChange={e => setFoundationDate(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="deliveryrange">Delivery Range</label>
                                <input type="text" class="form-control" id="deliveryrange" placeholder=" eg:- 1km" onChange={e => setDeliveryRange(e.target.value)} />
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
                                <MuiPickersUtilsProvider
                                    utils={MomentUtils}
                                >
                                    <Grid container justify='space-around'>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Time picker"
                                            value={startTime}
                                            onChange={e => handleDateChange(e, 'start')}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div class="form-group">
                                <label for="shopscheduleend">Shop Schedule End</label>
                                <MuiPickersUtilsProvider
                                    utils={MomentUtils}
                                >
                                    <Grid container justify='space-around'>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Time picker"
                                            value={endTime}
                                            onChange={e => handleDateChange(e, 'end')}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>


                            <button type="submit" class="btn btn-primary btn-vendor-sign-up-login" onClick={submit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddVendorForm
