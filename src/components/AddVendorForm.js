// import { FilePicker } from 'react-file-picker'
import React, { useState } from 'react'

import MultiSelect from "react-multi-select-component";
import { KeyboardTimePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import Grid from '@material-ui/core/Grid'           //clock
import MomentUtils from '@date-io/moment'        //clock
import moment from 'moment'   //for clock time
import 'date-fns';

import './SuperUser.css'

//for Api
import { APICall } from '../Utils/CommonFunctions';
import API from '../Utils/ApiConstant';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
    const [foundationDate, setFoundationDate] = useState(new Date())
    const [deliveryRange, setDeliveryRange] = useState('')
    // const [shopName, setShopName] = useState('')
    const [password, setPassword] = useState('')

    // date picker
    const handleDateChange = (e) => {
        setFoundationDate(e)
    }
    // time picker
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())

    const handleTimeChange = (e, time) => {

        // const { _d } = e
        if (time === 'start')
            setStartTime(e)
        else
            setEndTime(e)
    }


    // form1
    const submit = e => {
        e.preventDefault()
        if (!shopname) {
            toast('Shope name length atleast 5letters')
        }
        else if (!phone) {
            toast('at least 10 digit no')

        }
        else if (!password) {
            toast('length at least 5')

        }
        else {
            let object = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer 129|NcB0KsEMsz0eZZ6mYAswwANot2teoZWwVq8UY7wQ`
                },
                body: JSON.stringify({
                    'name': shopname,
                    'phone': phone,
                    'password': password,
                    'role_id': 2
                })
            }

            APICall(API.CREATE_USER, object, (err, result) => {
                if (err)
                    console.log(err)

                else if (result.status) {
                    setUserid(result.user.id)
                    document.querySelector('.vendor-form-1').classList.add('hide__form1')
                    document.querySelector('.vendor-form-2').classList.add('show-form2')
                }

                else {
                    toast('Something went wrong')
                    alert('Something went wrong')
                    console.log(result)
                    //ONLY TOAST
                }
            })
        }
    }

    const finalSubmit = e => {
        e.preventDefault()
        let headers = new Headers()
        headers.append("Authorization", "Bearer 86|sAsV4pXwIqX6mkrJet3NBjwVJC3f63YRzULurxas")
        let formdata = new FormData()
        console.log(file[0])
        formdata.append("image", file[0])
        let object = {
            method: 'POST',
            headers: headers,
            body: formdata,
            redirect: 'follow'
        }

        APICall(API.IMAGE_UPLOAD, object, (err, result) => {
            if (err)
                console.log(err)

            else if (result.status) {
                let temp = selected
                let shop_schedules = temp.map(item => {
                    item.key = item.label
                    item.start = moment(startTime._d).format('hh:mm:ss A')
                    item.end = moment(endTime._d).format('hh:mm:ss A')
                    return item
                })
                let obj = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer 86|sAsV4pXwIqX6mkrJet3NBjwVJC3f63YRzULurxas`
                    },
                    body: JSON.stringify({
                        'user_id': userid,
                        'shop_name': shopname,
                        'shop_phone': phone,
                        'shop_description': description,
                        'shop_profile': result.image_url,
                        'shop_license_number': licenseNumber,
                        //UPDATE FOUNDING DATE VALUE
                        "shop_founding_date": foundationDate,
                        'shop_delivery_range': deliveryRange,
                        'shop_schedules': shop_schedules
                    })
                }

                APICall(API.CREATE_SHOP, obj, (error, res) => {
                    if (error)
                        console.log(error)

                    else if (result.status) {
                        //SHOW TOAST MESSAGE OF SUCCESSFUL CREATION AND REDIRECT TO SOME OTHER PAGE

                        toast('Successful creation of shop')
                        console.log('Success')
                        window.location.href = '/vendor'
                    }
                    else {
                        alert('Something went wrong')
                        //SHOW TOAST OF ERROR ADN REDIRECT TO /VENDOR
                        toast('somthing went wrong')
                        window.location.href = '/vendor'
                    }
                })
            }
        })
    }

    return (
        <>

            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div vendor-inner-div vendor-form-1">
                        <form className="vendor-form">
                            <div class="form-group">
                                <label for="shopName">Shop Name</label>
                                <input type="text" class="form-control" id="shopName" placeholder="Shop Name" onChange={e => setShopname(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input type="text" class="form-control" id="phone" placeholder="Phone Number" onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" class="btn btn-primary btn-vendor-sign-up-login" onClick={submit}>Submit</button>
                        </form>
                    </div>
                    <div className="myorders-inner-div vendor-inner-div vendor-form-2">
                        <form className='vendor-form'>
                            <div class="form-group">
                                <label for="userid">User Id:</label>
                                <input type="text" class="form-control" id="userid" placeholder={userid} readOnly />
                            </div>
                            <div class="form-group">
                                <label for="shopName">Shop Name</label>
                                <input type="text" class="form-control" id="shopName" placeholder={shopname} readOnly />
                            </div>
                            <div class="form-group">
                                <label for="shopPhone">Shop Phone</label>
                                <input type="text" class="form-control" id="shopPhone" placeholder={phone} readOnly />
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
                                {/* <input type="tel" class="form-control" id="shopfoundationdate" onChange={e => setFoundationDate(e.target.value)} /> */}
                                <MuiPickersUtilsProvider
                                    utils={MomentUtils}
                                >
                                    <Grid container justify='space-around'>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date picker dialog"
                                            format="DD/MM/yyyy"
                                            value={foundationDate}
                                            onChange={e => handleDateChange(e)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div class="form-group">
                                <label for="deliveryrange">Delivery Range</label>
                                <input type="text" class="form-control" id="deliveryrange" placeholder=" eg:- 1km" onChange={e => setDeliveryRange(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="shopschedule">Shop Schedule</label>
                                <MultiSelect
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                />
                            </div>
                            <div class="form-group">
                                <label for="shopschedulestart">Shop Schedule Start</label>
                                <MuiPickersUtilsProvider
                                    utils={MomentUtils}
                                >
                                    <Grid container justify='space-around'>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Time picker"
                                            value={startTime}
                                            onChange={e => handleTimeChange(e, 'start')}
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
                            <button type="submit" class="btn btn-primary btn-vendor-sign-up-login" onClick={finalSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddVendorForm
