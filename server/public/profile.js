async function changePassword() {
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    console.log("passwords do not match");
    return;
  }

  const data = { currentPassword, newPassword, confirmPassword };

  const btn = document.getElementById("changeBtn");

  btn.setAttribute("value", "CHANGING...");
  btn.setAttribute("disabled", "true");

  const response = await fetch(`http://localhost:3000/admin/profile/password`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log("password changed successfully");
    currentPassword.value = newPassword.value = confirmPassword.value = "";
    btn.setAttribute("value", "CHANGE");
    btn.removeAttribute("disabled");
  } else console.log(response.data.error);
}