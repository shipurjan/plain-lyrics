# Plain Lyrics

## Project Status: ABANDONED

**This project has been abandoned due to Genius.com API limitations.**

Plain Lyrics was intended to be a minimalist, fully static lyrics viewer that could be hosted on GitHub Pages. However, the Genius.com API deliberately excludes lyrics text from their public API, forcing developers to implement server-side scraping to access actual lyrics content.

Since the core requirement was a static site deployable to GitHub Pages, and lyrics scraping requires server-side functionality, this approach is fundamentally incompatible with the project goals.

## Why Abandoned?

1. **Static Site Requirement**: The project was designed to be fully static and hosted on GitHub Pages
2. **API Limitation**: Genius.com API provides metadata only, no lyrics text
3. **Incompatible Solutions**: Lyrics access requires server-side scraping, breaking the static site model
4. **No Workaround**: No viable static-only solution exists for accessing Genius lyrics

The project will remain abandoned until Genius.com adds lyrics to their public API.

## Current State

The repository contains a partially implemented Next.js application with:
- Basic project structure and dependencies
- Settings page for API key management  
- URL parsing and metadata fetching from Genius API
- Static export configuration

**Note**: The application is unfinished and non-functional for its intended purpose.

## Development Setup (For Reference)

If you want to explore the unfinished code:

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Run development server: `pnpm dev`

**Warning**: The application will not work as intended due to the fundamental API limitation described above.

## Technical Details

- **Framework**: Next.js 15.3.5 with App Router and static export
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with localStorage persistence
- **Target Deployment**: GitHub Pages (static hosting)

The codebase includes Docker configuration and proper TypeScript setup, but lacks the core lyrics functionality that was the project's primary purpose.
