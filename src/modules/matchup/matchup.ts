import { IState } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints } from '../../utils/endpoints';

const getMine = function getMineFunc(stateHolder?: IState) {
  return api.get(Endpoints.getMyMatchups, {stateHolder})
}

export default {
  getMine
}