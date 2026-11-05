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
  description:
    "Haneet Singh is a Mechanical Engineering (Co-op) student at the University of Waterloo. Field-installed accessibility systems, hand-built hardware prototypes and financial models.",
} as const;

/** Top navigation. */
export const nav = [
  { href: "/#about", label: "About", sheet: "01" },
  { href: "/#work", label: "Work", sheet: "02" },
  { href: "/#experience", label: "Experience", sheet: "03" },
  { href: "/#contact", label: "Contact", sheet: "06" },
] as const;

/** Every section on the home page, in order. Drives the side rail and the jump menu. */
export const sections = [
  { id: "top", label: "Cover", sheet: "00" },
  { id: "about", label: "About", sheet: "01" },
  { id: "work", label: "Work", sheet: "02" },
  { id: "experience", label: "Experience", sheet: "03" },
  { id: "skills", label: "Skills", sheet: "04" },
  { id: "education", label: "Education", sheet: "05" },
  { id: "contact", label: "Contact", sheet: "06" },
] as const;

/** Key results shown under the hero. Real numbers only; each links to its evidence. */
export const highlights = [
  { value: "8", unit: "ramps", label: "Accessibility ramp systems configured, spanning 12–26 ft", href: "/work/accessibility-ramps/" },
  { value: "30+", unit: "/ week", label: "Wheelchairs, walkers and scooters serviced and assembled", href: "/#experience" },
  { value: "1st", unit: "to finish", label: "Team to complete a working walkie-talkie at a workshop competition", href: "/work/esp32-walkie-talkie/" },
  { value: "98.8", unit: "%", label: "Top-six high school average, before Waterloo Engineering", href: "/#education" },
] as const;
