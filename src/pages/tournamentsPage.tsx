import { observer } from 'mobx-react';
import * as React from 'react';

import TournamentList from '../components/tournaments/tournamentList';
import { IPageDefaultProps } from '../utils/IDefaultProps';

@observer
export default class TourmanentsPage extends React.Component<IPageDefaultProps> {
  render() {
    return (
      <TournamentList appState={this.props.appState}></TournamentList>
    )
  }
}