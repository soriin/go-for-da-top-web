class MyTournaments extends ReduxMixin(Polymer.Element) {
  constructor() {
    super()
    this.tournamentSvc = new TournamentService()
    this.refreshTournaments()
  }

  async refreshTournaments() {
    try {
      const response = await this.tournamentSvc.getAll()
      if (response.ok) {
        const data = await response.json()
        this.dispatch('updateTournaments', data)
      }
    } catch (e) {
      console.error('error updating tournaments', e)
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

  static get is() { return 'gfdt-my-tournaments'; }

  static get actions() {
    return {
      updateTournaments(tournaments) {
        return {
          tournaments,
          type: 'updateTournaments'
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
      myTournaments: {
        type: Array,
        statePath(state) {
          return state.tournaments.filter((t) => t.entrants.includes(state.user._id))
        }
      },
      user: {
        type: Object,
        statePath: 'user'
      }
    }
  }
}
window.customElements.define(MyTournaments.is, MyTournaments);