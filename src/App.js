import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";

import Geocode from "react-geocode";

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
import Settings from "./components/Settings";
import Banner from "./components/Banner";
import Review from "./components/Review";
import Coupon from "./components/Coupon";
import VendorDetails from "./components/VendorDetails";
import UpdateVendorForm from "./components/UpdateVendor";
import updateProduct from "./components/updateProduct";
import city from "./components/city/City";
import addCity from "./components/city/addCity";
import updateCity from "./components/city/updateCity";
import UpdateDeliveryBoy from "./components/UpdateDeliveryBoy";
import Locality from "./components/Locality/Locality";
// import { AddLocation } from "@material-ui/icons";
import AddLocalities from "./components/Locality/AddLocalities";
import UpdateLocality from "./components/Locality/UpdateLocality";
import Notification from "./components/Notification";
import UserDetails from "./components/UserDetails";
import UpdateShopAddress from "./components/UpdateShopAddress";
import "bootstrap/dist/css/bootstrap.min.css";
import TotalSubcriptionOrders from "./components/TotalSubcriptionOrders";

Geocode.setLanguage("en");
Geocode.setApiKey("AIzaSyAhyWjQvLVO658WHjnlIpn7V_q7wtdOXp4");
function App() {
  // const getWindowsSize = () => {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height,
  //   };
  // };

  // const [windowDimensions, setWindowDimensions] = useState(getWindowsSize());

  const routerHistory = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      routerHistory.push("/login");
    }
    // if (window.Notification.permission === "denied") {
    //   // toast.error("please allow notification permission");
    // } else {
    //   const messaging = firebase.messaging();
    //   messaging.getToken().then((token) => {
    //     console.log("token", token);
    //   });
    // }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions(getWindowsSize());
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <>
      <Switch Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <div>
          <Navbar />
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/user" component={User} />
          <Route exact path="/vendor" component={Vendor} />
          <Route exact path="/salesreport" component={SalesReport} />
          <Route exact path="/productlist" component={ProductList} />
          <Route
            exact
            path="/totalorderrecieved"
            component={TotalOrderRecievede}
          />
          <Route exact path="/customerdetails" component={CustomerDetails} />
          <Route exact path="/orderdetails" component={OrderDetails} />
          <Route exact path="/userdetails" component={UserDetails} />
          <Route exact path="/deliveryboydetails" component={UserDetails} />
          <Route exact path="/assigned" component={AssignedOrders} />
          <Route exact path="/outfordelivery" component={PickedOrders} />
          <Route exact path="/notpicked" component={NotPicked} />
          <Route exact path="/unassignedorders" component={UnassignedOrders} />
          <Route exact path="/deliveredorders" component={DeliveredOrders} />
          <Route exact path="/addvendor" component={AddVendoreForm} />
          <Route exact path="/updatevendor" component={UpdateVendorForm} />
          <Route exact path="/vendordetails" component={VendorDetails} />
          <Route exact path="/addproduct" component={AddProductForm} />
          <Route exact path="/updateProduct/:id" component={updateProduct} />
          <Route exact path="/deliverymanage" component={DeliveryManage} />
          <Route exact path="/adddeliveryboy" component={AddDeliveryBoyForm} />
          <Route exact path="/paymentsettle" component={PaymentSettlement} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/banner" component={Banner} />
          <Route exact path="/review" component={Review} />
          <Route exact path="/coupon" component={Coupon} />
          <Route exact path="/city" component={city} />
          <Route exact path="/addcity" component={addCity} />
          <Route exact path="/updateCity/:id" component={updateCity} />
          <Route
            exact
            path="/updateDeliveryBoy/:id"
            component={UpdateDeliveryBoy}
          />
          <Route exact path="/locality" component={Locality} />
          <Route exact path="/addLocalities" component={AddLocalities} />
          <Route exact path="/updateLocality/:id" component={UpdateLocality} />
          <Route exact path="/notification" component={Notification} />
          <Route
            exact
            path="/updateShopAddress/:id"
            component={UpdateShopAddress}
          />
          <Route
            exact
            path="/totalsubcriptionrecieved"
            component={TotalSubcriptionOrders}
          />
        </div>
      </Switch>
    </>
  );
}

export default App;
