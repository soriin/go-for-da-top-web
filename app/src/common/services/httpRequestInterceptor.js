function HttpRequestInterceptor($cookies) {
  return {
    request: function (config) {
      var token = $cookies.get('gfdt_access_token_id');
      config.headers['Authorization'] = `Bearer ${token}`
      return config;
    }
  };
}

export default ['$cookies', HttpRequestInterceptor];

