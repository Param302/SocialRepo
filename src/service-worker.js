console.log("Background script!");

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("Reached background.js");
        if (request) {
            console.log(request);
            if (request.message === "input changed") {
                const inputs = Array.from(request.inputs);
                console.log("INPUTS", inputs);
                request.inputs.forEach((input) => {
                    if (input.value[0] === "\\") {
                        console.log("Found a backslash");
                        switch (input.value) {
                            case "\\twitter":
                                console.log("Found twitter");
                                sendResponse({ message: "Twitter found!", url: "https://twitter.com/Param3021" });
                                break;
                            case "\\github":
                                console.log("Found GitHub");
                                sendResponse({ message: "GitHub found!", url: "https://github.com/Param302" });
                                break;
                            case "\\linkedin":
                                console.log("Found LinkedIn");
                                sendResponse({ message: "LinkedIn found!", url: "https://www.linkedin.com/in/param302/" });
                                break;
                            case "\\email":
                                console.log("Found email");
                                sendResponse({ message: "Email found!", url: "connectwithparam.30@gmail.com" });
                                break;
                            case "\\socialrepo":
                                console.log("Found socialrepo");
                                sendResponse({ message: "Email found!", url: "Nope! It's SocialRepo 😉" });
                                break;
                            default:
                                console.log("Invalid input");
                                break;
                        }
                    }
                });
                sendResponse({ message: "DONE!" });
            } else {
                console.log("Did not receive the response!!!")
            }
        }
    });