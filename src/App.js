import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/checkout" component={Checkout}/>
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
