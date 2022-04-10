export default function addLift(mac) {
 let token = localStorage.getItem('access_token');

 return new Promise((_, _err) => {
  fetch(process.env.NEXT_PUBLIC_API_HOST + '/users/elevators/'+mac, {
   method: 'POST',
   headers: { accept: 'application/json', Authorization: 'Bearer ' + token },
  })
   .then((e) => e.json())
   .then((r) => {
    let newLift = {
      title: r.title,
      address: r.address,
      id: r.uuid,
      model: r.model,
      MAC: r.mac_address,
      service: { ...r.owner, ...{ name: r.owner.company } },
     };
    _(newLift);
   })
   .catch(() => _err('F'));
 });
}
