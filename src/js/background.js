var value = true;
var isMobile;
var myStorage = window.localStorage;
var iconLocalOff = "../res/icons/nBother_enabled_off-32.png";
var iconLocal = "../res/icons/nBother_enabled-32.png";

browser.browserSettings.webNotificationsDisabled.set({value: true});
browser.tabs.onUpdated.addListener(verifyPage);

window.onload = function() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i)){
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
    browser.browserAction.setIcon({path: "../res/icons/nBother_disabled-32.png"});
    browser.tabs.reload();
    if(isMobile == false){
        browser.browserAction.setTitle({title: browser.i18n.getMessage("extensionDisabled")});
    }
    value = false;
    iconLocalOff = "../res/icons/nBother_disabled_off-32.png";
    iconLocal = "../res/icons/nBother_disabled-32.png";
  }else{
    browser.browserSettings.webNotificationsDisabled.set({value: true});
    browser.browserAction.setIcon({path: "../res/icons/nBother_enabled-32.png"});
    browser.tabs.reload();
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
