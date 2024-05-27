import React from 'react';
import './App.css';

import { Navbar } from './layouts/navbar&footer/Navbar';
import { Footer } from './layouts/navbar&footer/Footer';
import { HomePage } from './layouts/HomePage/Homepage';
import { SearchProductPage } from './layouts/SearchProductPage/SearchProductPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProductCheckoutPage } from './layouts/ProductCheckoutPage/ProductCheckoutPage';

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchProductPage />
          </Route>
          <Route path='/checkout/:productId'>
            <ProductCheckoutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div >
  );
}

export default App;
