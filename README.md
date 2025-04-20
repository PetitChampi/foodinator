# Foodinator

A weekly meal and grocery planner app built with React.

## Features

- Plan your weekly meals by selecting from a list of available recipes
- Automatically generate a grocery list based on your meal selections
- Rearrange your meals in the schedule view
- Search for meals by ingredients
- Mobile-friendly design

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/foodinator.git
   cd foodinator
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/foodinator/`

### Building for Production

```
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Setting up GitHub Pages

1. Push your code to GitHub
2. Go to your repository on GitHub
3. Go to Settings > Pages
4. Under "Build and deployment", select "GitHub Actions" as the source
5. The site will be deployed automatically when you push to the main branch

### Manual Deployment

You can also trigger a deployment manually:

1. Go to your repository on GitHub
2. Go to the Actions tab
3. Select the "Deploy to GitHub Pages" workflow
4. Click "Run workflow"

## License

MIT
