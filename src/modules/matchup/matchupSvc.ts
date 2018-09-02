import { IState, IMatch } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints } from '../../utils/endpoints';

const getMine = function getMineFunc(stateHolder?: IState): Promise<any> {
  return api.get(Endpoints.getMyMatchups, { stateHolder })
}

export default {
  getMine
}