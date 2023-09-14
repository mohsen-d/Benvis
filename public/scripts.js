let editor;

function setupEditor() {
  editor = new Quill("#editor-container", {
    modules: {
      toolbar: "#toolbar-container",
    },
    theme: "snow",
  });

  var toolbar = editor.getModule("toolbar");
  toolbar.addHandler("image", showImageUI);

  function showImageUI() {
    const tooltip = editor.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;

    tooltip.save = function () {
      const range = editor.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        editor.insertEmbed(range.index, "image", value, "user");
      }
    };
    // Called on hide and save.
    tooltip.hide = function () {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
      tooltip.hide();
    };
    tooltip.edit("image");
    tooltip.textbox.placeholder = "Embed URL";
  }

  if (typeof content !== "undefined") {
    editor.setContents(content);
  }
}

async function updatePost() {
  const content = editor.getContents().ops;
  const text = editor.getText();
  const title = document.getElementById("title").value;

  const data = { content, text, title };

  const btn = document.getElementById("updateBtn");

  btn.setAttribute("value", "UPDATING...");
  btn.setAttribute("disabled", "true");

  const response = await fetch(`${window.location.pathname}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  window.location.href = response.ok
    ? "/admin/posts/?from=updatepost"
    : "/admin/posts/?error=updatepost";
}

async function addPost() {
  const content = editor.getContents().ops;
  const text = editor.getText();
  const title = document.getElementById("title").value;

  const data = { content, text, title };

  const btn = document.getElementById("addBtn");

  btn.setAttribute("value", "SENDING...");
  btn.setAttribute("disabled", "true");

  const response = await fetch(`/admin/posts`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  window.location.href = response.ok
    ? "/admin/posts/?from=newpost"
    : "/admin/posts/?error=newpost";
}

async function deletePost() {
  const btn = document.getElementById("deleteBtn");
  btn.setAttribute("value", "DELETING...");
  btn.setAttribute("disabled", "true");

  const response = await fetch(`${window.location.pathname}`, {
    method: "delete",
  });

  window.location.href = response.ok
    ? "/admin/posts/?from=deletepost"
    : "/admin/posts/?error=deletepost";
}
