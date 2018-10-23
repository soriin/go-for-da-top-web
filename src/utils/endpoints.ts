export enum Endpoints {
  currentUser = '/users/me',
  userData = '/users/{_id}',
  matchups = '/matchups',
  matchupSongSelection = '/matchups/{_id}/songselection',
  tournaments = '/tournaments',
  tournamentStandings = '/tournaments/{_id}/standings',
  tournamentJoin = '/tournaments/{_id}/entrant',
  songs = '/songs',
  song = '/songs/{_id}',
}

export function setParams(endpoint: Endpoints, params: any) {
  let hydratedEndpoint: string = endpoint
  Object.keys(params).forEach(key => {
    hydratedEndpoint = hydratedEndpoint.replace(`{${key}}`, params[key])
  })
  return hydratedEndpoint
}