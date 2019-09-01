import React, { Component } from "react";
//import DayPickerInput from "react-day-picker/DayPickerInput";
//import "react-day-picker/lib/style.css";
//import dateFormatConverter from "../Utils/dateFormatConverter";
import "./css/sidebar.css";
import { Link, Redirect } from "react-router-dom";
//import cookie from "../Utils/cookie";
import { eKycVerification } from "../Url/User";
import axios from "axios";
import { checkValidation } from "../Utils/routeControl";
import moment from "moment";
import {formatDate} from "../Utils/dateFormatConverter"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class UserForm extends Component {
  state = {
    name: "",
    nidNo: "",
    nidNoValidation: false,
    dob: "",
    dobValidation: false,
    rIndex: "",
    rThump: "",
    lIndex: "",
    lThump: "",
    fatherName: "",
    motherName: "",
    pob: "",
    bloodGroup: "",
    issueDate: "",
    address: "",
    imageFront: "",
    imageFrontType: "",
    imageBack: "",
    imageBackType: "",
    createdBy: "",
    ecVerificationStatus: "",
    requestRef: "native-application",
    isEnable: false
  };

  UNSAFE_componentWillMount() {
    document.title = "Verify Customer";
  }

  componentDidMount() {
    this.props.history.push("/userform");
  }

  onSubmit = e => {
    e.preventDefault();
    const {
      name,
      nidNo,
      dob,
      rIndex,
      rThump,
      lIndex,
      lThump,
      fatherName,
      motherName,
      pob,
      bloodGroup,
      issueDate,
      address,
      imageFront,
      imageFrontType
    } = this.state;
    // console.log("right Thumb", rThump);
    // console.log("Right Index", rIndex);
    //  console.log("left thumb",lThump);
    //  console.log("jjjjj",lIndex);
    // console.log(name);
    // console.log(nidNo);
     console.log(dob);
    // console.log(fatherName);
    // console.log(motherName);
    // console.log(pob);
    // console.log(bloodGroup);
    // console.log(issueDate);
    // console.log(address);
    // console.log("image Front",imageFront);
    // console.log("type",imageFrontType);

    if (nidNo.length < 10) {
      this.getNidNoError = alert("NID No must be 10, 13 & 17 digits");
      this.setState({ nidNoValidation: true });
      return;
    } else if (nidNo.length >= 11 && nidNo.length <= 12) {
      this.getNidNoError = alert("NID No must be 10, 13 & 17 digits");
      this.setState({ nidNoValidation: true });
      return;
    } else if (nidNo.length >= 14 && nidNo.length <= 16) {
      this.getNidNoError = alert("NID No must be 10, 13 & 17 digits");
      this.setState({ nidNoValidation: true });
      return;
    } else if (nidNo.length > 17) {
      this.getNidNoError = alert("NID No must be 10, 13 & 17 digits");
      this.setState({ nidNoValidation: true });
      return;
    }

    if (dob === "") {
      this.getNidDobError = alert("Date of Birth is empty");
      this.setState({ dobValidation: true });
      return;
    }

    const config = {
      headers: {
        "x-auth-token": sessionStorage.getItem("x-auth-token")
      }
    };

    const obj = {
      name,
      nidNo,
      dob,
      rIndex,
      rThump,
      lIndex,
      lThump,
      fatherName,
      motherName,
      pob,
      bloodGroup,
      issueDate,
      address,
      imageFront,
      imageFrontType
    };

    //console.log(obj);
    if (rIndex === "" && rThump === "" && lIndex === "" && lThump === "") {
      alert("Please Provide Finger Print");
    } else {
      axios
        .post(eKycVerification, obj, config)
        .then(res => {
          //console.log(res);
          try {
            let ecStatus = res.data.ecVerificationStatus;
            if (ecStatus === "v") alert("Successfully Verified");
            else if (ecStatus === "p") alert("Verification is Pending");
            else if (ecStatus === "n") alert("Not Verified");
          } catch (ex) {}
          this.setState({
            name: "",
            nidNo: "",
            dob: "",
            rIndex: "",
            rThump: "",
            lIndex: "",
            lThump: "",
            fatherName: "",
            motherName: "",
            pob: "",
            imageFront: "",
            imageFrontType: "",
            bloodGroup: "",
            issueDate: "",
            address: ""
          });
          document.getElementById("InputFile").value = "";
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

    // this.setState({
    //   name: "",
    //   nidNo: "",
    //   dob: "",
    //   rIndex: "",
    //   rThump: "",
    //   lIndex: "",
    //   lThump: "",
    //   fatherName: "",
    //   motherName: "",
    //   pob: "",
    //   imageFront: "",
    //   imageFrontType: "",
    //   bloodGroup: "",
    //   issueDate: "",
    //   address: ""
    // });
  };

  handleClick = e => {
    this.setState({ isEnable: true });

    const config = {
      headers: {
        "x-auth-token": sessionStorage.getItem("x-auth-token")
      }
    };

    const fingerobj = {
      MinQ: 30,
      Retry: 3,
      TokenId: "g86v5s4g5se84g5sfd4g5werx25sdf4f"
    };

    axios
      .post(`http://localhost:20000/api/info/fingerdata`, fingerobj, config)
      .then(res => {
        //  console.log(res);
        const data = res.data;
        let rightThumb = data[0].fingerData;
        let rightIndex = data[1].fingerData;
        let leftThumb = data[2].fingerData;
        let leftIndex = data[3].fingerData;

        if (data[0].fingerId === 1) {
          this.setState({ rThump: rightThumb });
        } else {
          alert("data not found!!");
        }
        if (data[1].fingerId === 2) {
          this.setState({ rIndex: rightIndex });
        } else {
          alert("data not found!!");
        }
        if (data[2].fingerId === 6) {
          this.setState({ lThump: leftThumb });
        } else {
          alert("data not found!!");
        }
        if (data[3].fingerId === 7) {
          this.setState({ lIndex: leftIndex });
        } else {
          alert("data not found!!");
        }

        this.setState({
          isEnable: false
        });
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400 || err.response.status === 401) {
            console.log(err.response.data);
            alert(err.response.data.message);
            this.setState({ isEnable: false });
          } else if (err.response.status === 404) {
            alert("Not Found");
            this.setState({ isEnable: false });
          } else if (err.response.status === 500) {
            alert(err.response.data.message);
            this.setState({ isEnable: false });
          }
        } else if (err.request) {
          console.log(err.request);
          alert("Error Connectiong");
          this.setState({ isEnable: false });
        } else {
          console.log("Error", err.message);
          alert(err.message);
          this.setState({ isEnable: false });
        }
      });
  };

  onChangeName = e => this.setState({ name: e.target.value });
  onChangeNidNo = e =>
    this.setState({ nidNo: e.target.value, nidNoValidation: true });
  onChangeDob = e => this.setState({ dob: e.target.value });
  // handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
  //   const input = dayPickerInput.getInput();
  //   //  console.log(typeof (input.value));
  //   //  console.log(input.value)
  //   const date = input.value;
  //   try {
  //     this.setState({ dob: date });
  //   } catch (ex) {
  //     // console.log(ex);
  //   }
  // };

  logout = e => {
    sessionStorage.clear();
  };

  onChangeFatherName = e => this.setState({ fatherName: e.target.value });
  onChangeMotherName = e => this.setState({ motherName: e.target.value });
  onChangePob = e => this.setState({ pob: e.target.value });
  onChangeBloodGroup = e => this.setState({ bloodGroup: e.target.value });
  onChangeIssueDate = e => this.setState({ issueDate: e.target.value });
  onChangeAddress = e => this.setState({ address: e.target.value });

  fileSelectedHandler = event => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = () => {
        // console.log(typeof reader.result);
        // console.log(btoa(reader.result));
        let base64Image = btoa(reader.result);
        this.setState({
          imageFront: base64Image,
          imageFrontType: file.type

          //nidImage: URL.createObjectURL(event.target.files[0])
        });
      };
      reader.onerror = () => {
        console.log("there are some problems");
        alert("File can not be read");
      };
    }
  };

  render() {
   // console.log(formatDate(this.state.dob));
    let sessionName = sessionStorage.getItem("username");

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

        <div className="content">
          <div className="row ">
            {/* Start Content*/}

            <div className="container" style={{ backgroundColor: "#f7f7f7" }}>
              <div
                className="d-flex align-items-center card border-light mb-3"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <div
                  className="col-sm-5 shadow p-3 mb-2"
                  style={{
                    backgroundColor: "#56c9ef",
                    color: "#fff",
                    textAlign: "center",
                    marginTop: "15px"
                  }}
                >
                  <i className="fas fa-certificate" />
                  &nbsp;Verify Customer's NID
                </div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <i style={{ color: "red", textAlign: "center" }}>
                        {this.state.nidNoValidation === true
                          ? this.getNidNoError
                          : ""}
                      </i>
                      <input
                        type="text"
                        className="form-control"
                        id="nid"
                        value={this.state.nidNo}
                        onChange={this.onChangeNidNo}
                        placeholder="NID No."
                      />
                    </div>

                    {/* <div className="form-group d-flex justify-content-between">
                      <div className="">
                        <label htmlFor="dob">Date of Birth:</label>
                      </div>
                      <div className="">
                      <i style={{color: 'red', textAlign:"center"}}>{this.state.dobValidation === true ? this.getNidDobError : ""}</i> 
                        <DayPickerInput
                          onDayChange={this.handleDayChange}
                          value={this.state.dob}
                        />
                      </div>
                    </div> */}

                    <div className="form-group d-flex justify-content-between">
                      <div className="">
                        <label htmlFor="dob">Date of Birth:</label>
                      </div>
                      <div className="">
                        <i style={{ color: "red", textAlign: "center" }}>
                          {this.state.dobValidation === true
                            ? this.getNidDobError
                            : ""}
                        </i>
                        <DatePicker
                           placeholderText="DD-MM-YYYY"
                          selected={this.state.dob}
                          dateFormat="dd-MM-yyyy"
                          onChange={d => {
                            this.setState({ dob: d });
                          }}
                      
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={this.state.isEnable}
                      className="btn btn-block shadow"
                      style={{ backgroundColor: "#8f8e8e", color: "#fff" }}
                      onClick={this.handleClick}
                    >
                      <i className="fas fa-fingerprint" />
                      &nbsp; Provide Customer's Finger
                    </button>
                    <br />
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        placeholder="Name"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="fatherName"
                        value={this.state.fatherName}
                        onChange={this.onChangeFatherName}
                        placeholder="Father Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="motherName"
                        value={this.state.motherName}
                        onChange={this.onChangeMotherName}
                        placeholder="Mother Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="pob"
                        value={this.state.pob}
                        onChange={this.onChangePob}
                        placeholder="Place Of Birth"
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="custom-select"
                        value={this.state.bloodGroup}
                        onChange={this.onChangeBloodGroup}
                      >
                        <option value="">Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="AB+">AB+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="issueDate"
                        value={this.state.issueDate}
                        onChange={this.onChangeIssueDate}
                        placeholder="NID Issue Date (Ex. 15 Jun 2016)"
                      />
                    </div>

                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="address"
                        rows="3"
                        value={this.state.address}
                        onChange={this.onChangeAddress}
                        placeholder="Address"
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputFile">
                        Provide NID Image
                      </label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="InputFile"
                        // key={this.state.imageFront}
                        //key={this.state.imageFrontType}
                        onChange={this.fileSelectedHandler}
                        aria-describedby="fileHelp"
                      />
                    </div>

                    <br />

                    {/* <div className="form-group">
                                <label htmlFor="exampleInputFile">Provide NID Image</label>
                                <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"></input>
                                <br />

                            </div> */}
                    <small id="fileHelp" className="form-text text-muted">
                      <i
                        style={{ color: "#56c9ef" }}
                        className="fas fa-exclamation-circle"
                      />
                      &nbsp; Before submitting form, please check all your
                      provided information again.
                    </small>
                    <br />

                    <button
                      type="submit"
                      className="btn btn-block shadow"
                      style={{ backgroundColor: "#56c9ef", color: "#fff" }}
                    >
                      <i className="fas fa-check-circle" />
                      &nbsp; Submit
                    </button>
                    <br />
                  </form>
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

export default UserForm;
