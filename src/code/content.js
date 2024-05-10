console.log("CONTENT script");

function getInputElements() {
    let arr = [];
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        arr.push(
            {
                placeholder: inputs[i].placeholder,
                value: inputs[i].value,
            }
        );
    }
    return arr;
}

console.log(getInputElements());
[...document.getElementsByTagName("input")].forEach((input) => {
    input.addEventListener("input", () => {
        console.log("Input changed!");
        chrome.runtime.sendMessage({
            message: "input changed",
            inputs: getInputElements(),
        }, (response) => {
            console.log("Response from index script: ", response);
        });
    });
});

// chrome.runtime.sendMessage({
//     message: "hello!",
//     inputs: getInputElements(),
// }, (response) => {
//     console.log("Response from index script: ", response);
// });