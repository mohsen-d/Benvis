async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = { username, password };

  const btn = document.getElementById("login");

  btn.setAttribute("value", "SENDING...");
  btn.setAttribute("disabled", "true");

  const response = await fetch(`/auth/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) window.location.href = "/admin/posts";
  else {
    document.querySelector(".toast-body").innerHTML = (
      await response.json()
    ).error;
    displayError();
    btn.setAttribute("value", "LOGIN");
    btn.removeAttribute("disabled");
  }
}

async function logout(e) {
  e.preventDefault();

  const res = await fetch("/auth/logout", {
    method: "post",
  });

  if (res.ok) window.location.href = "/auth/login";
}

function displayError() {
  document.querySelector(".error-container").classList.remove("d-none");
  document.querySelector(".error").classList.add("show");
}
