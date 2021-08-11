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

  const form2Submit = async (e) => {
    e.preventDefault()
    console.log(file)
    // console.log(preview)
    // console.log(file.length)
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        let formdata = new FormData()
        formdata.append('image', file[i])
        instance.post(API.IMAGE_UPLOAD, formdata).then((res) => {
          let tempBannerURL = bannerURL
          tempBannerURL[i] = res.image_url
          setBannerURL([...bannerURL, res.image_url])
        })
      }
    } else {
      alert('please choose file for banner')
      return
    }
    console.log(bannerURL)
    let imgObj = {
      banner: bannerURL,
    }
    instance.post(API.SETTING_BANNER_IMG, imgObj).then(function (response) {
      toast.success('Image Upload Successfully')
      window.location.href = '/settings'
    })

    let formdata = new FormData()
    formdata.append('image', images[0])
    await instance.post(API.IMAGE_UPLOAD, formdata).then((res) => {
      setImagesURL(res.image_url)
    })
  }

  const multipleBanner = (e) => {
    console.log(e.target.files.length)
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
      {console.log('work')}
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {preview.length > 0
          ? preview.map((value, index) => {
              return (
                <div
                  style={{
                    // width: '200px',
                    height: '100%',
                    border: 'solid 2px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <img
                    style={{
                      // marginTop: '20px',
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
                    delete
                  </button>
                </div>
              )
            })
          : ''}
      </div>
      <div>
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
      <img
        style={{ margin: '20px 20px 20px 20px', width: '20%', height: '25%' }}
        src="http://13.127.181.126/bandify/public/storage/1627366095_Screenshot%202021-07-27%20113745.png"
        alt="not found image"
      />
      <img
        style={{ margin: '20px 20px 20px 20px', width: '20%', height: '25%' }}
        src="http://13.127.181.126/bandify/public/storage/1627366095_Screenshot%202021-07-27%20113745.png"
        alt="not found image"
      />
      <img
        style={{ margin: '20px 20px 20px 20px', width: '20%', height: '25%' }}
        src="http://13.127.181.126/bandify/public/storage/1627366095_Screenshot%202021-07-27%20113745.png"
        alt="not found image"
      />
      <img
        style={{ margin: '20px 20px 20px 20px', width: '20%', height: '25%' }}
        src="http://13.127.181.126/bandify/public/storage/1627366095_Screenshot%202021-07-27%20113745.png"
        alt="not found image"
      />
    </div>
  )
}

export default DeliveryCharge
