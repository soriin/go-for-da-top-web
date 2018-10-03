import { IState, IUser } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints, setParams } from '../../utils/endpoints';
import UserCache from './userCache';

class UserService implements IUserService {
  cache: UserCache
  constructor() {
    this.cache = new UserCache()
  }

  updateUser(userData: IUser, stateHolder?: IState) : Promise<IUser> {
    return api.put(setParams(Endpoints.userData, userData), { data: userData, stateHolder: stateHolder })
  }

  getCurrentUser(stateHolder?: IState) : Promise<IUser> {
    return api.get(Endpoints.currentUser, {stateHolder})
  }
  
  getUserData(_id: string) : Promise<IUser> {
    const cachedUser = this.cache.getUser(_id)
    if (cachedUser) {
      return new Promise(function (resolve) {
        resolve(cachedUser)
      })
    }
    return api.get(setParams(Endpoints.userData, {_id})).then((user: IUser) => {
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