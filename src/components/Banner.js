import React, { Component, useEffect, useState } from 'react'
import "./SuperUser.css";

import ione from '../assets/I1.png';
import itwo from '../assets/I2.jpg';
import ithree from '../assets/I3.jpg';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getDisplayDate } from '@material-ui/pickers/_helpers/text-field-helper';

function Banner() {

    const [images, setImages] = useState([]);
    const [singleImage, setSingleImage] = useState('');


    const selectFile = (e) => {
        let temp = [...images]
        console.log(temp.length)
        if (e.target.files.length > 0) {
            if (e.target.files.length > 5)
                alert('Cannot upload more than 5 images')
            else {
                let values = Object.values(e.target.files)
                values.map(image => {
                    temp.push(URL.createObjectURL(image))
                })
            }
        }
        // else {
        //     if (temp.length > 4)
        //         alert('cannot upload more than 5')
        //     else
        //         temp.push(URL.createObjectURL(e.target.files[0]))
        // }
        setImages(temp)
    }

    const getData = (item) => {
        // console.log("item", item);
        setSingleImage(item);

    }
    // console.log(singleImage)
    const removeData = (item) => {

        if (singleImage === item) {
            setSingleImage('')
        }
    }


    return (
        <>
            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div banner-div">
                        <div className="bannerTop">
                            {
                                singleImage == '' ? null :
                                    <div className="bannerTop-left" style={{ borderRadius: "5px" }} >

                                        <img src={singleImage} alt="" style={{ borderRadius: "5px" }} />
                                        <i class="fas fa-check-square fa-2x"></i>

                                    </div>
                            }
                            <div className="bannerTop-right">
                                <form className='banner-form'>
                                    <div className="banner-form-group">
                                        {/* <label for="shopName">Shop Name</label> */}
                                        <input type="file" class="form-control" id="addBanner" placeholder="Upload Banner" multiple readOnly onChange={selectFile} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="bannerBottom">

                            {/* <Carousel>
                                {
                                    images.map((items) => {
                                        return <div><img src={items} alt="" style={{ width: "100%", height: "500px", objectFit: "contain" }} /></div>
                                    })
                                }
                            </Carousel> */}

                            {
                                images.map((items) => {
                                    return <div className="banner-images">
                                        <img src={items} alt="" style={{ width: "40%", height: "40%", objectFit: "contain" }} />
                                        <div className="banner-btns">
                                            <button onClick={() => getData(items)}>Add</button>
                                            <button onClick={() => removeData(items)}>Delete</button>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
