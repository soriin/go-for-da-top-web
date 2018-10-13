import * as React from 'react'
import { IAppState } from "../states/appState";
import TourmanentsList from '../components/tournaments/tournamentList';
import MatchesList from '../components/matches/matchesList';

export default class HomePage extends React.Component<{ appState: IAppState }> {
  render() {
    const today = new Date()
    return (
      <div>
        <div>
          <span>Active Tournaments</span>
          <TourmanentsList appState={this.props.appState} />
        </div>
        <div>
          <span>Upcoming Matches</span>
          <MatchesList appState={this.props.appState} endAfter={today} />
        </div>
      </div>
    )
  }
}