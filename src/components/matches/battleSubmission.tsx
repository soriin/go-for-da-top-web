import * as React from 'react'
import { IDefaultProps } from '../../utils/IDefaultProps'
import { observer } from 'mobx-react'
import { IMatch, IBattle } from '../../states/appState';

@observer
export default class BattleSubmission extends React.Component<IBattleSubmissionProps, IBattleSubmissionState> {
  constructor(props) {
    super(props)

    this.state = {
      canSubmit: false
    }
  }

  componentWillMount() {
    const me = this.props.appState.user.data
    this.setState({canSubmit: true})

  }
  render() {
    return (
      <div>
        BATTLE!
      </div>
    )
  }
}

interface IBattleSubmissionProps extends IDefaultProps {
  match: IMatch,
  battle: IBattle
}

interface IBattleSubmissionState {
  canSubmit: Boolean
}