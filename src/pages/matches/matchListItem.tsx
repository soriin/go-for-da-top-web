import { observer } from 'mobx-react';
import * as React from 'react';

import { IMatch, IAppState } from '../../states/appState';
import { formatDate } from '../../utils/formatter';

@observer
export default class MatchListItem extends React.Component<{ appState: IAppState, match: IMatch }> {
  constructor(props) {
    super(props)
  }
  render() {
    const myId = this.props.appState.user.data._id
    const opponent = this.props.match.players.filter((p) => {
      return p.user._id !== myId
    })[0]
    
    return (
      <div>
        <div>VS {opponent.user.displayName}</div>
        <div>{formatDate(this.props.match.startDate)} - {formatDate(this.props.match.endDate)}</div>
      </div>
    )
  }
}