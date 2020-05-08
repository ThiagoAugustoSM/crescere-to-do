import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './views/Home'

import Header from './components/Header'

const App = (props) => {
  return(
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/login'> 
          <h1>Faça seu login</h1>
        </Route>
        <Route path='*'>
          <h1>Essa rota não existe!</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;