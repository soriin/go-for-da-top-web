import { observer } from 'mobx-react';
import * as React from 'react';

import MatchesList from '../components/matches/matchesList';
import { IPageDefaultProps } from '../utils/IDefaultProps';

@observer
export default class MatchesPage extends React.Component<IPageDefaultProps> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <MatchesList appState={this.props.appState} />
    )
  }
}