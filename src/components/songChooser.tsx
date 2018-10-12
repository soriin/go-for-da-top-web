import * as React from 'react'
import { IBattle, IAppState, IMatch, DataState } from "../states/appState";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import userService, { IUserService } from '../modules/user/userSvc'
import songService, { ISongService } from '../modules/song/songSvc'
import Select from 'react-select'

export default class SongChooser extends React.Component<{ appState: IAppState, match: IMatch, battle: IBattle }, any> {
  userService: IUserService
  songService: ISongService
  constructor(props) {
    super(props)
    this.state = {
      modalVisibility: false,
      opponentName: '',
      playerOneName: '',
      playerTwoName: '',
      selectedSong: {}
    };
    this.userService = userService
    this.songService = songService

    this.toggleDialog = this.toggleDialog.bind(this)
    this.selectSong = this.selectSong.bind(this)
  }

  componentWillMount() {
    this.userService.getUserData(this.props.match.players[0].user._id)
      .then((user) => this.setState({ playerOneName: user.displayName}))
    this.userService.getUserData(this.props.match.players[1].user._id)
      .then((user) => this.setState({ playerTwoName: user.displayName}))
    this.songService.getAllSongs(this.props.appState.songs)
      .then(songs => {
        if (!songs) return
        const options = songs.map(s => { return { value: s, label: s.title } } )
        this.setState({songOptions: options})
      })
  }

  toggleDialog() {
    this.setState({
      modalVisibility: !this.state.modalVisibility
    })
  }

  selectSong(selectedSong) {
    this.setState({ selectedSong })
  }
  render() {
    let selectElem : JSX.Element
    if (this.props.appState.songs.state === DataState.Loaded) {
      selectElem = <div>
        <Select
          options={this.state.songOptions}
          onChange={this.selectSong} />
      </div>
    } else if (this.props.appState.songs.state === DataState.Loading) {
      selectElem = <span>Loading...</span>
    } else if (this.props.appState.songs.state === DataState.NoData) {
      selectElem = <span>No songs found</span>
    } else {
      selectElem = <span>Error loading songs</span>
    }
    return (
      <div>
        <span className='gfdt-clickable' onClick={this.toggleDialog}>Pick a song, fool!</span>

        <Modal isOpen={this.state.modalVisibility} toggle={this.toggleDialog}>
          <ModalHeader toggle={this.toggleDialog}>Choose your song</ModalHeader>
          <ModalBody>
            Choose song pick for {this.state.playerOneName} VS {this.state.playerTwoName}
            {selectElem}
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