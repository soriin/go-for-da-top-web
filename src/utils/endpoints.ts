export enum Endpoints {
  getCurrentUser = '/users/me',
  getUserData = '/users/{id}',
  getMyMatchups = '/matchups',
  getActiveTournaments = '/tournaments',
  getTournamentStandings = '/tournaments/{id}/standings'
}

export function setParams(endpoint: Endpoints, params: any) {
  let hydratedEndpoint: string = endpoint
  Object.keys(params).forEach(key => {
    hydratedEndpoint = hydratedEndpoint.replace(`{${key}}`, params[key])
  })
  return hydratedEndpoint
}