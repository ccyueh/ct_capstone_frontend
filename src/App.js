import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';

function App() {
  return (
    <div className="App">
    <Header />
      <Switch>
        {/*<Route exact path='/' render={() => <Login />} />*/}
      </Switch>

    </div>
  );
}

export default App;
