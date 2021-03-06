import { observable } from 'mobx';

export default class AppState implements IAppState {
  @observable user: { data: IUser, state: DataState }
  @observable myMatches: { data: IMatch[], state: DataState }
  @observable activeTournaments: { data: ITournament[], state: DataState }
  @observable songs: {data: ISong[], state: DataState }

    constructor() {
      this.user = {
        data: {
          _id: '',
          realName: '',
          displayName: '',
          isAdmin: false,
          email: ''
        },
        state: DataState.NoData
      }
      this.myMatches = {
        data: [],
        state: DataState.NoData
      }

      this.activeTournaments = {
        data: [],
        state: DataState.NoData
      }
      this.songs = {
        data: [],
        state: DataState.NoData
      }
    }
}

export interface IMatch {
  _id: string,
  endDate: Date|string,
  startDate: Date|string,
  tournament: string,
  battles: IBattle[],
  players: IPlayer[]
}

export interface IPlayer {
  user: IUser,
  score: string
}

export interface IBattle {
  _id: string,
  song: ISong,
  chooser: IUser,
  entries: object
}

export interface ISong {
  _id: string,
  title: string,
  isHidden: boolean
}

export interface IAppState {
  user: {
    data: IUser,
    state: DataState
  },
  myMatches: {
    data: IMatch[],
    state: DataState
  },
  activeTournaments: {
    data: ITournament[],
    state: DataState
  },
  songs: {
    data: ISong[],
    state: DataState
  }
}

export interface IUser {
  _id: string,
  realName: string,
  displayName: string,
  isAdmin?: boolean,
  email: string
}

export enum DataState {
  NoData,
  Loading,
  Loaded,
  Error
}

export interface IState {
  state: DataState
}

export interface ITournament {
  _id: string,
  title: string,
  isActive: boolean,
  startDate: Date,
  endDate: Date,
  entrants: string[]
}

export interface IBattleEntry {
  exScore: number,
  imageProofUrl: string
}