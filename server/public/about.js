async function updateInfo() {
  const aboutForm = document.querySelector("form");

  const data = Object.fromEntries(new FormData(aboutForm));

  const btn = document.getElementById("updateBtn");

  btn.setAttribute("value", "UPDATING...");
  btn.setAttribute("disabled", "true");

  const response = await fetch(`http://localhost:3000/admin/about`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log("about info updated successfully");

    btn.setAttribute("value", "UPDATE");
    btn.removeAttribute("disabled");
  } else console.log(response.data.error);
}
