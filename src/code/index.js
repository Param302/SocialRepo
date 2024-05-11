console.log("Social Repo opened!");

const infoBtn = document.getElementById("info-btn");
const editBtn = document.getElementById("edit-btn");
const home = document.getElementById("home");
const info = document.getElementById("info");
const edit = document.getElementById("edit");

infoBtn.addEventListener("click", () => {
    console.log("Info button clicked!");
    if (info.classList.contains("hidden")) {
        info.classList.remove("hidden");
        home.classList.add("hidden");
        edit.classList.add("hidden");
    } else {
        info.classList.add("hidden");
        home.classList.remove("hidden");
        edit.classList.add("hidden");
    }
});

editBtn.addEventListener("click", () => {
    console.log("Edit button clicked!");
    if (edit.classList.contains("hidden")) {
        edit.classList.remove("hidden");
        home.classList.add("hidden");
        info.classList.add("hidden");
    } else {
        edit.classList.add("hidden");
        home.classList.remove("hidden");
        info.classList.add("hidden");
    }
});

const showBtn = document.getElementById("table-btn");
const table = document.getElementsByTagName("table")[0];

showBtn.addEventListener("click", () => {
    if (table.classList.contains("hidden")) {
        showBtn.innerHTML = "Hide";
        table.classList.remove("hidden");
    } else {
        showBtn.innerHTML = "Show";
        table.classList.add("hidden");
    }
});

function readSocialLinks() {
    const socialLinks = {};

    return fetch("../social-links.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch social links");
            }
            return response.json();
        })
        .then(jsonData => {
            Object.keys(jsonData).slice(1).forEach(key => {
                socialLinks[key] = jsonData[key];
            });

            console.log(socialLinks);
            return socialLinks;
        })
        .catch(error => {
            console.error("Error reading social links file:", error);
            return {};
        });
}