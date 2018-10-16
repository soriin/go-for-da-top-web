import { observer } from 'mobx-react';
import * as React from 'react';

import { IPageDefaultProps } from '../utils/IDefaultProps';
import tournamentSvc from '../modules/tournaments/tournamentSvc'
import { IState, DataState } from '../states/appState';

@observer
export default class TournamentStandingsPage extends React.Component<IPageDefaultProps, ITournamentStandingsState> {
  constructor(props) {
    super(props)
    this.state = {
      standings: {
        data: [],
        state: DataState.NoData
      }
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

  render() {
    const standings = this.state.standings.data
    let standingsElems : JSX.Element[]
    if (standings) {
      standingsElems = standings.map(s => {
        return <div key={s._id}>
          {s.displayName} | {s.score}
        </div>
      })
    }
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