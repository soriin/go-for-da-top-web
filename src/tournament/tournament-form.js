class TournamentForm extends ReduxMixin(Polymer.Element) {
  constructor() {
    super()
    this.tournamentSvc = new TournamentService()
  }

  toastMe(message) {
    document.dispatchEvent(new CustomEvent('paper-snackbar-notify', {
      bubbles: true,
      composed: true,
      detail: {
        message: message
      }
    }));
  }

  async formSubmit() {
    try {
      const form = this.$.tournamentForm;
      const formValues = form.serializeForm()
      const payloadData = {
        title: formValues.title,
        startDate: formValues.startDate,
        endDate: formValues.endDate,
      }
      const response = await this.tournamentSvc.create(payloadData)
      if (response.ok) {
        this.toastMe('Tournament successfully created')
      } else {
        this.toastMe('Tournament creation failed')
      }
    } catch (e) {
      console.error(e)
      this.toastMe('Tournament creation failed horribly')
    }
  }

  static get is() { return 'gfdt-tournament-form'; }
  static get actions() {
    return {
      updateTournament(tournament) {

      }
    }
  }
  static get properties() {
    return {
      currentTournament: {
        type: Object,
        statePath: 'currentTournament'
      }
    }
  }
}

window.customElements.define(TournamentForm.is, TournamentForm);