import { DataState, ISong, IState } from '../../states/appState';
import api from '../../utils/api';
import { Endpoints, setParams } from '../../utils/endpoints';
import * as cache from '../cache/cacheSvc';

class SongService implements ISongService {
  async getAllSongs(stateHolder?: IState) : Promise<ISong[]> {
    const cachedSongs = cache.getItem('songs')
    if (cachedSongs) {
        stateHolder.state = DataState.Loaded
        return JSON.parse(cachedSongs)
    }
    return await api.get(Endpoints.songs, { stateHolder })
  }
  
  async getSong(_id: string) : Promise<ISong> {
    const cachedSongs = JSON.parse(cache.getItem('songs'))
    if (cachedSongs) {
      const cachedResults = cachedSongs.filter(s => s._id === _id)
      if (cachedResults && cachedResults.length > 0) {
          return cachedResults[0]
      }
    }
    return await api.get(setParams(Endpoints.song, {_id}))
  }
}

const songService = new SongService()
export default songService

export interface ISongService {
  getAllSongs(stateHolder?: IState) : Promise<ISong[]>,
  getSong(_id: string) : Promise<ISong>
} 