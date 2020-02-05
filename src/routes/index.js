import React from 'react'
import { Route, Switch } from 'react-router'
import { Base } from '../containers/Base'

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Base} />
    </Switch>
  </div>
)

export default routes
