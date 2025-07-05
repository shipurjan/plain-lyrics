# Plain Lyrics

A minimalist lyrics viewer inspired by Genius.com that focuses on providing clean, distraction-free access to song lyrics.

## About

Plain Lyrics is a simple web application that allows users to fetch and display song lyrics from Genius.com without the visual clutter. Users can paste a Genius.com link and get clean, readable lyrics in a minimal interface.

## Features

- Clean, minimal lyrics display
- Genius.com API integration
- Settings page for API key configuration
- Global state management with Zustand
- Persistent settings storage

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

Visit the `/settings` route to configure your Genius.com API key, which will be stored locally for future use.

## Docker Usage

The project includes Docker support for both development and building static files for GitHub Pages.

### Development

Run the development server with hot-reload:

```bash
docker-compose --profile dev up
```

This will:

- Start the development server on `http://localhost:3000`
- Enable hot-reload for code changes
- Mount your local files for real-time development

### Static Build for GitHub Pages

Build static files for deployment:

```bash
docker-compose --profile build up
```

This will:

- Build the application for production
- Generate static files in the `./out` directory
- Optimize the build for static hosting

The generated files in `./out` can be deployed directly to GitHub Pages or any static hosting service.

### Manual Docker Commands

You can also run Docker commands directly:

```bash
# Development
docker build --target dev -t plain-lyrics:dev .
docker run -p 3000:3000 -v $(pwd):/app plain-lyrics:dev

# Static build
docker build --target build -t plain-lyrics:build .
docker run -v $(pwd)/out:/app/out plain-lyrics:build
```
