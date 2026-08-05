# NASA Astronomy Picture of the Day Start Page

A beautiful, space-themed start page that displays NASA's Astronomy Picture of the Day (APOD) with real-time data fetched from NASA's public API.

![Space Theme](https://img.shields.io/badge/theme-space--dark-purple-blue)
![API](https://img.shields.io/badge/API-NASA_APOD-blue)
![Framework](https://img.shields.io/badge/framework-Vite-green)

## Features

- **Daily Cosmic Updates**: Automatically fetches and displays NASA's Astronomy Picture of the Day
- **Beautiful Space Theme**: Custom dark gradient background with cosmic aesthetics
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time API Integration**: Live data from NASA's APOD API
- **Smooth Animations**: Hover effects and transitions for enhanced user experience
- **Safe API Key Management**: Environment variables for secure API key storage

## Live Demo

Check out the deployed site: [NASA APOD Start Page](https://zeti1223.github.io/Start-page/)

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with gradients and animations
- **Vanilla JavaScript** - API integration and DOM manipulation
- **Vite** - Build tool and development server
- **NASA APOD API** - Astronomy picture data source

## Prerequisites

- Node.js version 20 or higher
- A free NASA API key from [api.nasa.gov](https://api.nasa.gov)
- Git and GitHub account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/zeti1223/Start-page.git
cd Start-page
```

### 2. Get NASA API Key

1. Visit [api.nasa.gov](https://api.nasa.gov)
2. Fill out the simple application form
3. Receive your free API key via email

### 3. Set Up Environment Variables

Create a `.env` file in the project root:

```env
VITE_NASA_API_KEY=your_actual_nasa_api_key_here
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser to see the site running locally.

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Manual Deployment

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Automatic Deployment

1. Push your code to the main branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be live at `https://yourusername.github.io/Start-page/`

### GitHub Secrets Setup

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Add a new repository secret:
   - Name: `VITE_NASA_API_KEY`
   - Value: Your NASA API key

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is open source and available under the MIT License.

## Credits

- **NASA APOD API** - Provided by NASA's Astronomy Picture of the Day program
- **Vite** - Next-generation frontend tooling
- **Stardance Tutorial** - Original tutorial for building this type of application
- **Cursor** - [Crumpled Paper Color cursor](https://custom-cursor.com/en/collection/detailed-colors/crumpled-paper-color)

## Resources

- [NASA APOD API Documentation](https://api.nasa.gov/)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
