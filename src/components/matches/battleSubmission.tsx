import { observer } from 'mobx-react';
import mobxReactForm from 'mobx-react-form';
import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import validatorjs from 'validatorjs';

import { DataState, IBattle, IMatch } from '../../states/appState';
import { IDefaultProps } from '../../utils/IDefaultProps';
import BattleSubmissionForm from './battleSubmissionForm';

const MobxReactForm = mobxReactForm as any
const plugins = { dvr: validatorjs }

const initializeForm = (onSuccess, onError) => {
  const existingEntry: any = {}
  const hooks = {
    onSuccess: onSuccess,
    onError: onError
  }
  const fields = [
    {
      name: 'exScore',
      label: 'EX Score',
      rules: 'required|integer|between:1,9999',
      value: existingEntry.exScore
    },
    {
      name: 'imageData',
      label: 'Image Proof',
      rules: 'required',
      value: existingEntry.imageData
    }
  ]
  return new MobxReactForm({ fields }, { plugins, hooks })
}

@observer
export default class BattleSubmission extends React.Component<IBattleSubmissionProps, IBattleSubmissionState> {
  state = {
    modalVisibility: false,
    modalState: DataState.NoData
  }
  form: mobxReactForm

  componentWillMount() {
    this.form = initializeForm(this.onSuccess, this.onError)
  }

  determineIfCanSubmit = () => {
    const me = this.props.appState.user.data
    if (this.props.battle.song && !this.props.battle.song.isHidden) {
      return true
    }
    return false
  }

  onSuccess = async (form) => {
    const formValues = {
      _id: this.props.appState.user.data._id,
      realName: form.$('realName').$value,
      displayName: form.$('displayName').$value,
      email: form.$('email').$value
    }
    // const updatedUser = await userService.updateUser(formValues)
    // if (updatedUser) {
    //   this.props.appState.user.data = updatedUser
    // }
  }

  onError = (form) => {
    console.log('All form errors', form.errors());
  }

  toggleDialog = () => {
    this.setState({
      modalVisibility: !this.state.modalVisibility,
      modalState: DataState.NoData
    })
  }

  saveSubmission = async () => {
    this.setState({ modalState: DataState.Loading })

    const { isValid } = await this.form.validate()
    console.log(isValid, 'isValid')
    // await this.matchupService.setSongSelection(this.props.match._id, this.state.selectedSong._id)
    // const matches = await this.matchupService.getMine(this.props.appState.myMatches)
    // this.props.appState.myMatches.data = matches.matchups
    this.setState({ modalVisibility: false })
  }

  renderSubmissionModal = () => {
    if (!this.props.battle.song) {
      return null
    }
    let footer: JSX.Element
    if (this.state.modalState !== DataState.Loading) {
      footer =
        <ModalFooter>
          <Button color="primary" onClick={this.saveSubmission}>Save</Button>{' '}
          <Button color="secondary" onClick={this.toggleDialog}>Cancel</Button>
        </ModalFooter>
    } else {
      footer =
        <ModalFooter>
          <span>Loading...</span>
        </ModalFooter>
    }

    return (
      <Modal isOpen={this.state.modalVisibility} toggle={this.toggleDialog}>
        <ModalHeader toggle={this.toggleDialog}>Submit your battle entry for {this.props.battle.song.title}!</ModalHeader>
        <ModalBody>
          <BattleSubmissionForm form={this.form} />
        </ModalBody>
        {footer}
      </Modal>
    )
  }

  render() {
    console.log('BattleSubmission rendered')
    let body: JSX.Element
    if (this.determineIfCanSubmit()) {
      body = <span className='gfdt-clickable' onClick={this.toggleDialog}>Submit dem scores!</span>
    } else {
      body = <div></div>
    }

    const submissionModal = this.renderSubmissionModal()
    
    return (
      <div>
        {body}
        {submissionModal}
      </div>
    )
  }
}

interface IBattleSubmissionProps extends IDefaultProps {
  match: IMatch,
  battle: IBattle
}

interface IBattleSubmissionState {
  modalVisibility: Boolean,
  modalState: DataState
}