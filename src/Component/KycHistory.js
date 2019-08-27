import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {kycHistory} from '../Url/User';
import "./css/table.css";
import cookie from "../Utils/cookie";


class KycHistory extends Component {
    state = { 
        historyData:[],
        page:1
     }

     componentDidMount() {
        const config = {
          headers: {
            "x-auth-token": cookie.getCookie("x-auth-token")
          }
        };
        axios
          .post(kycHistory,this.state.page,config)
          .then(res => {
            console.log(res.data.ekyc);
            
            this.setState({ historyData: res.data.ekyc });
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

      logout = e =>{
        cookie.setCookie('x-auth-token', "", -1);
        cookie.setCookie('username', '', -1);
        cookie.setCookie('userStatus', '', -1);
        cookie.setCookie('userType', "", -1);
    } 

    renderTableData() {
        return this.state.historyData.map((historyData, index) => {
          
          const {
            _id,
            name,
            fatherName,
            motherName,
            nidNo,
            dob,
            pob,
            bloodGroup,
            address,
            issueDate,
            ecVerificationStatus,
            createDate,
            createdBy     
          } = historyData; //destructuring
        
          return (
            <tr key={_id}>
              <td>{name}</td>
              <td>{fatherName}</td>
              <td>{motherName}</td>
              <td>{nidNo}</td>
              <td>{dob}</td>
              <td>{pob}</td>
              <td>{bloodGroup}</td>
              <td>{address}</td>  
              <td>{issueDate}</td>
              <td>{ecVerificationStatus}</td>  
              <td>{new Date(createDate).toLocaleDateString() + " - " + new Date(createDate).toLocaleTimeString()}</td>
              <td>{createdBy}</td>
              
            </tr>
          );
        });
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
                <h1 className="">Verified Kyc History</h1>
            <table id="data" className=""style={{fontSize:'11pt'}}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Father Name</th>
                  <th>Mother Name</th>
                  <th>Nid No</th>
                  <th>Date of Birth</th>
                  <th>Place of Birth</th>
                  <th>Blood Group</th>
                  <th>Address</th>
                  <th>Issue Date</th>
                  <th>ecVerificationStatus</th>
                  <th>createDate</th>
                  <th>createdBy</th>
                  
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
 
export default KycHistory;