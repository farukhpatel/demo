/* eslint-disable react-hooks/exhaustive-deps */

import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import API from "../Utils/ApiConstant";
import moment from "moment";
// import List from './List';

import "./SuperUser.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import instance from "../Utils/axiosConstants";

// select
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function UnassignedOrders() {
  // assgin select
  const classes = useStyles();
  const [deliveryBoy, setDeliveryBoy] = React.useState({});

  const handleChange = (event, id) => {
    setDeliveryBoy({ ...deliveryBoy, [id]: event.target.value });
  };

  const [deliveryBoysList, setDeliveryBoysList] = useState([]);

  const [unassigned, setUnassigned] = useState([]);
  const [search, setSearch] = useState("");

  const SearchUnAssignerOrder = (e) => {
    e.preventDefault();
    instance.get(`${API.UNASSIGNED_ORDERS}&order_id=${search}`).then((res) => {
      if (res?.orders?.length > 0) {
        setUnassigned(res.orders);
      } else {
        toast.error("order not found");
      }
    });
  };
  function getUnassignedOrders() {
    instance
      .get(
        `${API.UNASSIGNED_ORDERS}&delivery_date=${moment().format(
          "YYYY-MM-DD"
        )}`
      )
      .then(function (response) {
        setUnassigned(response.orders);
      });
  }

  function getDeliveryBoys() {
    instance.get(`${API.DELIVERY_BOYS}&is_active=1`).then(function (response) {
      setDeliveryBoysList(response.users);
    });
  }

  function handleDeliveryBoyAssignment(deliveryBoyId, orderId) {
    let body = {
      order_status: 2,
      assigned_to: deliveryBoyId,
    };

    instance
      .patch(`${API.ASSIGN_DELIVERY_BOY}/${orderId}`, body)
      .then(function (response) {
        toast.success(response.message);
        window.location.reload();
      });
  }

  useEffect(() => {
    getUnassignedOrders();
    getDeliveryBoys();
  }, []);

  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="myorders-inner-div">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="total-orders-recieved"
                  data-bs-toggle="tab"
                  data-bs-target="#totalordersrecieved"
                  type="button"
                  role="tab"
                  aria-controls="total-orders-recieved"
                  aria-selected="true"
                >
                  Unassigned Orders
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active "
                id="totalorderrecieved"
                role="tabpanel"
                aria-labelledby="total-orders-recieved"
              >
                <div className="btn-position">
                  <div className="searchStyle">
                    <i class="fa fa-search" aria-hidden="true"></i>

                    <input
                      type="text"
                      placeholder="Enter order ID..."
                      className="SearchInput"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" onClick={SearchUnAssignerOrder}>
                      Search
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table class="table table-striped table-edit">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Order Id</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Seller Name</th>
                        <th scope="col">Order Placed Time</th>
                        <th scope="col">Delivery Slot</th>
                        <th scope="col">Locality</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unassigned &&
                        unassigned.map((value, index) => {
                          console.log(value);
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <Link
                                  to={{
                                    pathname: "/orderdetails",
                                    state: { order: value },
                                  }}
                                  style={{ color: "#0dcaf0" }}
                                >
                                  {value?.order_id}
                                </Link>
                              </td>
                              <td>{value?.user?.name}</td>
                              <td>{value?.shop?.shop_name}</td>
                              <td>
                                {moment(value.created_at).format(
                                  "D MMMM YYYY, h:mm a"
                                )}
                              </td>
                              <td>{`${moment(
                                value?.delivery_date,
                                "DD-MM-YYYY"
                              ).format("D MMMM")} ${value?.slot}`}</td>
                              <td>{value?.address?.locality?.locality}</td>
                              <td>
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <InputLabel id="demo-simple-select-outlined-label">
                                    Assign
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={deliveryBoy[value?.order_id] || ""}
                                    onChange={(event) =>
                                      handleChange(event, value?.order_id)
                                    }
                                    label="Age"
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    {deliveryBoysList &&
                                      deliveryBoysList.map((deliveryBoy) => {
                                        return (
                                          <MenuItem
                                            value={deliveryBoy.id}
                                            onClick={() =>
                                              handleDeliveryBoyAssignment(
                                                deliveryBoy.id,
                                                value?.id
                                              )
                                            }
                                          >
                                            {deliveryBoy.name}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                </FormControl>
                              </td>
                              <td>{value?.payment_status}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UnassignedOrders;
