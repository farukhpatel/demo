// import { FilePicker } from 'react-file-picker'
import React, { useState } from 'react'
import './SuperUser.css'
//for Api
import API from '../Utils/ApiConstant'
import { Select } from '@material-ui/core'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import instance from '../Utils/axiosConstants'
import Back from './BackButton/Back'
function AddProductForm() {
  const [productName, setProductName] = useState('')
  const [productImage, setProductImage] = useState('')
  const [baseUnit, setBaseUnit] = useState('')
  const [unitType, setUnitType] = useState('gm')
  const [percentage, setPercentage] = useState(1)
  const [commission, setCommission] = useState(0)
  const [subscribable, setSubscribable] = useState(null)
  const [preview, setPreview] = useState('')
  const submit = (e) => {
    e.preventDefault()
    console.log(subscribable)
    let headers = new Headers()
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
    if (productImage) {
      console.log(productImage, 'prodcut')
      let formdata = new FormData()
      formdata.append('image', productImage[0])

      instance.post(API.IMAGE_UPLOAD, formdata).then(function (response) {
        let body = {
          product_name: productName,
          product_image: response.image_url,
          commission: commission,
          is_percentage_commission: percentage,
          base_unit: `${baseUnit}${unitType}`,
          is_subscribable_product: subscribable,
        }

        let error = false
        Object.keys(body).forEach((key) => {
          if (!error && body[key] === '') {
            toast.error('One or more fields are empty.')
            error = true
          }
        })
        if (!error) {
          instance.post(API.CREATE_PRODUCT, body).then(function (response) {
            console.log("product added")
            toast.success('Successful creation of shop')
            window.location.href = '/productlist'
          })
        }
      })
    } else {
      toast.error('No file Picked.')
    }
  }
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div
            className="productlist-inner-div-form"
            style={{ position: 'relative' }}
          >
            <div className="backButton">
              <Back></Back>
            </div>

            <h1>Add Product</h1>
            <form className="productadd-form">
              <span className="customSpan"></span>
              <div class="form-group">
                <label for="productName">Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  value={productName}
                  placeholder="Product Name"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="productImage">Product Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="productImage"
                  placeholder="Product Image"
                  onChange={(e) => {
                    setProductImage(e.target.files)
                    setPreview(URL.createObjectURL(e.target.files[0]))
                  }}
                />
              </div>
              {preview === '' ? (
                ''
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    style={{ width: '50%', height: '5~0%' }}
                    src={preview}
                    alt="not found image"
                  />
                </div>
              )}
              <div class="form-group">
                <label for="baseUnit">Commission</label>

                <input
                  type="text"
                  class="form-control"
                  id="baseUnit"
                  placeholder="eg: 10, 20 30"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="baseUnit">Commision in %</label>
                <Select
                  value={percentage}
                  onChange={(event) => setPercentage(event.target.value)}
                >
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </Select>
              </div>
              <div class="form-group">
                <label for="baseUnit">Base Unit</label>
                <input
                  type="number"
                  class="form-control"
                  id="baseUnit"
                  placeholder="eg: 1KG,5L etc"
                  onChange={(e) => setBaseUnit(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="baseUnit">Unit</label>
                <Select
                  value={unitType}
                  onChange={(event) => setUnitType(event.target.value)}
                >
                  <option value={'ml'}>ml</option>
                  <option value={'gm'}>gm</option>
                  <option value={'mg'}>mg</option>
                  <option value={'ltr'}>ltr</option>
                  <option value={'kg'}>kg</option>
                </Select>
              </div>
              <div class="form-group">
                <label for="baseUnit">Is Subscribable Product</label>
                <Select
                  value={subscribable}
                  onChange={(event) => setSubscribable(event.target.value)}
                >
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </Select>
              </div>
              <button
                type="submit"
                class="btn btn-primary submitBtn"
                onClick={submit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProductForm
