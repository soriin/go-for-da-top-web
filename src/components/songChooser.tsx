import * as React from 'react'
import { IBattle, IAppState, IMatch } from "../states/appState";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import userService, { IUserService } from '../modules/user/userSvc'

export default class SongChooser extends React.Component<{ appState: IAppState, match: IMatch, battle: IBattle }, any> {
  userService: IUserService
  constructor(props) {
    super(props)
    this.state = {
      modalVisibility: false,
      opponentName: '',
      playerOneName: '',
      playerTwoName: ''
    };
    this.userService = userService

    this.toggleDialog = this.toggleDialog.bind(this)
  }

  componentWillMount() {
    this.userService.getUserData(this.props.match.players[0].user._id)
      .then((user) => this.setState({ playerOneName: user.displayName}))
    this.userService.getUserData(this.props.match.players[1].user._id)
      .then((user) => this.setState({ playerTwoName: user.displayName}))
  }

  toggleDialog() {
    this.setState({
      modalVisibility: !this.state.modalVisibility
    })
  }
  render() {
    return (
      <div>
        <span className='gfdt-clickable' onClick={this.toggleDialog}>Pick a song, fool!</span>

        <Modal isOpen={this.state.modalVisibility} toggle={this.toggleDialog}>
          <ModalHeader toggle={this.toggleDialog}>Choose your song</ModalHeader>
          <ModalBody>
            Choose song pick for {this.state.playerOneName} VS {this.state.playerTwoName}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleDialog}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggleDialog}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}