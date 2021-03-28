
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import User from './components/User';
import Vendor from './components/Vendor';
import SalesReport from './components/SalesReport';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={User} />
        <Route exact path="/vendor" component={Vendor} />
        <Route exact path="/salesreport" component={SalesReport} />

      </Switch>
    </>
  );
}

export default App;
