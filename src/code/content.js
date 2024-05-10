console.log("CONTENT script");

function getInputElements() {
    let arr = [];
    let inputs = [...document.getElementsByTagName("input"), ...document.getElementsByTagName("textarea")];
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "text" || inputs[i].tagName == "TEXTAREA") {
            arr.push(
                {
                    placeholder: inputs[i].placeholder,
                    value: inputs[i].value,
                }
            );
        }
    }
    return arr;
}

console.log(getInputElements());
[...document.getElementsByTagName("input"), ...document.getElementsByTagName("textarea")].forEach((input) => {
    input.oninput = () => {
    // input.addEventListener("input", () => {
        console.log("Input changed!");
        sendAndReceiveMessage().then((message) => {
            if (message) {
                console.log("Message: ", message, input.value);
                input.value = message;
            }
        }).catch((error) => {
            console.log("Error: ", error);
        });
    // });
    };
});

function sendAndReceiveMessage() {
    return new Promise((resolve, reject) => {
        let url = "";
        chrome.runtime.sendMessage({
            message: "input changed",
            inputs: getInputElements(),
        }, (response) => {
            console.log("Response from index script: ", response);
            try {
                if (response.url) {
                    url = response.url;
                    console.log("URL: ", url);
                }
                resolve(url);
            } catch (error) {
                console.log("Error: ", error);
                reject(error);
            }
        });
    });
}

// chrome.runtime.sendMessage({
//     message: "hello!",
//     inputs: getInputElements(),
// }, (response) => {
//     console.log("Response from index script: ", response);
// });