import * as React from 'react'
import { ITournament, IAppState } from '../../states/appState';

export default class TournamentListItem extends React.Component<{ appState: IAppState, tournament: ITournament}> {
  render() {
    return (
      <div className='gfdt-tournament-list-item-container'>
        {this.props.tournament.title}
      </div>
    )
  }
}