import { observer } from 'mobx-react';
import * as moment from 'moment';
import * as React from 'react';

import matchupService, { IMatchupService } from '../../modules/matchup/matchupSvc';
import { DataState, IAppState, IMatch } from '../../states/appState';
import MatchListItem from './matchListItem';

@observer
export default class MatchesList extends React.Component<IMatchesListProps, IMatchesListState> {
  matchupService: IMatchupService

  constructor(props) {
    super(props)
    this.matchupService = matchupService

    this.state = {
      matchList: []
    }
  }

  async componentDidMount() {
    if (this.props.appState.myMatches.state === DataState.NoData ||
      this.props.appState.myMatches.state === DataState.Error) {
      const matches = await this.matchupService.getMine(this.props.appState.myMatches)
      this.props.appState.myMatches.data = matches.matchups
    }

    let matchList: IMatch[]
    if (this.props.appState.myMatches.state === DataState.Loaded) {
      matchList = this.props.appState.myMatches.data
        .filter(match => {
          const startDate = moment(match.startDate).toDate()
          const endDate = moment(match.endDate).toDate()
          if (this.props.startBefore && startDate > this.props.startBefore) return false
          if (this.props.endBefore && endDate > this.props.endBefore) return false
          if (this.props.startAfter && startDate < this.props.startAfter) return false
          if (this.props.endAfter && endDate < this.props.endAfter) return false
          return true
        })
    }
    this.setState({ matchList })
  }

  render() {
    let body: JSX.Element
    if (this.props.appState.myMatches.state === DataState.Loaded) {
      const matchList: JSX.Element[] = this.state.matchList.map(match => {
        return <MatchListItem key={match._id} appState={this.props.appState} match={match}></MatchListItem>
      })

      if (!matchList || matchList.length === 0) {
        body = <span>No Matches</span>
      } else {
        body = <div>{matchList}</div>
      }
    } else {
      body = <span>No Matches</span>
    }
    return (
      <div>
        {body}
      </div>
    )
  }
}

interface IMatchesListProps {
  appState: IAppState,
  startBefore?: Date,
  startAfter?: Date,
  endBefore?: Date,
  endAfter?: Date,
}
interface IMatchesListState {
  matchList: IMatch[]
}