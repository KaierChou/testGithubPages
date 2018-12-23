export function saveStorage(key, val) {
  let str = JSON.stringify(val)
  sessionStorage.setItem(key, str)
}

export function getStorageItem(key) {
  let str = sessionStorage.getItem(key) ? sessionStorage.getItem(key) : ''
  return str ? JSON.parse(str) : ''
}

export function cleanStorage() {
  sessionStorage.clear()
}
