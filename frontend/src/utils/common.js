export function getUserInfo() {
  try {
    return JSON.parse(localStorage.getItem('user')) ?? {};
  } catch (e) {
    return {};
  }
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
