A full-stack Amazon clone built with React, Firebase, and Stripe. This responsive e-commerce web app replicates core features of Amazon, including:
- User Authentication (via Firebase) - Users can sign up and log in securely with Firebase Auth
- Dynamic Shopping Cart - Add, remove, and update items
- Stripe Payment Integration - Stripe integration to handle payment processing (In test mode)
- Order Handling & Checkout Flow - After checkout, orders are saved and viewable in user's order history
- Real-time Database – Product and order data is managed using Firebase’s real-time database

Tech Stack:
- Frontend: ReactJS • JavaScript • HTML • CSS
- Backend: Firebase • Node.js • Express.js
- Payments: Stripe API

# Amazon Clone

A full-stack Amazon-like e-commerce application built with React for the frontend and Firebase for backend services. This project demonstrates a simple shopping experience with authentication, a shopping cart, checkout, payment processing (Stripe), and order history saved to Firebase.

## Features
- User authentication (Firebase Auth)
- Browse products and view product details
- Add / remove items to the shopping cart
- Checkout flow with Stripe for payments (test mode)
- Orders persisted in Firebase
- Server-side helper functions implemented with Firebase Cloud Functions

## Tech stack
- Frontend: React (create-react-app), React Router
- State management: Context / Reducer (see `StateProvider.js`)
- Backend: Firebase (Auth, Firestore) and Firebase Cloud Functions (Express + Stripe)
- Payments: Stripe (server integration lives in `functions/`)

## Quick start (local)
These commands assume you are on Windows PowerShell (default for this workspace). Run them from the project root (`amazon-clone`).

1) Install dependencies (root frontend)

```powershell
npm install
```

2) Install functions dependencies

```powershell
cd functions; npm install; cd ..
```

3) Run the React app locally

```powershell
npm start
# opens http://localhost:3000 by default
```

4) Run Functions emulator locally (optional; requires Firebase CLI)

```powershell
cd functions
npm run serve
# or from project root: firebase emulators:start --only functions
```

Notes:
- The project frontend uses the usual scripts from `package.json`: `start`, `build`, `test`.
- Functions scripts are in `functions/package.json` (e.g. `serve`, `deploy`).

## Build & Deploy
This repository is configured to host the built React app under Firebase Hosting (see `firebase.json`).

1) Build the production bundle

```powershell
npm run build
```

2) Deploy to Firebase (Hosting + Functions)

```powershell
# from project root
firebase deploy
# or to deploy only functions: firebase deploy --only functions
# to deploy only hosting: firebase deploy --only hosting
```

Make sure you are logged in with `firebase login` and your Firebase project is selected/set via `firebase use` or `firebase init` beforehand.

## Firebase configuration
- This repository contains a Firebase client config in `src/firebase.js`. Those values are the Firebase Web SDK config (apiKey, authDomain, projectId, etc.).
- Note: Firebase web config values are not secret by design, but keep any server-side secrets (Stripe secret keys) out of the client code. Store sensitive keys in environment variables for Firebase Functions or use the Firebase Console config / Secret Manager.

If you need to add Stripe secret keys for the server you can use a local `.env` or configure them in your function environment (example with Firebase CLI):

```powershell
# set a secret-like env for functions (example)
firebase functions:config:set stripe.secret="YOUR_SECRET_KEY"
```

## Project structure (high level)
- `src/` — React app source (components, pages, firebase client config)
- `public/` — static assets
- `functions/` — Firebase Cloud Functions (server-side code, Stripe integration)
- `build/` — generated production build output
  
## License
This repository includes a `LICENSE` file. See it for license details.
