# Plain Lyrics - Project Instructions

## Project Overview
Plain Lyrics is a minimalist lyrics viewer web application that provides a clean, distraction-free alternative to Genius.com. The goal is to create a simple interface where users can paste Genius.com links and view song lyrics without visual clutter.

## Technology Stack
- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Package Manager**: pnpm
- **API**: Genius.com API

## Project Structure
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx         # Main lyrics display page
│   └── settings/        # Settings page (to be created)
├── components/          # Reusable components (to be created)
├── lib/                 # Utilities and API functions (to be created)
├── stores/              # Zustand stores (to be created)
└── types/               # TypeScript type definitions (to be created)
```

## Core Features & Implementation

### 1. Settings Management
- **Route**: `/settings`
- **Purpose**: Allow users to input and save their Genius.com API key
- **Storage**: Use Zustand with localStorage persistence
- **Implementation**: 
  ```typescript
  // stores/settings.ts
  import { create } from 'zustand'
  import { persist, createJSONStorage } from 'zustand/middleware'

  interface SettingsStore {
    apiKey: string
    setApiKey: (key: string) => void
  }

  export const useSettingsStore = create<SettingsStore>()(
    persist(
      (set) => ({
        apiKey: '',
        setApiKey: (key) => set({ apiKey: key }),
      }),
      {
        name: 'plain-lyrics-settings',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
  ```

### 2. Main Lyrics Display
- **Route**: `/` (home page)
- **Components**:
  - URL input field for Genius.com links
  - Lyrics display area
  - Loading states
  - Error handling

### 3. Genius.com API Integration
- **Purpose**: Extract song metadata from Genius.com URLs and fetch lyrics
- **Implementation**:
  - Parse Genius.com URLs to extract song information
  - Use Genius API to fetch song metadata
  - Extract and display clean lyrics text
  - Handle API errors gracefully

## Development Guidelines

### Code Style
- Use TypeScript for all components and utilities
- Follow existing ESLint/Prettier configuration
- Use Tailwind CSS for styling
- Implement proper error boundaries
- Add loading states for async operations

### State Management
- Use Zustand for global state (settings, current song, etc.)
- Persist critical settings in localStorage
- Keep state minimal and focused

### API Handling
- Create utility functions in `lib/genius.ts`
- Implement proper error handling
- Add request/response types
- Handle rate limiting gracefully

### Component Structure
- Create reusable components in `components/`
- Use proper TypeScript interfaces
- Implement loading and error states
- Follow Next.js App Router conventions

## Implementation Steps

1. **Setup Base Structure**
   - Create necessary directories (`components/`, `lib/`, `stores/`, `types/`)
   - Set up Zustand store for settings
   - Create basic settings page

2. **Implement Settings Page**
   - Create `/settings` route
   - Add API key input form
   - Implement Zustand persistence
   - Add navigation between pages

3. **Build Main Lyrics Interface**
   - Create URL input component
   - Add lyrics display component
   - Implement loading/error states
   - Style with Tailwind CSS

4. **Integrate Genius API**
   - Create API utility functions
   - Implement URL parsing
   - Add metadata fetching
   - Extract and display lyrics

5. **Polish & Optimization**
   - Add proper error handling
   - Implement responsive design
   - Add keyboard shortcuts
   - Optimize for performance

## Quality Standards
- Run `pnpm lint` and `pnpm lint:types` before committing
- Ensure all TypeScript errors are resolved
- Test functionality with actual Genius.com URLs
- Maintain clean, readable code structure

## Notes
- Keep the interface minimal and focused on readability
- Prioritize clean typography and spacing
- Ensure API key is stored securely in localStorage
- Handle edge cases (invalid URLs, API errors, network issues)
- Consider adding a simple dark/light mode toggle in future iterations