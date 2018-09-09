import { IUser } from './../../states/appState';

export default class UserCache {
  cache: any
  constructor() {
    console.log('cache load')
    this.cache = []
  }
  
  saveUser(user: IUser) {
    this.cache[user._id] = user
  }

  getUser(id: string) :IUser {
    return this.cache[id]
  }
}