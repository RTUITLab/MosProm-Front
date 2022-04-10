export default function updateElevator(elevator: string, obj: any) {
 let token = localStorage.getItem('access_token');

 return new Promise((_, _err) => {
  var url = process.env.NEXT_PUBLIC_API_HOST + '/elevator/' + elevator;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);

  xhr.setRequestHeader('accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
    let token = JSON.parse(xhr.responseText).access_token;
    if (token) _(token);
    else _err('error');
   }
  };

  var data = `title=${obj.title}&model=${obj.model}&address=${obj.address}&owner_id=${obj.service.id}`;

  xhr.send(data);
 });
}
