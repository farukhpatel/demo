import React, { useEffect, useState } from 'react'
import API from '../Utils/ApiConstant'
import instance from '../Utils/axiosConstants'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Box, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

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

const UserDetails = (props) => {
  const routerHistroy = useHistory()
  const { userDetails, isDeliveryBoy } = props?.location?.state
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [orderDetails, setOrderDetails] = useState([])
  const [is_user_blocked, setIs_user_blocked] = useState(
    userDetails.is_user_blocked,
  )
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const userOrderDetails = (user_id) => {
    instance
      .get(
        `${API.VENDOR_TOTAL_ORDER}?user_id=${user_id}&with_order_reviews=1&order_by=desc`,
      )
      .then((res) => {
        setOrderDetails(res.orders)
      })
  }
  const DeliveryBoyorderDetails = (user_id) => {
    instance.get(`${API.DELIVERYBOY_ORDER_DETAIL}${user_id}`).then((res) => {
      setOrderDetails(res.orders)
    })
  }

  useEffect(() => {
    !isDeliveryBoy
      ? userOrderDetails(userDetails.id)
      : DeliveryBoyorderDetails(userDetails.id)
  }, [])
  const GoOrderDetails = (value) => {
    routerHistroy.push('/orderdetails', { orderId: value.order_id })
  }
  const editDeliveryBoy = () => {
    routerHistroy.push(`updateDeliveryBoy/${userDetails.id}`, userDetails)
  }
  const blockUser = () => {
    instance
      .patch(`${API.USER_UPDATE}${userDetails.id}`, {
        is_user_blocked: !is_user_blocked,
      })
      .then((res) => {
        setIs_user_blocked(!is_user_blocked)
      })
  }

  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="myorders-inner-div details-outer-div">
            <div className="details-div">
              <div className="details-div-left">
                <i class="fas fa-store fa-3x" style={{ color: '#575353' }}></i>
                <div className="details-content">
                  <h3>
                    Name : {userDetails?.name ? userDetails?.name : 'Not found'}
                  </h3>
                  <p>{`Phone : ${userDetails?.phone || ' '} `}</p>
                  <p>{`Email : ${userDetails?.email || ' '} `}</p>
                  <p>{`Gender : ${userDetails?.gender || ' '} `}</p>
                  <p>{`D.O.B. : ${userDetails?.birth_date || ' '} `}</p>
                  <div className="">
                    {isDeliveryBoy ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => editDeliveryBoy()}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        className={
                          is_user_blocked ? 'assign-btn' : 'assign-btn-red'
                        }
                        onClick={() => blockUser()}
                      >
                        {is_user_blocked ? 'Un-Block ' : 'Block'}
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <img
                    src={userDetails?.profile_image}
                    alt="image not found"
                    style={{ width: '20rem', height: '20rem' }}
                  />
                </div>
              </div>
            </div>
            <div className={classes.root}>
              <AppBar position="static" style={{ backgroundColor: '#3b1f47' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Order Details" {...a11yProps(0)} />
                  <Tab label="Address Details" {...a11yProps(1)} />
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
                        <th scope="col">Order id</th>
                        <th scope="col">User id</th>
                        <th scope="col">Order net amount</th>
                        <th scope="col">Delivery charge</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Delivery date</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                      {orderDetails?.length > 0 ? (
                        orderDetails.map((value, index) => {
                          return (
                            <tr align="center" key={index}>
                              <th scope="row">{index + 1}</th>
                              <td onClick={() => GoOrderDetails(value)}>
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

              <TabPanel value={value} index={1}>
                <div
                  class="tab-pane fade show active"
                  id="addressdetails"
                  role="tabpanel"
                  aria-labelledby="address-details"
                >
                  <table class="table table-striped">
                    <thead>
                      <tr align="center">
                        <th scope="col">S.No</th>
                        <th scope="col">Address Type</th>
                        <th scope="col">Address</th>
                        <th scope="col">Locality</th>
                        <th scope="col">Pincode</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                      {userDetails.address?.length > 0 ? (
                        userDetails.address.map((value, index) => {
                          return (
                            <tr align="center" key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{value?.address_type}</td>
                              <td>
                                {value?.address_line_1}, <br />
                                {value?.address_line_2}, <br />
                                {value?.address_line_3}{' '}
                              </td>
                              <td>
                                {value?.locality.locality}, {value?.city.city}
                                <br />
                                {value?.state}, {value?.country}
                              </td>
                              <td>{value?.pincode}</td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          {' '}
                          <td colSpan="5">
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
export default UserDetails