import { observer } from 'mobx-react';
import * as React from 'react';

import { ISong } from '../states/appState';

@observer
export default class SongCard extends React.Component<ISongCardProps> {
  constructor(props) {
    super(props)
  }

  render() {
    let song: string = "Not Chossen, yet"
    if (this.props.song) song = this.props.song.title
    return (
      <div>{song}</div>
    )
  }
}

interface ISongCardProps {
  song: ISong
}