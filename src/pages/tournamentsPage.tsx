import { observer } from 'mobx-react';
import * as React from 'react';

import TournamentList from '../components/tournaments/tournamentList';
import { IDefaultProps } from '../utils/IDefaultProps';

@observer
export default class TourmanentsPage extends React.Component<IDefaultProps> {
  render() {
    return (
      <TournamentList appState={this.props.appState}></TournamentList>
    )
  }
}