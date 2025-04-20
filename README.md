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
2. The GitHub Actions workflow will attempt to automatically enable GitHub Pages for your repository
3. If the workflow fails with a "Pages not enabled" error, you'll need to manually enable it:
   - Go to your repository on GitHub
   - Go to Settings > Pages
   - Under "Source", select "GitHub Actions" as the source
4. After GitHub Pages is enabled, re-run the failed workflow:
   - Go to the Actions tab
   - Click on the failed workflow run
   - Click "Re-run all jobs" button
5. Once the workflow completes successfully, your site will be available at `https://yourusername.github.io/foodinator/`

**Note:** Make sure to update the `homepage` field in `package.json` with your actual GitHub username before pushing to GitHub.

### Manual Deployment

You can also trigger a deployment manually:

1. Go to your repository on GitHub
2. Go to the Actions tab
3. Select the "Deploy to GitHub Pages" workflow
4. Click "Run workflow"

## License

MIT
