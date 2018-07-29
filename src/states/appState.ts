import { observable } from 'mobx';

export default class AppState implements IAppState {
  @observable user : IUser
  @observable userState: DataState

  constructor() {
    this.userState = DataState.NoData

    this.user = {
      realName: '',
      displayName: '',
      isAdmin: false
    }
  }
}

export interface IAppState {
  user: IUser,
  userState: DataState
}

export interface IUser {
  realName: string,
  displayName: string,
  isAdmin: boolean
}

export enum DataState {
  NoData,
  Loading,
  Loaded
}