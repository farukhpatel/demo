// import { FilePicker } from 'react-file-picker'
import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid"; //clock
import MomentUtils from "@date-io/moment"; //clock
import "date-fns";

import "../SuperUser.css";
import "./deliverySlot.css";

//for Api
import API from "../../Utils/ApiConstant";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import instance from "../../Utils/axiosConstants";

function DeliverySlots() {
  // time picker
  const [startTime1, setStartTime1] = useState(new Date());
  const [endTime1, setEndTime1] = useState(new Date());
  const [morningCutoff, setMorningCutoff] = useState(new Date());
  const [startTime2, setStartTime2] = useState(new Date());
  const [endTime2, setEndTime2] = useState(new Date());
  const [eveningCutoff, setEveningCutoff] = useState(new Date());

  // const handleTimeChange1 = (e, time) => {
  //   if (time === "start") setStartTime1(e);
  //   else setEndTime1(e);
  // };
  // const handleTimeChange2 = (e, time) => {
  //   if (time === "start") setStartTime2(e);
  //   else setEndTime2(e);
  // };

  const form2Submit = (e) => {
    e.preventDefault();
    let Delivery_slot={
      morning_start_time:moment(startTime1).format("HH:mm:ss"),
      morning_end_time:moment(endTime1).format("HH:mm:ss"),
      morning_cutoff_time:moment(morningCutoff).format("HH:mm:ss"),
      evening_start_time:moment(startTime2).format("HH:mm:ss"),
      evening_end_time:moment(endTime2).format("HH:mm:ss"),
      evening_cutoff_time:moment(eveningCutoff).format("HH:mm:ss"),
    }
    console.log(Delivery_slot);
    //SETTING_DELIVERY_SLOTS POST
    instance.post(API.SETTING_DELIVERY_SLOTS, Delivery_slot).then(function (response) {
      toast.success("Delivery Slots Successfully Added.");
      window.location.href = "/settings";
    });
    
  };

  return (
    <div>
      <div className="deliverySlot-container">
        <form className="schedule-form">
          <div className="schedules-container">
            <div>
              <label for="shopschedulestart">Start Time</label>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    ampm={false}
                    value={startTime1}
                    onChange={(e) => setStartTime1(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>

            <div class="form-group">
              <label for="shopscheduleend">End Time</label>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    ampm={false}
                    value={endTime1}
                    onChange={(e) => setEndTime1(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>

            <div class="form-group">
              <label for="shopscheduleend">Cut Off Time</label>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    ampm={false}
                    value={endTime1}
                    onChange={(e) => setMorningCutoff(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </form>

        <form>
          <div className="scheduels-container">
            <div>
              <label for="shopschedulestart">Start Time</label>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    ampm={false}
                    value={startTime1}
                    onChange={(e) => setStartTime1(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>

            <div class="form-group">
              <label for="shopscheduleend">End Time</label>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    ampm={false}
                    value={endTime1}
                    onChange={(e) => setEndTime1(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>

            <div class="form-group">
              <label for="shopscheduleend">Cut Off Time</label>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    ampm={false}
                    value={endTime1}
                    onChange={(e) => setEveningCutoff(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </form>
      </div>
      <button
        type="submit"
        class="btn btn-primary submitBtn"
        onClick={form2Submit}
      >
        Submit
      </button>
    </div>
  );
}

export default DeliverySlots;
