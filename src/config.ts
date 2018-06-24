let apiBase: string

const authToken = document.cookie.split(';').filter((item) => item.includes('gfdt_access_token_id='))

if (window.location.hostname === 'local.goforda.top') {
  apiBase = 'http://local.goforda.top:3000'
}

export {apiBase, authToken}