import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import { AuthContextProvider, PrivateRoute } from './components/Login/useAuth';
import Shipment from './components/Shipment/Shipment';

function App() {
  //const user = {name: 'Rahim', email: 'rahim@gmail.com'};
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/review">
            <Review /> 
          </Route>
          <Route path="/inventory">
            <Inventory />
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail />
          </Route>
          <Route exact path="/">
            <Shop />
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
