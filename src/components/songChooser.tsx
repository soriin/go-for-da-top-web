import * as React from 'react'
import { IBattle, IAppState, IMatch, DataState } from "../states/appState";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import userService, { IUserService } from '../modules/user/userSvc'
import songService, { ISongService } from '../modules/song/songSvc'
import matchupService, { IMatchupService } from '../modules/matchup/matchupSvc'
import Select from 'react-select'

export default class SongChooser extends React.Component<{ appState: IAppState, match: IMatch, battle: IBattle }, any> {
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
      selectedSong: {},
      dialogState: DataState.Loaded
    };
    this.userService = userService
    this.songService = songService
    this.matchupService = matchupService

    this.toggleDialog = this.toggleDialog.bind(this)
    this.selectSong = this.selectSong.bind(this)
    this.saveSongChoice = this.saveSongChoice.bind(this)
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