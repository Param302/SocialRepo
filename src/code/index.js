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
                createSocialLinks(key, jsonData[key]);
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

// ============== Home ==============
function showCopyMessage(key) {
    console.log(`Copied ${key} to clipboard!`);
    const copyConfirmation = document.getElementById('copyConfirmation');
    const copyText = copyConfirmation.querySelector('.copy-text');
    copyText.textContent = `✅${key} profile copied.`;
    copyConfirmation.style.display = 'flex';

    setTimeout(() => {
        copyConfirmation.style.display = 'none';
    }, 3000);
}

function createImage(key) {
    const img = document.createElement("img");
    img.classList.add("social-logo");
    img.alt = key;
    img.src = `../assets/logos/${key}.png`;
    return img;
}

const socialLinksContainer = document.getElementById("socialLinks");
function createSocialLinks(key, value) {
    const li = document.createElement("li");
    const img = createImage(key);
    img.onload = () => {
        li.appendChild(img);
        li.addEventListener("click", () => {
            navigator.clipboard.writeText(value); // Copy the value to clipboard
            showCopyMessage(key);
        });
        socialLinksContainer.appendChild(li);
    };
    img.onerror = () => {
        li.remove();
    };
    socialLinksContainer.appendChild(li);
}

// ============== Edit ==============
function previewLink(button, value) {
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
function getRandomPlaceholderText(placeholderTexts) {
    const randomIndex = Math.floor(Math.random() * placeholderTexts.length);
    return placeholderTexts[randomIndex];
}

// ============== Search ==============
const searchInput = document.querySelector('.search-input');
const linksContainer = document.getElementById('links-container');
const originalLinkBoxes = Array.from(document.querySelectorAll('.link-box'));

function searchLinks() {
    const searchText = searchInput.value.toLowerCase();
    console.log('searchLinks function called');
    console.log('Search text:', searchText);
    // Clear the links container
    linksContainer.innerHTML = '';
    // Filter and append the appropriate link boxes
    originalLinkBoxes.forEach(linkBox => {
        const linkText = linkBox.querySelector('input').value.toLowerCase();
        const iconAlt = linkBox.querySelector('.icon').alt.toLowerCase();
        console.log('Link text:', linkText);
        console.log('Icon alt:', iconAlt);
        if (searchText === '' || linkText.includes(searchText) || iconAlt.includes(searchText)) {
            console.log('Appending link box to container');
            // Append a cloned link box to avoid removing it from the original array
            linksContainer.appendChild(linkBox.cloneNode(true));
        } else {
            console.log('No match found, skipping link box');
        }
    });
}

searchInput.addEventListener('input', searchLinks);
console.log('Event listener attached to search input');

// ============== Link Validation ==============
function updateLinkPreview(input) {
    const button = input.parentNode.querySelector("button");
    const value = input.value;
    button.disabled = false;
    button.dataset.inputValue = value;
    // Add the event listener only once
    if (!button.dataset.listenerAdded) {
        button.addEventListener("click", openLinkInNewTab);
        button.dataset.listenerAdded = "true";
    }
}

function openLinkInNewTab() {
    const inputValue = this.dataset.inputValue;
    if (isValidUrl(inputValue)) {
        window.open(inputValue, "_blank");
    } else {
        alert("Invalid URL. Please enter a valid URL.");
    }
}

function isValidUrl(url) {
    const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(url);
}

// ============== Additional Code ==============
// Validate all input fields and set focus handlers
function validateAllInputs() {
    document.querySelectorAll("#edit #links-container input[type='text']").forEach(input => {
        input.addEventListener("input", () => {
            input.focus(); // Set focus on the input field
            updateLinkPreview(input); // Update the link preview with the new input
            removeIfEmpty(input);
            console.log("Changed", input.placeholder);
        });
    });
}

// Focus handlers
function checkFocusOut(event, linkBox) {
    let otherLinkBox = event.relatedTarget;
    switch (true) {
        case otherLinkBox === null:
            otherLinkBox = "";
            break;
        case otherLinkBox.classList.contains("link-box"):
            break;
        case otherLinkBox.classList.contains("dragger"):
            otherLinkBox = otherLinkBox.parentNode;
            break;
        case otherLinkBox.classList.contains("link"):
            otherLinkBox = otherLinkBox.parentNode;
            break;
        case otherLinkBox.classList.contains("icon"):
            otherLinkBox = otherLinkBox.parentNode.parentNode;
            break;
        case otherLinkBox.classList.contains("input"):
            otherLinkBox = otherLinkBox.parentNode.parentNode;
            break;
        case otherLinkBox.classList.contains("preview"):
            otherLinkBox = otherLinkBox.parentNode.parentNode;
            break;
        case otherLinkBox.classList.contains("share"):
            otherLinkBox = otherLinkBox.parentNode.parentNode.parentNode;
            break;
        default:
            otherLinkBox = "";
            break;
    }
    return otherLinkBox.id !== linkBox.id;
}

// Add new link box
const addLinkBtn = document.querySelector(".add-link-btn");
let idx = 0;
function addLinkBox() {
    const parentLinkBox = document.getElementById("links-container");
    let randomPlaceholder = getRandomPlaceholderText(placeholderTexts);

    const childBoxFormat = document.createElement('li');
    childBoxFormat.classList.add('link-box');
    childBoxFormat.id = `link-box-${idx}`;

    const draggerImg = document.createElement('img');
    draggerImg.src = '../assets/logos/drag.png';
    draggerImg.alt = 'dragger';
    draggerImg.classList.add('dragger');
    draggerImg.tabIndex = 1;
    childBoxFormat.appendChild(draggerImg);

    const linkDiv = document.createElement('div');
    linkDiv.classList.add('link');
    linkDiv.tabIndex = 2;

    const iconImg = document.createElement('img');
    iconImg.src = '../assets/logos/default.png';
    iconImg.alt = 'linkedin';
    iconImg.classList.add('icon');
    iconImg.tabIndex = 3;
    linkDiv.appendChild(iconImg);

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = randomPlaceholder;
    inputField.classList.add('input');
    inputField.tabIndex = 4;
    linkDiv.appendChild(inputField);

    const previewBtn = document.createElement('button');
    previewBtn.classList.add('preview');
    previewBtn.disabled = true;
    previewBtn.tabIndex = 5;
    linkDiv.appendChild(previewBtn);

    const shareImg = document.createElement('img');
    shareImg.src = '../assets/logos/share.png';
    shareImg.alt = 'preview link';
    shareImg.classList.add('share');
    shareImg.tabIndex = 6;

    previewBtn.appendChild(shareImg);
    childBoxFormat.appendChild(linkDiv);
    parentLinkBox.insertBefore(childBoxFormat, parentLinkBox.firstChild);
    idx += 1;

    const linkBox = inputField.parentNode.parentNode;

    linkBox.addEventListener('focusin', () => {
        linkDiv.style.backgroundColor = "#eeeeee";
    });
    linkBox.addEventListener('focusout', () => {
        linkDiv.style.backgroundColor = "#d0beff";
    });

    inputField.focus();
    inputField.addEventListener('focusout', (event) => {
        if (checkFocusOut(event, linkBox)) {
            console.log("Focus Out");
            removeIfEmpty(inputField);
        }
    });

    validateAllInputs();
}

addLinkBtn.addEventListener('click', () => {
    addLinkBox();
});

// Remove empty link boxes
function removeIfEmpty(input) {
    const linkBox = input.parentNode.parentNode;
    const linkContainer = document.getElementById("links-container");
    if (input.value === "" && linkContainer.contains(linkBox) && document.getElementById(linkBox.id) !== null) {
        try {
            linkBox.remove();
        } catch (error) {
            console.error("Error removing empty link box:", error);
        }
    }
}

// Initial call to validate inputs
validateAllInputs();
