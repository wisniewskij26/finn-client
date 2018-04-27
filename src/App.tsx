import { hot } from 'react-hot-loader';
import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import View from './components/View';
import Playground from './Playground';

const App = () => (
  <div>
    <Route
      path="/"
      exact
      render={() => (
        <View title="Home">
          <h1>Home View</h1>
          <Link to="/about">About</Link>
        </View>
      )}
    />
    <Route path="/playground" component={Playground} />
  </div>
);

export default hot(module)(App);
