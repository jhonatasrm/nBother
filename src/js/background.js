var value = true;

function startnBother() {
  if(value == true){
    browser.browserSettings.webNotificationsDisabled.set({value: false});
    browser.browserAction.setIcon({path: "../res/icons/nBother_unabled-32.png"});
    browser.browserAction.setTitle({title: browser.i18n.getMessage("extensionDisabled")});
    value = false;
  }else{
    browser.browserSettings.webNotificationsDisabled.set({value: true});
    browser.browserAction.setIcon({path: "../res/icons/nBother_enabled-32.png"});
    browser.browserAction.setTitle({title: browser.i18n.getMessage("extensionEnabled")});
    value = true;
  }
}

browser.browserAction.onClicked.addListener(startnBother);
