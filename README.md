# Dominic Tojan — Personal Portfolio

## File Structure

```
portfolio/
├── index.html          ← Main HTML structure & content
├── style.css           ← All styles, animations, layout, responsive rules
├── main.js             ← Interactivity: circuit canvas, scroll reveal, nav, parallax
├── assets/
│   └── images.js       ← Base64-encoded logo & photo (for offline/local use)
└── README.md           ← This file
```

## How to run

Just open `index.html` in any browser — no server needed.

## Customisation

- **Colors** → edit CSS variables at the top of `style.css` (`:root { ... }`)
- **Content** → edit sections directly in `index.html`
- **Animations** → tweak timing and effects in `main.js`
- **Images** → replace base64 strings in `assets/images.js` with new ones, or swap to regular `src` paths if hosting on a server
