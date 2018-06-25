import { IUser } from './appState';
import { observable } from 'mobx';

export default class AppState implements IAppState {
  @observable user : IUser
  @observable isUserLoading: boolean
  @observable isUserLoaded: boolean

  constructor() {
    this.isUserLoading = true
    this.isUserLoaded = false

    this.user = {
      realName: '',
      displayName: '',
      isAdmin: false
    }
  }
}

export interface IAppState {
  user: IUser,
  isUserLoading: boolean
  isUserLoaded: boolean
}

export interface IUser {
  realName: string,
  displayName: string,
  isAdmin: boolean
}