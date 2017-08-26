/**
 * User Service
 *
 */
function UserService($q, $http) {
  
  function getCurrentUser() {
      return $http.get('http://local.goforda.top:3000/user/me', {
        method: 'GET'
      });    
  }

  // Promise-based API
  return {
    getCurrentUser: getCurrentUser
  };
}

export default ['$q', '$http', UserService];

