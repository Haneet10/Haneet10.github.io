// ─────────────────────────────────────────────────────────────
// Projects. Add a new one by appending an object to `projects`.
// Every project tells the same story: Purpose → Approach → Result.
// Images are referenced by key ("folder/name"): add photos to
// scripts/image-manifest.mjs and run `npm run images -- <source-dir>`.
// Every fact here comes from Haneet's résumé, his answers, or the photos.
// ─────────────────────────────────────────────────────────────

export type Discipline = "Field" | "Hardware" | "Software" | "Finance";

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
  year: string;
  disciplines: Discipline[];
  context: string;
  role: string;
  tools: string[];
  cover?: Figure;
  links?: { label: string; href: string; kind: "github" | "live" }[];
  featured?: boolean;
  /** Key numbers. Real values only. */
  outcomes: { value: string; label: string }[];
  /** Why the project exists: the problem or goal. */
  purpose: { lead: string; body?: string[] };
  /** What was done, in a few short steps. */
  approach: { heading: string; body: string }[];
  /** What it achieved. */
  result: { lead: string; body?: string[] };
  /** One honest takeaway. */
  learned?: string;
  specs: [string, string][];
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
    year: "2025–26",
    disciplines: ["Field", "Hardware"],
    context: "Action Medical Home Health",
    role: "Junior Mobility Systems Technician",
    tools: ["Slope calculations", "Layout planning", "Site measurement", "Footing placement"],
    featured: true,
    cover: {
      image: "ramps/finished-run",
      focus: "50% 72%",
      alt: "A finished modular aluminium ramp with handrails on both sides, running from a wooden deck across a gravel driveway",
    },
    outcomes: [
      { value: "8", label: "ramp systems configured" },
      { value: "12–26 ft", label: "range of spans" },
      { value: "1 : 13", label: "achieved slope, inside the 1 : 12 limit" },
    ],
    purpose: {
      lead: "A ramp is often the difference between someone leaving their home on their own, or not at all.",
      body: [
        "Every home is different: the height of the door, the room in the driveway, where the steps come down. A ramp that is too steep is unsafe in a wheelchair, and one that is too long won't fit on the property. Each install has to satisfy both.",
      ],
    },
    approach: [
      {
        heading: "Measure the rise",
        body: "Everything starts from the height of the door. At the 1:12 maximum slope, every inch of rise needs a foot of ramp, so a 36 in rise needs at least 36 ft.",
      },
      {
        heading: "Fit it to the site",
        body: "Standard modules (straight runs, turn platforms, landings) are arranged so that length fits the property. On the switchback shown here, two parallel runs joined by turn platforms fold a 39 ft ramp into a 25.5 × 9.8 ft footprint.",
      },
      {
        heading: "Build it level",
        body: "Footings and adjustable legs go in first and get levelled, then the deck sections, platforms and continuous handrails.",
      },
    ],
    result: {
      lead: "Clients got step-free access to their homes, on ramps at or below the code slope limit.",
      body: [
        "Eight systems spanning 12 to 26 ft, from a tight switchback beside a house in August 2025 to a long straight run with a landing at a rural home in March 2026.",
      ],
    },
    learned: "Engineering is judged by whether it works for the person using it, not by how it looks on the layout sheet.",
    specs: [
      ["Systems", "8, spanning 12–26 ft"],
      ["Slope limit", "1 : 12 maximum"],
      ["Example rise", "36 in (914 mm)"],
      ["Example footprint", "25.5 × 9.8 ft switchback"],
      ["Material", "Modular aluminium, perforated deck"],
    ],
    engineers: [
      "Required run L = rise × N for a 1:N slope. For a 36 in rise at the code maximum (N = 12), L = 432 in = 36 ft. The configured layout gives 1:13.0, so the sloped length is 468 in ≈ 39 ft, or about 4.4° from horizontal.",
      "That run is split across two parallel legs with turn platforms (module M3), which is why a 39 ft ramp fits a 25.5 ft footprint. Parts list on this layout: M1 × 9, M3 × 2, M4 × 1, M6 × 1, M7 × 2.",
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
    slug: "pi-joystick",
    title: "Raspberry Pi Arcade Joystick",
    tagline: "An arcade controller made from a door stop, nails and wood, wired straight into a Raspberry Pi.",
    year: "2026",
    disciplines: ["Hardware", "Software"],
    context: "Personal build",
    role: "Design, machining, wiring, input software",
    tools: ["Raspberry Pi", "Python", "GPIO", "Drill mill"],
    featured: true,
    cover: {
      image: "pi-joystick/joystick-and-pi",
      focus: "50% 55%",
      alt: "A hand-built wooden joystick with a spring-centred stick, wired to a Raspberry Pi in a wooden case",
    },
    outcomes: [
      { value: "4", label: "directions, one GPIO pin each" },
      { value: "2", label: "arcade games played on it" },
      { value: "0", label: "off-the-shelf joystick parts" },
    ],
    purpose: {
      lead: "Take an idea from concept to a working prototype, using household parts instead of a kit.",
      body: [
        "Building the controller from scratch meant solving the mechanical, electrical and software problems myself, and seeing how each one affects the others.",
      ],
    },
    approach: [
      {
        heading: "Machine the housing",
        body: "A door stop became the spring-centred stick and metal nails became the contacts for each direction. The wooden housing was measured, marked and drilled on a drill mill so every contact sat exactly where it needed to.",
      },
      {
        heading: "Wire it to the Pi",
        body: "Each direction and the fire button connect to their own GPIO pin. Up, down, left and right map to physical pins 36, 32, 35 and 12.",
      },
      {
        heading: "Make it feel right",
        body: "Mechanical contacts bounce, sending a burst of signals for one press. I refined the debouncing in the Python input script and the signal routing until false inputs and lag were gone.",
      },
    ],
    result: {
      lead: "A fully working arcade controller, used to play Tetris and Aliens.",
    },
    learned: "Small changes in the code had a butterfly effect on how the whole system responded. Hardware and software can't be debugged in isolation.",
    specs: [
      ["Controller", "Raspberry Pi, cased"],
      ["Inputs", "4 directions + fire button"],
      ["Interface", "Direct GPIO (pins 36, 32, 35, 12)"],
      ["Fabrication", "Drill-milled wooden housing"],
      ["Tested on", "Tetris and Aliens"],
    ],
    gallery: [
      { image: "pi-joystick/joystick-detail", alt: "Close-up of the spring-centred stick and contacts in the wooden housing", caption: "Spring-centred stick in the hand-made housing." },
      { image: "pi-joystick/gpio-mapping", alt: "Terminal on the Raspberry Pi mapping joystick directions to GPIO pins 36, 32, 35 and 12", caption: "Mapping each direction to a GPIO pin." },
      { image: "pi-joystick/arcade-config", alt: "Arcade game input menu showing player 1 controls bound to the joystick", caption: "Controls bound in the arcade front end." },
    ],
  },
  {
    slug: "esp32-walkie-talkie",
    title: "ESP32 Walkie-Talkie",
    tagline: "A working push-to-talk walkie-talkie, built as a team against the clock.",
    year: "2025",
    disciplines: ["Hardware"],
    context: "Workshop competition, team build",
    role: "Team member",
    tools: ["ESP32", "Breadboard", "Audio amplifier", "Speaker"],
    featured: true,
    cover: {
      image: "walkie-talkie/esp32-board",
      alt: "An ESP32 development board on a table",
    },
    outcomes: [
      { value: "1st", label: "team to a working model" },
      { value: "1", label: "breadboard, no soldering" },
    ],
    purpose: {
      lead: "A timed workshop competition: turn a bag of parts into a walkie-talkie that actually works, before anyone else.",
    },
    approach: [
      {
        heading: "Build around the ESP32",
        body: "The ESP32 microcontroller has Bluetooth and Wi-Fi built in, so it handles the wireless side. A push-to-talk button, an amplifier board and a small speaker complete the circuit.",
      },
      {
        heading: "Keep it on one board",
        body: "Everything sits on a single solderless breadboard, so the team could rewire and test quickly under time pressure.",
      },
    ],
    result: {
      lead: "Ours was the first team to finish a working model.",
      body: ["Press the button to talk, release it to listen. The short clip shows it on the bench."],
    },
    specs: [
      ["Microcontroller", "ESP32 (Bluetooth + Wi-Fi)"],
      ["Input", "Push-to-talk button"],
      ["Output", "Amplifier and speaker"],
      ["Prototyping", "Solderless breadboard"],
      ["Result", "First team to a working model"],
    ],
    video: { src: "/media/walkie-talkie.mp4", caption: "The finished breadboard prototype." },
    gallery: [
      { image: "walkie-talkie/breadboard", alt: "ESP32 walkie-talkie prototype on a breadboard with a speaker and push button", caption: "ESP32, amplifier, speaker and push-to-talk button." },
    ],
  },
  {
    slug: "arduino-rover",
    title: "Arduino Rover",
    tagline: "A two-motor rover programmed in C++ to drive itself along shapes, tuned until it stopped drifting.",
    year: "2024",
    disciplines: ["Hardware", "Software"],
    context: "Personal build",
    role: "Electronics, soldering, programming",
    tools: ["Arduino Uno", "C++", "PWM", "Perfboard", "Soldering"],
    cover: {
      image: "arduino-robot/front",
      alt: "A two-wheel robot with an Arduino Uno and a hand-soldered perfboard on a hardboard chassis",
    },
    outcomes: [
      { value: "2", label: "motors matched in software" },
      { value: "0", label: "parts replaced to fix the drift" },
    ],
    purpose: {
      lead: "Program a rover to drive itself along geometric shapes, on motors and wheels that were far from ideal.",
      body: [
        "The two motors didn't run at the same speed and the wheels were substandard. Swapping parts wasn't an option, so the problem had to be solved in the design and the code.",
      ],
    },
    approach: [
      {
        heading: "Build the drive",
        body: "Two DC gearmotors and a caster on a hardboard chassis, driven by an Arduino Uno through a motor driver circuit soldered by hand on perfboard.",
      },
      {
        heading: "Find the drift",
        body: "Repeated test runs showed the rover gradually wandering off its path, from uneven motor output, gearbox slop and wheel friction.",
      },
      {
        heading: "Correct it in code",
        body: "I adjusted the power sent to each motor (PWM duty cycle), the turn timing and the movement sequences until both sides matched and the shapes came out consistent.",
      },
    ],
    result: {
      lead: "A rover that draws its shapes consistently, on the same imperfect hardware it started with.",
    },
    learned: "When the ideal parts aren't available, adapt the design instead of starting over. It also gave me a real feel for how friction and motor differences affect a physical system.",
    specs: [
      ["Controller", "Arduino Uno"],
      ["Drive", "Two DC gearmotors + caster"],
      ["Electronics", "Hand-soldered perfboard"],
      ["Language", "C++"],
      ["Control", "Open-loop, PWM-calibrated"],
    ],
    gallery: [
      { image: "arduino-robot/three-quarter", alt: "Three-quarter view of the Arduino rover", caption: "Arduino Uno on the hardboard chassis." },
      { image: "arduino-robot/sensor-board", alt: "Hand-soldered perfboard with components under the chassis", caption: "Hand-soldered board under the chassis." },
    ],
  },
  {
    slug: "finance-model",
    title: "Personal Finance & Portfolio Model",
    tagline: "A spreadsheet model for real decisions about Canadian registered accounts, ETFs and loan repayment.",
    year: "2025",
    disciplines: ["Finance"],
    context: "Personal project",
    role: "Modelling and analysis",
    tools: ["Microsoft Excel", "Monarch Money"],
    outcomes: [
      { value: "3", label: "registered account types compared" },
      { value: "3", label: "return horizons per fund (1, 3, 5 yr)" },
    ],
    purpose: {
      lead: "Answer practical money questions with a model instead of a guess.",
      body: [
        "Which mix of TFSA, RRSP and FHSA contributions comes out ahead over time? Is a Canadian dividend ETF worth its fees? How much does a different repayment schedule really change the interest paid?",
      ],
    },
    approach: [
      {
        heading: "Registered accounts",
        body: "Projected long-term growth across TFSA, RRSP and FHSA with annual contributions, compound growth, asset allocation and shifts in marginal tax bracket.",
      },
      {
        heading: "Fund suitability",
        body: "Compared XEI, a Canadian equity dividend ETF, on management expense ratio, dividend yield and trailing 1-, 3- and 5-year total returns.",
      },
      {
        heading: "Repayment schedules",
        body: "Built amortization models comparing alternative ODSP repayment schedules: principal reduction, timeline and cumulative interest under different rates and cash flows.",
      },
    ],
    result: {
      lead: "A reusable model that turns each of these questions into numbers that can be compared side by side.",
    },
    specs: [
      ["Accounts modelled", "TFSA, RRSP, FHSA"],
      ["Inputs", "Contributions, growth, tax brackets, allocation"],
      ["Fund analysis", "XEI: MER, yield, 1/3/5-yr returns"],
      ["Debt", "Loan amortization scenarios"],
    ],
    interactive: "amortization",
  },
];

export const disciplines: Discipline[] = ["Field", "Hardware", "Software", "Finance"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
