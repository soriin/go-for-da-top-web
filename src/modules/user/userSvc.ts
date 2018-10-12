import { IState, IUser } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints, setParams } from '../../utils/endpoints';
import * as cache from '../cache/cacheSvc';

class UserService implements IUserService {
  async updateUser(userData: IUser, stateHolder?: IState) : Promise<IUser> {
    return await api.put(setParams(Endpoints.userData, userData), { data: userData, stateHolder: stateHolder })
  }

  async getCurrentUser(stateHolder?: IState) : Promise<IUser> {
    return await api.get(Endpoints.currentUser, {stateHolder})
  }
  
  async getUserData(_id: string) : Promise<IUser> {
    const cachedUser = cache.getItem(_id)
    if (cachedUser) {
      return cachedUser
    }
    return await api.get(setParams(Endpoints.userData, {_id}))
      .then((user: IUser) => {
        cache.setItem(_id, user)
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