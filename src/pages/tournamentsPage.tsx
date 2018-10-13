import { observer } from 'mobx-react';
import * as React from 'react';

import TournamentList from '../components/tournaments/tournamentList';
import { IAppState } from '../states/appState';

@observer
export default class TourmanentsPage extends React.Component<{appState: IAppState}> {
  render() {
    return (
      <TournamentList appState={this.props.appState}></TournamentList>
    )
  }
}