import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { Bedroom } from './Bedroom'
import { Monitor } from './pages'


export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Bedroom} />
        <Route path="/monitor" component={Monitor} />
      </Switch>
    </BrowserRouter>
  )
}