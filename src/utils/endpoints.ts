export enum Endpoints {
  currentUser = '/users/me',
  userData = '/users/{_id}',
  matchups = '/matchups',
  matchupSubmission = '/matchups/{_id}/submission',
  matchupSongSelection = '/matchups/{_id}/songselection',
  tournaments = '/tournaments',
  tournamentStandings = '/tournaments/{_id}/standings',
  tournamentEntrant = '/tournaments/{_id}/entrant',
  tournamentVerifiableMatchups = '/tournaments/{_id}/verifiableMatchups',
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