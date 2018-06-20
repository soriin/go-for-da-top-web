let apiBase: string

const authToken = ''

if (window.location.hostname === 'local.goforda.top') {
  apiBase = 'local.goforda.top:3000'
}

export {apiBase, authToken}