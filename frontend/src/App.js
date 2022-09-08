import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from './routes/Home'
import Bank from './routes/Bank'
import History from './routes/History';
import User from './routes/User';

function App() {
  return (
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/users'>
          <User/>
        </Route>
        <Route exact path='/history'>
          <History/>
        </Route>
        <Route exact path='/exercises'>
          <Bank/>
        </Route>
      </Switch>
  );
}

export default App;
