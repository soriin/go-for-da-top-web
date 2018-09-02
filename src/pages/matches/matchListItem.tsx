import { observer } from 'mobx-react';
import * as React from 'react';

import { IMatch, IAppState } from '../../states/appState';
import { formatDate } from '../../utils/formatter';
import SongCard from '../../components/songCard';

@observer
export default class MatchListItem extends React.Component<{ appState: IAppState, match: IMatch }> {
  render() {
    const myId = this.props.appState.user.data._id
    const opponent = this.props.match.players.filter((p) => {
      return p.user._id !== myId
    })[0]

    return (
      <div className='gfdt-match-container'>
        <div className='gfdt-flex'>
          <SongCard song={this.props.match.battles[0].song}></SongCard>&nbsp;|&nbsp;
          <SongCard song={this.props.match.battles[1].song}></SongCard>
        </div>
        <div>VS&nbsp;{opponent.user.displayName}</div>
        <div>{formatDate(this.props.match.startDate)} - {formatDate(this.props.match.endDate)}</div>
      </div>
    )
  }
}