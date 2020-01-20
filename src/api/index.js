import axios from 'axios';

let http = axios.create({
  baseURL: 'api/project',
  withCredentials: false,
  headers:{
    'Content-Type':'application/json; charset=UFT-8'
   },
  transformRequest: [function (data) {
    console.log()
    let newData = {};
    // for (let k in data) {
    //   if (data.hasOwnProperty(k) === true) {
    //     newData += (k) + '=' + (data[k]);
    //   }
    // }
    newData = data
    return JSON.stringify(newData);

  }]
});
//设置跨域访问

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
