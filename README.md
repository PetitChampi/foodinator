# Foodinator

A weekly meal and grocery planner app built with React and TypeScript.

![Foodinator App](public/screenshot.png)

## Features

- **Weekly Meal Planning**: Plan your weekly meals by selecting from a list of available recipes
- **Automatic Grocery Lists**: Generate a grocery list based on your meal selections
- **Meal Scheduling**: Rearrange your meals in the schedule view with drag-and-drop functionality
- **Ingredient Search**: Find meals by searching for specific ingredients
- **Grocery List Management**: Sort and filter your grocery list, mark items as purchased
- **Persistent Storage**: All your data is saved locally in your browser
- **Mobile-Friendly Design**: Works great on both desktop and mobile devices

## Live Demo

Check out the live demo at [https://petitchampi.github.io/foodinator/](https://petitchampi.github.io/foodinator/)

## Tech Stack

- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **CSS**: Styling (no external UI libraries)
- **LocalStorage**: For data persistence

## Project Structure

```
src/
├── assets/         # Static assets like images
├── components/     # React components
├── hooks/          # Custom React hooks
├── models/         # TypeScript interfaces and data
├── styles/         # CSS styles
├── utils/          # Utility functions
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Improvements

- Add ability to create and edit custom meals
- Implement meal categories and filtering
- Add nutritional information for meals and ingredients
- Implement user accounts for data syncing across devices
- Add meal rating system
- Implement meal suggestions based on past selections

## License

MIT
