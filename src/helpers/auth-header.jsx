
export function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  const headers = {};

  if (user && user.data.token) {
      headers['Authorization'] = 'Bearer ' + user.data.token;
  }


  return headers;
}
  