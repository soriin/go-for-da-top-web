import { observable } from 'mobx';

export default class AppState implements IAppState {
  @observable user : {name}
  @observable isLoadingUser: boolean
  constructor() {
    this.user = null
    this.isLoadingUser = false
  }
}

export interface IAppState {
  user: IUser,
  isLoadingUser: boolean
}

export interface IUser {
  name: string
}