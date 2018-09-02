import * as React from 'react'
import { IAppState, DataState } from '../states/appState';
import tournamentSvc from '../modules/tournaments/tournamentSvc';
import TournamentListItem from '../components/tournaments/tournamentListItem';
import { observer } from 'mobx-react';

@observer
export default class Tourmanents extends React.Component<{appState: IAppState}> {
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