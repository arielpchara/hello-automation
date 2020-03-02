import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { Bedroom } from './Bedroom'


export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Bedroom} />
      </Switch>
    </BrowserRouter>
  )
}