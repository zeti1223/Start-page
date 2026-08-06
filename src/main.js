import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const API_URL = 'https://api.nasa.gov/planetary/apod';

// Default settings
const defaultSettings = {
  searchEngine: 'google',
  shortcuts: [
    { name: 'YouTube', url: 'https://www.youtube.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Reddit', url: 'https://www.reddit.com' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com' },
    { name: 'Twitch', url: 'https://www.twitch.tv' },
    { name: 'Spotify', url: 'https://www.spotify.com' }
  ]
};

// Search engine configurations
const searchEngines = {
  google: {
    url: 'https://www.google.com/search',
    paramName: 'q',
    placeholder: 'Search Google...'
  },
  bing: {
    url: 'https://www.bing.com/search',
    paramName: 'q',
    placeholder: 'Search Bing...'
  },
  github: {
    url: 'https://github.com/search',
    paramName: 'q',
    placeholder: 'Search GitHub...'
  }
};

// Load settings from localStorage
function loadSettings() {
  const saved = localStorage.getItem('startPageSettings');
  return saved ? JSON.parse(saved) : defaultSettings;
}

// Save settings to localStorage
function saveSettings(settings) {
  localStorage.setItem('startPageSettings', JSON.stringify(settings));
}

// Initialize the app
function initApp() {
  const settings = loadSettings();
  
  // Add loading class to body
  document.body.classList.add('loading');
  
  // Apply search engine setting
  applySearchEngine(settings.searchEngine);
  
  // Apply shortcuts
  renderShortcuts(settings.shortcuts);
  
  // Setup settings modal
  setupSettingsModal(settings);
  
  // Fetch APOD
  fetchAPOD();
  
  // Start clock
  updateClock();
  setInterval(updateClock, 1000);
  
  // Set random accent color for clock
  setRandomAccentColor();
}

// Apply search engine to search form
function applySearchEngine(engine) {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  
  const config = searchEngines[engine] || searchEngines.google;
  searchForm.action = config.url;
  searchInput.name = config.paramName;
  searchInput.placeholder = config.placeholder;
}

// Render shortcuts from settings
function renderShortcuts(shortcuts) {
  const shortcutsContainer = document.getElementById('shortcuts');
  shortcutsContainer.innerHTML = '';
  
  shortcuts.forEach(shortcut => {
    const shortcutElement = document.createElement('a');
    shortcutElement.href = shortcut.url;
    shortcutElement.className = 'shortcut';
    shortcutElement.target = '_blank';
    
    // Get favicon from Google's favicon service
    const domain = new URL(shortcut.url).hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    
    shortcutElement.innerHTML = `
      <span class="shortcut-icon"><img src="${faviconUrl}" alt="${shortcut.name}" onerror="this.src='https://www.google.com/s2/favicons?domain=${domain}'"></span>
      <span class="shortcut-name">${shortcut.name}</span>
    `;
    
    shortcutsContainer.appendChild(shortcutElement);
  });
}

// Setup settings modal functionality
function setupSettingsModal(settings) {
  const settingsButton = document.getElementById('settings-button');
  const settingsModal = document.getElementById('settings-modal');
  const closeSettings = document.getElementById('close-settings');
  const saveSettingsBtn = document.getElementById('save-settings');
  const addShortcutBtn = document.getElementById('add-shortcut');
  const shortcutsList = document.getElementById('shortcuts-list');
  
  // Open settings modal
  settingsButton.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
    const currentSettings = loadSettings();
    loadSettingsIntoModal(currentSettings);
  });
  
  // Close settings modal
  closeSettings.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
  });
  
  // Close on outside click
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
      settingsModal.classList.add('hidden');
    }
  });
  
  // Save settings
  saveSettingsBtn.addEventListener('click', () => {
    const newSettings = getSettingsFromModal();
    saveSettings(newSettings);
    
    // Apply changes
    applySearchEngine(newSettings.searchEngine);
    renderShortcuts(newSettings.shortcuts);
    
    // Close modal
    settingsModal.classList.add('hidden');
  });
  
  // Add new shortcut
  addShortcutBtn.addEventListener('click', () => {
    addShortcutItem();
  });
}

