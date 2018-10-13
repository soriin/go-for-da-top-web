import { observer } from 'mobx-react';
import * as React from 'react';
import { Redirect } from 'react-router';

import { DataState, IAppState } from '../states/appState';
import EditProfile from './profile/editProfile';

@observer
export default class ProfilePage extends React.Component<{appState: IAppState}> {
  constructor (props) {
    super(props)
  }

  render() {
    let body: JSX.Element
    if (this.props.appState.user.state === DataState.Loading) {
      body = <span>Loading...</span>
    } else if (this.props.appState.user.state === DataState.Loaded) {
      body = <EditProfile appState={this.props.appState}></EditProfile>
    } else {
      body = <Redirect to='login' />
    }
    return (
      <div>{body}</div>
    )
  }
}