# Rextro Web Platform - File Structure

This document outlines the complete file structure for the Rextro Interactive Web Platform.

## Directory Structure

```
rextro-web/
│
├── src/                                    # Source code directory
│   ├── app/                               # Next.js App Router directory
│   │   ├── layout.tsx                    # Root layout component
│   │   ├── page.tsx                      # Home page
│   │   ├── globals.css                   # Global styles
│   │   ├── projects/                     # Project showcase pages
│   │   │   ├── page.tsx                 # Projects listing page
│   │   │   └── [id]/                    # Dynamic project detail page
│   │   │       └── page.tsx
│   │   ├── media/                        # Media hub pages
│   │   │   ├── page.tsx                 # Media hub main page
│   │   │   ├── videos/                  # Videos section
│   │   │   │   └── page.tsx
│   │   │   └── live/                    # Live streams section
│   │   │       └── page.tsx
│   │   ├── events/                       # Events and competitions pages
│   │   │   ├── page.tsx                 # Events listing page
│   │   │   └── [id]/                    # Dynamic event detail page
│   │   │       └── page.tsx
│   │   ├── interactive/                  # Interactive zone pages
│   │   │   ├── page.tsx                 # Interactive hub
│   │   │   ├── quizzes/                 # Quiz section
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── games/                   # Mini-games section
│   │   │   │   └── page.tsx
│   │   │   └── leaderboard/             # Leaderboard page
│   │   │       └── page.tsx
│   │   ├── school-quiz/                  # School competition quizzes
│   │   │   └── page.tsx
│   │   ├── about/                        # About page
│   │   │   └── page.tsx
│   │   └── api/                          # API routes
│   │       ├── projects/
│   │       │   └── route.ts
│   │       ├── events/
│   │       │   └── route.ts
│   │       ├── quizzes/
│   │       │   └── route.ts
│   │       ├── leaderboard/
│   │       │   └── route.ts
│   │       └── chatbot/
│   │           └── route.ts
│   │
│   ├── components/                        # Reusable React components
│   │   ├── common/                       # Shared/common components
│   │   │   ├── Header.tsx               # Site header
│   │   │   ├── Footer.tsx               # Site footer
│   │   │   ├── Navbar.tsx               # Navigation bar
│   │   │   ├── Button.tsx               # Custom button component
│   │   │   ├── Card.tsx                 # Card component
│   │   │   ├── Modal.tsx                # Modal dialog component
│   │   │   ├── Loading.tsx              # Loading spinner
│   │   │   ├── ErrorBoundary.tsx        # Error boundary component
│   │   │   └── SEO.tsx                  # SEO meta tags component
│   │   │
│   │   ├── projects/                     # Project showcase components
│   │   │   ├── ProjectCard.tsx          # Project card display
│   │   │   ├── ProjectGrid.tsx          # Grid layout for projects
│   │   │   ├── ProjectFilter.tsx        # Filter component
│   │   │   ├── ProjectDetail.tsx        # Project detail view
│   │   │   ├── ProjectGallery.tsx       # Image/video gallery
│   │   │   └── CategoryTabs.tsx         # Category filter tabs
│   │   │
│   │   ├── media/                        # Media hub components
│   │   │   ├── VideoPlayer.tsx          # Custom video player
│   │   │   ├── VideoCard.tsx            # Video thumbnail card
│   │   │   ├── VideoGrid.tsx            # Video grid layout
│   │   │   ├── LiveStreamCard.tsx       # Live stream card
│   │   │   ├── StreamSchedule.tsx       # Schedule display
│   │   │   └── MediaFilter.tsx          # Media filtering
│   │   │
│   │   ├── events/                       # Event management components
│   │   │   ├── EventCard.tsx            # Event card display
│   │   │   ├── EventList.tsx            # Event listing
│   │   │   ├── EventDetail.tsx          # Event detail view
│   │   │   ├── EventFilter.tsx          # Event category filter
│   │   │   ├── RegistrationForm.tsx     # Registration form
│   │   │   ├── ParticipantList.tsx      # List of participants
│   │   │   └── EventCalendar.tsx        # Calendar view
│   │   │
│   │   ├── interactive/                  # Interactive zone components
│   │   │   ├── QuizCard.tsx             # Quiz card
│   │   │   ├── QuizQuestion.tsx         # Quiz question display
│   │   │   ├── QuizTimer.tsx            # Quiz timer
│   │   │   ├── QuizResult.tsx           # Quiz results
│   │   │   ├── GameCard.tsx             # Mini-game card
│   │   │   ├── Leaderboard.tsx          # Leaderboard table
│   │   │   ├── ScoreDisplay.tsx         # Score display
│   │   │   └── CategorySelector.tsx     # Quiz category selector
│   │   │
│   │   ├── chatbot/                      # Chatbot components
│   │   │   ├── ChatWidget.tsx           # Chat widget container
│   │   │   ├── ChatMessage.tsx          # Individual message
│   │   │   ├── ChatInput.tsx            # Chat input field
│   │   │   ├── VoiceButton.tsx          # Voice command button
│   │   │   └── ChatBubble.tsx           # Chat bubble design
│   │   │
│   │   └── map/                          # Map components
│   │       ├── InteractiveMap.tsx       # Main map component
│   │       ├── MapMarker.tsx            # Custom map marker
│   │       ├── LocationInfo.tsx         # Location information popup
│   │       └── MapControls.tsx          # Map control buttons
│   │
│   ├── lib/                               # Utility functions and helpers
│   │   ├── api.ts                        # API helper functions
│   │   ├── utils.ts                      # General utilities
│   │   ├── constants.ts                  # App constants
│   │   ├── validators.ts                 # Form validation functions
│   │   └── formatters.ts                 # Data formatting functions
│   │
│   ├── hooks/                             # Custom React hooks
│   │   ├── useAuth.ts                    # Authentication hook
│   │   ├── useQuiz.ts                    # Quiz functionality hook
│   │   ├── useLeaderboard.ts             # Leaderboard data hook
│   │   ├── useMediaQuery.ts              # Responsive design hook
│   │   ├── useLocalStorage.ts            # Local storage hook
│   │   └── useVoiceRecognition.ts        # Voice recognition hook
│   │
│   ├── contexts/                          # React Context providers
│   │   ├── AuthContext.tsx               # Authentication context
│   │   ├── ThemeContext.tsx              # Theme/dark mode context
│   │   ├── ChatbotContext.tsx            # Chatbot state context
│   │   └── QuizContext.tsx               # Quiz state context
│   │
│   ├── types/                             # TypeScript type definitions
│   │   ├── project.ts                    # Project types
│   │   ├── event.ts                      # Event types
│   │   ├── quiz.ts                       # Quiz types
│   │   ├── media.ts                      # Media types
│   │   ├── user.ts                       # User types
│   │   └── api.ts                        # API response types
│   │
│   ├── services/                          # External service integrations
│   │   ├── projectService.ts             # Project data service
│   │   ├── eventService.ts               # Event data service
│   │   ├── quizService.ts                # Quiz service
│   │   ├── mediaService.ts               # Media/video service
│   │   ├── chatbotService.ts             # Chatbot AI service
│   │   ├── mapService.ts                 # Maps API service
│   │   └── authService.ts                # Authentication service
│   │
│   └── styles/                            # Global styles and CSS
│       ├── globals.css                   # Global CSS
│       ├── variables.css                 # CSS variables
│       └── themes/                       # Theme files
│           ├── light.css
│           └── dark.css
│
├── public/                                # Public static files
│   ├── images/                           # Static images
│   │   ├── logo.png
│   │   ├── hero/
│   │   └── placeholders/
│   ├── icons/                            # Icons and favicons
│   │   ├── favicon.ico
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── videos/                           # Static video files
│   └── fonts/                            # Custom fonts (if any)
│
├── config/                                # Configuration files
│   ├── site.config.ts                    # Site configuration
│   ├── navigation.config.ts              # Navigation structure
│   └── features.config.ts                # Feature flags
│
├── docs/                                  # Project documentation
│   ├── API.md                            # API documentation
│   ├── COMPONENTS.md                     # Component documentation
│   ├── CONTRIBUTING.md                   # Contributing guide
│   └── DEPLOYMENT.md                     # Deployment guide
│
├── .env.local                             # Environment variables (not in git)
├── .env.example                           # Example environment variables
├── .gitignore                             # Git ignore file
├── next.config.ts                         # Next.js configuration
├── tsconfig.json                          # TypeScript configuration
├── tailwind.config.ts                     # Tailwind CSS configuration
├── postcss.config.mjs                     # PostCSS configuration
├── package.json                           # NPM dependencies
├── package-lock.json                      # NPM lock file
├── README.md                              # Main documentation
└── STRUCTURE.md                           # This file
```

