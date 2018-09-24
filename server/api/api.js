const fetch = require('node-fetch')
const { Headers } = fetch

let cookie = null;

const query = (path, ops) => {
	return fetch(`http://localhost:4000/${path}`, {
		method: ops.method,
	  body: JSON.stringify(ops.body),
		headers: new Headers({
		Accept: 'application/json',
		'Content-Type': 'application/json',
		 }),
	}).then(async (r) => {
		return {
        data : await r.json(),
        status : r.status
    };
	}).catch(error => error)
}

exports.post = (url, accountDetails) => {
  return query(url, {
         	method: 'POST',
	        body: {...accountDetails},
  })
}

exports.get = (url, projection=null)=>{
  let queryParams = url, count = 1;
  if(projection && Object.keys(projection).length>0){
     for(key in projection){
         if(count==1)
            queryParams += `?${key}=${projection[key]}`;
         else
            queryParams += `&${key}=${projection[key]}`
         ++count;
     }
  }
  return query(queryParams, { method: 'GET' });
}

exports.put = ()=>{
    return query('books', {
         method : "GET"
    })
}

exports.login = (username, password) => query('/login', {
	method: 'POST',
	body: { username, password },
})
exports.logout = () => query('/logout', {
	method: 'POST'
})
exports.getProfile = () => query('/profile', {
	method: 'GET'
})
