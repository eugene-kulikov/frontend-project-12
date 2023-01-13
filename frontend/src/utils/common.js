export default function getUserInfo() {
  try {
    return JSON.parse(localStorage.getItem('user')) ?? {};
  } catch (e) {
    return {};
  }
}
