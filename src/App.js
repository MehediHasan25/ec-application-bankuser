import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import UserLogin from './Component/UserLogin';
import UserForm from './Component/UserForm';
import Dashboard from './Component/Dashboard';
import PendingList from './Component/PendingList';
import KycHistory from './Component/KycHistory';
import SearchNid from './Component/SearchNid';
import ProtectRoute from './Component/ProtectedRoute/Protected';
import NotFound from './Component/NotFound';





class App extends Component {
  state = {  }
  render() { 
    return (
      <Router>
      <div
        className="App">
        <Switch>
        <Route exact path="/" component={UserLogin} />
        <ProtectRoute exact path="/userform" component={UserForm} />
        <ProtectRoute exact path="/dashboard" component={Dashboard} />
        <ProtectRoute exact path="/pending-list" component={PendingList} />
        <ProtectRoute exact path="/show-kyc-history" component={KycHistory} />
        <ProtectRoute exact path="/search-user-nid" component={SearchNid} />
        <Route exact path="/notfound" component={NotFound} />
        <Redirect to="notfound"/>
        </Switch>
      </div>
    </Router>
      );
  }
}
 
export default App;