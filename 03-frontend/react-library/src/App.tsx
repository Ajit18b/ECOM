import React from 'react';
import './App.css';

import { Navbar } from './layouts/navbar&footer/Navbar';
import { Footer } from './layouts/navbar&footer/Footer';
import { HomePage } from './layouts/HomePage/Homepage';
import { SearchProductPage } from './layouts/SearchProductPage/SearchProductPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { ProductCheckoutPage } from './layouts/ProductCheckoutPage/ProductCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/ProductCheckoutPage/ReviewListPage/ReviewListPage';
import { CartPage } from './layouts/CartPage/CartPage';
import { ManageEcomPage } from './layouts/ManageEcomPage/ManageEcomPage';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const cutomAuthHandler = () => {
    history.push("/login")
  }
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  }
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={cutomAuthHandler}>
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
            <Route path="/reviewlist/:productId">
              <ReviewListPage />
            </Route>
            <Route path='/checkout/:productId'>
              <ProductCheckoutPage />
            </Route>
            <Route path="/login" render={() => <LoginWidget config={oktaConfig} />
            }
            />
            <Route path="/login/callback" component={LoginCallback} />
            <SecureRoute path="/cart"><CartPage /></SecureRoute>
            <SecureRoute path="/support"><MessagesPage /></SecureRoute>
            <SecureRoute path="/admin"><ManageEcomPage /></SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security >
    </div >
  );
}

export default App;