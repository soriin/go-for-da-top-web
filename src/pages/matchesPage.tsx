import { observer } from 'mobx-react';
import *as React from 'react';

import MatchesList from '../components/matches/matchesList';
import AppState from '../states/appState';

@observer
export default class MatchesPage extends React.Component<{appState: AppState}> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <MatchesList appState={this.props.appState} />
    )
  }
}