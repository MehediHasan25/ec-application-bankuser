import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { kycHistory } from "../Url/User";
import { getNidImage } from "../Url/User";
import "./css/table.css";
//import cookie from "../Utils/cookie";
import { checkValidation } from "../Utils/routeControl";
//import Modal from './Reusable/Modal';
import {statusConverter} from "../Utils/statusConverter";

class KycHistory extends Component {
  state = {
    historyData: [],
    page: 1,
    image: "",
    flag: "data:image/jpeg;base64,"
  };

  UNSAFE_componentWillMount() {
    document.title = "E-kyc History";
  }

  componentDidMount() {
    const config = {
      headers: {
        "x-auth-token": sessionStorage.getItem("x-auth-token")
      }
    };
    axios
      .post(kycHistory, this.state.page, config)
      .then(res => {
        // console.log(res.data.ekyc);

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

  logout = e => {
    sessionStorage.clear();
  };

  ///Image Button
  onImageId = id => {
    console.log(id);

    const config = {
      headers: {
        "x-auth-token": sessionStorage.getItem("x-auth-token")
      }
    };
    const obj = {
      eKycId: id
    };

    //console.log(idImage);

    axios
      .post(getNidImage, obj, config)
      .then(res => {
       // console.log(res);
        let front = res.data.imageFront;
        this.setState({ image: front });
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
        //issueDate,
        ecVerificationStatus,
        //createDate,
        //createdBy
      } = historyData; //destructuring

      return (
        <tr key={_id}>
          <td>{nidNo}</td>
          <td>{dob}</td>
          <td>{statusConverter(ecVerificationStatus)}</td>
          <td>{name}</td>
          <td>{fatherName}</td>
          <td>{motherName}</td>
          <td>{pob}</td>
          <td>{bloodGroup}</td>
          <td>{address}</td>
          {/* <td>{issueDate}</td> */}

          <td style={{textAlign: "center"}}>
            <button
              type="button"
              onClick={() => this.onImageId(_id)}
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#myModal"
              style={{ backgroundColor: "#56c9ef" }}
            >
              Image
            </button>
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Nid Image</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="modal-body text-center">
                    <img
                      src={this.state.flag + this.state.image}
                      className=""
                      alt=""
                      width="200"
                      height="200"
                    />
                  </div>

                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </td>
          {/* <td>
            {new Date(createDate).toLocaleDateString() +
              " - " +
              new Date(createDate).toLocaleTimeString()}
          </td> */}
          {/* <td>{createdBy}</td> */}
        </tr>
      );
    });
  }

  render() {
    let sessionName = sessionStorage.getItem("username");
    /// protected Route
    let cv = checkValidation(
      sessionStorage.getItem("x-auth-token"),
      sessionStorage.getItem("userStatus")
    );
    if (cv !== null) return <Redirect to="/" />;

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
                &nbsp; Welcome, {sessionName}
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
            Search By Nid &nbsp;&nbsp;
            <i className="fas fa-eject" />
          </Link>
        </div>
        <br />
        <div className="content">
          <div
            className="shadow mb-4"
            style={{
              backgroundColor: "#fcfcfc",
              color: "#8f8e8e",
              textAlign: "center",
              marginTop: "50px"
            }}
          >
            <h4>
              <i className="fas fa-user-check"></i>&nbsp; E-KYC History
            </h4>
          </div>
          <div className="row ">
            {/* Start Content*/}

            <table id="data" className="" style={{ fontSize: "11pt" }}>
              <thead>
                <tr>
                  <th>NID No</th>
                  <th>DOB</th>
                  <th>Status</th>
                  <th>Name</th>
                  <th>Father Name</th>
                  <th>Mother Name</th>      
                  <th>Birth Place</th>
                  <th>Blood Group</th>
                  <th>Address</th>
                  {/* <th>Issue Date</th> */}
                  <th style={{textAlign: "center"}}>NID Image</th>
                  {/* <th>createDate</th> */}
                  {/* <th>createdBy</th> */}
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
