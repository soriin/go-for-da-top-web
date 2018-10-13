import * as React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITournament } from '../../states/appState';
import { IDefaultProps } from '../../utils/IDefaultProps';

export default class TournamentListItem extends React.Component<ITournamentListItemProps> {
  render() {
    const standingsPath = `tournament/${this.props.tournament._id}`
    return (
      <div className='gfdt-tournament-list-item-container'>
        <span>{this.props.tournament.title}</span>
        <Link to={standingsPath}>
          <FontAwesomeIcon className='gfdt-icon' icon="clipboard-list" />
        </Link>
      </div>
    )
  }
}

interface ITournamentListItemProps extends IDefaultProps {
  tournament: ITournament
}