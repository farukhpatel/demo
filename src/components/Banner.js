import React, {  useState } from 'react'
import "./SuperUser.css";


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
                values.forEach(image => {
                    temp.push(URL.createObjectURL(image))
                })
            }
        }
        setImages(temp)
    }

    const getData = (item) => {
        setSingleImage(item);

    }
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
                        <h1 style={{textAlign:'center'}}>Add Banner</h1>
                        <div className="bannerTop">
                            {
                                singleImage === '' ? null :
                                    <div className="bannerTop-left" style={{ borderRadius: "5px" }} >

                                        <img src={singleImage} alt="" style={{ borderRadius: "5px" }} />
                                        <i class="fas fa-check-square fa-2x"></i>

                                    </div>
                            }
                            <div className="bannerTop-right">
                                <form className='banner-form'>
                                    <div className="banner-form-group">
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
