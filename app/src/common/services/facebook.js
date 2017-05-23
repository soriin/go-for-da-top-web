/**
 * Facebook DataService
 * Abstracts facebook api calls
 *
 * @returns {{checkLogin: Function}}
 * @constructor
 */
function FacebookService($q) {
  
  function checkLogin() {
    return $q((resolve, reject) => {
      FB.getLoginStatus(function(response) {
        resolve(response);
      });
    });
    
  }

  // Promise-based API
  return {
    checkLogin: checkLogin
  };
}

export default ['$q', FacebookService];

