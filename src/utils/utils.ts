import { IMatch, IUser, IPlayer } from './../states/appState';

const getOpponent = function getOpponentFunc(match: IMatch, user: IUser) : IPlayer {
  const someUserId = user._id
  const opponent = match.players.filter((p) => {
    return p.user._id !== someUserId
  })[0]
  return opponent
}

export default {
  getOpponent
}