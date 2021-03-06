import './index.scss';

import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { authToken } from './config';
import * as icons from './modules/icons/icons';
import userService from './modules/user/userSvc';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import MatchesPage from './pages/matchesPage';
import ProfilePage from './pages/profilePage';
import TourmanentsPage from './pages/tournamentsPage';
import TourmanentStandingsPage from './pages/tournamentStandingsPage';
import AppState, { DataState, IAppState } from './states/appState';
import handleExpectedError from './utils/unexpectedError';

@observer
class App extends React.Component<{ appState: IAppState }> {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (authToken) {
      userService.getCurrentUser(this.props.appState.user)
        .then((data) => {
          this.props.appState.user.data = data
        })
        .then(this.onSuccessfulLoad)
        .catch((err) => {
          this.props.appState.user.state = DataState.Error
          handleExpectedError(err)
        })
    }
    else {
      this.props.appState.user.state = DataState.NoData
    }
  }

  onSuccessfulLoad() {
    icons.initializeIcons()
  }

  render() {
    let loginLink : JSX.Element
    if (this.props.appState.user.state === DataState.NoData) {
      loginLink = <Link to='/login'>Login</Link>
    }
    return (
      <div>
        <DevTools />
        <Router>
          <div>
            <div className='gfdt-nav-top'>
              <div className='gfdt-nav-top-left'>Go For Da Top</div>
              <div className='gfdt-nav-top-right float-right'>
                {loginLink}
                <Link to='/profile'>Profile</Link>
              </div>
            </div>
            <div className='gfdt-nav-left'>
              <Link to='/'>Home</Link>
              <Link to='/matches'>My Matches</Link>
              <Link to='/tournaments'>Tournaments</Link>
            </div>

            <div className='gfdt-main'>
              <Route exact={true} path='/' render={props => (
                <HomePage appState={this.props.appState} {...props} />
              )} />
              <Route path='/matches' render={props => (
                <MatchesPage appState={this.props.appState} {...props} />
              )} />
              <Route path='/tournaments' render={props => (
                <TourmanentsPage appState={this.props.appState} {...props} />
              )} />
              <Route path='/login' render={props => (
                <LoginPage appState={this.props.appState} {...props} />
              )} />
              <Route path='/profile' render={props => (
                <ProfilePage appState={this.props.appState} {...props} />
              )} />
              <Route path='/tournament/:id' render={props => (
                <TourmanentStandingsPage appState={this.props.appState} {...props} />
              )} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
};

const appState = new AppState();
ReactDOM.render(<App appState={appState} />, document.getElementById('root'));
declare var module: any
// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./index', () => {
    ReactDOM.render(<App appState={appState} />, document.getElementById('root'));
  })
}