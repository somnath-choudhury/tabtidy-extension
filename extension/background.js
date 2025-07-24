chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_TABS") {
    chrome.tabs.query({}, (tabs) => {
      const tabData = tabs.map((tab) => ({
        title: tab.title,
        url: tab.url,
        favIconUrl: tab.favIconUrl,
      }));

      sendResponse({ tabs: tabData });

      // Store in local storage (optional)
      chrome.storage.local.set({ savedTabs: tabData });
    });

    // Keep message channel open for async response
    return true;
  }
});
