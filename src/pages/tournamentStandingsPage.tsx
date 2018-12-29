import { observer } from 'mobx-react';
import * as React from 'react';

import { IPageDefaultProps } from '../utils/IDefaultProps';
import tournamentSvc from '../modules/tournaments/tournamentSvc'
import { IState, DataState } from '../states/appState';
import AwaitingVerificationList from '../components/verification/awaitingVerificationList';

@observer
export default class TournamentStandingsPage extends React.Component<IPageDefaultProps, ITournamentStandingsState> {
  state = {
      standings: {
        data: [],
        state: DataState.NoData
      },
      pendingVerification: {
        data: [],
        state: DataState.NoData
      }
    }
  tournamentId : string = this.props.match.params.id

  async componentWillMount() {
    const stateHolder = {
      state: DataState.NoData
    }
    tournamentSvc.getMatchupsAwaitingVerification(this.tournamentId, stateHolder)
      .then(matchups => {
        this.setState({
          pendingVerification: {
            data: matchups,
            state: stateHolder.state
          }
        })
      })
    tournamentSvc.getStandings(this.tournamentId, stateHolder)
      .then(standings => {
        this.setState({
          standings: {
            data: standings,
            state: stateHolder.state
          }
        })
      })
    
  }

  renderPendingVerifications = () => {
    if (true) {
      return (
        <div>
          <span>Matches to Verify</span>
          <AwaitingVerificationList tournamentId={this.tournamentId} />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  renderAdminStuff = () => {
    const pendingVerifications = this.renderPendingVerifications()

    return (
      <div>
        {pendingVerifications}
      </div>
    )
  }

  renderStandingsList(standings) {
    return standings.map(s => {
      return <div key={s._id}>
        {s.displayName} | {s.score}
      </div>
    })
  }

  render() {
    const standingsElems = this.renderStandingsList(this.state.standings.data)
    const adminSection = this.renderAdminStuff()
    return (
      <div>
        <div>
          <span>Tournament Standings</span>
        </div>
        <div>
          {standingsElems}
        </div>
        {adminSection}
      </div>
    )
  }
}

interface ITournamentStandingsState {
  standings: IStateData,
  pendingVerification: IStateData
}

interface IStateData extends IState {
  data: any[]
}