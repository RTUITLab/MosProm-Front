export default function getLiftsList(all: boolean = true) {
 let token = localStorage.getItem('access_token');

 return new Promise((_, _err) => {
  fetch(
   process.env.NEXT_PUBLIC_API_HOST +
    '/elevators/' +
    (!all ? `?owner_uuid=${parseJwt(token).user.uuid}` : ''),
   {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: 'Bearer ' + token },
   }
  )
   .then((e) => e.json())
   .then((r) => {
    let newList = r.map((k: any) => {
     return {
      title: k.title,
      address: k.address,
      id: k.uuid,
      model: k.model,
      MAC: k.mac_address,
      service: k.owner ? { ...k.owner, ...{ name: k.owner.company } } : null,
     };
    });
    _(newList);
   })
   .catch((e) => _err(e));
 });
}

export function parseJwt(token: any) {
 try {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
   atob(base64)
    .split('')
    .map(function (c) {
     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    })
    .join('')
  );

  return JSON.parse(jsonPayload);
 } catch (e) {
  return null;
 }
}
