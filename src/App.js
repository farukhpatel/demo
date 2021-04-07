
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
      </Switch>
    </>
  );
}

export default App;
