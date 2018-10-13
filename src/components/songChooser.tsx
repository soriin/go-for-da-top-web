import * as React from 'react';
import Select from 'react-select';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import matchupService, { IMatchupService } from '../modules/matchup/matchupSvc';
import songService, { ISongService } from '../modules/song/songSvc';
import userService, { IUserService } from '../modules/user/userSvc';
import { DataState, IBattle, IMatch, ISong } from '../states/appState';
import { IDefaultProps } from '../utils/IDefaultProps';

export default class SongChooser extends React.Component<ISongChooserProps, ISongChooserState> {
  userService: IUserService
  songService: ISongService
  matchupService: IMatchupService
  constructor(props) {
    super(props)
    this.state = {
      modalVisibility: false,
      opponentName: '',
      playerOneName: '',
      playerTwoName: '',
      selectedSong: undefined,
      dialogState: DataState.Loaded,
      songOptions: undefined
    };
    this.userService = userService
    this.songService = songService
    this.matchupService = matchupService

    this.toggleDialog = this.toggleDialog.bind(this)
    this.selectSong = this.selectSong.bind(this)
    this.saveSongChoice = this.saveSongChoice.bind(this)
  }

  componentWillMount() {
    const myId = this.props.appState.user.data._id
    const playerOneId = this.props.match.players[0].user._id
    const playerTwoId = this.props.match.players[1].user._id
    if (myId !== playerOneId) {
      this.userService.getUserData(playerOneId)
        .then((user) => this.setState({ playerOneName: user.displayName }))
    } else {
      this.setState({ playerOneName: 'you'})
    }

    if (myId !== playerTwoId) {
      this.userService.getUserData(playerTwoId)
        .then((user) => this.setState({ playerTwoName: user.displayName }))
    } else {
      this.setState({ playerTwoName: 'you'})
    }
    
    this.songService.getAllSongs(this.props.appState.songs)
      .then(songs => {
        if (!songs) return
        const options = songs.map(s => { return { value: s, label: s.title } })
        this.setState({ songOptions: options })
      })
  }

  toggleDialog() {
    this.setState({
      modalVisibility: !this.state.modalVisibility,
      dialogState: DataState.NoData
    })
  }

  selectSong(selectedSong) {
    this.setState({ selectedSong: selectedSong.value })
  }

  async saveSongChoice() {
    this.setState({ dialogState: DataState.Loading })
    await this.matchupService.setSongSelection(this.props.match._id, this.state.selectedSong._id)
    const matches = await this.matchupService.getMine(this.props.appState.myMatches)
    this.props.appState.myMatches.data = matches.matchups
    this.setState({ modalVisibility: false })
  }

  render() {
    let selectElem: JSX.Element
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

    let footer: JSX.Element
    if (this.state.dialogState !== DataState.Loading) {
      footer =
        <ModalFooter>
          <Button color="primary" onClick={this.saveSongChoice}>Save</Button>{' '}
          <Button color="secondary" onClick={this.toggleDialog}>Cancel</Button>
        </ModalFooter>
    } else {
      footer =
        <ModalFooter>
          <span>Loading...</span>
        </ModalFooter>
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
          {footer}
        </Modal>
      </div>
    )
  }
}

interface ISongChooserProps extends IDefaultProps {
  match: IMatch,
  battle: IBattle
}

interface ISongChooserState {
  modalVisibility: Boolean,
  opponentName: String,
  playerOneName: String,
  playerTwoName: String,
  selectedSong: ISong,
  dialogState: DataState,
  songOptions: any
}