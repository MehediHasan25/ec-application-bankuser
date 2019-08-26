import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import UserLogin from './Component/UserLogin';
import UserForm from './Component/UserForm';
import Dashboard from './Component/Dashboard';
import PendingList from './Component/PendingList';
import KycHistory from './Component/KycHistory';
import SearchNid from './Component/SearchNid';





class App extends Component {
  state = {  }
  render() { 
    return (
      <Router>
      <div
        className="App">
        <Switch>
        <Route exact path="/" component={UserLogin} />
        <Route exact path="/userform" component={UserForm} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/pending-list" component={PendingList} />
        <Route exact path="/show-kyc-history" component={KycHistory} />
        <Route exact path="/search-user-nid" component={SearchNid} />
        </Switch>
      </div>
    </Router>
      );
  }
}
 
export default App;