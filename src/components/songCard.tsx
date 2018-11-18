import { observer } from 'mobx-react';
import * as React from 'react';

import { ISong } from '../states/appState';

@observer
export default class SongCard extends React.Component<ISongCardProps> {
  componentWillReact() {
    console.log('SongCard componentWillReact')
  }
  render() {
    let songText: string = "Not Chossen, yet"
    if (this.props.song) songText = this.props.song.title
    return (
      <div>{songText}</div>
    )
  }
}

interface ISongCardProps {
  song: ISong
}