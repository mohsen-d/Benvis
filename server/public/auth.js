async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = { username, password };

  const btn = document.getElementById("login");

  btn.setAttribute("value", "SENDING...");
  btn.setAttribute("disabled", "true");

  const response = await fetch(`http://localhost:3000/auth/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) window.location.href = "/admin/posts";
  else console.log(response.data.error);
}

async function logout(e) {
  e.preventDefault();

  const res = await fetch("/auth/logout", {
    method: "post",
  });

  if (res.ok) window.location.href = "/auth/login";
}
