export enum Endpoints {
  getCurrentUser = '/users/me',
  getMyMatchups = '/matchups',
  getActiveTournaments = '/tournaments',
  getTournamentStandings = '/tournaments/{id}/standings'
}

export function setParams(endpoint: Endpoints, params: any) {
  let hydratedEndpoint: string = endpoint
  params.keys.forEach(key => {
    hydratedEndpoint = hydratedEndpoint.replace(`{${key}}`, params[key])
  })
  return hydratedEndpoint
}