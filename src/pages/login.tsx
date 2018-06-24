import { observer } from 'mobx-react';
import * as React from 'react';
import { Redirect } from 'react-router';
import { apiBase } from '../config'

import AppState, { IAppState } from '../states/appState';

@observer
export default class Login extends React.Component<{ appState: IAppState }, {}> {
  constructor(props) {
    super(props)
    this.handleSignIn = this.handleSignIn.bind(this)
  }
  handleSignIn() {
    window.location.href = `${apiBase}/login/facebook`
  }

  render() {
    const user = this.props.appState.user
    let body: JSX.Element

    if (user) {
      body = <Redirect to='profile' />
    } else {
      body = <button className="btn btn-primary" onClick={this.handleSignIn}>Sign In</button>
    }
    return (
      <div>
          {body}
      </div>
    )
  }
    
}