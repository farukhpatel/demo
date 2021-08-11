/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import API from "../Utils/ApiConstant";
import moment from "moment";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
// table imports
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import instance from "./axiosConstants";

// Table js
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

// select
const selectStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// table js end
const columns = [
  {
    id: "index",
    label: "S.No",
    minWidth: 170,
    align: "center",
  },
  {
    id: "order_id",
    label: "Order Id",
    minWidth: 170,
    align: "center",
  },
  {
    id: "user_id",
    label: "Customer Id",
    minWidth: 170,
    align: "center",
  },
  {
    id: "shop",
    label: "Seller Name",
    minWidth: 200,
    align: "center",
  },
  {
    id: "created_at",
    label: "Order Placed Time",
    minWidth: 200,
    align: "center",
  },
  {
    id: "slot",
    label: "Delivery Slot",
    minWidth: 200,
    align: "center",
  },
  {
    id: "shop",
    label: "Locality",
    minWidth: 300,
    align: "center",
  },
  {
    id: "order_status",
    label: "Order Status",
    minWidth: 200,
    align: "center",
  },
  {
    id: "payment_status",
    label: "Payment Status",
    minWidth: 200,
    align: "center",
  },
];

const DropDown = (props) => {
  const selectClasses = selectStyles();

  const [deliveryBoy, setDeliveryBoy] = useState({});
  const handleChange = (event, id) => {
    setDeliveryBoy({ ...deliveryBoy, [id]: event.target.value });
  };

  function handleDeliveryBoyAssignment(deliveryBoyId) {
    let body = {
      order_status: 2,
      assigned_to: deliveryBoyId,
    };

    instance
      .patch(`${API.ASSIGN_DELIVERY_BOY}/${props?.id}`, body)
      .then(function (response) {
        toast.success("Delivery Boy Asssigned successfully.");
        window.location.reload();
      });
  }

  return (
    <FormControl variant="outlined" className={selectClasses.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Re-Assign</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={deliveryBoy[props?.orderId] || ""}
        onChange={(event) => handleChange(event, props?.orderId)}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props?.deliveryBoysList.map((deliveryBoy) => {
          return (
            <MenuItem
              value={deliveryBoy.id}
              onClick={() => handleDeliveryBoyAssignment(deliveryBoy.id)}
            >
              {deliveryBoy.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const TableData = ({ orderType, searchKey }) => {
  const classes = useStyles();

  // API integration
  const [assigned, setAssigned] = useState([]);
  const [deliveryBoysList, setDeliveryBoysList] = useState([]);

  function getDeliveryBoys() {
    instance.get(API.DELIVERY_BOYS).then(function (response) {
      setDeliveryBoysList(response.users);
    });
  }

  useEffect(() => {
    console.log(searchKey)
    if (searchKey.length > 0) {
      setAssigned(searchKey);
    }
    else {
      instance.get(`${API[orderType]}`).then(function (response) {
        setAssigned(response.orders);
      });
    }

    getDeliveryBoys();
  }, [searchKey]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns && columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {assigned && assigned.length > 0
              ? assigned.map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns && columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column?.id === "user_id" ||
                            column?.id === "order_id" ? (
                              <Link
                                to={{
                                  pathname: "/orderdetails",
                                  state: { order: row },
                                }}
                                style={{ color: "#0dcaf0" }}
                              >
                                {" "}
                                {`${value}`}
                              </Link>
                            ) : column?.id === "shop" &&
                              column?.label === "Locality" ? (
                                `${value?.address?.locality?.locality}`
                              ) : column?.id === "order_status" &&
                                value === "Assigned" ? (
                                  <>
                                    {`${value} to ${row?.assigned_to?.name}`}
                                    <DropDown
                                      orderId={row?.order_id}
                                      id={row?.id}
                                      deliveryBoysList={deliveryBoysList}
                                    />
                                  </>
                                ) : column?.id === "order_status" &&
                                  value === "Picked" ? (
                                    `${value} by ${row?.assigned_to?.name}`
                                  ) : column?.id === "order_status" &&
                                    value === "Delivered" ? (
                                      `${value} by ${row?.assigned_to?.name}`
                                    ) : column?.id === "shop" &&
                                      column?.label === "Seller Name" ? (
                                        value?.shop_name
                                      ) : column?.id === "index" ? (
                                        rowIndex + 1
                                      ) : column?.id === "created_at" ? (
                                        moment(value).format("D MMMM YYYY, h:mm a")
                                      ) : column.id === "slot" ? (
                                        `${moment(
                                          row?.delivery_date,
                                          "DD-MM-YYYY"
                                        ).format("D MMMM")} ${row?.slot}`
                                      ) : (
                                              value
                                            )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
              : "No Data"}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default TableData;
