import { observer } from 'mobx-react';
import * as React from 'react';

import matchupService, { IMatchupService } from '../modules/matchup/matchupSvc';
import { DataState, IAppState } from '../states/appState';
import MatchListItem from './matches/matchListItem';

@observer
export default class Matches extends React.Component<{ appState: IAppState }> {
  matchupService: IMatchupService

  constructor(props) {
    super(props)
    this.matchupService = matchupService
  }

  async componentDidMount() {
    if (this.props.appState.myMatches.state === DataState.NoData ||
      this.props.appState.myMatches.state === DataState.Error) {
      const matches = await this.matchupService.getMine(this.props.appState.myMatches)
      this.props.appState.myMatches.data = matches.matchups
    }
  }

  render() {
    let matchList: JSX.Element[]
    if (this.props.appState.myMatches.state === DataState.Loaded) {
      matchList = this.props.appState.myMatches.data.map((match) => {
        return <MatchListItem key={match._id} appState={this.props.appState} match={match}></MatchListItem>
      })
    }
    return (
      <div>
        {matchList}
      </div>
    )
  }
}