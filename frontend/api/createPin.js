import cookie from 'cookie';

export default function createPin(data, userId, boardId) {
  try {
    if (typeof window === 'undefined') {
      return null;
    }
    return fetch(`http://localhost:4000/user/${userId}/board/${boardId}/pin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: cookie.parse(document.cookie).token,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch (err) {
    console.log(err);
  }
}
