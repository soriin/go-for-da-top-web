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

  static get is() { return 'gfdt-active-tournaments'; }

  static get actions() {
    return {
      updateActiveTournaments(tournaments) {
        return {
          tournaments,
          type: 'updateActiveTournaments'
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