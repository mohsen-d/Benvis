async function updateSettings() {
  const title = document.getElementById("siteTitle").value;
  const description = document.getElementById("siteDesc").value;
  const footer = document.getElementById("siteFooter").value;
  const landingPage = document.getElementById("landingPage").checked;

  const data = { title, description, footer, landingPage };

  const btn = document.getElementById("updateBtn");

  btn.setAttribute("value", "UPDATING...");
  btn.setAttribute("disabled", "true");

  const response = await fetch(`/admin/settings`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  window.location.href = response.ok
    ? "/admin/posts/?from=settings"
    : "/admin/posts/?error=settings";
}
