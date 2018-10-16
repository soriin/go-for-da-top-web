import { IState, ITournament } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints, setParams } from '../../utils/endpoints';
import * as cache from '../cache/cacheSvc';

class TournamentService implements ITournamentService {
  async getActive(stateHolder?: IState): Promise<ITournament[]> {
    return await api.get(Endpoints.tournaments, { stateHolder })
  }

  async getStandings(tournamentId: string, stateHolder?: IState): Promise<any> {
    return await api.get(setParams(Endpoints.tournamentStandings, { _id: tournamentId }), { stateHolder })
  }
}
const tournamentService = new TournamentService()
export default tournamentService

export interface ITournamentService {
  getActive(stateHolder?: IState): Promise<ITournament[]> ,
  getStandings(tournamentId: string, stateHolder?: IState): Promise<any>
}