import { observable } from 'mobx';

export default class AppState implements IAppState {
  @observable user: { data: IUser, state: DataState }
  @observable myMatches: { data: IMatch[], state: DataState }

    constructor() {
      this.user = {
        data: {
          _id: '',
          realName: '',
          displayName: '',
          isAdmin: false
        },
        state: DataState.NoData
      }

      this.myMatches = {
        data: [],
        state: DataState.NoData
      }
    }
}

export interface IMatch {
  _id: string,
  endDate: Date,
  startDate: Date,
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
  chooser: IPlayer,
  entries: any
}

export interface ISong {
}

export interface IAppState {
  user: {
    data: IUser,
    state: DataState
  },
  myMatches: {
    data: IMatch[],
    state: DataState
  }
}

export interface IUser {
  _id: string,
  realName: string,
  displayName: string,
  isAdmin: boolean
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