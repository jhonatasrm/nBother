var value = true;
var isMobile;
browser.browserSettings.webNotificationsDisabled.set({value: true});
var iconLocal = "../res/icons/nBother_enabled-32.png";
var iconLocalOff = "../res/icons/nBother_enabled_off-32.png";

window.onload = function() {
    if (/Android/i.test(navigator.userAgent)) {
        isMobile = true;
    }else{
        browser.browserAction.onClicked.addListener(startnBother);
        browser.tabs.onUpdated.addListener(verifyPage);
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

// start about.html
function handleInstalled(details) {
    browser.tabs.create({
    url: "../html/about.html"
    });
}
browser.runtime.onInstalled.addListener(handleInstalled);