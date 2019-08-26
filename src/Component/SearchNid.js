import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {searchUserNid} from '../Url/User';
import "./css/table.css";
import axios from "axios";
import cookie from "../Utils/cookie";



class SearchNid extends Component {
    state = { 
        nidNo:'',
        searchNidData: []
     }

     onSubmit = e =>{
         e.preventDefault();
         
         const { nidNo } = this.state;

         const config = {
           headers: {
             "x-auth-token": cookie.getCookie("x-auth-token")
           }
         };

         const obj={
            nidNo
         };

         axios.post(searchUserNid, obj, config )
         .then(res =>{
             console.log(res);
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

     onChangeSearchNid = e => this.setState({nidNumber: e.target.value});

     logout = e =>{
        cookie.setCookie('x-auth-token', "", -1);
        cookie.setCookie('username', '', -1);
        cookie.setCookie('userStatus', '', -1);
        cookie.setCookie('userType', "", -1);
    } 

    render() { 
        let cookieName = cookie.getCookie('username');
        const nidSearchData= (
            <div className="container" style={{ backgroundColor: "#f7f7f7" }}>
              <div
                className="d-flex align-items-center card border-light mb-3"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <div
                  className="col-sm-5 shadow p-3 mb-2"
                  style={{
                    backgroundColor: "#8f8e8e",
                    color: "#fff",
                    textAlign: "center",
                    marginTop: "15px"
                  }}
                >
                  <i className="fas fa-certificate" />
                  &nbsp;Search User
                </div>
                <div className="card-body col-sm-5">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        onChange={this.onChangeSearchNid}
                        className="form-control"
                        id="name"
                        placeholder="Nid No"
                      />
                    </div>
      
                    <br />
      
                    {/* <div className="form-group">
                                  <label htmlFor="exampleInputFile">Provide NID Image</label>
                                  <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"></input>
                                  <br />
      
                              </div> */}
      
                    <button
                      type="submit"
                      className="btn shadow "
                      style={{
                        backgroundColor: "#3ed6a6",
                        color: "#fff",
                        float: "right"
                      }}
                    >
                      <i className="fas fa-check-circle" />
                      &nbsp; Search
                    </button>
                    <br />
                  </form>
                </div>
              </div>
            </div>
          );
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
            <div className="content">
              <div className="row ">
                {/* Start Content*/}
               {nidSearchData}
                {/* End Content*/}
              </div>
            </div>
          </div>
         );
    }
}
 
export default SearchNid;