import * as React from 'react';

import MatchesList from '../components/matches/matchesList';
import TourmanentsList from '../components/tournaments/tournamentList';
import { IPageDefaultProps } from '../utils/IDefaultProps';

export default class HomePage extends React.Component<IPageDefaultProps> {


  render() {
    const today = new Date()
    return (
      <div className='gfdt-flex'>
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