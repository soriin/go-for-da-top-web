// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-resource';
import 'angular-cookies';

import AppController from 'src/AppController';
import Login from 'src/login/Login';
import Common from 'src/common/common';
import Users from 'src/users/users';

export default angular.module( 'starter-app', [ 
  'ngMaterial',
  Common.name,
  Login.name,
  Users.name,
  'ngResource',
  'ngCookies'
  ] )
    .config(($mdIconProvider, $mdThemingProvider) => {
      // Register the user `avatar` icons
      $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu", "./assets/svg/menu.svg", 24)
        .icon("share", "./assets/svg/share.svg", 24);

      $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('red');
    })
    .config(['$httpProvider', ($httpProvider) => {
      $httpProvider.interceptors.push('HttpInterceptor');
    }])
    .run(($rootScope, $cookies, UserService) => {
      const tokenId = $cookies.get('gfdt_access_token_id');
      const tokenUserId = $cookies.get('gfdt_access_token_userid');
      const tokenUser = $cookies.get('gfdt_access_token_user');

      console.info('access token', tokenId);

      if (!tokenId || !tokenUserId || !tokenUser) {
        localStorage.clear('user');
        return;
      }

      // TODO: Save user on server?

      UserService
        .getCurrentUser()
        .then((user) => {
          console.info('logged in as', user.data);
          localStorage.setItem('user', JSON.stringify(user.data));
        })
        .catch(() => {
          console.error('unable to login');
          localStorage.clear('user');
        });
    })
    .controller('AppController', AppController);
