var editor = new Quill("#editor-container", {
  modules: {
    toolbar: "#toolbar-container",
  },
  theme: "snow",
});

async function updatePost() {
  const content = editor.getContents().ops[0].insert;
  const title = document.getElementById("title").value;

  const data = { content, title };

  const btn = document.getElementById("updateBtn");

  btn.setAttribute("value", "UPDATING...");
  btn.setAttribute("disabled", "true");

  await fetch(`http://localhost:3000${window.location.pathname}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  btn.setAttribute("value", "UPDATE");
  btn.removeAttribute("disabled");
}

async function addPost() {
  const content = editor.getContents().ops[0].insert;
  const title = document.getElementById("title").value;

  const data = { content, title };

  const btn = document.getElementById("addBtn");

  btn.setAttribute("value", "SENDING...");
  btn.setAttribute("disabled", "true");

  await fetch(`http://localhost:3000/admin/posts`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  window.location.href = "./";
}

async function deletePost() {
  const btn = document.getElementById("deleteBtn");
  btn.setAttribute("value", "DELETING...");
  btn.setAttribute("disabled", "true");

  await fetch(`http://localhost:3000${window.location.pathname}`, {
    method: "delete",
  });

  window.location.href = "./";
}

function cancel() {
  window.location.href = "./";
}
