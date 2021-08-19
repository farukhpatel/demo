/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
//for Api
import API from '../Utils/ApiConstant'
import Popup from 'reactjs-popup'
import AddProductModal from '../Modal/AddProduct'
import EditProductModal from '../Modal/EditProduct'

import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import instance from '../Utils/axiosConstants'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import Back from './BackButton/Back'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'theme.palette.background.paper',
  },
}))

function VendorDetails(props) {
  // console.log(props?.location?.state?.vendor?.address)
  let address = props?.location?.state?.vendor?.address || {}

  console.log('vd', props?.location?.state)
  const vendorDetails = props?.location?.state?.vendor || {}
  const [products, setProducts] = useState({})
  const [totalVendorOrder, setTotalVendorOrder] = useState([])
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [addressForm, setAddressForm] = useState({
    addressable_id: address?.addressable_id,
    // addressable_type: address?.addressable_type,
    addressable_type: 'Shop',
    name: address?.name,
    address_type: address?.address_type,
    address_line_1: address?.address_line_1,
    address_line_2: address?.address_line_2,
    address_line_3: address?.address_line_3,
    locality_id: address?.locality_id,
    locality: address?.locality?.locality,
    city_id: address.city_id,
    pincode: address.pincode,
    state: address?.state,
    country: address?.country,
    latitude: address?.latitude,
    longitude: address?.longitude,
  })
  // console.log(addressForm)
  const [is_shop_active, setIs_shop_active] = useState(
    vendorDetails?.is_shop_active || true,
  )
  console.log(vendorDetails?.is_shop_active)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const shopActive = (vendorDetails) => {
    let body = {
      is_shop_active: !is_shop_active,
    }
    console.log(vendorDetails.id)
    console.log(body)
    instance
      .patch(`${API.VENDOR_UPDATE}/${vendorDetails.id}`, body)
      .then(function (res) {
        toast.success(res.message)
        console.log(res)
        setIs_shop_active(res?.shop?.is_shop_active)
        console.log(res?.shop?.is_shop_active)
        // window.location.href = "/vendor"
        // window.location.reload();
      })
  }
  useEffect(() => {
    console.log(is_shop_active, 'shop a')
  }, [is_shop_active])
  useEffect(() => {
    instance
      .get(
        `${API.GET_SHOP_PRODUCTS}?shop_id=${vendorDetails?.id}&selling_products=true&non_selling_products=true`,
      )
      .then(function (response) {
        setProducts(response?.products)
      })

    instance
      .get(`${API.VENDOR_TOTAL_ORDER}?shop_id=${vendorDetails?.id}`)
      .then(function (response) {
        console.log(response)
        setTotalVendorOrder(response?.orders)
      })
  }, [])
  const routerHistroy = useHistory()
  const editShopAddress = (e) => {
    // e.preventDefault()
    routerHistroy.push(`updateShopAddress/${vendorDetails?.id}`, addressForm)
    // console.log(addressForm)
  }
  const OrderDetails = (value) => {
    routerHistroy.push(`/orderdetails`, { orderId: value })
  }
  const handleDelete = (id) => {
    instance.delete(`${API.DELETE_SHOP_PRODUCT}/${id}`).then((res) => {
      toast.success(res.message)
      window.location.reload()
    })
  }
  return (
    <>
      <div className="main-outer-div">
        <div>
          <Back></Back>
        </div>
        <div className="myorders-outer-div">
          <div className="myorders-inner-div details-outer-div">
            <div className="details-div">
              <div className="details-div-left">
                <i class="fas fa-store fa-3x" style={{ color: '#575353' }}></i>
                <div className="details-content">
                  <h2>{vendorDetails?.shop_name}</h2>
                  <p>{vendorDetails?.shop_description}</p>
                  <h5>
                    Founding Date:
                    <span
                      style={{
                        marginLeft: '2%',
                        fontWeight: 'normal',
                        color: '#7c7c7c',
                      }}
                    >
                      {vendorDetails?.shop_founding_date}
                    </span>
                  </h5>

                  <h5>
                    Owner:
                    <span
                      style={{
                        marginLeft: '2%',
                        fontWeight: 'normal',
                        color: '#7c7c7c',
                      }}
                    >
                      {vendorDetails?.shop_owner?.name}
                    </span>
                  </h5>

                  <h5>
                    Phone:
                    <span
                      style={{
                        marginLeft: '2%',
                        fontWeight: 'normal',
                        color: '#7c7c7c',
                      }}
                    >
                      {vendorDetails?.shop_phone}
                    </span>
                  </h5>

                  <h5>
                    Licence No:
                    <span
                      style={{
                        marginLeft: '2%',
                        fontWeight: 'normal',
                        color: '#7c7c7c',
                      }}
                    >
                      {vendorDetails?.shop_license_number}
                    </span>
                  </h5>
                  <h5>
                    Shop range:
                    <span
                      style={{
                        marginLeft: '2%',
                        fontWeight: 'normal',
                        color: '#7c7c7c',
                      }}
                    >
                      {vendorDetails?.shop_delivery_range}
                    </span>
                  </h5>
                  <h5>
                    Shop address:
                    <span
                      style={{
                        marginLeft: '2%',
                        fontWeight: 'normal',
                        color: '#7c7c7c',
                      }}
                    >
                      {addressForm?.address_line_1},{' '}
                      {addressForm?.address_line_2},{' '}
                      {addressForm?.address_line_3} ,{addressForm?.locality}
                    </span>
                  </h5>
                  <h5>
                    <span>
                      Edit address:
                      <button
                        className="btn btn-link-light "
                        onClick={(e) => {
                          editShopAddress(e)
                        }}
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                    </span>
                  </h5>
                  <h5>
                    Shop Status:
                    <button
                      className={
                        is_shop_active ? 'assign-btn' : 'assign-btn-red'
                      }
                      onClick={() => shopActive(vendorDetails)}
                    >
                      {is_shop_active ? 'Active' : ' InActive'}
                    </button>
                  </h5>
                </div>
              </div>
              <div>
                <img
                  src={vendorDetails?.shop_profile}
                  alt="image not found"
                  style={{ width: '30rem', height: '20rem' }}
                />
              </div>
            </div>

            <div className={classes.root}>
              <AppBar position="static" style={{ backgroundColor: '#3b1f47' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Non-Selling Products" {...a11yProps(0)} />
                  <Tab label="Selling Products" {...a11yProps(1)} />
                  <Tab label="Total Order" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <div
                  class="tab-pane fade show active"
                  id="ordersdetails"
                  role="tabpanel"
                  aria-labelledby="orders-details"
                >
                  <table class="table table-striped">
                    <thead>
                      <tr align="center">
                        <th scope="col">S.No</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Product Image</th>
                        <th scope="col">Base Unit</th>
                        <th scope="col">Commission</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.nonselling_products?.length > 0 &&
                        products?.nonselling_products?.map((value, index) => {
                          return (
                            <tr align="center">
                              <th scope="row">{index + 1}</th>
                              <td>{value?.product_name}</td>
                              <td>
                                <img
                                  src={value?.product_image}
                                  height="50"
                                  alt="product_image"
                                />
                              </td>
                              <td>{value?.base_unit}</td>
                              <td>
                                {value?.commission}
                                {value?.is_percentage_commission === 1 && '%'}
                              </td>
                              <Popup
                                trigger={
                                  <td style={{ cursor: 'pointer' }}>
                                    <button>Add Product</button>
                                  </td>
                                }
                                position="right center"
                                modal
                              >
                                <AddProductModal
                                  shopId={vendorDetails?.id}
                                  productId={value?.id}
                                />
                              </Popup>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <div
                  class="tab-pane fade show active"
                  id="ordersdetails"
                  role="tabpanel"
                  aria-labelledby="orders-details"
                >
                  <table class="table table-striped">
                    <thead>
                      <tr align="center">
                        <th scope="col">S.No</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Original Price</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Product Daily Stock</th>
                        <th scope="col">Product Daily Stock Remaining</th>
                        <th scope="col">Base Unit</th>
                        <th scope="col">Commission</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.selling_products?.length > 0 &&
                        products?.selling_products?.map((value, index) => {
                          return (
                            <tr align="center">
                              <th scope="row">{index + 1}</th>
                              <td>{value?.product?.product_name}</td>
                              <td>₹{value?.original_price}</td>
                              <td>₹{value?.product_price}</td>
                              <td>{value?.product_daily_stock}</td>
                              <td>{value?.product_daily_stock_remaining}</td>
                              <td>{value?.product?.base_unit}</td>
                              <td>
                                {value?.product?.commission}
                                {value?.product?.is_percentage_commission ===
                                  1 && '%'}
                              </td>

                              <td>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Popup
                                    trigger={
                                      <button
                                        className="btn btn-link-light"
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i class="fas fa-edit"></i>
                                      </button>
                                    }
                                    position="right center"
                                    modal
                                  >
                                    <EditProductModal
                                      shopId={vendorDetails?.id}
                                      productDetails={value}
                                      productId={value?.id}
                                    />
                                  </Popup>
                                  <Popup
                                    className="my-popup"
                                    trigger={
                                      <button
                                        className="btn btn-link-light"
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i class="fas fa-trash-alt"></i>
                                      </button>
                                    }
                                    position="right center"
                                    modal
                                  >
                                    {(close) => (
                                      <div className="ReviewSure-text">
                                        <h6
                                          style={{
                                            marginBottom: '1rem',
                                            marginTop: '2rem',
                                          }}
                                        >
                                          Are you Sure you want to Delete this?
                                        </h6>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => {
                                            handleDelete(value?.id)
                                            close()
                                          }}
                                        >
                                          Yes
                                        </button>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => {
                                            close()
                                          }}
                                        >
                                          No
                                        </button>
                                      </div>
                                    )}
                                  </Popup>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </TabPanel>

              <TabPanel value={value} index={2}>
                <div
                  class="tab-pane fade show active"
                  id="ordersdetails"
                  role="tabpanel"
                  aria-labelledby="orders-details"
                >
                  <table class="table table-striped">
                    <thead>
                      <tr align="center">
                        <th scope="col">S.No</th>
                        <th scope="col">Order id</th>
                        <th scope="col">User id</th>
                        <th scope="col">Order net amount</th>
                        <th scope="col">Delivery charge</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Delivery date</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                      {totalVendorOrder?.length > 0 ? (
                        totalVendorOrder.map((value, index) => {
                          return (
                            <tr align="center" key={index}>
                              <th scope="row">{index + 1}</th>
                              <td onClick={() => OrderDetails(value?.order_id)}>
                                {value?.order_id}
                              </td>
                              <td>{value?.user_id}</td>
                              <td>{value?.order_net_amount}</td>
                              <td>{value?.delivery_charge}</td>
                              <td>{value?.payment_status}</td>
                              <td>{value?.delivery_date}</td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          {' '}
                          <td colSpan="7">
                            {' '}
                            <h2> No record found </h2>{' '}
                          </td>{' '}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default VendorDetails
