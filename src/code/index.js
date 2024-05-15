console.log("Social Repo opened!");

const infoBtn = document.getElementById("info-btn");
const editBtn = document.getElementById("edit-btn");
const home = document.getElementById("home");
const info = document.getElementById("info");
const edit = document.getElementById("edit");


// ============== Header ==============


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

// ============== Utility Functions ==============


function getSocialLinks() {
    const socialLinks = {};

    fetch("../social-links.json")
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

            return socialLinks;
        })
        .catch(error => {
            console.error("Error reading social links file:", error);
            return {};
        });

    return socialLinks;
}

const socialLinks = getSocialLinks();


// ============== Edit ==============
function previewLink(button) {
    const parentElement = button.parentNode;
    const inputElement = parentElement.querySelector("input");
    const inputValue = inputElement.value;
    console.log("Placeholder value:", inputElement.placeholder);
    console.log("Input value:", inputValue);
    // Rest of the code...
}


// ============== Random Placeholder Generation ==============
const placeholderTexts = [
    "Paste your Social Handle here",
    "https://social.media/your_username",
    "Ctrl + V your social media profile",
    "Enter your profile link here",
    "Share your social media URL",
    "Drop your handle here",
    "Provide your social media profile",
    "Link to your social media",
    "Type your username",
    "Insert your social link",
    "Enter your profile address",
    "Submit your social profile URL",
    "Add your social media handle",
    "Copy and paste your profile URL",
    "Insert your social media handle",
    "Link your profile here",
    "Add your social media link",
    "Enter your social profile",
    "Paste your profile URL here",
    "Share your handle",
    "Input your social media URL",
    "Type in your profile link",
    "Provide your social profile address",
    "Paste your link here",
    "Enter the URL to your profile",
    "Drop your profile address",
    "Share your social handle link",
    "Input your handle",
    "Add your social URL",
];

// Function to generate a random placeholder text
function randomTextGenerator(placeholderTexts) {
    const randomIndex = Math.floor(Math.random() * placeholderTexts.length);
    return placeholderTexts[randomIndex];
}