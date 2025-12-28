// === README.md ===
# MCR Tour & Travels — React Bus Booking (Frontend-only)


This is a simple single-page React app (Vite) customized for **MCR Tour & Travels**. It lists buses with images and contact info and allows a basic client-side booking (saved to localStorage). No backend required.


## Requirements
- Node.js 18+ and npm


## Run locally
1. Place company logo and slideshow images in `public/assets/images/` (see list below).
2. In the project folder, run:


```bash
npm install
npm run dev
```


3. Open http://localhost:5173 (or the URL printed by Vite).


## Images to provide
Put these files into `public/assets/images/`:
- `logo.png` — company logo (PNG or SVG)
- `slide1.jpg`, `slide2.jpg`, `slide3.jpg` — slideshow images (will rotate every 3 seconds)
- any bus images referenced in `src/data/buses.json` (or the existing picsum links will work)


---