console.log("Background script!");

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     console.log("Done");
//     chrome.tabs.sendMessage(tabs[0].id, {
//         message: 'hello!',
//         url: tabs[0].url,
//         title: tabs[0].title,
//     })
//     console.log("Sent!");
// });

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log("Reached Background.js");
//         if (request) {
//             console.log(request);
//             console.log(sender);
//             if (request.message === "hello!") {
//                 console.log("Hello from background script!");
//                 sendResponse({ message: "Hello from background script!" });
//             }
//         }
//         else {
//             console.log("Did not receive the response!!!")
//         }
//     }
// );