# Tennis Replay

This was a tennis app I made a while ago. I recently updated it so that it's compatible with more recent Angular versions. 

## What it does

Tennis Replay lets you manage a database of clients and their tennis stroke videos, then load two videos side by side for comparison. Videos can be synced to a specific contact point and played back in slow motion for detailed stroke analysis.

## Features

- **Add clients** - store client name, notes, left-handedness, and one-handed backhand preference
- **Client list** - live search, alphabetically sorted
- **Add videos** - upload MP4/MOV files, tag with swing type (Forehand, Backhand, First Serve, Second Serve, Volley, Smash), set a contact point in seconds, and link to a client
- **Video list** - live search by name, swing type or client, with buttons to load videos into the player
- **Video player** - side-by-side comparison of two videos, sync both to their contact points and play simultaneously, adjustable playback speed (0.1x - 1x)
- **Edit/delete** clients and videos
- **Mobile friendly** - designed primarily for use in mobile Safari

## Tech stack

- Angular 15
- Angular Material
- IndexedDB (via `idb`) for local video and client storage
- TypeScript

## Running locally

```bash
# Requires Node 18+
npm install
npm start -- --host 0.0.0.0
```

Then open `http://localhost:4200` in your browser, or on mobile via your local IP address.
