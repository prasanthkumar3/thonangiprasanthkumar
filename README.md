# Thonangi Prasanth Kumar, portfolio

Personal portfolio built with React and Vite. Live at https://thonangiprasanthkumar.vercel.app

## Run it locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Vercel detects Vite automatically: build command `npm run build`, output directory `dist`.

## Where to change things

- **Text, projects, skills, links:** `src/data.js`
- **Journey timeline bars:** the `CLIPS` list at the top of `src/components/Journey.jsx` (dates are decimal years, notes are in the comment above it)
- **Project sketches:** `AvishkaarSketch.jsx`, `ExamForgeSketch.jsx`, `TechnoSketch.jsx` in `src/components/`. All names, emails and exam questions in them are made-up sample data.
- **Colors and fonts:** the variables at the top of `src/styles/base.css`
- **Backgrounds:** `src/styles/surfaces.css`
- **Resume:** replace `public/Thonangi_Prasanth_Kumar.pdf`, keeping the same file name
