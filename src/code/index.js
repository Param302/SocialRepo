console.log("Social Repo opened!");

document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.getElementById("edit-button");
  const editPanel = document.getElementById("edit");
  const copyIcons = document.querySelectorAll(".copy-icon");
  const inputField = document.querySelector(".social-media-info input");
  const list = document.getElementById("social-media-list");
  const dragItems = Array.from(document.querySelectorAll(".draggable-item"));

  // Front Panel
  const socialIcons = document.querySelectorAll(".social-icon");

  // toast message
  const toast = document.createElement("section");
  toast.classList.add("toast");
  document.body.appendChild(toast);

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

  copyIcons.forEach((el) => {
    el.addEventListener("click", () => {
      if (inputField) {
        navigator.clipboard
          .writeText(inputField.value)
          .then(() => {
            showToast("Link copied to clipboard!");
          })
          .catch((err) => {
            console.error("Could not copy text: ", err);
          });
      }
    });
  });

  // Toast message
  function showToast(message) {
    let toastTimer;
    toast.innerText = message;
    toast.classList.add("show");

    if (!toastTimer) {
      toastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 2000); /* Show the toast for 2 seconds */
    }
  }

  // DRAG AND DROP
  let draggedItem = null;
  let dropTarget = null;

  // Add event listeners to each draggable item
  dragItems.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("dragenter", handleDragEnter);
    item.addEventListener("dragleave", handleDragLeave);
    item.addEventListener("drop", handleDrop);
    item.addEventListener("dragend", handleDragEnd);
  });

  function handleDragStart(e) {
    draggedItem = e.target.closest(".draggable-item");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", ""); // Required to enable dragging
  }

  function handleDragOver(e) {
    e.preventDefault(); // Allow dropping
  }

  function handleDragEnter(e) {
    e.preventDefault(); // Allow drop and add visual cues

    const newDropTarget = e.target.closest(".draggable-item");
    if (newDropTarget && newDropTarget !== draggedItem) {
      if (dropTarget) {
        dropTarget.classList.remove("drag-over-top", "drag-over-bottom");
      }

      const dropPosition = determineDropPosition(e, newDropTarget);
      newDropTarget.classList.add(
        dropPosition === "top" ? "drag-over-top" : "drag-over-bottom"
      );
      dropTarget = newDropTarget;
    }
  }

  function handleDragLeave(e) {
    const item = e.target.closest(".draggable-item");
    if (item && item === dropTarget) {
      dropTarget.classList.remove("drag-over-top", "drag-over-bottom");
    }
  }

  function handleDrop(e) {
    e.preventDefault(); // Prevent default drop behavior

    const dropPosition = determineDropPosition(e, dropTarget);
    if (dropTarget && dropTarget !== draggedItem) {
      if (dropPosition === "top") {
        list.insertBefore(draggedItem, dropTarget);
      } else {
        list.insertBefore(draggedItem, dropTarget.nextSibling);
      }
    }

    // Clean up visual cues after dropping
    if (dropTarget) {
      dropTarget.classList.remove("drag-over-top", "drag-over-bottom");
      dropTarget = null;
    }
  }

  function handleDragEnd(e) {
    // Clear dragging item and visual cues
    if (draggedItem) {
      draggedItem.classList.remove("dragging");
      draggedItem = null;
    }
  }

  function determineDropPosition(event, dropTarget) {
    const rect = dropTarget.getBoundingClientRect();
    const middleY = rect.top + rect.height / 2;
    return event.clientY < middleY ? "top" : "bottom"; // Determine insert position
  }

  // =========== FRONT PANEL ==============
  // Event handler for click on social icons
  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", handleMouseEnter);
    icon.addEventListener("mouseleave", handleMouseLeave);
  });

  // Front Panel ==> social icon mouse enter
  function handleMouseEnter(event) {
    const icon = event.target;
    const existingCopyIcon = icon.querySelector(".copy-icon");

    if (!existingCopyIcon) {
      const copyIcon = document.createElement("img");
      copyIcon.src = "../assets/logos/copy-icon.png"; // Path to your copy icon
      copyIcon.alt = "Copy Icon";
      copyIcon.classList.add("copy-icon");
      copyIcon.style.opacity = 1;

      icon.appendChild(copyIcon); // Add the copy icon to the DOM
      icon.style.backgroundColor = "rgba(0, 0, 0, 0.2)";

      copyIcon.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevents bubbling to parent events
        const link = icon.getAttribute("data-link");

        if (link) {
          navigator.clipboard
            .writeText(link)
            .then(() => {
              console.log("Link copied to clipboard");
              showToast("Link copied to clipboard");
            })
            .catch((err) => {
              console.error("Error copying link:", err);
            });
        }
      });
    }
  }

  // Front Panel ==> social icon mouse leave
  function handleMouseLeave(event) {
    const icon = event.target;
    const copyIcon = icon.querySelector(".copy-icon");

    if (copyIcon) {
      icon.style.backgroundColor = "";
      icon.removeChild(copyIcon); // Remove the copy icon from the DOM when hovering out
    }
  }
});
