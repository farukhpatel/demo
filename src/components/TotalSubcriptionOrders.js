import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";
import "./SuperUser.css";

const TotalSubcriptionOrders = () => {
  const [totalSubcriptionOrder, setTotalSubcriptionOrder] = useState([]);
  useEffect(() => {
    const date = new Date();
    let start_date = moment(date).format("YYYY-MM-DD");
    let end_date = moment(date).format("YYYY-MM-DD");
    console.log(start_date, end_date);
    instance
      .get(
        `${API.SUBCRIPTION_ORDERS}&start_date=${start_date}&end_date=${end_date}`
      )
      .then((res) => {
        toast.success(res?.message);
        setTotalSubcriptionOrder(res?.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const routerHistroy = useHistory();
  const UserDetails = (value) => {
    routerHistroy.push("/userdetails", {
      userDetails: value,
      isDeliveryBoy: false,
    });
  };
  return (
    <>
      <div className="main-outer-div">
        <div className="innerDashboardHeading">
          <h1>Total subcription order</h1>
        </div>
        <div className="myorders-outer-div">
          <div className="myorders-inner-div">
            <div className="table-responsive">
              <table class="table table-striped">
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Order Id</th>
                    <th scope="col"> User Id</th>
                    <th scope="col">Assigned to</th>
                    <th scope="col">Transaction Id</th>
                    <th scope="col">Delivery date</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  {totalSubcriptionOrder?.length > 0 ? (
                    totalSubcriptionOrder.map((value, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
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
                          <td
                            onClick={() => {
                              UserDetails(value);
                            }}
                            style={{ cursor: "pointer", color: "#0dcaf0" }}
                          >
                            {value?.user_id}
                          </td>
                          <td>{value?.assigned_to?.name}</td>
                          <td>{value?.transaction_id}</td>
                          <td>{value?.delivery_date}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      {" "}
                      <tr>
                        {" "}
                        <td colSpan="6">
                          {" "}
                          <h2> No record found </h2>{" "}
                        </td>{" "}
                      </tr>{" "}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TotalSubcriptionOrders;
