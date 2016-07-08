
function genericOnClick(info, tab) {
    console.log("item " + info.menuItemId);
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));

    chrome.tabs.sendMessage(tab.id, {selectionText: info.selectionText}, function(response) {
        console.log(response);
    });
}

var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = context;
    var id = chrome.contextMenus.create({
        "title": title,
        "contexts": [context],
        "onclick": genericOnClick
    });
}
