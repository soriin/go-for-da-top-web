class LoginViewController  {

  /**
   * Constructor
   *
   * @param $window
   */
  constructor($window, $cookies) {
    this.$window = $window;
    this.$cookies = $cookies;

    this.isLoggedIn = !!localStorage.getItem('user');
    
    if (this.isLoggedIn) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  login() {
    this.$window.location = 'http://local.goforda.top:3000/login/facebook';
  }

  logout() {
    // this.User
    //   .logout()
    //   .$promise
    //   .then(() => {
        this.$cookies.remove('gfdt_access_token_id');
        this.$cookies.remove('gfdt_access_token_userid');
        this.$cookies.remove('gfdt_access_token_user');
        this.isLoggedIn = false;
    // });
  }

}
export default LoginViewController;

