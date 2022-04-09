export default function getLiftsList() {
 let token = localStorage.getItem('access_token');

 return new Promise((_, _err) => {
  fetch(process.env.NEXT_PUBLIC_API_HOST + '/elevators/', {
   method: 'GET',
   headers: { accept: 'application/json', Authorization: 'Bearer ' + token },
  })
   .then((e) => e.json())
   .then((r) => {
    let newList = r.map((k: any) => {
     return {
      title: k.title,
      address: k.address,
      id: k.uuid,
      model: k.model,
      MAC: k.mac_address,
      service: { ...k.owner, ...{ name: k.owner.company } },
     };
    });
    _(newList);
   })
   .catch(() => _err('F'));
 });
}
