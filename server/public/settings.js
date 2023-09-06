async function updateSettings() {
  const title = document.getElementById("siteTitle").value;
  const description = document.getElementById("siteDesc").value;
  const footer = document.getElementById("siteFooter").value;

  const data = { title, description, footer };

  const btn = document.getElementById("updateBtn");

  btn.setAttribute("value", "UPDATING...");
  btn.setAttribute("disabled", "true");

  const response = await fetch(`http://localhost:3000/admin/settings`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log("settings updated successfully");

    btn.setAttribute("value", "UPDATE");
    btn.removeAttribute("disabled");
  } else console.log(response.data.error);
}
