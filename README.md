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

## Editing the content

Almost every word lives in `src/data.js`: projects, skills (and where each one shows up), the timeline, certifications and contact details.

- **Update the resume:** replace `public/Thonangi_Prasanth_Kumar.pdf`, keeping the same file name.
- **Change colors and fonts:** the variables at the top of `src/styles/base.css`.
- **Sections:** each one is a component in `src/components/` with its own stylesheet in `src/styles/`.
- **Demo data in the project sketches:** the sample teams in `src/components/AvishkaarSketch.jsx` are made up for the demo.
