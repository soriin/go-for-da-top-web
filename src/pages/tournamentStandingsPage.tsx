import { observer } from 'mobx-react';
import * as React from 'react';

import { IPageDefaultProps } from '../utils/IDefaultProps';
import tournamentSvc from '../modules/tournaments/tournamentSvc'
import { IState, DataState } from '../states/appState';

@observer
export default class TournamentStandingsPage extends React.Component<IPageDefaultProps, ITournamentStandingsState> {
  state = {
      standings: {
        data: [],
        state: DataState.NoData
      }
    }

  async componentWillMount() {
    const stateHolder = {
      state: DataState.NoData
    }
    const tournamentId = this.props.match.params.id
    const data = await tournamentSvc.getStandings(tournamentId, stateHolder)
    this.setState({
      standings: {
        data,
        state: stateHolder.state
      }
    })
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
    return (
      <div>
        <div>
          <span>Tournament Standings</span>
        </div>
        <div>
          {standingsElems}
        </div>
      </div>
    )
  }
}

interface ITournamentStandingsState {
  standings: IStandings
}

interface IStandings extends IState {
  data: any[]
}