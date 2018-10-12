import { DataState, IState, IMatch } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints, setParams } from '../../utils/endpoints';
import * as cache from '../cache/cacheSvc';

class MatchupService implements IMatchupService {
  async getMine(stateHolder?: IState): Promise<IMatch[]> {
    return await api.get(Endpoints.matchups, { stateHolder })
  }
  
  async setSongSelection(matchId: string, songId: string) : Promise<IMatch> {
    return await api.post(setParams(Endpoints.matchupSongSelection, {_id: matchId}), 
      {
        data: {
          songId
        }
      })
      .then((user: IMatch) => {
        cache.setItem('myMatches')
        return user
      })
  }
}

const matchupService = new MatchupService()
export default matchupService

export interface IMatchupService {
  getMine(stateHolder?: IState): Promise<any>,
  setSongSelection(matchId: string, songId: string) : Promise<IMatch>
} 