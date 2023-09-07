function cancel() {
  switch (true) {
    case window.location.pathname.startsWith("/admin"):
      return (window.location.href = "/admin/posts");
    case window.location.pathname.startsWith("/auth"):
      return (window.location.href = "/posts");
    default:
      console.log(window.location);
  }
}
