document.addEventListener('DOMContentLoaded', () => {
  const historyCheckbox = document.getElementById('alwaysDeleteHistory');
  const downloadsCheckbox = document.getElementById('alwaysDeleteDownloads');
  const onNewTabCheckbox = document.getElementById('alwaysDeleteOnNewTab');
  const languageSelector = document.getElementById('language-select');
  const saveButton = document.getElementById('save-button');
  const manualDeleteButton = document.getElementById('manual-delete-button');

  // Recupera i valori salvati e imposta lo stato iniziale
  chrome.storage.sync.get(['alwaysDeleteHistory', 'alwaysDeleteDownloads', 'alwaysDeleteOnNewTab', 'language'], (data) => {
    const alwaysDeleteHistory = data.alwaysDeleteHistory ?? true;
    const alwaysDeleteDownloads = data.alwaysDeleteDownloads ?? true;
    const alwaysDeleteOnNewTab = data.alwaysDeleteOnNewTab ?? false;
    
    historyCheckbox.checked = alwaysDeleteHistory;
    downloadsCheckbox.checked = alwaysDeleteDownloads;
    onNewTabCheckbox.checked = alwaysDeleteOnNewTab;
    
    const language = data.language || 'en';
    languageSelector.value = language;
    updateLanguage(language);
  });
  
  // Aggiunge il listener per il pulsante "Salva"
  saveButton.addEventListener('click', () => {
    const alwaysDeleteHistory = historyCheckbox.checked;
    const alwaysDeleteDownloads = downloadsCheckbox.checked;
    const alwaysDeleteOnNewTab = onNewTabCheckbox.checked;
    const selectedLanguage = languageSelector.value;

    chrome.storage.sync.set({
      alwaysDeleteHistory: alwaysDeleteHistory,
      alwaysDeleteDownloads: alwaysDeleteDownloads,
      alwaysDeleteOnNewTab: alwaysDeleteOnNewTab,
      language: selectedLanguage
    }, () => {
      console.log('Impostazioni salvate con successo!');
    });
  });

  // Aggiunge il listener per il pulsante di cancellazione manuale
  manualDeleteButton.addEventListener('click', () => {
    // Cancella sia la cronologia di navigazione che quella dei download
    chrome.history.deleteAll(() => {
      console.log("Cronologia di navigazione eliminata manualmente.");
    });
    chrome.downloads.deleteAll(() => {
      alert("All history deleted!");
      console.log("Cronologia dei download eliminata manualmente.");
    });
  });

  // Listener per la selezione della lingua
  languageSelector.addEventListener('change', () => {
    const selectedLanguage = languageSelector.value;
    updateLanguage(selectedLanguage);
  });
  
  // Funzione per aggiornare il testo dell'HTML in base alla lingua
  function updateLanguage(lang) {
    const translations = {
      en: {
        title: "Amnesia",
        tagline: "An extension that protects your privacy.",
        dynamicText: "deleting your browser history",
        manualDeleteButtonText: "Delete all history now",
        settingsTitle: "Settings:",
        historyLabel: "Delete browsing history",
        downloadsLabel: "Delete downloads history",
        onNewTabLabel: "Delete on new tab",
        saveButtonText: "Save Settings",
        info1: "The most secure extension in the world cause I developed it by myself!",
        info2: "For you by cttynul",
        githubLink: "View on GitHub"
      },
      it: {
        title: "Amnesia",
        tagline: "Un'estensione che protegge la tua privacy.",
        dynamicText: "eliminazione della cronologia del browser",
        manualDeleteButtonText: "Cancella tutta la cronologia ora",
        settingsTitle: "Impostazioni:",
        historyLabel: "Cancella cronologia navigazione",
        downloadsLabel: "Cancella cronologia dei download",
        onNewTabLabel: "Cancella ad ogni nuova scheda",
        saveButtonText: "Salva Impostazioni",
        info1: "L'estensione più sicura dello spazio visto che me la sono sviluppata da solo!",
        info2: "Per te da cttynul",
        githubLink: "Vedi su GitHub"
      }
    };
    
    document.querySelector('h2').textContent = translations[lang].title;
    document.getElementById('tagline').textContent = translations[lang].tagline;
    document.getElementById('dynamic-text').textContent = translations[lang].dynamicText;
    document.getElementById('manual-delete-button').textContent = translations[lang].manualDeleteButtonText;
    document.querySelector('.settings-section h4').textContent = translations[lang].settingsTitle;
    document.querySelector('label[for="alwaysDeleteHistory"]').textContent = translations[lang].historyLabel;
    document.querySelector('label[for="alwaysDeleteDownloads"]').textContent = translations[lang].downloadsLabel;
    document.querySelector('label[for="alwaysDeleteOnNewTab"]').textContent = translations[lang].onNewTabLabel;
    document.getElementById('save-button').textContent = translations[lang].saveButtonText;
    document.querySelector('.developer-info p:first-of-type').textContent = translations[lang].info1;
    document.querySelector('.developer-info p:nth-of-type(2)').textContent = translations[lang].info2;
    document.querySelector('.developer-info a').textContent = translations[lang].githubLink;
  }
});