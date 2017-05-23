// Load the custom app ES6 modules

import LoginView from 'src/login/components/login/LoginView';

// Define the Angular 'users' module

export default angular
  .module("login", ['ngMaterial'])

  .component(LoginView.name, LoginView.config);