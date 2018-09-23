const fetch = require('node-fetch')
const { Headers } = fetch

let cookie = null;

const query = (path, ops) => {
  console.log(ops);
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

exports.signup = (username, password) => {
  return query('signup', {
	method: 'POST',
	body: { "username": username, "password": password },
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
