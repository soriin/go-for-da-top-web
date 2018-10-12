export function getItem(key: string) : any {
  if (!key) return
  let val = sessionStorage.getItem(key)
  if (val) {
    return JSON.parse(val)
  }
}

export function setItem(key: string, item: any) {
  if (!key) return
  sessionStorage.setItem(key, JSON.stringify(item))
}

export function reset() {
  sessionStorage.clear()
}