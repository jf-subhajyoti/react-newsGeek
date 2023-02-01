import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {BrowserRouter, Switch, Route} from 'react-router-dom'

export default class App extends Component {
  pageSize = 15;
  country = "in";
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/'><News key="general" pageSize = {this.pageSize} category = "general" country = {this.country} /></Route>
            <Route exact path='/sports'><News key="sports" pageSize = {this.pageSize} category = "sports" country = {this.country} /></Route>
            <Route exact path='/business'><News key="business" pageSize = {this.pageSize} category = "business" country = {this.country} /></Route>
            <Route exact path='/entertainment'><News key="entertainment" pageSize = {this.pageSize} category = "entertainment" country = {this.country} /></Route>
            <Route exact path='/general'><News key="general" pageSize = {this.pageSize} category = "general" country = {this.country} /></Route>
            <Route exact path='/health'><News key="health" pageSize = {this.pageSize} category = "health" country = {this.country} /></Route>
            <Route exact path='/science'><News key="science" pageSize = {this.pageSize} category = "science" country = {this.country} /></Route>
            <Route exact path='/technology'><News key="technology" pageSize = {this.pageSize} category = "technology" country = {this.country} /></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

