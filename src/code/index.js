console.log("Social Repo opened!");

document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.getElementById("edit-button");
  const editPanel = document.getElementById("edit");

  editButton.addEventListener("click", function () {
    const isHidden = editPanel.classList.contains("hidden");

    if (isHidden) {
      editPanel.classList.remove("hidden");
      editButton.classList.add("active");
    } else {
      editPanel.classList.add("hidden");
      editButton.classList.remove("active");
    }
  });
});
