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

  useEffect(() => {
    instance.get(API.GET_SETTING_DELIVERY_SLOTS).then(function (response) {
      setStartTime1(moment(response.slots[0].value.start, "HH:mm:ss").format());
      setEndTime1(moment(response.slots[0].value.end, "HH:mm:ss").format());
      setMorningCutoff(
        moment(response.slots[0].value.cutoff, "HH:mm:ss").format()
      );
      setStartTime2(moment(response.slots[1].value.start, "HH:mm:ss").format());
      setEndTime2(moment(response.slots[1].value.end, "HH:mm:ss").format());
      setEveningCutoff(
        moment(response.slots[1].value.cutoff, "HH:mm:ss").format()
      );
    });
  }, []);
  const form2Submit = (e) => {
    e.preventDefault();
    let Delivery_slot = {
      morning_start_time: moment(startTime1).format("HH:mm:ss"),
      morning_end_time: moment(endTime1).format("HH:mm:ss"),
      morning_cutoff_time: moment(morningCutoff).format("HH:mm:ss"),
      evening_start_time: moment(startTime2).format("HH:mm:ss"),
      evening_end_time: moment(endTime2).format("HH:mm:ss"),
      evening_cutoff_time: moment(eveningCutoff).format("HH:mm:ss"),
    };
    //SETTING_DELIVERY_SLOTS POST
    instance
      .post(API.SETTING_DELIVERY_SLOTS, Delivery_slot)
      .then(function (response) {
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
              <h4>Morning Time</h4>
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
                    value={morningCutoff}
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
              <h4>Evening Time</h4>
              <label for="shopschedulestart">Start Time</label>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    ampm={false}
                    value={startTime2}
                    onChange={(e) => {
                      console.log(e);
                      setStartTime2(e);
                    }}
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
                    value={endTime2}
                    onChange={(e) => setEndTime2(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>

            <div class="form-group">
              <label for="shopscheduleend">Cut Off Time</label>
              {console.log(eveningCutoff)}
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    ampm={false}
                    value={eveningCutoff}
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
