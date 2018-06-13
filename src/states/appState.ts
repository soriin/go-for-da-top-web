import { observable } from 'mobx';

export default class AppState implements IAppState {
  @observable user : {name}
  constructor() {
    this.user = null
  }
}

export interface IAppState {
 user: { name: string }
}