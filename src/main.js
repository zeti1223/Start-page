import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const API_URL = 'https://api.nasa.gov/planetary/apod';

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
fetchAPOD();
