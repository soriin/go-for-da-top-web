import { IState } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints, setParams } from '../../utils/endpoints';

const getActive = function getActiveFunc(stateHolder?: IState): Promise<any> {
  return api.get(Endpoints.tournaments, { stateHolder })
}

const getStandings = function getStandingsFunc(tournamentId: string, stateHolder?: IState): Promise<any> {
  return api.get(setParams(Endpoints.tournaments, {id: tournamentId}), { stateHolder })
}

export default {
  getActive,
  getStandings
}