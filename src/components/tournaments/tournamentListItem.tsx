import * as React from 'react';

import { ITournament } from '../../states/appState';
import { IDefaultProps } from '../../utils/IDefaultProps';

export default class TournamentListItem extends React.Component<ITournamentListItemProps> {
  render() {
    return (
      <div className='gfdt-tournament-list-item-container'>
        {this.props.tournament.title}
      </div>
    )
  }
}

interface ITournamentListItemProps extends IDefaultProps {
  tournament: ITournament
}