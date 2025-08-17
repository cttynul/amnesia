// Listener per l'installazione dell'estensione.
chrome.runtime.onInstalled.addListener(() => {
  console.log("Estensione 'Amnesia' installata.");
  
  // Imposto le opzioni di default.
  // 'alwaysDeleteHistory' è attiva.
  // 'alwaysDeleteOnNewTab' è disattivata.
  // 'alwaysDeleteDownloads' è attiva.
  chrome.storage.sync.set({
    alwaysDeleteHistory: true,
    alwaysDeleteOnNewTab: false,
    alwaysDeleteDownloads: true
  });
  
  // Apro il popup dopo l'installazione.
  chrome.windows.create({
    url: "popup.html",
    type: "popup",
    width: 350,
    height: 700
  });
});

// Listener per l'avvio del browser.
chrome.runtime.onStartup.addListener(() => {
  console.log("Il browser è stato avviato.");
  
  chrome.storage.sync.get(['alwaysDeleteHistory', 'alwaysDeleteDownloads'], (result) => {
    // Cancella la cronologia di navigazione all'avvio solo se l'opzione è attiva.
    const alwaysDeleteHistory = result.alwaysDeleteHistory ?? true;
    if (alwaysDeleteHistory) {
      chrome.history.deleteAll(() => {
        console.log("Cronologia di navigazione eliminata all'avvio del browser.");
      });
    }
    
    // Cancella la cronologia dei download all'avvio solo se l'opzione è attiva.
    const alwaysDeleteDownloads = result.alwaysDeleteDownloads ?? true; 
    if (alwaysDeleteDownloads) {
      chrome.downloads.deleteAll(() => {
        console.log("Cronologia dei download eliminata all'avvio del browser.");
      });
    }
  });
});

// Aggiunge un "listener" per quando una nuova scheda è stata caricata completamente.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get(['alwaysDeleteOnNewTab'], (result) => {
      // Imposto il valore a 'false' se non è stato ancora salvato.
      const alwaysDeleteOnNewTab = result.alwaysDeleteOnNewTab ?? false; 

      if (alwaysDeleteOnNewTab) {
        chrome.history.deleteAll(() => {
          console.log("Cronologia di navigazione eliminata dopo il caricamento di una nuova scheda.");
        });
      }
    });
  }
});