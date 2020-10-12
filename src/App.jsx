import 'index.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NotFound from 'pages/NotFoundPage';
import Navbar from 'components/Organisms/Navbar';
// import Login from 'pages/Login/Login';
import Login from 'pages/LoginPage';
import { userSelector } from 'reducers/user/userSelectors';
import Sales from 'pages/SalesPage';
import AddEditCustomerPage from 'pages/AddEditCustomerPage';
import CustomersPage from 'pages/CustomersPage';
import SnackBar from 'components/Atoms/SnackBar';
import CustomerPage from 'pages/CustomerPage';
import ProductsPage from 'pages/ProductsPage';
import ProductPage from 'pages/ProductPage';
import AddEditProductPage from 'pages/AddEditProductPage';
import OrdersPage from 'pages/OrdersPage';
import AddEditOrderPage from 'pages/AddEditOrderPage';
import OrderPage from 'pages/OrderPage';

const App = () => {
  const user = useSelector(userSelector);
  return (
    <>
      <SnackBar />
      <Navbar />
      <Switch>
        <Route path='/' exact>
          {user ? <Redirect to='/sales' /> : <Redirect to='/login' />}
        </Route>
        <Route path='/login' exact>
          {!user ? <Login /> : <Redirect to='/' />}
        </Route>
        <Route path='/sales' exact>
          {user ? <Sales /> : <Redirect to='/login' />}
        </Route>
        <Route path='/customers' exact>
          {user ? <CustomersPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/customers/new' exact>
          {user ? <AddEditCustomerPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/customers/:id' exact>
          {user ? <CustomerPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/customers/edit/:id' exact>
          {user ? <AddEditCustomerPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/products' exact>
          {user ? <ProductsPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/products/new' exact>
          {user ? <AddEditProductPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/products/:id' exact>
          {user ? <ProductPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/products/edit/:id' exact>
          {user ? <AddEditProductPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/orders' exact>
          {user ? <OrdersPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/orders/new' exact>
          {user ? <AddEditOrderPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/orders/:id' exact>
          {user ? <OrderPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/orders/edit/:id' exact>
          {user ? <AddEditProductPage /> : <Redirect to='/login' />}
        </Route>
        <Route path='/'>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default App;
