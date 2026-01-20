# LitSpots 📍

LitSpots is a real-time social discovery web app that helps people find and join live social hangouts nearby. Whether it’s a casual sutta session, night outs, gaming meetups, music jams, or spontaneous get-togethers, LitSpots shows the hottest spots happening right now.

---


https://github.com/user-attachments/assets/874d1e14-1e5a-4fc8-a4e4-1199d63b0297


---
## Introduction

Social plans don’t need weeks of planning. **LitSpots** is built for spontaneity, helping users discover live hangouts in real time and connect with people nearby. Users can explore ongoing spots, join instantly, or host their own hangout for others to discover.

---

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- **MapLibre GL + React Map GL**
  - Interactive, WebGL-based maps
  - React bindings via `react-map-gl`
  - Styled UI overlays and controls using Tailwind CSS

### Backend
- Next.js API Routes

### Database
- MongoDB

### Authentication & Utilities
- JWT (jsonwebtoken)
- Password hashing (bcryptjs)
- Environment management (dotenv)

---

## Mapping & Geospatial Stack

### Map Rendering
- **MapLibre GL JS**
  - Open-source map rendering engine (Mapbox GL JS alternative)
  - No vendor lock-in or proprietary licenses
  - Used in **client components only** due to browser/WebGL dependencies

### React Integration
- **react-map-gl**
  - React wrapper for MapLibre GL
  - Compatible with React 19 and Next.js App Router
  - Supports markers, popups, layers, and custom overlays

### Map Data
- **OpenStreetMap (OSM)**
  - Open-source geographic data (roads, buildings, POIs)
  - Primary data source for all map tiles
---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/litspots.git
cd litspots
npm install
```

## Configuration
Create a .env file in the root directory with the following variables:
```
MONGO_URI=
TOKEN_SECRET=
DOMAIN=
MAILER_USER=
MAILER_PASS=
JWT_SECRET=
GEOLOCATION_SEARCH =
```
---

## Running the App
Start the development server
```bash
npm run dev
```
Open your browser and navigate to:
```bash
http://localhost:3000
```
