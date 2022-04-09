export function getToken(login: string, password: string) {
 return new Promise((_, reject) => {
  fetch('http://192.168.137.207:8000' + '/users/token', {
   method: 'POST',
   body: JSON.stringify({ username: login, password }),
  })
   .then((e) => e.json())
   .then((result) => {
    _(result.access_token);
   })
   .catch((e) => {
    reject('Неправильный логин или пароль');
   });
 });
}
