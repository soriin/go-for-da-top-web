import { observer } from 'mobx-react';
import * as React from 'react';

import TournamentListItem from '../../components/tournaments/tournamentListItem';
import tournamentSvc from '../../modules/tournaments/tournamentSvc';
import { DataState, IAppState } from '../../states/appState';
import { IDefaultProps } from '../../utils/IDefaultProps';

@observer
export default class TournamentList extends React.Component<IDefaultProps> {
  async componentDidMount() {
    if (this.props.appState.activeTournaments.state === DataState.NoData ||
      this.props.appState.activeTournaments.state === DataState.Error) {
      const tournaments = await tournamentSvc.getActive(this.props.appState.activeTournaments)
      this.props.appState.activeTournaments.data = tournaments
    }
  }

  render() {
    let tournamentList: JSX.Element[]
    if (this.props.appState.activeTournaments.state === DataState.Loaded) {
      tournamentList = this.props.appState.activeTournaments.data.map((tournament) => {
        return <TournamentListItem key={tournament._id} appState={this.props.appState} tournament={tournament}></TournamentListItem>
      })
    }
    return (
      <div>{tournamentList}</div>
    )
  }
}