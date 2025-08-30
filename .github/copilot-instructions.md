# sanin2025-hirei-vote-share Copilot Instructions

## Project Overview
This is a MapLibre GL JS application visualizing Japanese political party vote shares from the 2025 Sanin election. The app displays prefecture-level electoral data as interactive choropleth maps with party-specific layers.

## Architecture & Key Components

### Map Layer Structure
- **Base Layer**: `gsi-white-layer` (GSI raster tiles, always visible)
- **Data Layers**: Each political party has its own layer (自民, 立民, 国民, etc.)
- **Data Source**: Vector tiles (`pref-vote-share`) served from `/public/tiles/pref-vote-share/{z}/{x}/{y}.pbf`
- **Style Definition**: `/public/styles/style.json` contains all layer configurations

### Political Party Mapping Convention
The codebase uses specific key mappings between data properties and display names in `buildPopupContent()`:
```javascript
"jimin" → "自民", "ritsumin" → "立民", "kokumin" → "国民", 
"koumei" → "公明", "reiwa" → "れいわ", "ishin" → "維新", etc.
```
Excluded parties: `ntou`, `saisei`, `muren`, `kaikaku`, `seishin` (filtered out from popups)

### Color Coding System
- Percentage-based choropleth using red gradients (0%-5% white → 40%+ pure red)
- 5% increments with calculated RGB interpolation
- Hardcoded legend in `index.html` must match style.json color definitions

## Development Workflows

### Local Development
```bash
npm run dev     # Starts dev server on port 5173
npm run build   # Production build to /dist
npm run preview # Preview production build
```

### GitHub Pages Deployment
```bash
npm run deploy  # Builds and deploys to gh-pages branch
```
Configured with `base: '/sanin2025-hirei-vote-share/'` in `vite.config.js`

## Key Implementation Patterns

### Layer Toggle System
- Radio button controls generated dynamically from style layers (excluding `gsi-white-layer`)
- Single active layer pattern: only one political party layer visible at a time
- Base layer always remains visible for geographical context

### Event Handling
- Click events trigger popups with prefecture data
- Popup content filtering: shows party percentages + aging rate, hides codes and excluded parties
- Layer switching via radio button change events

### Data Structure Expectations
Vector tile properties should include:
- `name`: Prefecture name (displayed prominently)
- `code`: Administrative code (hidden from popups) 
- Political party keys: `jimin`, `ritsumin`, `kokumin`, etc. (percentage values)
- `aging_rate`: Demographic data (displayed as "高齢化率")

## File Organization
- `main.js`: Core map logic, event handlers, popup generation
- `index.html`: UI structure with inline legend, layer controls container
- `index.css`: Legend styling only (map controls styled inline)
- `public/styles/style.json`: MapLibre style definition with all party layers
- `public/tiles/`: Vector tile data organized by zoom/x/y structure

## Critical Dependencies
- MapLibre GL JS for mapping functionality
- GSI (Geospatial Information Authority) tiles for base layer
- Custom font files in `/public/fonts/Noto Sans JP Regular/` for Japanese text rendering
