import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITournament } from '../../states/appState';
import { IDefaultProps } from '../../utils/IDefaultProps';
import TournamentSvc, { ITournamentService } from '../../modules/tournaments/tournamentSvc';

export default class TournamentListItem extends React.Component<ITournamentListItemProps, ITournamentListItemState> {
  tournamentSvc: ITournamentService

  constructor(props) {
    super(props)

    this.state = {
      canJoin: false
    }

    this.tournamentSvc = TournamentSvc
  }

  componentWillMount() {
    const tournament = this.props.tournament
    if (moment(tournament.startDate) > moment() && !tournament.entrants.includes(this.props.appState.user.data._id)) {
      this.setState({canJoin: true})
    }
  }

  joinTournament = async () => {
    try {
      //await this.tournamentSvc.joinTournament(this.props.tournament._id)
      this.setState({canJoin: false})
    } catch {

    }
  }

  quitTournament = async () => {
    try {
      //await this.tournamentSvc.joinTournament(this.props.tournament._id)
      this.setState({canJoin: true})
    } catch {

    }
  }

  render() {
    const standingsPath = `tournament/${this.props.tournament._id}`
    let joinLeaveButton: JSX.Element
    if (this.state.canJoin) {
      joinLeaveButton = <span onClick={this.joinTournament}>Join!</span>
    } else {
      joinLeaveButton = <span onClick={this.quitTournament}>Quit!</span>
    }
    return (
      <div className='gfdt-tournament-list-item-container'>
        <span>{this.props.tournament.title}</span>
        <Link to={standingsPath}>
          <FontAwesomeIcon className='gfdt-icon' icon="clipboard-list" />
        </Link>
        {joinLeaveButton}
      </div>
    )
  }
}

interface ITournamentListItemProps extends IDefaultProps {
  tournament: ITournament
}

interface ITournamentListItemState {
  canJoin: Boolean
}