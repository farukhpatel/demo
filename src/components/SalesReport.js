/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import './SuperUser.css'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid' //clock
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import API from '../Utils/ApiConstant'
import instance from '../Utils/axiosConstants'
import axios from 'axios'
import { FormControl, makeStyles, MenuItem, Select } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import VendorDetails from './VendorDetails'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

function SalesReport() {
  const classes = useStyles()
  let date = new Date()
  date = date.toLocaleDateString()
  const [from, setFrom] = useState(new Date())
  const [to, setTo] = useState(new Date())
  const [vendor, setVendor] = useState([])
  const [id, setId] = useState(0)
  const arr = [1, 2, 3, 4, 5, 6, 7]
  const [dataWise, setDataWise] = useState([])
  const [sellerWise, setSellerWise] = useState([])
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    let date = new Date()
    let start_date = moment(date).add(-1, 'days').format()
    setFrom(start_date)

    //for shop list
    instance.get(API.GET_ALL_SHOP).then((res) => {
      setVendor(res.shop)
    })
    //for data-wise
    instance.get(API.DATA_WISE).then((res) => {
      setDataWise(res.data)
    })
    //for seller-wise
    instance.get(API.SELLER_WISE).then((res) => {
      console.log(res)
      setSellerWise(res.data)
    })
  }, [])
  const downloadSalesReport = (e) => {
    e.preventDefault()
    let start_date = moment(from).format('YYYY-MM-DD')
    let end_date = moment(to).format('YYYY-MM-DD')
    console.log('work2')
    console.log(id)
    let url =
      `${API.DOWNLOAD_SALES_REPORT}?start_date=${start_date}&end_date=${end_date}` +
      (id > 0 ? '&shop_id=' + id : '')
    instance
      .get(url, {
        responseType: 'blob',
      })
      .then((response) => {
        console.log(response)
        const blob = new Blob([response], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, 'order-sales.xlsx')
        } else {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'order-sales.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //settlement report download
  const downloadSettlementReport = (e) => {
    e.preventDefault()
    let start_date = moment(from).format('YYYY-MM-DD')
    let end_date = moment(to).format('YYYY-MM-DD')
    console.log('settlement report')
    let url =
      `${API.DOWNLOAD_SETTLEMENT_REPORT}?start_date=${start_date}&end_date=${end_date}` +
      (id > 0 ? '&shop_id=' + id : '')
    instance
      .get(url, {
        responseType: 'blob',
      })
      .then((response) => {
        console.log(response)
        const blob = new Blob([response], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, 'order-settlements.xlsx')
        } else {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'order-settlements.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const downloadUserReport = (e) => {
    e.preventDefault()
    let start_date = moment(from).format('YYYY-MM-DD')
    let end_date = moment(to).format('YYYY-MM-DD')
    console.log('user report')
    let url = `${API.USER_REPORT_DOWNLOAD}?start_date=${start_date}&end_date=${end_date}`
    instance
      .get(url, {
        responseType: 'blob',
      })
      .then((response) => {
        console.log('response', response)
        const blob = new Blob([response], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, 'user-report.xlsx')
        } else {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'user-report.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const downloadShopReport = (e) => {
    e.preventDefault()
    let start_date = moment(from).format('YYYY-MM-DD')
    let end_date = moment(to).format('YYYY-MM-DD')
    console.log('shop report')
    let url = `${API.SHOP_REPORT_DOWNLOAD}?start_date=${start_date}&end_date=${end_date}`
    instance
      .get(url, {
        responseType: 'blob',
      })
      .then((response) => {
        console.log(response)
        const blob = new Blob([response], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, 'shop-report.xlsx')
        } else {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'shop.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const routerHistroy = useHistory();

  const VendorDetails = (id) => {
    instance
      .get(`${API.VENDOR_API}?shop_id=${id}`)
      .then(function (response) {
        console.log('r', response.shop)
        routerHistroy.push(`/vendordetails`, { vendor: response.shop[0] });
      });
  };
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="myorders-inner-div">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="date-wise"
                  data-bs-toggle="tab"
                  data-bs-target="#datewise"
                  type="button"
                  role="tab"
                  aria-controls="date-wise"
                  aria-selected="true"
                >
                  Date Wise
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="seller-wise"
                  data-bs-toggle="tab"
                  data-bs-target="#sellerwise"
                  type="button"
                  role="tab"
                  aria-controls="sellerwise"
                  aria-selected="false"
                >
                  Seller Wise
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="download-wise"
                  data-bs-toggle="tab"
                  data-bs-target="#downloadwise"
                  type="button"
                  role="tab"
                  aria-controls="download-wise"
                  aria-selected="false"
                >
                  Exports
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active "
                id="datewise"
                role="tabpanel"
                aria-labelledby="date-wise"
              >
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Date</th>
                      <th scope="col">No of Orders</th>
                      <th scope="col">Orders Net Amount</th>
                      <th scope="col">Shipping Charges</th>
                      <th scope="col">Commission</th>
                      <th scope="col">Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataWise.map((value, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{value.order_date}</td>
                          {/* <td className="dateclass">
                            <a href="#">{date}</a>
                          </td> */}
                          <td>{value.number_of_orders}</td>
                          <td>{`${value.order_net_amount}`}</td>
                          <td>{value.order_delivery_charge}</td>
                          <td>{value.order_commission}</td>
                          <td>{value.order_tax}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div
                class="tab-pane fade"
                id="sellerwise"
                role="tabpanel"
                aria-labelledby="seller-wise"
              >
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Shop name</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Total Discount</th>
                      <th scope="col">Total Commission</th>
                      <th scope="col">Total tax</th>
                      <th scope="col">Total Payable Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerWise.map((value, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          {/* <td>{value.shop_name}</td> */}

                          {console.log(value)}
                          <td style={{ color: '#85c1e9', cursor: 'pointer' }} onClick={() => VendorDetails(value?.shop_id)}>
                            {value?.shop_name}
                          </td>

                          <td>{value.total_amount}</td>
                          <td>{value.total_discount}</td>
                          <td>{value.total_commission}</td>
                          <td>{value.total_tax}</td>
                          <td>{value.total_payable_amount}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div
                class="tab-pane fade"
                id="downloadwise"
                role="tabpanel"
                aria-labelledby="seller-wise"
              >
                <div className="dashboard_time">
                  <div className="payment-settlement-inputs">
                    <form className="payment-form">
                      <div class="form-group">
                        <label for="from">From</label>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <Grid container justify="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              format="DD/MM/yyyy"
                              onChange={(e) => {
                                setFrom(e._d)
                              }}
                              value={from}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                      <div class="form-group">
                        <label for="to">To</label>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <Grid container justify="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              format="DD/MM/yyyy"
                              onChange={(e) => {
                                setTo(e._d)
                              }}
                              value={to}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                      <div class="form-group">
                        <label for="vendorName">Vendor Name</label>
                        <FormControl className={classes.formControl}>
                          <Select
                            value={id}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={(e) => {
                              setId(e.target.value)
                            }}
                          >
                            <MenuItem value="">
                              <em>All</em>
                            </MenuItem>
                            {vendor.map((items, index) => {
                              return (
                                <MenuItem key={index} value={items.id}>
                                  {' '}
                                  {items.shop_name}{' '}
                                </MenuItem>
                              )
                            })}
                          </Select>
                          {/* <FormHelperText>Without label</FormHelperText> */}
                        </FormControl>
                      </div>

                      {/* <button type="submit" onClick={(e) => Submits(e)}>Submit</button> */}

                      {/* <button type="submit" class="btn btn-primary DateSelectSubmitBtn" onClick={(e) => { Submits(e) }} >Submit</button> */}
                    </form>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5%',
                  }}
                >
                  <div>
                    <button
                      type="submit"
                      onClick={(e) => {
                        downloadSalesReport(e)
                      }}
                      className="assign-btn"
                    >
                      Download Sales Report
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={(e) => {
                        downloadSettlementReport(e)
                      }}
                      className="assign-btn"
                    >
                      Download Settlement Report
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={(e) => {
                        downloadUserReport(e)
                      }}
                      className="assign-btn"
                    >
                      Download User Report{' '}
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={(e) => {
                        downloadShopReport(e)
                      }}
                      className="assign-btn"
                    >
                      Download Vendor Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SalesReport
