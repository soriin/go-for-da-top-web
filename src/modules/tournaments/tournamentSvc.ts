import { IState, ITournament } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints, setParams } from '../../utils/endpoints';

async function getActive(stateHolder?: IState): Promise<ITournament[]> {
  return await api.get(Endpoints.tournaments, { stateHolder })
}

async function getStandings(tournamentId: string, stateHolder?: IState): Promise<any> {
  return await api.get(setParams(Endpoints.tournamentStandings, {_id: tournamentId}), { stateHolder })
}

export default {
  getActive,
  getStandings
}