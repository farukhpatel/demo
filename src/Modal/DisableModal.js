import React from "react";
import "../components/SuperUser.css";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import "date-fns";

function DisableModal() {
  return (
    <>
      <div className="main-outer-div Modal">
        <div className="myorders-outer-div">
          <div className=" paymentsettle-inner-div">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="disable"
                  data-bs-toggle="tab"
                  data-bs-target="#disable"
                  type="button"
                  role="tab"
                  aria-controls="item-details"
                  aria-selected="true"
                >
                  Disable Delivery Boy
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active "
                id="disable"
                role="tabpanel"
                aria-labelledby="disable"
              >
                <div className="customer-details-content-outer-div">
                  <div className="customer-details-content-outer-div-top no-box-shadow">
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>From</h4>
                      </div>
                      <div className="content">
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <Grid container justify="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              format="DD/MM/yyyy"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="customer-details-content">
                      <div className="content">
                        <h4>To</h4>
                      </div>
                      <div className="content">
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <Grid container justify="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              format="DD/MM/yyyy"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <button className=" btn btn-primary DisableDeliveryBoyBtn">
                      Disable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DisableModal;
