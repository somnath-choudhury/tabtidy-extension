document.getElementById("collectBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "GET_TABS" }, (response) => {
    const ul = document.getElementById("tabList");
    ul.innerHTML = "";

    response.tabs.forEach((tab) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${tab.url}" target="_blank">${tab.title}</a>`;
      ul.appendChild(li);
    });
  });
});
