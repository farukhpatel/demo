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

function SalesReport() {
  let date = new Date()
  date = date.toLocaleDateString()
  const [from, setFrom] = useState(new Date())
  const [to, setTo] = useState(new Date())
  const arr = [1, 2, 3, 4, 5, 6, 7]
  useEffect(() => {
    let date = new Date()
    let start_date = moment(date).add(-1, 'days').format()
    setFrom(start_date)
  }, [])
  const downloadSalesReport = (e) => {
    e.preventDefault()
    let start_date = moment(from).format('YYYY-MM-DD')
    let end_date = moment(to).format('YYYY-MM-DD')
    console.log('work2')
    instance
      .get(
        `${API.DOWNLOAD_SALES_REPORT}?start_date=${start_date}&end_date=${end_date}&shop_id=1`,
      )
      .then((response) => {
        console.log(response)
        const blob = new Blob([response], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, 'some.xlsx')
        } else {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'salesReport.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
                    </tr>
                  </thead>
                  <tbody>
                    {arr.map((value, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td className="dateclass">
                            <a href="#">{date}</a>
                          </td>
                          <td>5</td>
                          <td>$6</td>
                          <td>$0.5</td>
                          <td>$0.2</td>
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
                      <th scope="col">Total Sales</th>
                      <th scope="col">Total Payout</th>
                      <th scope="col">Total Pending Amount</th>
                      <th scope="col">Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arr.map((value, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <p>$50 and 20</p>
                          </td>
                          <td>$100</td>
                          <td>$23</td>
                          <td>$5</td>{' '}
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
                      onClick={(e) => {}}
                      className="assign-btn"
                    >
                      Download Settlement Report
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={(e) => {}}
                      className="assign-btn"
                    >
                      Download User Report{' '}
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={(e) => {}}
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