// Load current settings into modal
function loadSettingsIntoModal(settings) {
  // Set search engine
  const searchEngineRadios = document.querySelectorAll('input[name="search-engine"]');
  searchEngineRadios.forEach(radio => {
    radio.checked = radio.value === settings.searchEngine;
  });
  
  // Load shortcuts
  const shortcutsList = document.getElementById('shortcuts-list');
  shortcutsList.innerHTML = '';
  
  settings.shortcuts.forEach(shortcut => {
    addShortcutItem(shortcut.name, shortcut.url);
  });
}

// Get settings from modal
function getSettingsFromModal() {
  // Get selected search engine
  const searchEngine = document.querySelector('input[name="search-engine"]:checked').value;
  
  // Get shortcuts
  const shortcutItems = document.querySelectorAll('.shortcut-item');
  const shortcuts = [];
  
  shortcutItems.forEach(item => {
    const name = item.querySelector('.shortcut-name').value;
    const url = item.querySelector('.shortcut-url').value;
    
    if (name && url) {
      shortcuts.push({ name, url });
    }
  });
  
  return { searchEngine, shortcuts };
}

// Add shortcut item to modal
function addShortcutItem(name = '', url = '') {
  const shortcutsList = document.getElementById('shortcuts-list');
  
  const shortcutItem = document.createElement('div');
  shortcutItem.className = 'shortcut-item';
  
  shortcutItem.innerHTML = `
    <input type="text" class="shortcut-name" placeholder="Name" value="${name}">
    <input type="text" class="shortcut-url" placeholder="URL" value="${url}">
    <button class="remove-shortcut">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Remove button functionality
  shortcutItem.querySelector('.remove-shortcut').addEventListener('click', () => {
    shortcutItem.remove();
  });
  
  shortcutsList.appendChild(shortcutItem);
}

// Update clock
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  clock.textContent = `${hours}:${minutes}`;
}

// Set random accent color for clock
function setRandomAccentColor() {
  const accentColors = [
    { main: 'var(--accent-purple)', bg: 'rgba(105, 101, 219, 0.15)' },
    { main: 'var(--accent-teal)', bg: 'rgba(18, 184, 134, 0.15)' },
    { main: 'var(--accent-orange)', bg: 'rgba(255, 146, 43, 0.15)' },
    { main: 'var(--accent-pink)', bg: 'rgba(240, 101, 149, 0.15)' }
  ];
  const randomColor = accentColors[Math.floor(Math.random() * accentColors.length)];
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    clockElement.style.color = randomColor.main;
    clockElement.style.borderColor = randomColor.main;
    clockElement.style.backgroundColor = randomColor.bg;
  }
}

async function fetchAPOD() {
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const infoPanel = document.getElementById('info-panel');
  const backgroundImage = document.getElementById('background-image');
  
  try {
    const response = await fetch(`${API_URL}?api_key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from NASA API');
    }
    
    const data = await response.json();
    
    // Update the DOM with the fetched data
    document.getElementById('title').textContent = data.title;
    document.getElementById('explanation').textContent = data.explanation;
    
    if (data.copyright) {
      document.getElementById('copyright').textContent = `© ${data.copyright}`;
    } else {
      document.getElementById('copyright').textContent = '';
    }
    
    // Set background image
    backgroundImage.style.backgroundImage = `url(${data.url})`;
    
    // Show content, hide loading
    loading.classList.add('hidden');
    document.body.classList.remove('loading');
    error.classList.add('hidden');
    infoPanel.classList.remove('hidden');
    
  } catch (err) {
    console.error('Error fetching APOD:', err);
    loading.classList.add('hidden');
    document.body.classList.remove('loading');
    infoPanel.classList.add('hidden');
    error.classList.remove('hidden');
    error.textContent = 'Failed to load today\'s astronomy picture. Please check your API key and try again.';
  }
}

// Initialize the app
initApp();
