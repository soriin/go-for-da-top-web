// Load the custom app ES6 modules

import FaceookService from 'src/common/services/facebook';
import UserService from 'src/common/services/user.svc';
import HttpInterceptor from 'src/common/services/httpRequestInterceptor';

export default angular
  .module("common", [])

  .service("FacebookService", FaceookService)
  .service("UserService", UserService)
  .factory("HttpInterceptor", HttpInterceptor);