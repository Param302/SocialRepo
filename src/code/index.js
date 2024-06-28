'use strict';
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
                createSocialLink(key, jsonData[key]);
            });
            return socialLinks;
        })
        .catch(error => {
            console.error("Error reading social links file:", error);
            return {};
        });
    return socialLinks;
};
const socialLinks = getSocialLinks();


// ============== Home ==============
function showCopyMessage(key) {
    console.log(`Copied ${key} to clipboard!`);
    const copyConfirm = document.getElementById('copyConfirm');
    const copyText = copyConfirm.querySelector('.copy-text');
    copyText.textContent = `✅${key} profile copied.`;
    copyConfirm.style.display = 'flex';

    setTimeout(() => {
        copyConfirm.style.display = 'none';
    }, 3000);
};

function createImage(key) {
    const img = document.createElement("img");
    img.classList.add("social-logo");
    img.alt = key;
    img.src = `../assets/logos/${key}.png`;
    return img;
}

const socialLinksContainer = document.getElementById("socialLinks");
function createSocialLink(key, value) {
    const li = document.createElement("li");
    // Here this will be a div which will come over the top of the icon and it will show the name of the app 
    const div = document.createElement("div")
    const img = createImage(key);
    div.classList.add('div-hover-effect')
    //^ making the string short if it overflows (based upon its length)
    if (key.length>8){
        div.textContent = `${key.substr(0,8)+"..."}`
    }else{
        div.textContent = key
    }
    li.addEventListener("mouseenter",()=>{
        img.style.display = 'none'
        div.style.display = 'flex'
    })
    li.addEventListener('mouseleave',()=>{
        img.style.display = 'block'
        div.style.display = 'none'
    })
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
        button.addEventListener("click", openLink);
        button.dataset.listenerAdded = true;  // Mark the listener as added
    }

    function openLink() {
        // Use the latest input value stored in the data attribute
        const value = button.dataset.inputValue;
        window.open(value, "_blank");
    }
};

function isValidURL(url) {
    const urlPattern = /^(http:\/\/|https:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=]+$/;
    const mailtoPattern = /^(mailto:)?[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isUrl = urlPattern.test(url);
    const isMailto = mailtoPattern.test(url);

    return isUrl || isMailto;
}

function validateInput(input) {
    const previewButton = input.parentNode.querySelector("button");
    if (isValidURL(input.value)) {
        input.style.borderBottomColor = "green";
        updateLinkPreview(input);
    } else {
        input.style.borderBottomColor = "red";
        previewButton.disabled = true;
    }
}

function removeIfEmpty(input) {
    const linkBox = input.parentNode.parentNode;
    const linkContainer = document.getElementById("links-container");
    if (input.value === "" && linkContainer.contains(linkBox) && document.getElementById(linkBox.id) !== null) {
        try {
            linkBox.remove();
        } catch (error) {
        }
    }
}

function getSocialName(url) {
    for (const key in socialLinks) {
        const value = socialLinks[key].replace("<username>", "");
        const valueUrl = new URL(value)
        const host = valueUrl.hostname.replace("www.", "");
        if (url.includes(host)) {
            return { key, value };
        }
    }
    return null;
}

function setIcon(key, parentElement) {
    const iconElement = parentElement.querySelector('.icon');
    const logoPath = `../assets/logos/${key}.png`;
    // png file must have the same name as the key.
    const defaultLogoPath = '../assets/logos/default.png';

    fetch(logoPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Logo not found:`);
            }
            iconElement.src = logoPath;
        })
        .catch(() => {
            iconElement.src = defaultLogoPath;
        });
}

function UpdateLinkBox(button) {
    const parentElement = button.parentNode;
    const inputElement = parentElement.querySelector("input");
    const inputValue = inputElement.value;
    console.log("Placeholder value:", inputElement.placeholder);
    console.log("Input value:", inputValue);

    /*
    Fixes:
    - check if the input value is MAIL
    - If not MAIL
    - remove username from the input value
    - validate complete profile URL using value of destructured object
    */

    console.log(getSocialName(inputValue));
    if (isValidURL(inputValue)) {
        console.log("Valid URL!");
        const socialName = getSocialName(inputValue);
        if (!socialName) {
            button.disabled = true;
            setIcon(null, parentElement);
            return;
        }
        const { key, value } = socialName;
        console.log("Key found!:", key);
        setIcon(key, parentElement);
        button.disabled = false;
        //! It should done when the link is completed
        inputElement.style.borderBottomColor = "transparent";

    } else {
        console.log("No key found!");
        setIcon(null, parentElement);
        button.disabled = true;
    };
}

function updateAllLinkBox() {
    document.querySelectorAll("#edit #links-container input[type='text']").forEach(input => {
        input.addEventListener("input", () => {
            validateInput(input);
            const button = input.parentNode.querySelector("button");
            console.log("Input changed!");
            UpdateLinkBox(button);
            removeIfEmpty(input);
            console.log("Changed", input.placeholder);
        });
    });
}

// ============== Focus Handlers  ==============
function checkFocusOut(event, linkBox) {
    let otherLinkBox = event.relatedTarget;
    switch (otherLinkBox) {
        case null:
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
    };
    return otherLinkBox.id !== linkBox.id;
};

// ============== Add Link Box  ==============
const addLinkBtn = document.querySelector(".add-link-btn");
let idx = 0;
function addLinkBox() {
    const parentLinkBox = document.getElementById("links-container");
    let randomPlaceholder = getRandomPlaceholderText(placeholderTexts);

    const childBoxFormat = document.createElement('li');
    childBoxFormat.classList.add('link-box', 'column');
    childBoxFormat.setAttribute("draggable", true);
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
    })

    inputField.focus();
    inputField.addEventListener('focusout', (event) => {
        if (checkFocusOut(event, linkBox)) {
            console.log("Focus Out");
            removeIfEmpty(inputField);
        }
    });

    addDnDHandlers(linkBox);
    updateAllLinkBox();
};

addLinkBtn.addEventListener('click', () => {
    addLinkBox();
});

// ============== Drag & Drop ==============
var dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    this.classList.add('dragElem');
}
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    var top = this.getBoundingClientRect().top;
    var bottom = this.getBoundingClientRect().bottom;
    if (e.clientY < (top + bottom) / 2) {
        this.classList.add('over-before');
        this.classList.remove('over-after');
    }
    else {
        this.classList.add('over-after');
        this.classList.remove('over-before');
    }
}

function handleDragEnter(e) {

}

function handleDragLeave(e) {
    this.classList.remove('dragElem');
    this.classList.remove('over-before');
    this.classList.remove('over-after');
}

function handleDrop(e) {
    e.stopPropagation();
    if (dragSrcEl != this) {
        this.parentNode.removeChild(dragSrcEl);

        if (this.classList.contains('over-before')) {
            this.parentNode.insertBefore(dragSrcEl, this);
            addDnDHandlers(this.previousElementSibling);
        }
        else if (this.classList.contains('over-after')) {
            this.parentNode.insertBefore(dragSrcEl, this.nextSibling);
            addDnDHandlers(this.nextElementSibling);
        }
    } else {
        console.log("THISSSS", this);
        this.classList.remove('over');
    }
    dragSrcEl.classList.remove('dragElem');
    this.classList.remove('over');
    this.classList.remove('over-before');
    this.classList.remove('over-after');
}

function handleDragEnd(e) {
    this.classList.remove('over-before');
    this.classList.remove('over-after');
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false)
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);
}


// ============== Saving Links  ==============
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
    const links = Array.from(document.querySelectorAll(".link-box input"));
});