import { IState } from '../../states/appState';
import { Endpoints } from '../../utils/endpoints';
import api from '../../utils/api'

const getCurrentUser = function getCurrentUserFunc(stateHolder?: IState) {
  return api.get(Endpoints.getCurrentUser, {stateHolder})
}

export default {
  getCurrentUser
}