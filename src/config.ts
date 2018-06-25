let apiBase: string
let authToken: string

const authTokenCookie = document.cookie.split(';').filter((item) => item.includes('gfdt_access_token_id='))
if (authTokenCookie.length > 0) {
  authToken = authTokenCookie[0].split('=')[1]
}

if (window.location.hostname === 'local.goforda.top') {
  apiBase = 'http://local.goforda.top:3000'
}

export {apiBase, authToken}