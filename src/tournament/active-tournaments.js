class ActiveTournaments extends ReduxMixin(Polymer.Element) {
  constructor() {
    super()
    this.tournamentSvc = new TournamentService()
    this.refreshTournaments()
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
        this.dispatch('updateTournament', data)
      }
    } catch (e) {
      console.error('error joining tournaments', e)
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
      updateTournament(tournament) {
        return {
          tournament,
          type: 'updateTournament'
        }
      }
    }
  }

  static get properties() {
    return {
      activeTournaments: {
        type: Array,
        statePath: 'tournaments.active'
      }
    }
  }
}
window.customElements.define(ActiveTournaments.is, ActiveTournaments);