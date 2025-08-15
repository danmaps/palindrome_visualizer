# Palindrome Visualizer

An interactive palindrome checker with beautiful animations built with React and TypeScript.

## Features

- Real-time palindrome detection
- Animated rotating text visualization
- Beautiful gradient backgrounds that change based on palindrome status
- Celebration particles for palindromes
- Responsive design with Tailwind CSS

## Live Demo

Visit the live demo at: [https://YOUR_USERNAME.github.io/palindrome_visualizer](https://YOUR_USERNAME.github.io/palindrome_visualizer)

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Update package.json**: Replace `USERNAME` in the homepage field with your actual GitHub username:
   ```json
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/palindrome_visualizer"
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

3. **Push to main branch**: The GitHub Action will automatically build and deploy your site

### Manual Deployment (Alternative):

If you prefer manual deployment using gh-pages:

1. Install gh-pages as a dev dependency (already included in package.json)
2. Update the homepage in package.json with your GitHub username
3. Run: `npm run deploy`

## Building for Production

To create a production build:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS (via CDN)
- GitHub Pages
- GitHub Actions
