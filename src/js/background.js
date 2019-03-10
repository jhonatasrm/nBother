var value = true;
var countBlock = 0;
var isMobile;
var myStorage = window.localStorage;
var count = document.getElementById('count');

browser.browserSettings.webNotificationsDisabled.set({value: true});
browser.tabs.onUpdated.addListener(verifyPage);
browser.tabs.onUpdated.addListener(verifyPageNotification);
browser.runtime.onInstalled.addListener(handleInstalled);

window.onload = function() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i)){
        browser.browserAction.onClicked.addListener(isMobileAbout);
        isMobile = true;
    }else{
        browser.browserAction.onClicked.addListener(startnBother);
        browser.browserAction.setIcon({path: "../res/icons/nBother_enabled-32.png"});
        browser.browserAction.setTitle({title: browser.i18n.getMessage("extensionEnabled")});
        if(value == true){
            browser.browserAction.setIcon({path: "../res/icons/nBother_enabled-32.png"});
        }else{
            browser.browserAction.setIcon({path: "../res/icons/nBother_enabled_off-32.png"});
        }
        isMobile = false;
    }
}

function startnBother() {
  if(value == true){
    browser.browserSettings.webNotificationsDisabled.set({value: false});
    browser.browserAction.setIcon({path: "../res/icons/nBother_unabled-32.png"});
    if(isMobile == false){
        browser.browserAction.setTitle({title: browser.i18n.getMessage("extensionDisabled")});
    }
    value = false;
    iconLocalOff = "../res/icons/nBother_unabled_off-32.png";
    iconLocal = "../res/icons/nBother_unabled-32.png";
  }else{
    browser.browserSettings.webNotificationsDisabled.set({value: true});
    browser.browserAction.setIcon({path: "../res/icons/nBother_enabled-32.png"});
    if(isMobile == false){
        browser.browserAction.setTitle({title: browser.i18n.getMessage("extensionEnabled")});
    }
    value = true;
    iconLocalOff = "../res/icons/nBother_enabled_off-32.png";
    iconLocal = "../res/icons/nBother_enabled-32.png";
  }
}

function verifyPage(){
    browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
      .then(tabs => browser.tabs.get(tabs[0].id))
      .then(tab => {
        if(tab.url == "about:preferences") {
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:config"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:addons"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:debugging"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:support"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:newtab"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:buildconfig"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:cache"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:checkerboard"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:crashes"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:credits"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:devtools"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:downloads"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:home"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:memory"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:mozilla"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:sessionrestore"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else if (tab.url == "about:plugins"){
            browser.browserAction.setIcon({path: iconLocalOff});
        }else{
            browser.browserAction.setIcon({path: iconLocal});
        }
    });
}

function verifyPageNotification(){
    navigator.permissions.query({name:'notifications'}).then(function(result) {
        if (result.state == 'prompt') {
            myStorage.setItem("countBlock", countBlock);
            count.textContent = myStorage.getItem("countBlock");
            countBlock = countBlock + 1;
        }
//   if(Notification.permission) {
//       console.log('Blocked: ', countBlock);
//       myStorage.setItem("countBlock", countBlock);
//       count.textContent = myStorage.getItem("countBlock");
//       countBlock = countBlock + 1;
//    }else{
//        count.textContent = countBlock;
//        console.log('Blocked: ', countBlock);
//    }
});
}

// start about.html
function handleInstalled() {
    browser.tabs.create({
    url: "../html/about.html"
    });
}

function isMobileAbout() {
    browser.tabs.create({
    url: "../html/preferences.html"
    });
}

count.textContent = myStorage.getItem("countBlock");

document.getElementById('clearCount').addEventListener('click', function(){
    countBlock = 0;
    myStorage.setItem("countBlock", countBlock);
    count.textContent = myStorage.getItem("countBlock");
}, false);

