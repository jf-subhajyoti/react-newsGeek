import './App.css';

import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {BrowserRouter, Switch, Route} from 'react-router-dom'

const App = () => {
  let pageSize = 15, country = "in";
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/'><News key="general" pageSize = {pageSize} category = "general" country = {country} /></Route>
          <Route exact path='/sports'><News key="sports" pageSize = {pageSize} category = "sports" country = {country} /></Route>
          <Route exact path='/business'><News key="business" pageSize = {pageSize} category = "business" country = {country} /></Route>
          <Route exact path='/entertainment'><News key="entertainment" pageSize = {pageSize} category = "entertainment" country = {country} /></Route>
          <Route exact path='/general'><News key="general" pageSize = {pageSize} category = "general" country = {country} /></Route>
          <Route exact path='/health'><News key="health" pageSize = {pageSize} category = "health" country = {country} /></Route>
          <Route exact path='/science'><News key="science" pageSize = {pageSize} category = "science" country = {country} /></Route>
          <Route exact path='/technology'><News key="technology" pageSize = {pageSize} category = "technology" country = {country} /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;