import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "../Utils/cookie";
import axios from "axios";
import "./css/table.css";
import { pendingList } from "./../Url/User";
import { pendingVerify } from "../Url/User";

class PendingList extends Component {
  state = {
    pendingList: []
  };

  componentDidMount() {
    const config = {
      headers: {
        "x-auth-token": cookie.getCookie("x-auth-token")
      }
    };
    axios
      .get(pendingList, config)
      .then(res => {
       // console.log(res);
        this.setState({ pendingList: res.data });
       // console.log(this.state.pendingList);
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400 || err.response.status === 401) {
            console.log(err.response.data);
            alert(err.response.data.message);
          } else if (err.response.status === 404) {
            alert("Not Found");
          } else if (err.response.status === 500) {
            alert(err.response.data.message);
          }
        } else if (err.request) {
          console.log(err.request);
          alert("Error Connectiong");
        } else {
          console.log("Error", err.message);
          alert(err.message);
        }
      });
  }
  logout = e => {
    cookie.setCookie("x-auth-token", "", -1);
    cookie.setCookie("username", "", -1);
    cookie.setCookie("userStatus", "", -1);
    cookie.setCookie("userType", "", -1);
  };

  onTableId = (id, ecVerStatusTdId) => {
    //console.log({ id });
    const config = {
      headers: {
        "x-auth-token": cookie.getCookie("x-auth-token")
      }
    };
    const obj = {
      _id: id
    };
    axios
      .post(pendingVerify, obj, config)
      .then(res => {
       // console.log(res);
       // console.log(ecVerStatusTdId);
       // console.log(res.data.ecVerificationStatus);
         document.getElementById(ecVerStatusTdId).innerHTML = res.data.ecVerificationStatus;
        
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400 || err.response.status === 401) {
            console.log(err.response.data);
            alert(err.response.data.message);
          } else if (err.response.status === 404) {
            alert("Not Found");
          } else if (err.response.status === 500) {
            alert(err.response.data.message);
          }
        } else if (err.request) {
          console.log(err.request);
          alert("Error Connectiong");
        } else {
          console.log("Error", err.message);
          alert(err.message);
        }
      });
  };

  renderTableData() {
    return this.state.pendingList.map((pendingList, index) => {
      // console.log(data.createDate);
      //  const nidFormat= dateFormatConverter.getNidFormat(data.createDate);
      // console.log(nidFormat);
      const {
        _id,
        name,
        nidNo,
        ecVerificationStatus,
        dob,
        createDate
      } = pendingList; //destructuring
      let ecVerStatusTdId = "ecStatus"+ _id;
      return (
        <tr key={_id}>
          <td>{name}</td>
          <td>{nidNo}</td>
          <td>{dob}</td>
          <td id={ecVerStatusTdId}>{ecVerificationStatus}</td>
          <td>{new Date(createDate).toLocaleDateString() + " - " + new Date(createDate).toLocaleTimeString()}</td>
          <td>
            <button
              type="button"
              onClick={() => this.onTableId(_id, ecVerStatusTdId)}
              className="btn btn-primary"
            >
              Verify
            </button>
          </td>
        </tr>
      );
    });
  }
  render() {
    let cookieName = cookie.getCookie("username");
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
          <Link to="#contact">
            Pending List &nbsp;&nbsp;
            <i className="fas fa-id-badge" />
          </Link>
          <Link to="/show-kyc-history">
            Verification History &nbsp;&nbsp;
            <i className="fas fa-eject" />
          </Link>
        </div>
        <br/> 
        <div className="content">
          <div className="row ">
            {/* Start Content*/}
           
            <h1 className="">Verify User</h1>
            <table id="data">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Nid No</th>
                  <th>Date of Birth</th>
                  <th>ecVerificationStatus</th>
                  <th>createDate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderTableData()}</tbody>
            </table>

            {/* End Content*/}
          </div>
        </div>
      </div>
    );
  }
}

export default PendingList;
