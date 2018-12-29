import * as React from 'react'
import { IMatch } from '../../states/appState';
import tournamentService from '../../modules/tournaments/tournamentSvc'

interface IProps {
  tournamentId: string
}

interface IState {
  matches: IMatch[]
}

export default class AwaitingVerificationList extends React.PureComponent<IProps, IState> {
  tournamentService = tournamentService

  componentWillMount() {

  }

  render() {
    return (
      <div>
        Stuff awaiting verifications
      </div>
    )
  }
}