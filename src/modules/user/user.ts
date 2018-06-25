import { Endpoints } from './../../utils/endpoints';
import api from '../../utils/api'

const getCurrentUser = function getCurrentUser() {
  return api.get(Endpoints.getCurrentUser)
}

export default {
  getCurrentUser
}