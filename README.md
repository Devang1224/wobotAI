# Wobot Camera Dashboard

A React + Vite dashboard for viewing and managing camera records.

## Features

- Camera table with search and filters (location, status)
- Pagination with row selection
- Bulk delete 
- Status toggle flow

## Tech Stack

- React
- Vite
- React Icons
- CSS 

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (or compatible npm with your Node version)

## Setup Instructions

1. Open terminal in the `app` directory:
   - `cd app`
2. Install dependencies:
   - `npm install`
3. Start development server:
   - `npm run dev`
4. Open the URL shown in terminal (usually `http://localhost:5173`)

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## API Configuration

Base API URL is defined in `env.js`:

The API utility currently sends an authorization token from `src/services/cameraApi.ts`.
If you need to switch environments, update `env.js` and token/header handling accordingly.
