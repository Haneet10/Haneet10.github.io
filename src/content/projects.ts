// ─────────────────────────────────────────────────────────────
// Projects. Add a new one by appending an object to `projects`.
// Images are referenced by key ("folder/name") — run
// `npm run images <source-dir>` after adding them to scripts/image-manifest.mjs.
// Every fact here comes from Haneet's résumé, repos or photos.
// ─────────────────────────────────────────────────────────────

export type Discipline = "Hardware" | "Software" | "Field" | "Finance";

export type Figure = {
  image: string; // key in images.generated.json
  alt: string;
  caption?: string;
  /** CSS object-position used when the image is cropped to fit, e.g. "50% 70%". */
  focus?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One line for the index. Plain language. */
  tagline: string;
  /** Two or three sentences, plain language, shown at the top of the project page. */
  summary: string;
  year: string;
  disciplines: Discipline[];
  context: string;
  role: string;
  tools: string[];
  cover?: Figure;
  links?: { label: string; href: string; kind: "github" | "live" }[];
  featured?: boolean;
  specs: [string, string][];
  sections: { heading: string; body: string[] }[];
  /** Technical detail, kept apart so the main story stays readable. */
  engineers?: string[];
  gallery?: Figure[];
  video?: { src: string; caption: string };
  /** Optional interactive figure rendered on the project page. */
  interactive?: "ramp-calculator" | "amortization";
};

