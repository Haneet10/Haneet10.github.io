// Single source of truth for personal details.
// Everything here is taken from Haneet's résumé. Edit freely.

export const profile = {
  name: "Haneet Singh",
  initials: "HS",
  role: "Mechanical Engineering",
  school: "University of Waterloo",
  program: "BASc Mechanical Engineering, Co-op",
  classOf: "2031",
  term: "1A",
  email: "h365sing@uwaterloo.ca",
  links: {
    github: "https://github.com/Haneet10",
    linkedin: "https://www.linkedin.com/in/haneet-singh-uw",
  },
  site: "https://haneet10.github.io",
  // Drop a PDF at public/resume.pdf and set this to "/resume.pdf" to show the download link.
  resume: null as string | null,
  headline:
    "Mechanical engineering student at Waterloo. I build across hardware, software and the numbers in between.",
  description:
    "Haneet Singh is a Mechanical Engineering (Co-op) student at the University of Waterloo building engineering software, hardware prototypes and field-installed accessibility systems.",
} as const;

export const nav = [
  { href: "/#about", label: "About", sheet: "01" },
  { href: "/#work", label: "Work", sheet: "02" },
  { href: "/#experience", label: "Experience", sheet: "03" },
  { href: "/#contact", label: "Contact", sheet: "06" },
] as const;
