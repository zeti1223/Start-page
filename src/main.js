import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const API_URL = 'https://api.nasa.gov/planetary/apod';

// Default settings
const defaultSettings = {
  searchEngine: 'google',
  shortcuts: [
    { name: 'YouTube', url: 'https://www.youtube.com', icon: 'fab fa-youtube' },
    { name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' },
    { name: 'Reddit', url: 'https://www.reddit.com', icon: 'fab fa-reddit' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: 'fab fa-linkedin' },
    { name: 'Twitch', url: 'https://www.twitch.tv', icon: 'fab fa-twitch' },
    { name: 'Spotify', url: 'https://www.spotify.com', icon: 'fab fa-spotify' }
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
  perplexity: {
    url: 'https://www.perplexity.ai/search',
    paramName: 'q',
    placeholder: 'Search Perplexity...'
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
  
  // Apply search engine setting
  applySearchEngine(settings.searchEngine);
  
  // Apply shortcuts
  renderShortcuts(settings.shortcuts);
  
  // Setup settings modal
  setupSettingsModal(settings);
  
  // Fetch APOD
  fetchAPOD();
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
    
    shortcutElement.innerHTML = `
      <span class="shortcut-icon"><i class="${shortcut.icon}"></i></span>
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
    addShortcutItem(shortcut.name, shortcut.url, shortcut.icon);
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
    const icon = item.querySelector('.shortcut-icon-select').value;
    
    if (name && url) {
      shortcuts.push({ name, url, icon });
    }
  });
  
  return { searchEngine, shortcuts };
}

// Add shortcut item to modal
function addShortcutItem(name = '', url = '', icon = 'fas fa-link') {
  const shortcutsList = document.getElementById('shortcuts-list');
  
  const shortcutItem = document.createElement('div');
  shortcutItem.className = 'shortcut-item';
  
  shortcutItem.innerHTML = `
    <input type="text" class="shortcut-name" placeholder="Name" value="${name}">
    <select class="shortcut-icon-select">
      <option value="fas fa-link" ${icon === 'fas fa-link' ? 'selected' : ''}>Link</option>
      <option value="fab fa-youtube" ${icon === 'fab fa-youtube' ? 'selected' : ''}>YouTube</option>
      <option value="fab fa-github" ${icon === 'fab fa-github' ? 'selected' : ''}>GitHub</option>
      <option value="fab fa-reddit" ${icon === 'fab fa-reddit' ? 'selected' : ''}>Reddit</option>
      <option value="fab fa-linkedin" ${icon === 'fab fa-linkedin' ? 'selected' : ''}>LinkedIn</option>
      <option value="fab fa-twitch" ${icon === 'fab fa-twitch' ? 'selected' : ''}>Twitch</option>
      <option value="fab fa-spotify" ${icon === 'fab fa-spotify' ? 'selected' : ''}>Spotify</option>
      <option value="fab fa-twitter" ${icon === 'fab fa-twitter' ? 'selected' : ''}>Twitter</option>
      <option value="fab fa-instagram" ${icon === 'fab fa-instagram' ? 'selected' : ''}>Instagram</option>
      <option value="fab fa-facebook" ${icon === 'fab fa-facebook' ? 'selected' : ''}>Facebook</option>
      <option value="fab fa-discord" ${icon === 'fab fa-discord' ? 'selected' : ''}>Discord</option>
      <option value="fas fa-globe" ${icon === 'fas fa-globe' ? 'selected' : ''}>Globe</option>
      <option value="fas fa-envelope" ${icon === 'fas fa-envelope' ? 'selected' : ''}>Email</option>
      <option value="fas fa-shopping-cart" ${icon === 'fas fa-shopping-cart' ? 'selected' : ''}>Shop</option>
    </select>
    <button class="remove-shortcut">
      <i class="fas fa-times"></i>
    </button>
    <input type="text" class="shortcut-url" placeholder="URL" value="${url}">
  `;
  
  // Remove button functionality
  shortcutItem.querySelector('.remove-shortcut').addEventListener('click', () => {
    shortcutItem.remove();
  });
  
  shortcutsList.appendChild(shortcutItem);
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
    error.classList.add('hidden');
    infoPanel.classList.remove('hidden');
    
  } catch (err) {
    console.error('Error fetching APOD:', err);
    loading.classList.add('hidden');
    infoPanel.classList.add('hidden');
    error.classList.remove('hidden');
    error.textContent = 'Failed to load today\'s astronomy picture. Please check your API key and try again.';
  }
}

// Initialize the app
initApp();