export const projects: Project[] = [
  {
    slug: "accessibility-ramps",
    title: "Accessibility Ramp Systems",
    tagline: "Modular aluminium wheelchair ramps, built to code at clients' homes.",
    summary:
      "A ramp is often the difference between someone leaving their home on their own or not at all. At Action Medical I worked on modular aluminium ramp systems for clients' homes, from the slope and layout that make each one fit its site to taking it from flat-packed modules to a finished install.",
    year: "2025–26",
    disciplines: ["Field", "Hardware"],
    context: "Action Medical Home Health",
    role: "Junior Mobility Systems Technician",
    tools: ["Slope & layout calculations", "Modular ramp configurator", "Site measurement", "Power tools"],
    featured: true,
    cover: {
      image: "ramps/finished-run",
      focus: "50% 72%",
      alt: "A finished modular aluminium ramp with handrails on both sides, running from a wooden deck across a gravel driveway",
    },
    specs: [
      ["Systems", "8, spanning 12–26 ft"],
      ["Slope target", "1 : 12 maximum"],
      ["Example rise", "36 in (914 mm)"],
      ["Example footprint", "25.5 × 9.8 ft switchback"],
      ["Material", "Modular aluminium, perforated deck"],
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Every home is different. The height of the door, the space in the driveway, where the steps come down and how much room there is to turn all change what a ramp can look like. A ramp that is too steep is unsafe for a wheelchair, and one that is too long may not fit on the property at all.",
          "The job is to turn a measured rise into a ramp that is gentle enough to use safely and still fits the space it has.",
        ],
      },
      {
        heading: "How it gets planned",
        body: [
          "Accessibility ramps are held to a maximum slope of 1:12, meaning one unit of height for every twelve units of length. Planning starts from the measured rise at the door, which sets the length of ramp that slope requires. Standard modules (straight sections, turn platforms and landings) are then arranged so the run fits the site, with footings placed to suit the property.",
          "On the install shown in the layout sheet, the door sat 36 inches up. At 1:12 that needs at least 36 feet of ramp, far longer than the space allowed. The layout folds it into a switchback, two parallel runs joined by a turn platform, so it fits in a 25.5 by 9.8 foot footprint and comes out slightly gentler than required, at 1:13.",
        ],
      },
      {
        heading: "On site",
        body: [
          "Modules arrive flat-packed. The frame and adjustable legs go in first and get levelled, then the deck sections, platforms and handrails. The second install shown here was a straight run with a platform landing at a rural home, installed in March 2026.",
        ],
      },
    ],
    engineers: [
      "Required run L = rise × N for a 1:N slope. For a 36 in rise at the code maximum (N = 12), L = 432 in = 36 ft. The configured layout gives 1:13.0, so the sloped length is 468 in ≈ 39 ft, or about 4.4° from horizontal.",
      "That run is split across two parallel legs with a turn platform (module M3) at the top and bottom of the turn, which is why a 39 ft ramp fits a 25.5 ft footprint. Parts list on this layout: M1 × 9, M3 × 2, M4 × 1, M6 × 1, M7 × 2.",
    ],
    interactive: "ramp-calculator",
    gallery: [
      { image: "ramps/layout-sheet", alt: "Printed plan view of a switchback ramp layout: 25.5 ft long, 9.8 ft wide, 36 inch target rise, 1:12 selected slope, 1:13 actual", caption: "Layout sheet, switchback install (Aug 2025). 36 in rise, 1:13 actual slope." },
      { image: "ramps/switchback-frame", alt: "Aluminium ramp frame and support legs being assembled beside a house", caption: "Frame and legs going in on the switchback." },
      { image: "ramps/site-staging", alt: "Tool bags and flat-packed ramp boxes staged in a driveway", caption: "Staging the modules and tools." },
      { image: "ramps/frame-posts", alt: "Ramp support posts and landing frame set out in a field", caption: "Second install (Mar 2026): posts and landing frame." },
      { image: "ramps/module-sawhorse", alt: "A perforated aluminium deck module resting on sawhorses beside a wooden deck", caption: "Deck module ready to set." },
      { image: "ramps/finished-landing", alt: "Finished ramp seen from the bottom with continuous handrails", caption: "Finished: continuous handrails both sides." },
      { image: "ramps/finished-side", alt: "Side view of the finished straight ramp and landing", caption: "Side elevation of the straight run." },
    ],
  },
  {
    slug: "truss-lab",
    title: "Truss Lab",
    tagline: "Draw a bridge in the browser and watch the forces in every member update as you drag.",
    summary:
      "A free web app for checking trusses, the triangulated frames used in bridges and roofs. You draw joints and members, add supports and loads, and it shows which parts are being stretched or squeezed, how much the structure bends and which part would fail first.",
    year: "2026",
    disciplines: ["Software"],
    context: "Personal project",
    role: "Design and development",
    tools: ["JavaScript", "SVG", "Direct stiffness method", "Node test runner", "GitHub Actions"],
    featured: true,
    cover: {
      image: "truss-lab/app-dark",
      alt: "Truss Lab solving a Pratt bridge: members coloured blue for tension and red for compression, with a member force table",
    },
    links: [
      { label: "Open the live app", href: "https://haneet10.github.io/Truss-Lab/", kind: "live" },
      { label: "Source on GitHub", href: "https://github.com/Haneet10/Truss-Lab", kind: "github" },
    ],
    specs: [
      ["Runs in", "Any modern browser"],
      ["Dependencies", "None"],
      ["Presets", "Pratt, Howe, Warren, Fink roof, cantilever"],
      ["Materials", "A36 steel, 6061-T6, Ti-6Al-4V, Douglas fir"],
      ["Sharing", "Whole model encoded in the URL"],
    ],
    sections: [
      {
        heading: "What it does",
        body: [
          "Every edit re-solves the structure fast enough to keep up with your mouse. Members are coloured by whether they are in tension or compression, with line weight showing how hard they are working, and an exaggerated deflected shape is drawn over the top.",
          "Each member gets a factor of safety against yielding and against buckling, and the app tells you which one governs. If the structure is unstable it names the joint that is free to move, so you know where to add a member.",
        ],
      },
      {
        heading: "Why it helps",
        body: [
          "Hand-solving trusses with the method of joints is slow, and it is hard to build intuition for how moving one joint changes everything else. Making it interactive turns a page of algebra into something you can feel.",
        ],
      },
    ],
    engineers: [
      "Solver: the direct stiffness method. Each member adds k·tᵀt (k = EA/L, t = [−c, −s, c, s]) to the global matrix, which is partitioned into free and restrained DOFs and solved by Gaussian elimination with partial pivoting. A near-zero pivot flags a mechanism.",
      "Member force N = k·t·d, stress σ = N/A, reactions R = K·d − F. Buckling uses a pinned-pinned Euler column with a solid round section (I = A²/4π). The test suite checks results against independent hand calculations, including method of joints, method of sections, δ = PL/EA and equilibrium on every preset.",
    ],
  },
  {
    slug: "mech-lab",
    title: "Mech Lab",
    tagline: "A Python toolkit that does the hand calculations of a mechanics course, then checks and plots them.",
    summary:
      "Mech Lab does the calculations you would normally grind through by hand in a mechanics or machine design course. Give it a beam, a gear train, a column or a bearing, and it tells you how much it bends, how hard it is working and whether it will hold.",
    year: "2026",
    disciplines: ["Software"],
    context: "Personal project",
    role: "Design and development",
    tools: ["Python", "NumPy", "SciPy", "SymPy", "Matplotlib", "CustomTkinter", "pytest", "GitHub Actions"],
    cover: {
      image: "mech-lab/readme-hero",
      alt: "Mech Lab banner: a cantilever beam deflecting under a 400 N load, with max deflection 11.85 mm, max stress 53.3 MPa and factor of safety 4.7",
    },
    links: [{ label: "Source on GitHub", href: "https://github.com/Haneet10/Mech-Lab", kind: "github" }],
    specs: [
      ["Modules", "8, plus plotting and a desktop GUI"],
      ["Automated tests", "51, run on every push"],
      ["Python", "3.9 – 3.12"],
      ["Shared data", "Materials database by name"],
      ["Licence", "MIT"],
    ],
    sections: [
      {
        heading: "What it covers",
        body: [
          "Eight modules, one job each: beams, stress, gears, thermal, bearings, column buckling, materials and units. They share a materials database, so you can name a material like “Aluminum 6061-T6” instead of typing in its properties.",
          "A plotting module draws deflection curves, shear and moment diagrams and stress–strain curves, and a desktop GUI wraps the beam calculator, gear calculator and unit converter for quick checks without writing code.",
        ],
      },
      {
        heading: "Checked, not just computed",
        body: [
          "Outputs are cross-checked against first-principles hand calculations and textbook benchmarks from Shigley and Hibbeler. The test suite runs automatically on every change, so a regression shows up before it reaches anyone.",
        ],
      },
    ],
    engineers: [
      "Beam analysis integrates Euler–Bernoulli shear and moment; stress analysis covers 3D Mohr's circle transformations and von Mises; bearings use ISO 281 basic rating life (L10); column buckling covers Euler and Johnson regimes. SymPy handles the symbolic side of the GUI, with strict input validation throughout.",
    ],
    gallery: [
      { image: "mech-lab/modules", alt: "Eight animated module diagrams: beams, stress, gears, thermal, bearings, buckling, materials and units", caption: "The eight modules, as drawn in the project README." },
    ],
  },
  {
    slug: "pi-joystick",
    title: "Raspberry Pi Arcade Joystick",
    tagline: "A joystick built from wood and microswitches, wired straight into a Raspberry Pi to play arcade games.",
    summary:
      "A physical arcade controller built from scratch. The stick, its spring centring and the mounting plates are hand-made, and every direction and button is wired directly to the Raspberry Pi's pins, then mapped in software so it plays classic arcade games.",
    year: "2026",
    disciplines: ["Hardware", "Software"],
    context: "Personal build",
    role: "Mechanical build, wiring, input software",
    tools: ["Raspberry Pi", "Python", "GPIO", "Drill mill", "Microswitches"],
    cover: {
      image: "pi-joystick/joystick-and-pi",
      focus: "50% 55%",
      alt: "A hand-built wooden joystick with a spring-centred stick, wired to a Raspberry Pi in a wooden case",
    },
    specs: [
      ["Controller", "Raspberry Pi, cased"],
      ["Inputs", "4 directions + fire buttons"],
      ["Interface", "Direct GPIO (pins 36, 32, 35, 12)"],
      ["Fabrication", "Drill-milled plates and linkage"],
      ["Tested on", "Tetris and Aliens"],
    ],
    sections: [
      {
        heading: "The build",
        body: [
          "It started with household parts: a door stop became the spring-centred stick, and metal nails became the contacts that register each direction. The wooden housing that holds them was measured, marked and drilled on a drill mill. Hole placement matters: if the switches sit even slightly off, the stick either misses inputs or triggers two directions at once.",
          "Each direction closes a microswitch wired to its own GPIO pin on the Pi. A configuration step maps up, down, left and right to physical pins 36, 32, 35 and 12, and the fire buttons are mapped the same way.",
        ],
      },
      {
        heading: "Making it feel right",
        body: [
          "Mechanical switches bounce, sending a burst of on/off signals for a single press. I refined the debouncing in the input-parsing script and tidied the signal routing until false inputs and lag disappeared during real play.",
        ],
      },
    ],
    gallery: [
      { image: "pi-joystick/joystick-detail", alt: "Close-up of the spring-centred stick and switches in the wooden housing", caption: "Spring-centred stick in the hand-made housing." },
      { image: "pi-joystick/gpio-mapping", alt: "Terminal on the Raspberry Pi mapping joystick directions to GPIO pins 36, 32, 35 and 12", caption: "Mapping each direction to a GPIO pin." },
      { image: "pi-joystick/arcade-config", alt: "Arcade game input menu showing player 1 controls bound to the joystick", caption: "Controls bound in the arcade front end." },
    ],
  },
  {
    slug: "esp32-walkie-talkie",
    title: "ESP32 Walkie-Talkie",
    tagline: "A working push-to-talk walkie-talkie on an ESP32. First team to finish at a workshop competition.",
    summary:
      "A working walkie-talkie built around an ESP32 microcontroller, which has Bluetooth and Wi-Fi built in. It was a team build at a timed workshop competition, and ours was the first team to finish a working model.",
    year: "2025",
    disciplines: ["Hardware"],
    context: "Workshop competition, team build",
    role: "Team member",
    tools: ["ESP32", "Breadboard", "Audio amplifier", "Speaker", "Push button"],
    cover: {
      image: "walkie-talkie/esp32-board",
      alt: "An ESP32 development board on a table",
    },
    specs: [
      ["Microcontroller", "ESP32 (Bluetooth + Wi-Fi)"],
      ["Input", "Push-to-talk button"],
      ["Output", "Amplifier and speaker"],
      ["Prototyping", "Solderless breadboard"],
      ["Result", "First team to a working model"],
    ],
    sections: [
      {
        heading: "The build",
        body: [
          "Everything sits on one breadboard: the ESP32, a push-to-talk button, and an amplifier board driving a small speaker. Press the button to talk, release it to listen.",
          "We built it as a team, against the clock, at a workshop competition, and were the first team to get a working model. The short clip shows it on the bench.",
        ],
      },
    ],
    video: { src: "/media/walkie-talkie.mp4", caption: "The finished breadboard prototype." },
    gallery: [
      { image: "walkie-talkie/breadboard", alt: "ESP32 walkie-talkie prototype on a breadboard with a speaker and push button", caption: "ESP32, amplifier, speaker and push-to-talk button." },
    ],
  },
  {
    slug: "arduino-robot",
    title: "Arduino Rover",
    tagline: "A two-wheel Arduino robot with a hand-soldered driver board and downward-facing sensors.",
    summary:
      "A small two-wheel robot driven by an Arduino Uno. The motor driver circuit is hand-soldered on perfboard, and a second board underneath carries sensors that look down at the floor.",
    year: "2024",
    disciplines: ["Hardware", "Software"],
    context: "Electronics build",
    role: "Electronics, soldering, programming",
    tools: ["Arduino Uno", "C++", "DC gearmotors", "Perfboard", "Soldering"],
    cover: {
      image: "arduino-robot/front",
      alt: "A two-wheel robot with an Arduino Uno and a hand-soldered perfboard on a hardboard chassis",
    },
    specs: [
      ["Controller", "Arduino Uno"],
      ["Drive", "Two DC gearmotors + caster"],
      ["Electronics", "Hand-soldered perfboard"],
      ["Language", "C++"],
    ],
    sections: [
      {
        heading: "The build",
        body: [
          "The chassis carries two yellow DC gearmotors and a caster wheel. The Arduino sits on top, with the motor driver circuit soldered by hand on perfboard rather than bought as a module. A second perfboard underneath holds two sensors pointed at the floor.",
        ],
      },
    ],
    gallery: [
      { image: "arduino-robot/three-quarter", alt: "Three-quarter view of the Arduino robot", caption: "Arduino Uno on the hardboard chassis." },
      { image: "arduino-robot/sensor-board", alt: "Underside perfboard with two sensors and resistors facing down", caption: "Hand-soldered sensor board under the chassis." },
    ],
  },
  {
    slug: "finance-model",
    title: "Personal Finance & Portfolio Model",
    tagline: "A spreadsheet model comparing Canadian registered accounts, ETFs and loan repayment plans.",
    summary:
      "A financial planning model built in Excel to answer practical questions: which mix of TFSA, RRSP and FHSA contributions comes out ahead over time, how a Canadian dividend ETF stacks up on cost and return, and how different repayment schedules change the total interest on a loan.",
    year: "2025",
    disciplines: ["Finance"],
    context: "Personal project",
    role: "Modelling and analysis",
    tools: ["Microsoft Excel", "Monarch Money"],
    specs: [
      ["Accounts modelled", "TFSA, RRSP, FHSA"],
      ["Inputs", "Contributions, growth, tax brackets, allocation"],
      ["Fund analysis", "XEI: MER, yield, 1/3/5-yr returns"],
      ["Debt", "Loan amortization scenarios"],
    ],
    sections: [
      {
        heading: "Registered accounts",
        body: [
          "The model projects long-term growth across TFSA, RRSP and FHSA accounts, accounting for annual contributions, compound growth, asset allocation and how a change in marginal tax bracket shifts the value of each account.",
        ],
      },
      {
        heading: "Fund suitability",
        body: [
          "For XEI, a Canadian equity dividend ETF, I compared management expense ratio, dividend yield and trailing 1-, 3- and 5-year total returns to judge whether it fit an income-focused portfolio.",
        ],
      },
      {
        heading: "Repayment schedules",
        body: [
          "Amortization models compare alternative repayment schedules for an ODSP repayment, showing how payment size changes principal reduction, the repayment timeline and cumulative interest under different rate and cash-flow assumptions.",
        ],
      },
    ],
    interactive: "amortization",
  },
];

export const disciplines: Discipline[] = ["Field", "Hardware", "Software", "Finance"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
