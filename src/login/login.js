class Login extends ReduxMixin(Polymer.Element) {
  constructor() {
    super()
    this.config = new Config()
  }
  static get is() { return 'gfdt-login'; }
  loginUser() {
    window.location = `${this.config.rootUrl}login/facebook`
  }
  logoutUser() {
    Cookies.remove('gfdt_access_token_id');
    Cookies.remove('gfdt_access_token_userid');
    Cookies.remove('gfdt_access_token_user');
    this.dispatch('changeUser', null)
    window.location = '/'
  }
  static get actions() {
    return {
      changeUser(user) {
        return {
          type: 'changeUser',
          user: user
        }
      }
    }
  }
  static get properties() {
    return {
      user: {
        type: Object,
        statePath: 'user'
      }
    }
  }
}
window.customElements.define(Login.is, Login);