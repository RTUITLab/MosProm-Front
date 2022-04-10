export default function deleteElevator(elevator: string) {
 let token = localStorage.getItem('access_token');

 return new Promise((_, _err) => {
  fetch(process.env.NEXT_PUBLIC_API_HOST + '/elevators/' + elevator, {
   method: 'DELETE',
   headers: { accept: 'application/json', Authorization: 'Bearer ' + token },
  })
   .then((r) => {
    _('');
   })
   .catch((e) => _err(e));
 });
}
