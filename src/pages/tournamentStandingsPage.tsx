import { observer } from 'mobx-react';
import * as React from 'react';

import { IPageDefaultProps } from '../utils/IDefaultProps';

@observer
export default class TournamentStandingsPage extends React.Component<IPageDefaultProps> {
  constructor(props) {
    super(props)
    console.log(this.props.match.params)
  }

  render() {
    return (
      <div>
        <div>
          <span>Tournament Standings</span>
        </div>
      </div>
    )
  }
}