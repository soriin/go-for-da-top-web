import { observer } from 'mobx-react';
import * as React from 'react';
import { Redirect } from 'react-router';
import { apiBase } from '../config'

import { IAppState, DataState } from '../states/appState';

@observer
export default class Login extends React.Component<{ appState: IAppState }, {}> {
  constructor(props) {
    super(props)
    this.signIn = this.signIn.bind(this)
  }
  signIn() {
    window.location.href = `${apiBase}/login/facebook`
  }

  render() {
    let body: JSX.Element

    if (this.props.appState.user.state !== DataState.NoData && this.props.appState.user.state !== DataState.Error) {
      body = <Redirect to='profile' />
    } else {
      body = <button className="btn btn-primary" onClick={this.signIn}>Sign In</button>
    }
    return (
      <div>
          {body}
      </div>
    )
  }
    
}