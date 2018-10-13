import * as React from 'react'
import { IAppState } from "../states/appState";
import Tourmanents from './tournaments';
import Matches from './matches';

export default class Home extends React.Component<{ appState: IAppState }> {
  render() {
    const today = new Date()
    return (
      <div>
        <div>
          <span>Active Tournaments</span>
          <Tourmanents appState={this.props.appState}></Tourmanents>
        </div>
        <div>
          <span>Upcoming Matches</span>
          <Matches appState={this.props.appState} endAfter={today}></Matches>
        </div>
      </div>
    )
  }
}