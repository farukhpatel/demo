import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import User from "./components/User";
import Vendor from "./components/Vendor";
import SalesReport from "./components/SalesReport";
import ProductList from "./components/ProductList";
import TotalOrderRecievede from "./components/TotalOrderRecieved";
import CustomerDetails from "./components/CustomerDetails";
import OrderDetails from "./components/OrderDetails";
import AssignedOrders from "./components/AssignedOrders";
import PickedOrders from "./components/PickedOrders";
import NotPicked from "./components/NotPicked";
import AddVendoreForm from "./components/AddVendorForm";
import UnassignedOrders from "./components/UnassignedOrders";
import DeliveredOrders from "./components/DeliveredOrders";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import AddProductForm from "./components/AddProductForm";
import DeliveryManage from "./components/DeliveryManage";
import AddDeliveryBoyForm from "./components/AddDeliveryBoyForm";
import PaymentSettlement from "./components/PaymentSettlement";
import Banner from "./components/Banner";
import Review from "./components/Review";
import Coupon from "./components/Coupon";

function App() {
  const getWindowsSize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(getWindowsSize());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowsSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions.width < 768 ? (
    <div className="notSupported">
      <div>
        <i class="fas fa-bug fa-4x "></i>
        <h1>Oops!!</h1>
        <h3>Not Compatible With Mobile Phones</h3>
        <p>For Best User Experience Open It Again In Desktop </p>
      </div>
    </div>
  ) : (
    <>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <div>
          <ToastContainer />
          <Navbar />
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/user" component={User} />
          <Route exact path="/vendor" component={Vendor} />
          <Route exact path="/salesreport" component={SalesReport} />
          <Route exact path="/productlist" component={ProductList} />s
          <Route
            exact
            path="/totalorderrecieved"
            component={TotalOrderRecievede}
          />
          <Route exact path="/customerdetails" component={CustomerDetails} />
          <Route exact path="/orderdetails" component={OrderDetails} />
          <Route exact path="/assigned" component={AssignedOrders} />
          <Route exact path="/outfordelivery" component={PickedOrders} />
          <Route exact path="/notpicked" component={NotPicked} />
          <Route exact path="/unassignedorders" component={UnassignedOrders} />
          <Route exact path="/deliveredorders" component={DeliveredOrders} />
          <Route exact path="/addvendor" component={AddVendoreForm} />
          <Route exact path="/addproduct" component={AddProductForm} />
          <Route exact path="/deliverymanage" component={DeliveryManage} />
          <Route exact path="/adddeliveryboy" component={AddDeliveryBoyForm} />
          <Route exact path="/paymentsettle" component={PaymentSettlement} />
          <Route exact path="/banner" component={Banner} />
          <Route exact path="/review" component={Review} />
          <Route exact path="/coupon" component={Coupon} />
        </div>
      </Switch>
    </>
  );
}

export default App;
