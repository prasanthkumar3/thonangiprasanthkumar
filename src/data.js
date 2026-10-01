// Every word on the site lives in this file. Edit it to update the portfolio.

export const person = {
  name: "Thonangi Prasanth Kumar",
  email: "thonangiprasanthkumar@gmail.com",
  phone: "+91 90595 18937",
  phoneHref: "tel:+919059518937",
  linkedin: "https://www.linkedin.com/in/prasanth-kumar-thonangi",
  linkedinLabel: "linkedin.com/in/prasanth-kumar-thonangi",
  github: "https://github.com/prasanthkumar3",
  githubLabel: "github.com/prasanthkumar3",
  resume: "/Thonangi_Prasanth_Kumar.pdf",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Creative", href: "#creative" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const projects = {
  avishkaar: {
    name: "AVISHKAAR",
    kind: "National-level hackathon platform",
    year: "2025",
    role: "Full-stack developer",
    url: "https://avishkaar.co",
    urlLabel: "avishkaar.co",
    summary:
      "Avishkaar Season 4 is AITAM's national innovation hackathon, a 48-hour challenge across AI, Web3, IoT and Robotics. I designed and built the full-stack platform behind it: the public event pages, the team portal participants used, and the dashboards organizers ran the event from.",
    built: [
      "Team registration and participant management",
      "A team portal with member details, photo uploads and downloadable QR ID cards",
      "Accommodation requests and certificate-detail checks for teams",
      "Admin dashboards for organizers, backed by REST APIs",
      "Deployment, testing and upkeep with the organizers through the live event",
    ],
    stack: "React, Node.js, Express, Tailwind CSS",
  },
  examforge: {
    name: "ExamForge",
    kind: "Role-based online examination platform",
    year: "2026",
    role: "Full-stack developer",
    url: "https://examforge-frountend.vercel.app/",
    urlLabel: "examforge-frountend.vercel.app",
    summary:
      "ExamForge runs online exams from question bank to result. Examiners build and publish exams, students take them in a focused workspace, and scores are calculated the moment an attempt is submitted. Admins, examiners and students each get their own workspace.",
    built: [
      "Separate workspaces for admins, examiners and students",
      "Question bank and exam publishing for examiners",
      "Room-code entry, so students can take common exams without an account",
      "Instant scoring when an attempt is submitted",
      "A FastAPI and PostgreSQL backend, with a React frontend that talks to it through plain fetch",
    ],
    stack: "React, Vite, Tailwind CSS, FastAPI, PostgreSQL",
  },
  techno: {
    name: "Techno Vision",
    kind: "Official website of a two-day technical event",
    year: "Dec 2024 to Feb 2025",
    role: "Web designer and coordinator",
    url: "https://techno.vision.adityatekkali.edu.in",
    urlLabel: "techno.vision.adityatekkali.edu.in",
    summary:
      "The CSE department's two-day technical event needed a website that participants could register on and find their way around. I developed it and managed it through the event.",
    built: [
      "Smooth registration and navigation for participants",
      "Responsive design across screen sizes",
      "Stable performance across both days of the event",
    ],
    stack: null,
  },
};

export const stackGroups = ["All", "Languages", "Web", "Database", "Cloud", "Tools"];

