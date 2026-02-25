# Ski Trip Planner

A ski trip expense tracker app built with Next.js and [Subframe](https://subframe.com).

## Setup

1. Install dependencies (already done):
   ```bash
   npm install
   ```

2. Sync Subframe components (requires [Subframe CLI auth](https://app.subframe.com/cli/auth)):
   ```bash
   npx @subframe/cli@latest sync DefaultPageLayout Button -p e0dfc8dc556f
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/trips`.

## Features

- **Trips list** — View all ski trips with name, location, year, and total spent
- **Create trip modal** — Add new trips with name, location, and year
- **Trip details** — Navigate to individual trip pages (placeholder for expense tracking)

## Project structure

- `src/app/trips/page.tsx` — Main Ski Trips list page
- `src/app/trips/TripCard.tsx` — Trip card component (clickable)
- `src/app/trips/CreateTripModal.tsx` — Modal for creating new trips
- `src/app/trips/[id]/page.tsx` — Trip details page (stub for future expense views)
- `src/ui/` — Subframe components (Button, DefaultPageLayout, Dialog, TextField, etc.)

## Next steps

- Connect to an API for persisting trips
- Add expense tracking on trip detail pages
- Add hooks (e.g., `useTrips`, `useCreateTrip`) for data fetching
