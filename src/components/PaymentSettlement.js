import React, { useState } from 'react'
// import API from '../Utils/ApiConstant'
import { FormControl, makeStyles, MenuItem, Select } from '@material-ui/core';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'           //clock
import MomentUtils from '@date-io/moment'        //clock
// import moment from 'moment'   //for clock time
import 'date-fns';

//popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// modal
import ItemModal from '../Modal/ItemModalPayment'
import SettleModal from '../Modal/SettleModal'
import moment from 'moment';
import { useEffect } from 'react';
import API from '../Utils/ApiConstant';
import instance from '../Utils/axiosConstants';
import { toast } from 'react-toastify';

// date pickers
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function PaymentSettlement() {
    const classes = useStyles();
    const [unpaid2, setUnpaid2] = useState([]);
    const [paid, setPaid] = useState([]);
    const [unpaid, setUnpaid] = useState([]);
    const [vendor, setVendor] = useState([]);
    const [id, setId] = useState(0);
    const [from, setFrom] = useState(new Date);
    const [to, setTo] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const Submits = (e) => {
        e.preventDefault();
        let start_date = moment(from).format('YYYY-MM-DD');
        let end_date = moment(to).format('YYYY-MM-DD');
        let get_transaction = 1;
        // GET_ORDER_SALES
        let url = `${API.GET_ORDER_SALES}start_date=${start_date}&end_date=${end_date}&get_transaction=${get_transaction}` + (id > 0 ? '&shop_id=' + id : '');
        // console.log(url)
        instance.get(url).then((res) => {
            toast.success(res.message);
            setPaid(res.transactions.paid);
            setUnpaid(res.transactions?.unpaid[0]?.orders);
            setUnpaid2(res.transactions?.unpaid[0])
        })
    }
    useEffect(() => {
        const date = new Date()
        setFrom(moment(date).add(-1, 'days').format());
        setTo(moment(date).format());
        let start_date = moment(from).add(-1, 'days').format('YYYY-MM-DD');
        let end_date = moment(to).format('YYYY-MM-DD');
        let get_transaction = 1;
        // GET_ORDER_SALES
        let url = `${API.GET_ORDER_SALES}start_date=${start_date}&end_date=${end_date}&get_transaction=${get_transaction}`;
        // console.log(url)
        instance.get(url).then((res) => {
            setPaid(res.transactions.paid);
            setUnpaid(res.transactions?.unpaid[0]?.orders);
            console.log(res.transactions?.unpaid[0]?.orders)
            let l = res.transactions?.unpaid[0]?.orders.length;
            console.log(l)
            const a = new Array(l).fill(true)
            console.log(a)
            setChecked(a);
            setUnpaid2(res.transactions?.unpaid[0])
        })

        //for vendor
        instance.get(API.GET_ALL_SHOP).then((res) => {
            setVendor(res.shop);
        })
    }, []);
    return (
        <>
            <div className="main-outer-div">
                <div className="main-root-settlement">
                    <div className="payment-settlement-inputs">
                        {/* <a href="/adddeliveryboy"><button>Add Delivery Boy</button></a> */}
                        <form className="payment-form">
                            <div class="form-group">
                                <label for="from">From</label>
                                <MuiPickersUtilsProvider
                                    utils={MomentUtils}
                                >
                                    <Grid container justify='space-around'>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            // label="Date picker dialog"
                                            format="DD/MM/yyyy"
                                            onChange={(e) => { setFrom(e._d) }}
                                            value={from}
                                            // onChange={e => handleDateChange(e)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div class="form-group">
                                <label for="to">To</label>
                                <MuiPickersUtilsProvider
                                    utils={MomentUtils}
                                >
                                    <Grid container justify='space-around'>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            // label="Date picker dialog"
                                            format="DD/MM/yyyy"
                                            onChange={(e) => { setTo(e._d) }}
                                            value={to}
                                            // value={foundationDate}
                                            // onChange={e => handleDateChange(e)}
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
                                        onChange={(e) => { setId(e.target.value) }}
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        {vendor.map((items, index) => {
                                            return <MenuItem key={index} value={items.id}> {items.shop_name} </MenuItem>
                                        })}

                                    </Select>
                                    {/* <FormHelperText>Without label</FormHelperText> */}
                                </FormControl>
                            </div>
                            {/* <button type="submit" onClick={(e) => Submits(e)}>Submit</button> */}

                            <button type="submit" class="btn btn-primary DateSelectSubmitBtn" onClick={(e) => { Submits(e) }} >Submit</button>
                        </form>
                    </div>
                    <div className="main-root-second">

                        {unpaid?.length > 0 ?
                            <Popup trigger={<td style={{ cursor: "pointer" }}><button type="submit" class="btn btn-primary SettlePayBtn" onClick={() => setModalOpen(true)}>All Settle</button></td>} position="right center" modal={modalOpen}>
                                {modalOpen && <SettleModal unpaid={unpaid2} start_date={from} end_date={to} id={id} handleModal={setModalOpen} />}
                            </Popup>
                            : ''

                        }
                    </div>
                </div>
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div paymentsettle-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="remaining-payments" data-bs-toggle="tab" data-bs-target="#remainingpayments" type="button" role="tab" aria-controls="remaining-payments" aria-selected="true">Remaining Payments</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link " id="paid-payments" data-bs-toggle="tab" data-bs-target="#paidpayments" type="button" role="tab" aria-controls="paid-payments" aria-selected="false">Paid Payments</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="remainingpayments" role="tabpanel" aria-labelledby="remaining-payments">

                                <table class="table table-striped">
                                    <thead style={{ textAlign: 'center' }}>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Discount</th>
                                            <th scope="col">Commision</th>
                                            <th scope="col">Tax</th>
                                            <th scope="col">Payable</th>

                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: 'center' }}>
                                        {
                                            unpaid?.length > 0 ? unpaid.map((order, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row"><input type="checkbox" checked={true} onChange={(e) => { console.log(e) }} style={{ marginRight: "7%" }} />{index + 1}</th>
                                                        <td>{order.order_id}</td>
                                                        <td>{order.order_total_amount}</td>
                                                        <td>{order.order_discount}</td>
                                                        <td>{order.order_commission}</td>
                                                        <td>{order.order_tax}</td>
                                                        <td>{order.payable_amount}</td>


                                                    </tr>
                                                )
                                            }) : <> <tr> <td colSpan="8"> <h2> No record found </h2> </td> </tr>  </>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade  " id="paidpayments" role="tabpanel" aria-labelledby="paid-payments">

                                <table class="table table-striped">
                                    <thead style={{ textAlign: 'center' }}>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Transaction Id</th>
                                            <th scope="col">Transaction amount</th>
                                            <th scope="col">Commission</th>
                                            <th scope="col">Tax</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: 'center' }}>
                                        {
                                            paid?.length > 0 ? paid.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{value.transaction_id}</td>
                                                        <td>{value.transaction_amount}</td>
                                                        <td>{value.transaction_commission}</td>
                                                        <td>{value.transaction_tax}</td>
                                                        <td>{moment(value.transaction_date).format('YYYY-MM-DD')}</td>
                                                        <td style={{ color: "green" }}>Paid</td>
                                                    </tr>
                                                )
                                            }) : <> <tr> <td colSpan="7"> <h2> No record found </h2> </td> </tr>  </>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default PaymentSettlement;
