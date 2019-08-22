import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import UserLogin from './Component/UserLogin';
import UserForm from './Component/UserForm';



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
        </Switch>
      </div>
    </Router>
      );
  }
}
 
export default App;