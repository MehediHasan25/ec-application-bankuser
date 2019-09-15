import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { userLogin } from './../Url/User';
//import cookie from '../Utils/cookie';

class UserLogin extends Component {
  state = {
    username: '',
    password: ''
  };

  UNSAFE_componentWillMount() {
    document.title = 'Bank User';
  }

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const obj = {
      username,
      password
    };

    axios
      .post(userLogin, obj)
      .then(res => {
        console.log(res);
        let userStatus = res.data.userStatus;
        let userType = res.data.userType;
        if (userStatus === 'active') {
          let token = res.headers['x-auth-token'];
          sessionStorage.setItem('x-auth-token', token);
          sessionStorage.setItem('userStatus', userStatus);
          sessionStorage.setItem('userType', userType);
          sessionStorage.setItem('username', username);

          //  cookie.setCookie('x-auth-token', token , 120);
          //  cookie.setCookie('userStatus', userStatus, 120);
          //  cookie.setCookie('userType', userType, 120);
          //  cookie.setCookie('username', username, 120);
          this.props.history.replace('/dashboard');
        } else {
          alert('User inactive');
          this.setState({ username: '', password: '' });
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400 || err.response.status === 401) {
            console.log(err.response.data);
            alert(err.response.data.message);
          } else if (err.response.status === 404) {
            alert('Not Found');
          } else if (err.response.status === 500) {
            alert(err.response.data.message);
          }
        } else if (err.request) {
          console.log(err.request);
          alert('Error Connectiong');
        } else {
          console.log('Error', err.message);
          alert(err.message);
        }
      });
  };

  onChangeUsername = e => this.setState({ username: e.target.value });
  onChangePassword = e => this.setState({ password: e.target.value });
  render() {
    if (sessionStorage.getItem('x-auth-token') !== null) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <div>
        <nav
          className='navbar fixed-top navbar-expand-md navbar-light shadow'
          style={{ backgroundColor: '#56c9ef' }}
        >
          <div className='container'>
            <div className='navbar-header'>
              <button
                type='button'
                className='navbar-toggler'
                data-toggle='collapse'
                data-target='#navbarCollapse'
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <Link
                className='navbar-brand'
                to='#'
                style={{ color: '#ffffff' }}
              >
                <i className='fas fa-user-cog'></i>&nbsp; User
              </Link>
            </div>
            <div id='navbar' className='collapse navbar-collapse'></div>
          </div>
        </nav>

        <br />
        <header id='header'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='panel panel-default'>
                  <div className='panel-body text-center pt-5'>
                    <h4 style={{ color: '#72726f' }}>
                      <i className='fas fa-user-shield'></i>&nbsp; Account Login
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id='main'>
          <div className='container'>
            <div
              style={{
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
              className='col-sm-6 border border-light p-5'
            >
              <form className='text-center' onSubmit={this.onSubmit}>
                <input
                  type='text'
                  id='defaultLoginFormNumber'
                  onChange={this.onChangeUsername}
                  value={this.state.username}
                  className='form-control mb-4 border border-primary'
                  placeholder='User ID'
                  style={{ height: '50px' }}
                ></input>

                <input
                  type='password'
                  id='defaultLoginFormPassword'
                  onChange={this.onChangePassword}
                  value={this.state.password}
                  className='form-control mb-4 border border-primary'
                  placeholder='Password'
                  style={{ height: '50px' }}
                ></input>

                <div className='d-flex align-items-center justify-content-between'>
                  <div>
                    <div className='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='defaultLoginFormRemember'
                      ></input>
                      <label
                        className='custom-control-label'
                        htmlFor='defaultLoginFormRemember'
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div>
                    <Link to='' style={{ color: '#56c9ef' }}>
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  className='btn btn-info btn-block my-4'
                  type='submit'
                  style={{ backgroundColor: '#56c9ef' }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default UserLogin;
