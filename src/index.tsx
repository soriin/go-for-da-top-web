import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './index.scss'

class AppState {
}

@observer
class App extends React.Component<{ appState: AppState }, {}> {
  render() {
    return (
      <div>
        <Router>
          <div>
            <div className='gfdt-nav-left'>
              <Link to='/'>Home</Link>
              <Link to='/matches'>My Matches</Link>
              <Link to='/tournaments'>Tournaments</Link>
            </div>
            <div className='gfdt-nav-top'>
              <div className='gfdt-nav-top-left'>Go For Da Top</div>
              <div className='gfdt-nav-top-right'>
                Login
                Profile
              </div>
            </div>

            <div className='gfdt-main'>
              <Route exact={true} path='/' render={() => 'Welcome home'} />
              <Route path='/matches' render={() => 'Matches'} />
              <Route path='/tournaments' render={() => 'Tournaments'} />
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
