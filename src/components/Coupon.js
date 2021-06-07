import React, { useState } from 'react'
import '../components/SuperUser.css'
import DateTimePicker from 'react-datetime-picker';
import couponPhoto from '../assets/coupon.jpg'
//popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),

    },
}));

function Coupon() {
    const classes = useStyles();
    const [value, onChange] = useState(new Date());

    const [ar, setAr] = useState([
        {
            id: 1,
            status: false
        },
        {
            id: 2,
            status: false
        }
    ])
    const handleChange = (val) => {
        const elementsIndex = ar.findIndex(element => element.id == val.id)
        let newArray = [...ar]
        newArray[elementsIndex] = { ...newArray[elementsIndex], status: !newArray[elementsIndex].status }
        setAr(newArray)
    }

    const handleDelete = (val) => {
        let newArray = [...ar]
        const filteredArr = newArray.filter((item) => item.id !== val.id);
        setAr(filteredArr)
    }

    return (
        <>
            <div className="main-outer-div">
                <div className="innerDashboardHeading">
                    <h1>Coupon</h1>
                </div>
                <div className="myorders-outer-div coupon-area-outer " style={{ background: "white" }}>
                    <div className="coupon-area">
                        {/* <img src={couponPhoto} alt="" className="couponImage" /> */}

                        <div className="coupon-form">
                            <form>
                                <div class="form-group">
                                    <label for="title">Tittle</label>
                                    <input type="text" class="form-control" id="title" placeholder="Type here..." />
                                </div>
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <textarea class="form-control" id="description" cols="10" rows="5" placeholder="Type here..." />
                                </div>
                                <div class="form-group">
                                    <label for="discount">Discount</label>
                                    <input type="text" class="form-control" id="discount" placeholder="Type here..." />
                                </div>
                                <div class="form-group">
                                    <label for="startdate">Start Date</label><br />
                                    {/* <DateTimePicker
                                        onChange={onChange}
                                        value={value}
                                    /> */}

                                    <TextField
                                        id="datetime-local"
                                        label=""
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: false,
                                        }}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="startdate">End Date</label><br />
                                    {/* <DateTimePicker
                                        onChange={onChange}
                                        value={value}
                                    /> */}
                                    <TextField
                                        id="datetime-local"
                                        label=""
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="startdate">Type of Discount</label><br />
                                    <select className="form-group customSelect">
                                        <option>Holi</option>
                                        <option>GuruPrabh</option>
                                        <option>Diwali</option>
                                        <option>Eid</option>
                                    </select>
                                </div>
                                <div class="form-group " style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                                    <button type="submit" class="btn btn-primary coupounBtn">Submit</button>
                                </div>
                                {/* <div style={{ paddingBottom: "20px", marginBottom: "32px" }}>
                                    <button className="coupounBtn">Submit</button>
                                </div> */}
                            </form>
                        </div>
                        <div className="available-coupon">
                            {
                                ar.map((val, index) => {
                                    return (
                                        <div className="coupon-details">
                                            <div className="coupon-details-text">
                                                <h6>Start Date:-</h6>
                                                <h6>End Date:-</h6>
                                                <h6>Text:-</h6>
                                                <h6>Discounted Price:-</h6>
                                            </div>
                                            <div className="coupon-details-btn">
                                                <Popup Open nested className="my-popup"
                                                    trigger={
                                                        <button className="btn btn-primary" style={{ cursor: "pointer" }}>{val?.status ? 'Activated' : 'Activate'}</button>
                                                    }
                                                    position="right center"
                                                    modal>
                                                    {close => (
                                                        <div className="ReviewSure-text">
                                                            <h6 style={{ marginBottom: "1rem", marginTop: "2rem" }}>Are you Sure you want to {val?.status ? 'Deactivate' : 'Activate'} this review?</h6>
                                                            <button className="btn btn-primary" onClick={() => { handleChange(val); close() }} >Yes</button>
                                                            <button className="btn btn-primary" onClick={() => {
                                                                console.log('modal closed ');
                                                                close();
                                                            }}>No</button>
                                                        </div>
                                                    )}
                                                </Popup>
                                                {/* <button class="btn btn-primary">Activate</button> */}
                                                <Popup className="my-popup"
                                                    trigger={
                                                        <button className="btn btn-primary" style={{ cursor: "pointer" }}>Delete</button>
                                                    }
                                                    position="right center"
                                                    modal

                                                >
                                                    {close => (
                                                        <div className="ReviewSure-text">
                                                            <h6 style={{ marginBottom: "1rem", marginTop: "2rem" }}>Are you Sure you want to Delete this review?</h6>
                                                            <button className="btn btn-primary" onClick={() => { handleDelete(val); close(); }} >Yes</button>
                                                            <button className="btn btn-primary" onClick={() => {
                                                                console.log('modal closed ');
                                                                close();
                                                            }}>No</button>
                                                        </div>
                                                    )}
                                                </Popup>
                                                {/* <button class="btn btn-primary">Delete</button> */}
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Coupon
