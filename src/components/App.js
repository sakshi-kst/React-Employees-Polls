import React, { Component, Fragment } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Login from './Login';
import Nav from './Nav';
import Home from './Home';
import UserCard from './UserCard';
import NewPoll from './NewPoll';
import Leaderboard from './Leaderboard';
import Error from './Error';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <div className="App">
        <Routes>
          {authUser === null ? (
            <Fragment>
              <Route path = "*" element = {<Login />} />
            </Fragment>
          ) : (
            <Fragment>
                <Route path="/" element={<LayoutsWithNavbar />}>
                    <Route path = "/" element = {<Home />} />
                    <Route path = "/questions/wrong_id" element = {<Error />} />
                    <Route path = "/questions/:question_id" element = {<UserCard />} />
                    <Route path = "/add" element = {<NewPoll />} />
                    <Route path = "/leaderboard" element = {<Leaderboard />} />
                </Route>
            </Fragment>
          )}
        </Routes>
      </div>
    );
  }
}

function LayoutsWithNavbar() {
    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    );
}

function mapStateToProps({authUser}) {
  return {
    authUser
  };
}

export default connect(mapStateToProps, {handleInitialData})(App);