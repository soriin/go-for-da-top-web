import { IState } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints, setParams } from '../../utils/endpoints';

const getActive = function getActiveFunc(stateHolder?: IState): Promise<any> {
  return api.get(Endpoints.getActiveTournaments, { stateHolder })
}

const getStandings = function getStandingsFunc(tournamentId: string, stateHolder?: IState): Promise<any> {
  return api.get(setParams(Endpoints.getActiveTournaments, {id: tournamentId}), { stateHolder })
}

export default {
  getActive,
  getStandings
}