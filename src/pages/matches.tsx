import { observer } from 'mobx-react';
import * as React from 'react';
import { IAppState, DataState } from '../states/appState';
import matchupService from '../modules/matchup/matchup';

@observer
export default class Matches extends React.Component<{appState: IAppState}> {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const matches = await matchupService.getMine(this.props.appState.myMatches)
    this.props.appState.myMatches.data = matches.matchups
  }

  render() {
    let matchList: JSX.Element[] = []
    if (this.props.appState.myMatches.state === DataState.Loaded) {
      matchList = this.props.appState.myMatches.data.map((match) => {
        return <div>{match._id}</div>
      })
    }
    return (
      <div>
        "Matches for real"
        <div>
          {matchList}
        </div>
      </div>
    )
  }
}