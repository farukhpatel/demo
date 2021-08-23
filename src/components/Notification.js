import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../components/SuperUser.css";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants";
import moment from "moment";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    instance.get(API.GET_ALL_NOTIFICATIONS).then((res) => {
      toast.success(res.message);
      setNotifications(res.notifications);
    });
  }, []);
  return (
    <>
      <div className="main-outer-div">
        <div className="innerDashboardHeading">
          <h1>Notification</h1>
        </div>
        {notifications?.length > 0 ? (
          notifications.map((notification) => {
            return (
              <div className="notificationDiv">
                <div className="notificationDescription-text">
                  <h5>
                    {notification.read_at === null ? (
                      <i
                        class="fas fa-circle fa-xm"
                        style={{ fontSize: "0.8rem" }}
                      ></i>
                    ) : (
                      ""
                    )}
                    Notification
                  </h5>
                  <h6>{notification.data}</h6>
                  <h4>
                    Date :
                    {moment(notification.created_at).format(
                      "DD-MM-YYYY hh:mm a"
                    )}
                  </h4>
                </div>
              </div>
            );
          })
        ) : (
          <h1 style={{ textAlign: "center" }}>Notification not found</h1>
        )}
      </div>
    </>
  );
};
export default Notification;
