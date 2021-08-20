import React from "react";
import "../components/SuperUser.css";
import "date-fns";
import "reactjs-popup/dist/index.css";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";
import { toast } from "react-toastify";

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
        <h4>Are you Sure you want to refund this amount?</h4>
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
