import { IState, ITournament, IMatch } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints, setParams } from '../../utils/endpoints';
import * as cache from '../cache/cacheSvc';

class TournamentService implements ITournamentService {
  async getActive(stateHolder?: IState): Promise<ITournament[]> {
    return await api.get(Endpoints.tournaments, { stateHolder })
  }

  async getMatchupsAwaitingVerification (tournamentId: string, stateHolder?: IState): Promise<IMatch[]> {
    return await api.get(setParams(Endpoints.tournamentVerifiableMatchups, { _id: tournamentId}), {stateHolder})
  }

  async getStandings(tournamentId: string, stateHolder?: IState): Promise<any> {
    return await api.get(setParams(Endpoints.tournamentStandings, { _id: tournamentId }), { stateHolder })
  }

  async joinTournament(tournamentId: string, stateHolder?: IState): Promise<ITournament> {
    return await api.post(setParams(Endpoints.tournamentEntrant, { _id: tournamentId }), { stateHolder })
  }

  async leaveTournament(tournamentId: string, stateHolder?: IState): Promise<ITournament> {
    return await api.delete(setParams(Endpoints.tournamentEntrant, { _id: tournamentId }), { stateHolder })
  }
}
const tournamentService = new TournamentService()
export default tournamentService

export interface ITournamentService {
  getActive(stateHolder?: IState): Promise<ITournament[]>,
  getMatchupsAwaitingVerification(tournamentId: string, stateHolder?: IState): Promise<IMatch[]>,
  getStandings(tournamentId: string, stateHolder?: IState): Promise<any>,
  joinTournament(tournamentId: string, stateHolder?: IState): Promise<ITournament>,
  leaveTournament(tournamentId: string, stateHolder?: IState): Promise<ITournament>
}