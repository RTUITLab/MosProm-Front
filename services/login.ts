export function getToken(login: string, password: string) {
 return new Promise((_, reject) => {
  fetch(process.env.NEXT_PUBLIC_ANALYTICS_ID + '/users/token', {
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
