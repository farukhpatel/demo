import React, { useEffect, useState } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Geocode from 'react-geocode'

import Navbar from './components/Navbar'
import Home from './components/Home'
import User from './components/User'
import Vendor from './components/Vendor'
import SalesReport from './components/SalesReport'
import ProductList from './components/ProductList'
import TotalOrderRecievede from './components/TotalOrderRecieved'
import CustomerDetails from './components/CustomerDetails'
import OrderDetails from './components/OrderDetails'
import AssignedOrders from './components/AssignedOrders'
import PickedOrders from './components/PickedOrders'
import NotPicked from './components/NotPicked'
import AddVendoreForm from './components/AddVendorForm'
import UnassignedOrders from './components/UnassignedOrders'
import DeliveredOrders from './components/DeliveredOrders'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import AddProductForm from './components/AddProductForm'
import DeliveryManage from './components/DeliveryManage'
import AddDeliveryBoyForm from './components/AddDeliveryBoyForm'
import PaymentSettlement from './components/PaymentSettlement'
import Settings from './components/Settings'
import Banner from './components/Banner'
import Review from './components/Review'
import Coupon from './components/Coupon'
import VendorDetails from './components/VendorDetails'
import UpdateVendorForm from './components/UpdateVendor'
import updateProduct from './components/updateProduct'
import city from './components/city/City'
import addCity from './components/city/addCity'
import updateCity from './components/city/updateCity'
import UpdateDeliveryBoy from './components/UpdateDeliveryBoy'
import Locality from './components/Locality/Locality'
import { AddLocation } from '@material-ui/icons'
import AddLocalities from './components/Locality/AddLocalities'
import UpdateLocality from './components/Locality/UpdateLocality'
import Notification from './components/Notification'
import UserDetails from './components/UserDetails'
import UpdateShopAddress from './components/UpdateShopAddress'
import { getToken, onMessageListener } from './firebase'
import { Button, Row, Col, Toast } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Geocode.setLanguage('en')
Geocode.setApiKey('AIzaSyAhyWjQvLVO658WHjnlIpn7V_q7wtdOXp4')
function App() {
  const getWindowsSize = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowsSize())

  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState({ title: '', body: '' })
  const [isTokenFound, setTokenFound] = useState(false)
  useEffect(() => {
    getToken(setTokenFound)
  }, [])

  onMessageListener()
    .then((payload) => {
      setShow(true)
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      })
      console.log(payload)
    })
    .catch((err) => console.log('failed: ', err))

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowsSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
        <div className="App">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={2000}
            animation
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              minWidth: 200,
            }}
          >
            <Toast.Header>
              <strong className="mr-auto">{notification.title}</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>{notification.body}</Toast.Body>
          </Toast>
          <header className="App-header">
            {/* {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>} */}
            {/* {!isTokenFound && <h1> Need notification permission ❗️ </h1>} */}
            {/* <img src="ja" className="App-logo" alt="logo" /> */}
            {/* <button style={{ width: '45px', height: "45px", border: "none", position: 'absolute', right: '0px' }} onClick={() => setShow(true)}><i class="fas fa-bell"></i></button> */}
          </header>
        </div>
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
            <Route exact path="/productlist" component={ProductList} />s
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
          </div>
        </Switch>
      </>
    )
}

export default App
