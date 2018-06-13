import './index.scss';

import { observable } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Login from './pages/login';
import Profile from './pages/profile';
import AppState, { IAppState } from './states/appState';

declare var module: any

@observer
class App extends React.Component<{ appState: IAppState }, {}> {
  render() {
    return (
      <div>
        <Router>
          <div>
            <div className='gfdt-nav-top'>
              <div className='gfdt-nav-top-left'>Go For Da Top</div>
              <div className='gfdt-nav-top-right float-right'>
                <Link to='/login'>Login</Link>
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
              <Route path='/matches' render={() => 'Matches'} />
              <Route path='/tournaments' render={() => 'Tournaments'} />
              <Route path='/login' render={props => (
                <Login appState={appState} {...props} />
              )} />
              <Route path='/profile' render={props => (
                <Profile appState={appState} {...props} />
              )} />
            </div>
          </div>
        </Router>
        <DevTools />
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