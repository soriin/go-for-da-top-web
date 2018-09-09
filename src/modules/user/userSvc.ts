import { IState, IUser } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints, setParams } from '../../utils/endpoints';
import UserCache from './userCache';

class UserService implements IUserService {
  cache: UserCache
  constructor() {
    this.cache = new UserCache()
  }
  getCurrentUser(stateHolder?: IState) : Promise<IUser> {
    return api.get(Endpoints.getCurrentUser, {stateHolder})
  }
  
  getUserData(id: string) : Promise<IUser> {
    const cachedUser = this.cache.getUser(id)
    if (cachedUser) {
      return new Promise(function (resolve) {
        resolve(cachedUser)
      })
    }
    return api.get(setParams(Endpoints.getUserData, {id})).then((user: IUser) => {
      this.cache.saveUser(user)
      return user
    })
  }
}

const userService = new UserService()
export default userService

export interface IUserService {
  getCurrentUser(stateHolder?: IState) : Promise<IUser>,
  getUserData(id: string) : Promise<IUser>
} 