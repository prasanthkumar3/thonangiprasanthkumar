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

Every word on the site lives in `src/data.js` (projects, skills, education, certifications, contact details).

- **Add a project:** copy one object in the `projects` array and change the fields.
- **Add a screenshot to a project:** put the image in `public/projects/` and set `image: "/projects/your-file.png"` on that project.
- **Update the resume:** replace `public/Thonangi_Prasanth_Kumar.pdf` with the new file (keep the same name).

Colors and fonts are the variables at the top of `src/styles.css`.
