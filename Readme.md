# Vite SSR + React + Zustand Template

A server-side rendered React application built with Vite and Zustand for state management. Live demo: [https://vite-ssr-templates.onrender.com/](https://vite-ssr-templates.onrender.com/)

## Features

- ⚡️ **Vite** - Lightning fast build tool
- 🎭 **Server Side Rendering** - Better SEO and initial load performance
- 🏪 **Zustand Store** - Simple and flexible state management
  - Counter with auto-increment feature
  - Time synchronization with server
  - Drift monitoring between client and server time
- 🔄 **Real-time Updates**
  - Server time synchronization every 10 seconds
  - Time drift monitoring and reporting
- ⚛️ **React 19** - Latest React features
- 🎯 **TypeScript** - Type safety and better developer experience
- 🚀 **Production Ready**
  - Express.js server for SSR
  - Proper error handling
  - Environment configuration

## Project Structure

```
├── src/
│   ├── App.tsx           # Main application component
│   ├── entry-client.tsx  # Client-side entry point
│   ├── entry-server.tsx  # Server-side entry point
│   └── store/           
│       └── index.ts      # Zustand store configuration
├── server.js            # Express server with SSR setup
├── index.html           # HTML template
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies
```

## Key Features Explained

### Server-Side Rendering
- Uses Vite's SSR capabilities for initial page load
- Hydrates the application on the client side
- Seamless transition between server and client rendering

### State Management with Zustand
- Centralized state management
- Auto-incrementing counter feature
- Server time synchronization
- Time drift monitoring between client and server

### API Endpoints
- `/api/server-time` - Returns current server time
- Time synchronization check every 10 seconds
- Error handling for failed sync attempts

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Deployment

This template is configured for deployment on platforms like Render and Vercel. For Render deployment:

1. Push your code to a Git repository
2. Create a new Web Service on Render
3. Use the following settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview`
   - Environment Variable: `PORT=10000`

## Environment Variables

- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 5173)
- `BASE` - Base URL path

## Contributing

Feel free to submit issues and enhancement requests!