export const stackItems = [
  {
    name: "React",
    group: "Web",
    note: "The front end of AVISHKAAR and ExamForge: event pages, team portals, exam workspaces and dashboards.",
    link: { label: "Try the sketches", href: "#work" },
  },
  {
    name: "Node.js",
    group: "Web",
    note: "The server side of AVISHKAAR, running the APIs for registrations, user data and event workflows.",
    link: { label: "See the API tab", href: "#work" },
  },
  {
    name: "Express",
    group: "Web",
    note: "Routing and REST endpoints for AVISHKAAR, built and tested against a live event.",
    link: { label: "See the API tab", href: "#work" },
  },
  {
    name: "FastAPI",
    group: "Web",
    note: "The backend of ExamForge: the APIs for exams, attempts and instant scoring, with role-based access.",
    link: { label: "Try the ExamForge sketch", href: "#work" },
  },
  {
    name: "MongoDB",
    group: "Web",
    note: "The M in the MERN stack I work in, and the document-database half of my full-stack skills.",
  },
  {
    name: "JavaScript",
    group: "Web",
    note: "The language running through everything I build for the web, front end and back.",
  },
  {
    name: "Tailwind CSS",
    group: "Web",
    note: "How I style responsive interfaces, on AVISHKAAR and ExamForge.",
    link: { label: "Resize the Techno Vision site", href: "#work" },
  },
  {
    name: "Bootstrap",
    group: "Web",
    note: "Another tool I know for getting responsive layouts up quickly.",
  },
  {
    name: "Python",
    group: "Languages",
    note: "One of my core programming languages, from my degree and problem solving. It is also the language behind the ExamForge backend.",
  },
  {
    name: "Java",
    group: "Languages",
    note: "A core language from my degree, and the one I reach for on object-oriented problems.",
  },
  {
    name: "C",
    group: "Languages",
    note: "Where I learned data structures. Backed by two NPTEL courses, from IIT Kanpur and IIT Madras.",
    link: { label: "See the certifications", href: "#credentials" },
  },
  {
    name: "C++",
    group: "Languages",
    note: "Part of my core programming set, alongside C, for data structures and problem solving.",
  },
  {
    name: "PostgreSQL",
    group: "Database",
    note: "The database behind ExamForge, storing exams, questions, attempts and users.",
    link: { label: "Try the ExamForge sketch", href: "#work" },
  },
  {
    name: "MySQL",
    group: "Database",
    note: "My relational database skill, next to PostgreSQL and MongoDB.",
  },
  {
    name: "AWS",
    group: "Cloud",
    note: "AWS Certified Cloud Practitioner. I know the fundamentals of the cloud services and how they fit together.",
    link: { label: "See the certifications", href: "#credentials" },
  },
  {
    name: "ServiceNow",
    group: "Cloud",
    note: "A 2025 virtual internship covering platform administration, Flows and the Automated Test Framework.",
    link: { label: "See the timeline", href: "#journey" },
  },
  {
    name: "Git",
    group: "Tools",
    note: "Version control for everything above.",
  },
  {
    name: "Figma",
    group: "Tools",
    note: "Where I lay out interfaces before I write them.",
    link: { label: "See the creative side", href: "#creative" },
  },
  {
    name: "Wireshark",
    group: "Tools",
    note: "Network analysis, next to my ethical hacking and penetration testing courses.",
    link: { label: "See the certifications", href: "#credentials" },
  },
  {
    name: "Burp Suite",
    group: "Tools",
    note: "Web application security testing, from the same security coursework.",
    link: { label: "See the certifications", href: "#credentials" },
  },
  {
    name: "MS Office",
    group: "Tools",
    note: "Documents, slides and spreadsheets for reports and event paperwork.",
  },
];

export const swatches = [
  { name: "Ink", hex: "#1A1320", light: false },
  { name: "Paper", hex: "#FFFFFF", light: true },
  { name: "Magenta", hex: "#FF007F", light: false },
];

export const community = [
  { title: "Development Club", text: "Active member" },
  { title: "NSS", text: "Volunteer" },
  { title: "Basketball", text: "Runner-up, college annual sports meet" },
  { title: "Hackathons", text: "Web development hackathons and APSSDC skill development programs" },
  {
    title: "Rural workshops",
    text: "Digital literacy, privacy and misinformation, May 2024",
  },
];

export const journey = [
  {
    year: "2020",
    title: "SSC",
    place: "Board of Secondary Education, Andhra Pradesh",
    text: "CGPA 10.0",
  },
  {
    year: "2022",
    title: "Intermediate (MPC)",
    place: "Sri Chaitanya Junior College",
    text: "87.3%",
  },
  {
    year: "May 2024",
    title: "Community internship, social media awareness",
    place: "Tekkali, Srikakulam, Andhra Pradesh",
    text: "Ran workshops on digital literacy, online privacy and misinformation for rural communities, and used surveys and discussions to promote responsible social media use.",
  },
  {
    year: "Dec 2024",
    title: "Techno Vision goes live",
    place: "CSE Department, AITAM",
    text: "Built and managed the event website through to February 2025. 290+ participants from 90+ teams registered and found their way around it.",
  },
  {
    year: "2025",
    title: "Virtual internship, ServiceNow platform",
    place: "ServiceNow University with SmartBridge",
    text: "Platform fundamentals and administration, Flows, the Automated Test Framework, reports and configuration. Covered the Certified System Administrator exam modules.",
  },
  {
    year: "2025",
    title: "AVISHKAAR, national hackathon",
    place: "AITAM",
    text: "Designed and built the full-stack platform: registrations, participant management, event listings and organizer dashboards.",
  },
  {
    year: "2026",
    title: "B.Tech, Computer Science & Engineering",
    place: "Aditya Institute of Technology & Management, Tekkali",
    text: "CGPA 8.1. Graduating, and looking for a first full-time role.",
  },
];

export const certifications = [
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", big: true },
  { title: "ServiceNow Virtual Internship Program, 2025", issuer: "ServiceNow University" },
  { title: "Introduction to Machine Learning", issuer: "NPTEL, IIT Kharagpur" },
  { title: "Introduction to Programming in C", issuer: "NPTEL, IIT Kanpur" },
  { title: "Problem Solving Through Programming in C", issuer: "NPTEL, IIT Madras" },
  { title: "Ethical Hacking & Cyber Security", issuer: "Supraja Technologies" },
  { title: "Penetration Testing & Vulnerability Assessment", issuer: "Supraja Technologies" },
];
