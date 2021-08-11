// import { FilePicker } from 'react-file-picker'
import React, { useState, useEffect } from 'react'

import 'date-fns'

import '../SuperUser.css'
import './deliverySlot.css'

//for Api
import API from '../../Utils/ApiConstant'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import instance from '../../Utils/axiosConstants'
import { BorderAll } from '@material-ui/icons'

function DeliveryCharge() {
  // time picker
  const [images, setImages] = useState([])
  const [imagesURL, setImagesURL] = useState('')
  const [preview, setPreview] = useState([])
  const [file, setFile] = useState([])
  const [bannerURL, setBannerURL] = useState([])
  const [getImageURL, setGetImageURL] = useState([])

  useEffect(() => {
    instance.get(API.GET_BANNER_IMG).then((res) => {
      // console.log('res', res.banner[0].value)
      setGetImageURL(res.banner[0].value.banner)
    })
  }, [])

  const form2Submit = async (e) => {
    e.preventDefault()
    console.log(file)
    if (file.length > 0) {
      let temp = []
      for (let i = 0; i < file.length; i++) {
        let formdata = new FormData()
        formdata.append('image', file[i])
        await instance.post(API.IMAGE_UPLOAD, formdata).then((res) => {
          // temp.push(res.image_url)
          let tempBannerURL = bannerURL
          tempBannerURL[i] = res.image_url
          setBannerURL([...bannerURL, res.image_url])
        })
      }
      // setBannerURL(temp)
    } else {
      alert('please choose file for banner')
      return
    }
    console.log(bannerURL)
    let imgObj = {
      banner: bannerURL,
    }
    console.log(imgObj)
    instance
      .post(API.SETTING_BANNER_IMG, { banner: bannerURL })
      .then(function (response) {
        toast.success('Image Upload Successfully')
        window.location.href = '/settings'
      })

    // let formdata = new FormData()
    // formdata.append('image', images[0])
    // await instance.post(API.IMAGE_UPLOAD, formdata).then((res) => {
    //   setImagesURL(res.image_url)
    // })
  }

  const multipleBanner = (e) => {
    // console.log(e.target.files.length)
    let file = []
    let tempArray = []
    for (let i = 0; i < e.target.files.length; i++) {
      tempArray.push(URL.createObjectURL(e.target.files[i]))
      file.push(e.target.files[i])
    }
    setPreview(tempArray)
    setFile(file)
  }
  const deletePreview = (value, index) => {
    let tempArray = [].concat(preview.slice(0, index), preview.slice(index + 1))
    let tempFile = [].concat(file.slice(0, index), file.slice(index + 1))
    setPreview(tempArray)
    setFile(tempFile)
  }
  const deleteGetImage = (value, index) => {
    let tempGetImageArray = [].concat(
      getImageURL.slice(0, index),
      getImageURL.slice(index + 1),
    )
    setGetImageURL(tempGetImageArray)
  }
  const updateImage = (e) => {
    e.preventDefault()
    console.log(getImageURL)
    instance
      .post(API.SETTING_BANNER_IMG, { banner: getImageURL })
      .then(function (response) {
        toast.success('Image Upload Successfully')
        window.location.href = '/settings'
      })
  }
  return (
    <div>
      <div className="deliverySlot-container">
        <form className="banner-form">
          <div className="banner-form-group">
            <input
              type="file"
              class="form-control"
              id="addBanner"
              placeholder="Upload Banner"
              multiple
              readOnly
              onChange={(e) => {
                multipleBanner(e)
                // setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
        </form>
      </div>
      <div className="imagePreview">
        {preview.length > 0
          ? preview.map((value, index) => {
              return (
                <div className="img_main_div">
                  <img
                    style={{
                      width: '200px',
                      height: '200px',
                    }}
                    src={value}
                    alt="not found image"
                  />

                  <button
                    className="btn btn-primary submitBtn"
                    style={{ margin: '20px' }}
                    onClick={() => {
                      deletePreview(value, index)
                    }}
                  >
                    Delete
                  </button>
                </div>
              )
            })
          : ''}
      </div>
      <div className="submit_button_div">
        <button
          style={{ marginTop: '20px' }}
          type="submit"
          class="btn btn-primary submitBtn"
          onClick={form2Submit}
        >
          Submit
        </button>
      </div>
      <h1 style={{ textAlign: 'center' }}>Banner Image</h1>
      <div className="imagePreview">
        {getImageURL.length > 0
          ? getImageURL.map((value, index) => {
              return (
                <div className="img_main_div">
                  <img
                    style={{
                      width: '200px',
                      height: '200px',
                    }}
                    src={value}
                    alt="not found image"
                  />

                  <button
                    className="btn btn-primary submitBtn"
                    style={{ margin: '20px' }}
                    onClick={() => {
                      deleteGetImage(value, index)
                    }}
                  >
                    Delete
                  </button>
                </div>
              )
            })
          : ''}
      </div>
      <div className="submit_button_div">
        <div>
          <button
            className="btn btn-primary submitBtn"
            style={{ marginTop: '20px' }}
            type="submit"
            onClick={updateImage}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeliveryCharge
