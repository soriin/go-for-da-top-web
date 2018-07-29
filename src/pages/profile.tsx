import { observer } from 'mobx-react';
import * as React from 'react';
import { Redirect } from 'react-router';

import { IAppState, DataState } from '../states/appState';

@observer
export default class Profile extends React.Component<{appState: IAppState}> {
  constructor (props) {
    super(props)
  }

  render() {
    let body: JSX.Element
    if (this.props.appState.userState === DataState.Loading) {
      body = <span>Loading...</span>
    } else if (this.props.appState.userState === DataState.Loaded) {
      body = <span>{this.props.appState.user.realName}</span>
    } else {
      body = <Redirect to='login' />
    }
    return (
      <div>{body}</div>
    )
  }
}