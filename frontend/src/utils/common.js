export function getUserInfo() {
  try {
    return JSON.parse(localStorage.getItem('user')) ?? {};
  } catch (e) {
    console.log('getUserInfo', e);
    return {};
  }
}

export function isEmptyObject(obj) {
  if (obj === null) return true;
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
