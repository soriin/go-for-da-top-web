import { observer } from 'mobx-react';
import mobxReactForm from 'mobx-react-form';
import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import validatorjs from 'validatorjs';

import { DataState, IBattle, IMatch, IBattleEntry } from '../../states/appState';
import { IDefaultProps } from '../../utils/IDefaultProps';
import BattleSubmissionForm from './battleSubmissionForm';
import matchupService from '../../modules/matchup/matchupSvc';
import BattleData from './battleCard';

const MobxReactForm = mobxReactForm as any
const plugins = { dvr: validatorjs }


interface IProps extends IDefaultProps {
  match: IMatch,
  battle: IBattle
}

interface IState {
  modalVisibility: Boolean,
  modalState: DataState
}

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
      type: 'file'
    }
  ]
  return new MobxReactForm({ fields }, { plugins, hooks })
}

@observer
export default class BattleSubmission extends React.Component<IProps, IState> {
  state = {
    modalVisibility: false,
    modalState: DataState.NoData
  }
  form: any

  componentWillMount() {
    this.form = initializeForm(this.onSuccess, this.onError)
  }

  determineIfCanSubmit = () => {
    if (this.props.battle.song && !this.props.battle.song.isHidden) {
      return true
    }
    return false
  }

  onSuccess = async (form) => {
    this.setState({ modalState: DataState.Loading })
    const fileField = form.$('imageData')
    const exScoreField = form.$('exScore')
    if (!fileField.files || fileField.files.length === 0) {
      this.setState({ modalState: DataState.Error })
      return this.onError(form)
    }
    try {
      const fileData = fileField.files[0]
      const updatedMatchup = await matchupService.submitEntry(
        this.props.match._id,
        this.props.battle.song._id,
        {
          file: fileData,
          exScore: exScoreField.$value
        })
      if (updatedMatchup) {
        const updatedMatches = await matchupService.getMine(this.props.appState.myMatches)
        this.props.appState.myMatches.data = updatedMatches.matchups
      }
    } catch (e) {
      this.setState({ modalState: DataState.Error })
    }
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

  getMyCurrentEntry = () => {
    if (!this.props.battle.entries) return
    return this.props.battle.entries[this.props.appState.user.data._id] as IBattleEntry
  }

  renderSubmissionModalFooter = () => {
    let footer: JSX.Element
    if (this.state.modalState !== DataState.Loading) {
      footer =
        <ModalFooter>
          <Button color="primary" onClick={this.form.onSubmit}>Save</Button>{' '}
          <Button color="secondary" onClick={this.toggleDialog}>Cancel</Button>
        </ModalFooter>
    } else {
      footer =
        <ModalFooter>
          <span>Loading...</span>
        </ModalFooter>
    }
    return footer
  }

  renderSubmissionModal = () => {
    if (!this.props.battle.song) {
      return null
    }
    const footer = this.renderSubmissionModalFooter()
    const myCurrentEntry = this.getMyCurrentEntry()

    return (
      <Modal isOpen={this.state.modalVisibility} toggle={this.toggleDialog}>
        <ModalHeader toggle={this.toggleDialog}>Submit your battle entry for {this.props.battle.song.title}!</ModalHeader>
        <ModalBody>
          <BattleData entry={myCurrentEntry} />
          <hr />
          <BattleSubmissionForm form={this.form} />
        </ModalBody>
        {footer}
      </Modal>
    )
  }

  render() {
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