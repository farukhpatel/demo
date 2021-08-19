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
import { toast } from "react-toastify";

const classes = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function RefundModal(props) {
  const Submits = (e) => {
    let body = {
      refund_amount: props.refund_amount,
      order_product_ids: props.order_product_ids,
    };
    console.log("body", body);
    instance
      .patch(`${API.REFUND_API}/${props.id}`, body)
      .then((res) => {
        console.log(res);
        toast.success(res?.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    props.handleModal(false);
  };
  const cancel = (e) => {
    props.handleModal(false);
  };
  return (
    <>
      <div className="model_settle_details">
        <div className="modelTableDiv">
          <table className="modelTable">
            <tbody>
              <tr>
                <th>Refund amount</th>
                <td>{props.refund_amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="button-popup">
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
export default RefundModal;
