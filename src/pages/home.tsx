import * as React from 'react'
import { IAppState } from "../states/appState";
import Tourmanents from './tournaments';

export default class Home extends React.Component<{appState: IAppState}> {
  render() {
    return (
      <div>
        <span>Active Tournaments</span>
        <Tourmanents appState={this.props.appState}></Tourmanents>
      </div>
    )
  }
}