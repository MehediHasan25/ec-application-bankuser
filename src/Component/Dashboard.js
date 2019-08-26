import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "../Utils/cookie";
import './css/tab.css';

class Dashboard extends Component {
  state = {};

  logout = e =>{
      cookie.setCookie('x-auth-token', "", -1);
      cookie.setCookie('username', '', -1);
      cookie.setCookie('userStatus', '', -1);
      cookie.setCookie('userType', "", -1);
  } 

  handleFingerPrint = e =>{
      this.props.history.push('/userform');
  }

  render() {
      let cookieName = cookie.getCookie('username');
    return (
      <div>
        <nav
          className="navbar fixed-top navbar-expand-md navbar-light shadow"
          style={{ backgroundColor: "#56c9ef" }}
        >
          <Link to="#" className="navbar-brand" style={{ color: "#ffffff" }}>
            <i className="fab fa-bandcamp" />
            &nbsp;&nbsp; Branch User
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            {/* <div className="navbar-nav">
              <Link
                to="#"
                className="nav-item nav-link"
                style={{ color: "#ffffff" }}
              >
                <i className="fas fa-home" />
                &nbsp; Home
              </Link>
              <Link
                to="#"
                className="nav-item nav-link"
                style={{ color: "#ffffff" }}
              >
                <i className="fas fa-user" />
                &nbsp; Profile
              </Link>
              <Link
                to="#"
                className="nav-item nav-link"
                style={{ color: "#ffffff" }}
              >
                <i className="fas fa-envelope-open-text" />
                &nbsp; Messages
              </Link>
              <Link
                to="#"
                className="nav-item nav-link"
                style={{ color: "#ffffff" }}
                tabIndex="-1"
              >
                <i className="fab fa-readme" />
                &nbsp; Reports
              </Link>
            </div> */}
            <div className="navbar-nav ml-auto">
              <Link
                to="#"
                className="nav-item nav-link"
                style={{ color: "#ffffff" }}
              >
                <i className="fas fa-user" />
                &nbsp; Welcome, {cookieName}
              </Link>
              <Link
                to="/"
                className="nav-item nav-link"
                onClick={this.logout}
                style={{ color: "#ffffff" }}
              >
                <i className="fas fa-sign-out-alt" />
                &nbsp; Logout
              </Link>
            </div>
          </div>
        </nav>

        <div className="sidebar shadow" style={{ backgroundColor: "#8f8e8e" }}>
          <Link className="active" to="/dashboard">
            Home &nbsp;&nbsp;
            <i className="fas fa-home" />
          </Link>
          <Link to="/userform">
            Verify Customer &nbsp;&nbsp;
            <i className="fas fa-newspaper" />
          </Link>
          <Link to="/pending-list">
            Pending List &nbsp;&nbsp;
            <i className="fas fa-id-badge" />
          </Link>
          <Link to="/show-kyc-history">
            Verification History &nbsp;&nbsp;
            <i className="fas fa-eject" />
          </Link>
          <Link to="/search-user-nid">
                Search By Nid  &nbsp;&nbsp;
                <i className="fas fa-eject" />
              </Link>
        </div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
        <div className="content">
          <div className="row ">
            {/* Start Content*/}
            <div className="card-columns d-flex justify-content-around col-sm-12 m-0" style={{cursor:"pointer"}}>
              <div onClick={this.handleFingerPrint} id="fingerprint" className="card col-sm-3 shadow">
                <div className="card-body text-center">
                  <h5>FingerPrint Verification</h5>
                </div>
              </div>
              <div id="facedetection" className="card col-sm-3 shadow">
                <div  className="card-body text-center">
                  <h5>Face Verification</h5>
                </div>
              </div>
            </div>
            {/* End Content*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
