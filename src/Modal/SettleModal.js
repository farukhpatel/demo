import moment from "moment";
import React from "react";
import { useEffect } from "react";
import "../components/SuperUser.css";
import "date-fns";
import "reactjs-popup/dist/index.css";
import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
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
  const Submits = (e) => {
    let start_date = moment(props.start_date).format("YYYY-MM-DD");
    let end_date = moment(props.end_date).format("YYYY-MM-DD");
    let settleData = {
      start_date,
      end_date,
    };
    console.log("settle data");
    console.log(settleData);
    instance.patch(API.PATCH_ORDER_SETTLE, settleData).then((res) => {
      // console.log(res);
    });
    props.handleModal(false);
  };

  const cancel = (e) => {
    props.handleModal(false);
  };
  return (
    <>
      <div className="model_settle_details">
        {/* <ul>
         <li> <span>Transaction amount</span>  :{props.unpaid.transaction_amount ? props.unpaid.transaction_amount:'' }</li>
         <li> <span>Transaction commission</span> : {props.unpaid.transaction_commission ? props.unpaid.transaction_commission : ''}</li>
         <li> <span>Transaction payable amount</span> : {props.unpaid.transaction_payable_amount ?props.unpaid.transaction_payable_amount:'' }</li>
         <li> <span>Transaction tax</span> : {props.unpaid.transaction_tax ? props.unpaid.transaction_tax : ''}</li>
         <li> <span>from</span> : {props.start_date ? moment(props.start_date).format("YYYY-MM-DD") : ''}</li>
         <li> <span>to</span> : {props.end_date ? moment(props.end_date).format("YYYY-MM-DD") : ''}</li>
        </ul> */}
        <div className="modelTableDiv">
        <table className="modelTable">
          <tbody>
            <tr>
              <th>Transaction amount</th>
              <td>{props.unpaid.transaction_amount}</td>
            </tr>
            <tr>
              <th>Transaction commission</th>
              <td>{props.unpaid.transaction_commission}</td>
            </tr>
            <tr>
              <th>Transaction payable amount</th>
              <td>{props.unpaid.transaction_payable_amount}</td>
            </tr>
            <tr>
              <th>Transaction tax</th>
              <td>{props.unpaid.transaction_tax}</td>
            </tr>
            <tr>
              <th>From</th>
              <td>{moment(props.start_date).format('YYYY-MM-DD')}</td>
            </tr>
            <tr>
              <th>To</th>
              <td>{moment(props.end_date).format('YYYY-MM-DD')}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <div>
          <button
            class="btn btn-primary DateSelectSubmitBtn"
            onClick={(e) => {
              Submits(e);
            }}
          >
            Continue
          </button>
          <button
            style={{ marginLeft: "15px" }}
            class="btn btn-primary DateSelectSubmitBtn"
            onClick={(e) => {
              cancel(e);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
export default SettleModal;
