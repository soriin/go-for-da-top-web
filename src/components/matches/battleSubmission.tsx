import { observer } from 'mobx-react';
import mobxReactForm from 'mobx-react-form';
import * as React from 'react';
import validatorjs from 'validatorjs';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { IBattle, IMatch, DataState } from '../../states/appState';
import { IDefaultProps } from '../../utils/IDefaultProps';
import BattleSubmissionForm from './battleSubmissionForm';

const MobxReactForm = mobxReactForm as any
const plugins = { dvr: validatorjs }

@observer
export default class BattleSubmission extends React.Component<IBattleSubmissionProps, IBattleSubmissionState> {
  constructor(props) {
    super(props)

    this.state = {
      canSubmit: false,
      modalVisibility: false
    }
  }

  componentWillMount() {
    const me = this.props.appState.user.data
    this.setState({canSubmit: true})

  }
  render() {
    let submitable = this.state.canSubmit
    let body : JSX.Element
    if (submitable) {
      body = <div>
        Gimme dem stats
      </div>
    } else {
      body = <div></div>
    }
    return (
      <div>
        {body}
      </div>
    )
  }
}

interface IBattleSubmissionProps extends IDefaultProps {
  match: IMatch,
  battle: IBattle
}

interface IBattleSubmissionState {
  canSubmit: Boolean,
  modalVisibility: Boolean
}