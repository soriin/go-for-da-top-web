import { observable } from 'mobx';

export default class AppState implements IAppState {
  @observable user: { data: IUser, state: DataState }
  @observable myMatches: { data: Match[], state: DataState }

    constructor() {
      this.user = {
        data: {
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

export interface Match {
  _id: string,
  endDate: Date,
  startDate: Date,
  tournament: string,
  battles: Battle[],
  players: Player[]
}

export interface Player {
  _id: string,
  displayName: string
}

export interface Battle {
  _id: string,
  song: Song,
  chooser: Player,
  entries: any
}

export interface Song {
}

export interface IAppState {
  user: {
    data: IUser,
    state: DataState
  },
  myMatches: {
    data: Match[],
    state: DataState
  }
}

export interface IUser {
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