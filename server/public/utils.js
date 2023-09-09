function cancel() {
  switch (true) {
    case window.location.pathname.startsWith("/admin"):
      return (window.location.href = "/admin/posts");
    case window.location.pathname.startsWith("/auth"):
      return (window.location.href = "/posts");
  }
}

function displayMessage() {
  if (!document.querySelector(".message-container")) {
    return;
  }

  if (performance.navigation.type == 0) {
    document.querySelector(".message-container").classList.remove("d-none");
    document.querySelector(".message").classList.add("show");
  }
}

function displayError() {
  if (!document.querySelector(".error-container")) {
    return;
  }

  if (performance.navigation.type == 0) {
    document.querySelector(".error-container").classList.remove("d-none");
    document.querySelector(".error").classList.add("show");
  }
}
