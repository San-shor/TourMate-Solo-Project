const BASE_URL = "http://localhost:4000";

const apiServiceJWT = {};

apiServiceJWT.register = (user) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiServiceJWT.login = (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.headers.get("content-type").startsWith("application/json")) {
        return res.json();
      } else {
        return res.text(); // Assuming the JWT is returned as a string
      }
    })
    .catch((err) => console.log(err));
};

apiServiceJWT.profile = (accessToken) => {
  return fetch(`${BASE_URL}/profile`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiServiceJWT.logout = (tokenName) => {
  localStorage.removeItem(tokenName);
};

export default apiServiceJWT;
