import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import CreateParty from './views/party/create';
import JoinParty from './views/party/join';
import ViewParty from './views/party/view';
import AddBottle from './views/bottle/add';

function App() {
  return (
    <div className="App">
    <Header />
      <Switch>
        {/*<Route exact path='/' render={() => <Login />} />*/}
        <Route exact path='/party/create' render={() => <CreateParty />} />
        <Route exact path='/bottle/add' render={() => <AddBottle />} />
        <Route exact path='/party/join' render={() => <JoinParty />} />
        <Route exact path='/party/view' render={() => <ViewParty />} />
      </Switch>

    </div>
  );
}

export default App;
