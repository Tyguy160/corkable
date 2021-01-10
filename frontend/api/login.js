export default function login(data) {
  return fetch('http://localhost:4000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
