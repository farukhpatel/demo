import React, { useState } from 'react'
import avatar from '../assets/avatar3.png'
import reviewPhoto from '../assets/review.png'
import '../components/SuperUser.css'
//popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


function Review() {
    const [arr, setArr] = useState([
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
        const elementsIndex = arr.findIndex(element => element.id == val.id)
        let newArray = [...arr]
        newArray[elementsIndex] = { ...newArray[elementsIndex], status: !newArray[elementsIndex].status }
        setArr(newArray)
    }

    const handleDelete = (val) => {
        let newArray = [...arr]
        const filteredArr = newArray.filter((item) => item.id !== val.id);
        setArr(filteredArr)
    }

    return (
        <>
            <div className="main-outer-div">
                <div className="innerDashboardHeading">
                    <h1>Review</h1>
                </div>
                <div className="myorders-outer-div ">
                    <div className="reviewMain-div">
                        <img className="reviewImage" src={reviewPhoto} alt="" />

                        {
                            arr.map((val, index) => {
                                return (
                                    <div className="reviewDiv">
                                        <div className="reviewImg">
                                            <img src={avatar} alt="" style={{ borderRadius: "50%", width: "60px", height: "60px" }} />
                                        </div>
                                        <div className="reviewDescription">
                                            <div className="reviewDescription-text">
                                                <h3>User1</h3>
                                                <p>Reviews on Google provide you and your customers valuable information about your business. Business reviews appear next to your Business Profile in Maps and Search, and this helps your business stand out on Google. </p>
                                            </div>

                                            <div className="reviewDescription-Btn">
                                                <Popup Open nested className="my-popup"
                                                    trigger={
                                                        <button className="btn btn-primary" style={{ cursor: "pointer" }}>{val?.status ? 'Published' : 'Publish'}</button>
                                                    }
                                                    position="right center"
                                                    modal>
                                                    {close => (
                                                        <div className="ReviewSure-text">
                                                            <h6 style={{ marginBottom: "1rem", marginTop: "2rem" }}>Are you Sure you want to {val?.status ? 'Unpublished' : 'Publish'} this review?</h6>
                                                            <button className="btn btn-primary" onClick={() => { handleChange(val); close() }} >Yes</button>
                                                            <button className="btn btn-primary" onClick={() => {
                                                                console.log('modal closed ');
                                                                close();
                                                            }}>No</button>
                                                        </div>
                                                    )}
                                                </Popup>
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
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Review
