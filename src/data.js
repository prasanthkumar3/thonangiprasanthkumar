// All the words on the site live here. Edit this file to update the portfolio.

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
  { label: "Skills", href: "#skills" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];

export const glance = [
  {
    title: "B.Tech, Computer Science",
    text: "Aditya Institute of Technology & Management, class of 2026, CGPA 8.1",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    text: "Plus ServiceNow platform administration training",
  },
  {
    title: "290+ participants, 90+ teams",
    text: "Supported through registration and navigation on the Techno Vision event website",
  },
];

export const projects = [
  {
    name: "AVISHKAAR",
    kind: "National-level hackathon website",
    year: "2025",
    role: "Full-stack developer",
    url: "https://avishkaar.co",
    urlLabel: "avishkaar.co",
    summary:
      "Avishkaar Season 4 is AITAM's national innovation hackathon. I designed and built the full-stack platform behind it, from the public event pages to the dashboards organizers used while the event was running.",
    built: [
      "Team registration and participant management",
      "Event listings on a responsive public site",
      "Admin dashboards for organizers",
      "REST APIs for registrations, user data and event workflows",
      "Deployment, testing and upkeep with the organizers through the live event",
    ],
    stack: "React, Node.js, Express, Tailwind CSS",
    figures: [
      { value: "48", label: "hour hackathon" },
      { value: "4", label: "domains: AI, Web3, IoT and Robotics" },
    ],
    // Add a screenshot: put a file in /public/projects and set image: "/projects/avishkaar.png"
    image: null,
  },
  {
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
    figures: [
      { value: "290+", label: "participants" },
      { value: "90+", label: "teams" },
    ],
    image: null,
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "Java", "C", "C++", "Data Structures in C"] },
  {
    group: "Web",
    items: ["MongoDB", "Express", "React", "Node.js", "JavaScript", "Tailwind CSS", "Bootstrap"],
  },
  { group: "Database", items: ["MySQL"] },
  { group: "Cloud and platforms", items: ["AWS fundamentals", "ServiceNow platform"] },
  { group: "Tools", items: ["Git", "Figma", "Wireshark", "Burp Suite", "MS Office"] },
];

export const experience = [
  {
    when: "2025",
    title: "Virtual internship, ServiceNow platform",
    place: "ServiceNow University with SmartBridge",
    text: "Structured training in platform fundamentals and administration. Worked with Flows, the Automated Test Framework, reports, workflows and platform configuration, and covered the Certified System Administrator exam modules.",
  },
  {
    when: "May 2024",
    title: "Community internship, social media awareness",
    place: "Tekkali, Srikakulam, Andhra Pradesh",
    text: "Ran workshops on digital literacy, online privacy and misinformation for rural communities, and used surveys and discussions to promote responsible social media use.",
  },
];

export const education = [
  {
    when: "2026",
    title: "B.Tech, Computer Science & Engineering",
    place: "Aditya Institute of Technology & Management, Tekkali",
    text: "CGPA 8.1",
  },
  {
    when: "2022",
    title: "Intermediate (MPC)",
    place: "Sri Chaitanya Junior College",
    text: "87.3%",
  },
  {
    when: "2020",
    title: "SSC",
    place: "Board of Secondary Education, Andhra Pradesh",
    text: "CGPA 10.0",
  },
];

export const certifications = [
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
  { title: "ServiceNow Virtual Internship Program, 2025", issuer: "ServiceNow University" },
  { title: "Introduction to Machine Learning", issuer: "NPTEL, IIT Kharagpur" },
  { title: "Introduction to Programming in C", issuer: "NPTEL, IIT Kanpur" },
  { title: "Problem Solving Through Programming in C", issuer: "NPTEL, IIT Madras" },
  { title: "Ethical Hacking & Cyber Security", issuer: "Supraja Technologies" },
  { title: "Penetration Testing & Vulnerability Assessment", issuer: "Supraja Technologies" },
];

export const beyond = [
  "I'm an active member of the Development Club and a volunteer with NSS. I've taken part in web development hackathons and APSSDC skill development programs.",
  "Away from the keyboard: runner-up in basketball at the college's annual sports meet, and I directed and acted in a short music cover that was screened on Annual Day.",
];
