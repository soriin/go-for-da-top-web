class Tournaments extends ReduxMixin(Polymer.Element) {
  constructor() {
    super()
    this.tournamentSvc = new TournamentService()
    this.refreshTournaments()
  }

  canJoin(tournament, userId) {
    return !tournament.entrants.includes(userId) && !tournament.isActive
  }

  canLeave(tournament, userId) {
    return tournament.entrants.includes(userId) && !tournament.isActive
  }

  canActivate(tournament, userId) {
    return tournament.organizers.includes(userId) && !tournament.isActive
  }

  async refreshTournaments() {
    try {
      const response = await this.tournamentSvc.getAll()
      if (response.ok) {
        const data = await response.json()
        this.dispatch('updateTournaments', data)
        this.tournamentsToDisplay = data
      }
    } catch (e) {
      console.error('error updating tournaments', e)
    }
  }

  setFilter(ev) {
    this.dispatch('changeTournamentFilter', ev.target.dataset.filter)
  }

  tournamentListChanged() {
    switch (this.tournamentFilter) {
      case 'mine':
        return this.tournaments.filter((t) => t.entrants.includes(this.user._id))
      case 'all':
      default:
        return this.tournaments
    }
  }

  async join(ev) {
    try {
      const tournamentId = ev.target.dataset.tournamentId
      const response = await this.tournamentSvc.join(tournamentId)
      if (response.ok) {
        const data = await response.json()
        this.dispatch('addEntrant', data.tournamentId, data.userId)
      }
    } catch (e) {
      console.error('error joining tournaments', e)
    }
  }

  async activate(ev) {
    try {
      const tournamentId = ev.target.dataset.tournamentId
      const response = await this.tournamentSvc.activate(tournamentId)
      if (response.ok) {
        const data = await response.json()
        this.dispatch('updateTournament', data)
      }
    } catch (e) {
      console.error('error activating tournaments', e)
    }
  }

  async leave(ev) {
    try {
      const tournamentId = ev.target.dataset.tournamentId
      const response = await this.tournamentSvc.leave(tournamentId)
      if (response.ok) {
        const data = await response.json()
        this.dispatch('removeEntrant', data.tournamentId, data.userId)
      }
    } catch (e) {
      console.error('error leaving tournaments', e)
    }
  }

  static get is() { return 'gfdt-tournaments'; }

  static get actions() {
    return {
      updateTournaments(tournaments) {
        return {
          tournaments,
          type: 'updateTournaments'
        }
      },
      updateTournament(tournament) {
        return {
          tournament,
          type: 'updateTournament'
        }
      },
      addEntrant(tournamentId, userId) {
        return {
          tournamentId,
          userId,
          type: 'addEntrant'
        }
      },
      removeEntrant(tournamentId, userId) {
        return {
          tournamentId,
          userId,
          type: 'removeEntrant'
        }
      },
      changeTournamentFilter(filter) {
        return {
          filter,
          type: 'changeTournamentFilter'
        }
      }
    }
  }

  static get properties() {
    return {
      tournaments: {
        type: Array,
        statePath: 'tournaments'
      },
      tournamentsToDisplay: {
        type: Array,
        computed: 'tournamentListChanged(tournaments.*, tournamentFilter)'
      },
      user: {
        type: Object,
        statePath: 'user'
      },
      tournamentFilter: {
        type: String,
        statePath: 'tournamentFilter'
      }
    }
  }
}
window.customElements.define(Tournaments.is, Tournaments);