export default function addLift(mac) {
 let token = localStorage.getItem('access_token');

 return new Promise((_, _err) => {
  fetch(process.env.NEXT_PUBLIC_API_HOST + '/users/elevators/' + mac, {
   method: 'POST',
   headers: { accept: 'application/json', Authorization: 'Bearer ' + token },
  })
   .then((r) => {
    _('');
   })
   .catch(() => _(''));
 });
}
