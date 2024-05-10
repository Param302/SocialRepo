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


console.log("CHROME extension!");
// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     console.log("Message received from content script!");
//     console.log(msg);
//     console.log(sender);
//     console.log(sendResponse);
//     if (msg.message === "hello!") {
//         console.log("Hello from index script!");
//     }
// });
// chrome.runtime.sendMessage({ message: "hello!" }, (response) => {
//     console.log("Response received from background script!");
//     console.log(response);
// });

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("Reached Index.js");
        if (request) {
            console.log(request);
            console.log(request.message === "hello!");
            if (request.message === "hello!") {
                const list = document.getElementById("inputList");
                const inputs = Array.from(request.inputs);
                console.log("INPUTS", inputs);
                request.inputs.forEach((input) => {
                    console.log(input);
                    const li = document.createElement("li");
                    li.innerHTML = input;
                    list.appendChild(li);
                });
                sendResponse({ message: "DONE!" });
            } else {
                console.log("Did not receive the response!!!")
            }
        }
    });