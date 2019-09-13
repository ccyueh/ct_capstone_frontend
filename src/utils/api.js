export default async function callAPI(url, method, url_params, body) {
  let URL = 'https://sipper-psql.herokuapp.com/' + url;
  if (url_params) {
    URL += '?';
    let URL_list = [];
    Object.keys(url_params).map(k => URL_list.push(k + '=' + url_params[k]));
    URL += URL_list.join('&');
  }

  let response_json = {};
  response_json['method'] = method;
  response_json['headers'] = { 'Content-Type': 'application/json' };
  if (body) {
    response_json['body'] = JSON.stringify(body);
  }

  let response = await fetch(URL, response_json);
  let data = await response.json();
  if (data.success) {
    return data;
  } else if (data.error) {
    alert(`${data.error}`);
  } else {
    alert('Sorry, try again.');
  }
}
