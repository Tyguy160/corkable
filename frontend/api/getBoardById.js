import cookie from 'cookie';

export default function getBoardById(userId, boardId) {
  try {
    if (typeof window === 'undefined') {
      return null;
    }
    return fetch(`http://localhost:4000/user/${userId}/board/${boardId}`, {
      headers: {
        token: cookie.parse(document.cookie).token,
      },
    }).then((res) => res.json());
  } catch (err) {
    console.log(err);
  }
}