## Key Directories Explained

### `/src/app`
Contains all pages and layouts using Next.js App Router. Each folder represents a route in the application.

### `/src/components`
Reusable React components organized by feature/module:
- **common**: Shared across entire app
- **projects**: Project showcase specific
- **media**: Video and streaming components
- **events**: Event management components
- **interactive**: Quizzes and games
- **chatbot**: AI assistant components
- **map**: Location mapping components

### `/src/lib`
Utility functions, helpers, and shared logic that doesn't fit into components.

### `/src/hooks`
Custom React hooks for reusable stateful logic.

### `/src/contexts`
React Context providers for global state management.

### `/src/types`
TypeScript type definitions and interfaces.

### `/src/services`
Service layer for API calls and external integrations.

### `/public`
Static assets served directly by the web server.

### `/config`
Application configuration files separate from environment variables.

### `/docs`
Additional project documentation for developers and contributors.

## Component Organization Pattern

Each component folder follows this pattern:
```
ComponentName/
├── index.ts              # Exports
├── ComponentName.tsx     # Main component
├── ComponentName.module.css  # Styles (if using CSS modules)
└── ComponentName.test.tsx    # Tests (if applicable)
```

For simpler components, a single `.tsx` file is sufficient.

## Naming Conventions

- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase for interfaces/types (e.g., `Project`, `Event`)
- **Hooks**: camelCase starting with "use" (e.g., `useAuth.ts`)
- **Services**: camelCase ending with "Service" (e.g., `projectService.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## Module Responsibilities

### Project Showcase Module
- Display projects with filtering
- Project detail pages
- Image/video galleries
- Team member information

### Media Hub Module
- Video player integration
- Live stream scheduling
- Content categorization
- Embedded media support

### Event Management Module
- Event listings and filtering
- Registration system
- Participant tracking
- Calendar integration

### Interactive Zone Module
- Quiz system (multiple types)
- Mini-games
- Leaderboard tracking
- Score persistence

### School Quiz Module
- Dedicated quiz interface
- School-specific features
- Custom quiz creation

### Chatbot Module
- AI-powered assistance
- Voice command support
- Context-aware responses
- Help navigation

### Map Module
- Interactive map display
- Location markers
- Event venue information
- Navigation integration

## Getting Started with Structure

1. Each module is self-contained with its own components
2. Shared functionality goes in `/common` or `/lib`
3. Types are centralized in `/types`
4. API integration is handled in `/services`
5. Global state uses `/contexts`
6. Reusable logic uses `/hooks`

## Best Practices

1. **Keep components focused**: One responsibility per component
2. **Colocate related files**: Keep component, styles, and tests together
3. **Use TypeScript**: Define interfaces for all data structures
4. **Separate concerns**: Business logic in services, presentation in components
5. **Reuse common patterns**: Use shared components and hooks
6. **Follow naming conventions**: Consistent naming across the project
7. **Document complex logic**: Add comments for non-obvious code
8. **Test critical paths**: Write tests for important functionality

## Environment Variables

Required in `.env.local`:
```env
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_MAPS_API_KEY=
GOOGLE_FORMS_API_KEY=
YOUTUBE_API_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=
```

See `.env.example` for complete list with descriptions.

---

This structure is designed to be scalable, maintainable, and easy to navigate for all contributors.
