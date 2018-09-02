import './index.scss';

import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Login from './pages/login';
import Matches from './pages/matches';
import Profile from './pages/profile';
import Tourmanents from './pages/tournaments';
import AppState, { IAppState, IUser, DataState } from './states/appState';
import { authToken } from './config'
import UserService from './modules/user/userSvc'
import handleExpectedError from './utils/unexpectedError';

@observer
class App extends React.Component<{ appState: IAppState }, {}> {
  constructor(props) {
    super(props)

    if (authToken) {
      UserService.getCurrentUser(this.props.appState.user)
        .then((data : IUser) => {
          this.props.appState.user.data = data
        })
        .catch((err) => {
          this.props.appState.user.state = DataState.Error
          handleExpectedError(err)
        })
    }
    else {
      this.props.appState.user.state = DataState.NoData
    }
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
              <Route exact={true} path='/' render={() => 'Welcome home'} />
              <Route path='/matches' render={props => (
                <Matches appState={this.props.appState} {...props} />
              )} />
              <Route path='/tournaments' render={props => (
                <Tourmanents appState={this.props.appState} {...props} />
              )} />
              <Route path='/login' render={props => (
                <Login appState={this.props.appState} {...props} />
              )} />
              <Route path='/profile' render={props => (
                <Profile appState={this.props.appState} {...props} />
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

// webpack Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./src/index', () => {
//     ReactDOM.render(<App appState={appState} />, document.getElementById('root'));
//   })
// }