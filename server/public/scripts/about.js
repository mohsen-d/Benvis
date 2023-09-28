async function updateInfo() {
  const aboutForm = document.querySelector("form");

  const data = Object.fromEntries(new FormData(aboutForm));

  const btn = document.getElementById("updateBtn");

  btn.setAttribute("value", "UPDATING...");
  btn.setAttribute("disabled", "true");

  const response = await fetch(`/admin/about`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  window.location.href = response.ok
    ? "/admin/posts/?from=about"
    : "/admin/posts/?error=about";
}
