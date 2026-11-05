// Experience, skills and education. Sourced from Haneet's résumé.

export type Role = {
  org: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  points: string[];
  tags: string[];
  /** Related project slugs, linked from the entry. */
  projects?: string[];
};

export const experience: Role[] = [
  {
    org: "Waterloo Rocketry",
    title: "Propulsion Team",
    start: "2026",
    end: "Present",
    summary: "Student design team that designs, builds and launches high-power rockets. Joined the propulsion team in 2026; project work will be added here as it happens.",
    points: [],
    tags: ["Propulsion", "Design team"],
  },
  {
    org: "Action Medical Home Health",
    title: "Junior Mobility Systems Technician",
    start: "Jul 2025",
    end: "Sep 2026",
    summary: "Maintained, installed and serviced mobility and medical equipment across homes, hospitals and long-term care.",
    points: [
      "Maintained, repaired and assembled 30+ wheelchairs, walkers and scooters a week, keeping equipment safe and reliable and minimizing downtime.",
      "Completed around 5 on-site service calls a week, installing and servicing hospital beds, ceiling lifts and accessibility equipment to Ontario healthcare and long-term care standards.",
      "Configured 8 modular accessibility ramp systems spanning 12–26 ft, including slope calculations, layout optimization and fabrication planning for code-compliant installs.",
      "Coordinated structural footing placement and site integration so each ramp fit the existing property and the client's accessibility needs.",
    ],
    tags: ["Field service", "Accessibility", "Quoting"],
    projects: ["accessibility-ramps"],
  },
  {
    org: "Purple Bean Media",
    title: "Graphic Design Co-op Student",
    start: "Jun 2025",
    end: "Aug 2025",
    summary: "Branded visual content for client social media accounts.",
    points: [
      "Designed social posts, stories and short videos for client accounts within established brand guidelines.",
      "Applied typography, colour theory and layout principles in Canva, Photoshop and Premiere Pro while managing several deadlines at once.",
    ],
    tags: ["Brand design", "Content"],
  },
];

export type SkillGroup = {
  title: string;
  note: string;
  items: { name: string; detail?: string; evidence?: string[] }[];
};

// No proficiency bars: each skill points at the work that uses it.
export const skills: SkillGroup[] = [
  {
    title: "Programming & Software",
    note: "Languages and libraries",
    items: [
      { name: "Python", detail: "Hardware I/O, data analysis, simulation", evidence: ["pi-joystick"] },
      { name: "C++", detail: "Arduino and embedded", evidence: ["arduino-rover"] },
      { name: "MATLAB", detail: "Physics modelling" },
      { name: "Git & GitHub", detail: "Version control, documentation" },
    ],
  },
  {
    title: "Mechanical Design & CAD",
    note: "Modelling and drawings",
    items: [
      { name: "SolidWorks" },
      { name: "Fusion 360" },
      { name: "AutoCAD", detail: "Mechanical and architectural layouts" },
      { name: "Engineering drawings", detail: "First/third-angle projection, section views" },
      { name: "Machining", detail: "Drill mill, hole layout", evidence: ["pi-joystick"] },
    ],
  },
  {
    title: "Engineering & Electronics",
    note: "Analysis and hardware",
    items: [
      { name: "Ramp slope & layout", detail: "Rise, run and code limits", evidence: ["accessibility-ramps"] },
      { name: "Circuits", detail: "Breadboarding, soldering, PCB fundamentals", evidence: ["esp32-walkie-talkie", "arduino-rover"] },
      { name: "Microcontrollers", detail: "Raspberry Pi GPIO, Arduino, ESP32", evidence: ["pi-joystick", "arduino-rover", "esp32-walkie-talkie"] },
      { name: "Motor control", detail: "PWM calibration", evidence: ["arduino-rover"] },
    ],
  },
  {
    title: "Data & Financial Tools",
    note: "Models and analysis",
    items: [
      { name: "Microsoft Excel", detail: "Financial models, amortization", evidence: ["finance-model"] },
      { name: "Registered accounts", detail: "TFSA, RRSP, FHSA planning", evidence: ["finance-model"] },
      { name: "ETF & portfolio analysis", evidence: ["finance-model"] },
      { name: "Personal tax (T1)", detail: "Preparation" },
    ],
  },
  {
    title: "Field & Collaboration",
    note: "Working with people",
    items: [
      { name: "On-site service", detail: "Hospital beds, ceiling lifts, mobility equipment" },
      { name: "Team builds", detail: "Under time pressure", evidence: ["esp32-walkie-talkie"] },
      { name: "Visual design", detail: "Canva, Photoshop, Premiere Pro" },
    ],
  },
];

export const education = {
  school: "University of Waterloo",
  degree: "Bachelor of Applied Science, Mechanical Engineering (Co-op)",
  period: "2026 — 2031",
  status: "1A · Class of 2031",
  highSchool: {
    school: "Assumption College School",
    credential: "Ontario Secondary School Diploma",
    period: "2022 — 2026",
    note: "Top six U/M course average: 98.8%",
  },
  involvement: [
    "Waterloo Rocketry, propulsion team",
    "Student Council Lead: planned campus events for communities of 500+",
    "Model United Nations Director (2025), Distinguished Delegate (2024)",
    "STEM Club executive, Coding Club, Waterloo math competitions",
    "Canadian World Affairs Youth Council executive",
    "265+ volunteer hours; peer tutor in calculus, physics, chemistry and English",
  ],
};
