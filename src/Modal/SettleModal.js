import moment from "moment";
import React from "react";
import { useEffect } from "react";
import "../components/SuperUser.css";
import 'date-fns';
import 'reactjs-popup/dist/index.css';
import { FormControl, makeStyles, MenuItem, Select } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'           //clock
import MomentUtils from '@date-io/moment'    
import API from "../Utils/ApiConstant";
import { useState } from "react";
import instance from "../Utils/axiosConstants";

const classes = makeStyles((theme) => ({
  formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
  },
  selectEmpty: {
      marginTop: theme.spacing(2),
  },
}));

function SettleModal(props) {

  console.log(props)
  let { unpaid } = props;
  let start_date = moment(props.start_date).format('YYYY-MM-DD');
  let end_date = moment(props.end_date).format('YYYY-MM-DD');
  const [from, setFrom] = useState(new Date);
  const [to, setTo] = useState(new Date());
  const [id, setId] = useState(props.id);
  const [vendor, setVendor] = useState([]);
 
  const Submits = (e) => {
    e.preventDefault();
    // console.log(id);
    // let start_date = moment(from).format('YYYY-MM-DD');
    // let end_date = moment(to).format('YYYY-MM-DD');
    // let get_transaction = 1;
    // // GET_ORDER_SALES
    // console.log(`${API.GET_ORDER_SALES}/shop_id=${id}&start_date=${start_date}&end_date=${end_date}&get_transaction=${get_transaction}`)
    // let url = `${API.GET_ORDER_SALES}/start_date=${start_date}&end_date=${end_date}&get_transaction=${get_transaction}`;
    // instance.get(url).then((res) => {
    //     setPaid(res.transactions.paid);
    //     setUnpaid(res.transactions.unpaid[0].orders);
    //     setUnpaid2(res.transactions.unpaid[0])
    // })
}
  useEffect(()=>{
    setFrom(start_date);
    setTo(end_date);

    //for vendor
    
    instance.get(API.GET_ALL_SHOP).then((res) => {
      setVendor(res.shop);
   })
  },[]);
  return (
    <>
      <div className="main-outer-div Modal">
        <form className="payment-form">
          <div className="model_settle">
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
                  onChange={(e) => { console.log(e._d); setFrom(e._d) }}
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
                  onChange={(e) => { console.log(e._d); setTo(e._d) }}
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
                onChange={(e) => { setId(e.target.value) }}
              >
                <MenuItem value="">
                  <em>None</em>
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
          </div>
        </form>
      </div>
    </>
  );
}
export default SettleModal;
