// import { FilePicker } from 'react-file-picker'
import React, { useState, useEffect } from 'react'
import './SuperUser.css'

//for Api
import { APICall } from '../Utils/CommonFunctions';
import API from '../Utils/ApiConstant';

function AddProductForm() {

    const [productName, setProductName] = useState('')
    const [productImage, setProductImage] = useState('')
    const [baseUnit, setBaseUnit] = useState('')

    const submit = () => {

    }

    return (
        <>
            <div className="main-outer-div">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div productlist-inner-div">
                        <form className="productadd-form">
                            <div class="form-group">
                                <label for="productName">Product Name</label>
                                <input type="text" class="form-control" id="productName" placeholder="Product Name" onChange={e => setProductName(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="productImage">Product Image</label>
                                <input type="file" class="form-control" id="productImage" placeholder="Product Image" onChange={e => setProductImage(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="baseUnit">Password</label>
                                <input type="text" class="form-control" id="baseUnit" placeholder="eg: 1KG,5L etc" onChange={e => setBaseUnit(e.target.value)} />
                            </div>
                            <button type="submit" class="btn btn-primary btn-vendor-sign-up-login" onClick={submit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProductForm
