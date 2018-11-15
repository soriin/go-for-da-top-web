import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITournament } from '../../states/appState';
import { IDefaultProps } from '../../utils/IDefaultProps';
import tournamentSvc from '../../modules/tournaments/tournamentSvc';

export default class TournamentListItem extends React.Component<ITournamentListItemProps, ITournamentListItemState> {

  constructor(props) {
    super(props)

    this.state = {
      isEntrant: false,
      isEntryLocked: true
    }
  }

  componentWillMount() {
    const tournament = this.props.tournament
    if (moment(tournament.startDate) > moment()) {
      this.setState({ isEntryLocked: false })
    }
    if (tournament.entrants.includes(this.props.appState.user.data._id)) {
      this.setState({ isEntrant: true })
    }
  }

  joinTournament = async () => {
    try {
      const updatedTournament = await tournamentSvc.joinTournament(this.props.tournament._id)
      this.setState({ isEntrant: true })
      this.props.tournament.entrants = updatedTournament.entrants
    } catch {

    }
  }

  quitTournament = async () => {
    try {
      const updatedTournament = await tournamentSvc.leaveTournament(this.props.tournament._id)
      this.props.tournament.entrants = updatedTournament.entrants
      this.setState({ isEntrant: false })
    } catch {

    }
  }

  render() {
    const standingsPath = `tournament/${this.props.tournament._id}`
    let joinLeaveButton: JSX.Element
    if (!this.state.isEntryLocked) {
      if (this.state.isEntrant) {
        joinLeaveButton = <span className="gfdt-clickable" onClick={this.quitTournament}>Quit!</span>
      } else {
        joinLeaveButton = <span className="gfdt-clickable" onClick={this.joinTournament}>Join!</span>
      }
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
  isEntryLocked: Boolean,
  isEntrant: Boolean
}