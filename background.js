chrome.runtime.onInstalled.addListener(() => {
  console.log("Estensione installata");
  // Aspetta qualche secondo prima di eliminare la cronologia
  setTimeout(() => {
    chrome.history.deleteAll(() => {
      console.log("Cronologia di navigazione eliminata al momento dell'installazione.");
    });
  }, 2000); // 2000 millisecondi = 2 secondi
});

chrome.runtime.onStartup.addListener(() => {   
  setTimeout(() => {
    chrome.history.deleteAll(() => {
      console.log("Cronologia di navigazione eliminata al boot.");
    });
  }, 2000); // 2000 millisecondi = 2 secondi
});

/*
chrome.storage.sync.get(['alwaysDelete'], (result) => {
  const alwaysDelete = result.alwaysDelete ?? false; // Valore di default: false

  if (alwaysDelete) {
    // Cancella sempre la cronologia
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete') {
        chrome.history.deleteAll();
      }
    });
  } else {
    // Cancella solo all'avvio
    chrome.runtime.onStartup.addListener(() => {
      chrome.history.deleteAll();
    });
  }
});
*/