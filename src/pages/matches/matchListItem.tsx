import { observer } from 'mobx-react';
import * as React from 'react';

import SongCard from '../../components/songCard';
import SongChooser from '../../components/songChooser';
import { IAppState, IMatch } from '../../states/appState';
import { formatDate } from '../../utils/formatter';
import Utils from '../../utils/utils';

@observer
export default class MatchListItem extends React.Component<{ appState: IAppState, match: IMatch }> {
  render() {
    const myId = this.props.appState.user.data._id
    const opponent = Utils.getOpponent(this.props.match, this.props.appState.user.data)

    let songOneSlot: JSX.Element
    let songTwoSlot: JSX.Element

    if (!this.props.match.battles[0].song && this.props.match.battles[0].chooser._id === myId) {
      songOneSlot = <SongChooser appState={this.props.appState} match={this.props.match} battle={this.props.match.battles[0]}></SongChooser>
    } else {
      songOneSlot = <SongCard song={this.props.match.battles[0].song}></SongCard>
    }
    if (!this.props.match.battles[1].song && this.props.match.battles[1].chooser._id === myId) {
      songTwoSlot = <SongChooser appState={this.props.appState} match={this.props.match} battle={this.props.match.battles[1]}></SongChooser>
    } else {
      songTwoSlot = <SongCard song={this.props.match.battles[1].song}></SongCard>
    }

    return (
      <div className='gfdt-match-list-item-container'>
        <div className='gfdt-flex'>
          {songOneSlot}&nbsp;|&nbsp;{songTwoSlot}
        </div>
        <div>VS&nbsp;{opponent.user.displayName}</div>
        <div>{formatDate(this.props.match.startDate)} - {formatDate(this.props.match.endDate)}</div>
      </div>
    )
  }
}