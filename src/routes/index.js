import React from 'react'
import { Route, Switch } from 'react-router'
// import Home from '../containers/home'
import { Base } from '../containers/Base'

// import Hello from '../containers/Hello'
// import Counter from '../containers/Counter'
// import NoMatch from '../containers/NoMatch'
// import NavBar from '../containers/NavBar'

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Base} />
    </Switch>
  </div>
)

export default routes
