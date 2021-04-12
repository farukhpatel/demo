
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import User from './components/User';
import Vendor from './components/Vendor';
import SalesReport from './components/SalesReport';
import TotalOrderRecievede from './components/TotalOrderRecieved';
import CustomerDetails from './components/CustomerDetails';
import OrderDetails from './components/OrderDetails';
import AssignedOrders from './components/AssignedOrders';
import OutforDelivery from './components/OutForDelivery';
import NotPicked from './components/NotPicked';
import AddVendoreForm from './components/AddVendorForm';
import UnassignedOrders from './components/UnassignedOrders';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={User} />
        <Route exact path="/vendor" component={Vendor} />
        <Route exact path="/salesreport" component={SalesReport} />
        <Route exact path="/totalorderrecieved" component={TotalOrderRecievede} />
        <Route exact path="/customerdetails" component={CustomerDetails} />
        <Route exact path="/orderdetails" component={OrderDetails} />
        <Route exact path="/assigned" component={AssignedOrders} />
        <Route exact path="/outfordelivery" component={OutforDelivery} />
        <Route exact path="/notpicked" component={NotPicked} />
        <Route exact path="/unassignedorders" component={UnassignedOrders} />
        <Route exact path="/addvendor" component={AddVendoreForm} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
      </Switch>
      {/* <SignUp /> */}
    </>
  );
}

export default App;
