export function getToken(login: string, password: string) {
 return new Promise((_, reject) => {
  var url = process.env.NEXT_PUBLIC_API_HOST + '/users/token/';

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);

  xhr.setRequestHeader('accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
    let token = JSON.parse(xhr.responseText).access_token;
    if (token) _(token);
    else reject('error');
   }
  };

  var data = `grant_type=&username=${login}&password=${password}&scope=&client_id=&client_secret=`;

  xhr.send(data);
 });
}
