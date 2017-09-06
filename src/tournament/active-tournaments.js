class ActiveTournaments extends ReduxMixin(Polymer.Element) {
  constructor() {
    super()
    this.tournamentSvc = new TournamentService()
    this.refreshTournaments()
  }

  amIJoined(tournament, userId) {
    return tournament.entrants.includes(userId)
  }

  async refreshTournaments() {
    try {
      const response = await this.tournamentSvc.getActive()
      if (response.ok) {
        const data = await response.json()
        this.dispatch('updateActiveTournaments', data)
      }
    } catch (e) {
      console.error('error updating tournaments', e)
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

  static get is() { return 'gfdt-active-tournaments'; }

  static get actions() {
    return {
      updateActiveTournaments(tournaments) {
        return {
          tournaments,
          type: 'updateActiveTournaments'
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
      }
    }
  }

  static get properties() {
    return {
      activeTournaments: {
        type: Array,
        statePath: 'tournaments'
      },
      user: {
        type: Object,
        statePath: 'user'
      }
    }
  }
}
window.customElements.define(ActiveTournaments.is, ActiveTournaments);