// Load the custom app ES6 modules

import FaceookService from 'src/common/services/facebook';

export default angular
  .module("common", [])

  .service("FacebookService", FaceookService);