// ─────────────────────────────────────────────────────────────
// Projects. Add a new one by appending an object to `projects`.
// Every project reads as a sheet: Brief → Process → Failure mode → Outcome → Rev. B.
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
  /** Skills line shown under the title. */
  skills: string[];
  cover?: Figure;
  links?: { label: string; href: string; kind: "github" | "live" }[];
  featured?: boolean;
  /** Key numbers. Real values only. */
  outcomes: { value: string; label: string }[];
  /** Why the project exists: the problem or goal. */
  purpose: { lead: string; body?: string[] };
  /** What was done, in a few short steps. */
  approach: { heading: string; body: string }[];
  /** What went wrong and how it was solved. Real events only. */
  challenges: { title: string; problem: string; cause?: string; fix: string }[];
  /** What it achieved. */
  result: { lead: string; body?: string[] };
  /** A margin note: a famous line that fits the project, or one of Haneet's own (no `by`). */
  quote?: { text: string; by?: string; source?: string };
  /** What the next version would change. Forward-looking, not claims. */
  next?: string[];
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
    tagline: "Modular aluminium wheelchair ramps, configured and installed to code at clients' homes.",
    year: "2025–26",
    disciplines: ["Field", "Hardware"],
    context: "Action Medical Home Health",
    role: "Junior Mobility Systems Technician",
    tools: ["Layout sheets", "Tape & level", "Impact driver", "Adjustable legs"],
    skills: ["Slope & run calculations", "Modular layout planning", "Site measurement", "Footing placement", "Field installation", "Accessibility code"],
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
        "Every home is different: the height of the door, the room in the driveway, where the steps come down. A ramp that is too steep is unsafe in a wheelchair, and one that is too long won't fit on the property. Each install has to satisfy both, and it has to survive years of weather and daily use.",
      ],
    },
    approach: [
      {
        heading: "Measure the rise and the site",
        body: "Took the vertical rise from grade to the door threshold and walked the usable ground around each entrance. At the 1:12 code maximum every inch of rise needs a foot of ramp, so a 36 in rise needs at least 36 ft of run before a single landing is added.",
      },
      {
        heading: "Configure the layout",
        body: "Broke the required run into standard modules: straight sections, turn platforms and landings. Checked the selected slope against the actual slope on the layout sheet and optimized the arrangement so it fit the property without crowding the driveway or blocking access.",
      },
      {
        heading: "Plan the fabrication",
        body: "Turned each layout into a parts list (on the switchback: M1 × 9, M3 × 2, M4 × 1, M6 × 1, M7 × 2) and a staging plan, so modules, legs and handrails came off the truck in the order they went in.",
      },
      {
        heading: "Set footings and level",
        body: "Coordinated structural footing placement against the existing property: decks, steps, soft ground and gravel. Set the adjustable legs, levelled the frame, then installed the deck sections, platforms and continuous handrails.",
      },
    ],
    challenges: [
      {
        title: "Not enough yard",
        problem: "A 36 in rise needs at least 36 ft of ramp at code slope, and the side yard was nowhere near that long in a straight line.",
        fix: "Fold it. Two parallel runs joined by turn platforms pack about 39 ft of ramp into a 25.5 × 9.8 ft footprint, and the final layout came out at 1:13, gentler than the 1:12 limit.",
      },
    ],
    result: {
      lead: "Clients got step-free access to their homes, on ramps at or below the code slope limit.",
      body: [
        "Eight systems spanning 12 to 26 ft, each close to a full day's work, from a tight switchback beside a house in August 2025 to a long straight run with a landing at a rural home in March 2026.",
      ],
    },
    quote: { text: "A slope is just a number until someone has to push a wheelchair up it." },
    next: [
      "Model the site and the module layout in CAD before the first visit, so clearances and footing points are checked before anything is unloaded.",
      "Survey ground slope at every footing on the measuring visit, so leg heights can be preset instead of set by trial on site.",
    ],
    specs: [
      ["Systems", "8, spanning 12–26 ft"],
      ["Slope limit", "1 : 12 maximum"],
      ["Example rise", "36 in (914 mm)"],
      ["Example footprint", "25.5 × 9.8 ft switchback"],
      ["Example slope", "1 : 13.0 (≈ 4.4°)"],
      ["Material", "Modular aluminium, perforated deck"],
    ],
    engineers: [
      "Required run L = rise × N for a 1:N slope. For a 36 in rise at the code maximum (N = 12), L = 432 in = 36 ft. The configured layout gives 1:13.0, so the sloped length is 468 in ≈ 39 ft, or about 4.4° from horizontal.",
      "That run is split across two parallel legs with turn platforms (module M3), which is why a 39 ft ramp fits a 25.5 ft footprint. Parts list on this layout: M1 × 9, M3 × 2, M4 × 1, M6 × 1, M7 × 2.",
    ],
    interactive: "ramp-calculator",
    gallery: [
      { image: "ramps/layout-sheet", alt: "Printed plan view of a switchback ramp layout: two parallel runs of deck modules joined by turn platforms, 25.5 ft long and 9.8 ft wide", caption: "Layout sheet, switchback install (Aug 2025). Two runs folded into a 25.5 × 9.8 ft footprint." },
      { image: "ramps/switchback-frame", alt: "Aluminium ramp frame and support legs being assembled beside a house", caption: "Frame and legs going in on the switchback." },
      { image: "ramps/site-staging", alt: "Tool bags and flat-packed ramp boxes staged in a driveway", caption: "Modules and tools staged in install order." },
      { image: "ramps/frame-posts", alt: "Ramp support posts and landing frame set out in a field", caption: "Second install (Mar 2026): posts and landing frame." },
      { image: "ramps/module-sawhorse", alt: "A perforated aluminium deck module resting on sawhorses beside a wooden deck", caption: "Deck module ready to set." },
      { image: "ramps/finished-landing", alt: "Finished ramp seen from the bottom with continuous handrails", caption: "Finished: continuous handrails both sides." },
      { image: "ramps/finished-side", alt: "Side view of the finished straight ramp and landing", caption: "Side elevation of the straight run." },
    ],
  },
  {
    slug: "pi-joystick",
    title: "Raspberry Pi Arcade Joystick",
    tagline: "An arcade controller made from a door stop, nails and wood, wired straight into a Raspberry Pi's GPIO.",
    year: "2026",
    disciplines: ["Hardware", "Software"],
    context: "Two-week project, finished in under one",
    role: "Design, machining, wiring, input configuration",
    tools: ["Raspberry Pi", "GPIO", "GPIO-to-gamepad mapper", "Drill mill"],
    skills: ["Drill-mill machining", "Hole layout", "GPIO wiring", "Pull-up inputs", "Debounce tuning", "Hardware–software debugging"],
    featured: true,
    cover: {
      image: "pi-joystick/joystick-and-pi",
      focus: "50% 55%",
      alt: "A hand-built wooden joystick with a spring-centred stick, wired to a Raspberry Pi in a wooden case",
    },
    outcomes: [
      { value: "4", label: "directions, one GPIO pin each" },
      { value: "< 1 wk", label: "to finish a two-week build" },
      { value: "0", label: "off-the-shelf joystick parts" },
    ],
    purpose: {
      lead: "Take an idea from concept to a working prototype, using household parts instead of a kit.",
      body: [
        "A store-bought joystick hides every interesting problem inside a plastic shell. Building one from scratch meant solving the mechanical, electrical and software sides myself, and seeing how a decision on one side shows up on the others.",
      ],
    },
    approach: [
      {
        heading: "Design around what was on hand",
        body: "A door stop's spring became a self-centring stick, and four nails around it became the direction contacts. Electrically the spring is the common contact: touching a nail pulls that pin low, and a pull-up returns it high on release. Four normally-open switches, made from hardware-store parts.",
      },
      {
        heading: "Machine the housing",
        body: "Measured, marked and drilled the wooden housing on a drill mill so each nail sits where the stick meets it at the end of its throw, equally in every direction.",
      },
      {
        heading: "Wire it to the Pi",
        body: "Each direction and the fire button run to their own GPIO input. Up, down, left and right map to physical pins 36, 32, 35 and 12, and the Pi sits in its own wooden case beside the stick.",
      },
      {
        heading: "Configure the input layer",
        body: "An existing GPIO-to-gamepad mapping tool presents the pins to the arcade front end as a standard controller. My part was configuration: mapping each header pin to a direction and binding the controls.",
      },
      {
        heading: "Work in parallel",
        body: "The input mapping was tested on the Pi with bare contacts while the housing was still being laid out, so the software was already proven by the time the stick was mounted. That is how a two-week build finished in under one.",
      },
    ],
    challenges: [
      {
        title: "Contact bounce",
        problem: "One push of the stick registered as a burst of presses, so movement in game was jittery and laggy.",
        cause: "Metal-on-metal contacts don't close cleanly. Nail and spring chatter for a few milliseconds, and the Pi reads fast enough to see every chatter as a separate press.",
        fix: "Tuned the debounce timing in the mapping tool's configuration, so a change only counts once the contact has held steady, and cleaned up the signal routing. Each push then registered exactly once, with no visible lag.",
      },
    ],
    result: {
      lead: "A fully working arcade controller, used to play Tetris and Aliens, finished in under a week on a two-week timeline.",
      body: ["Every physical part, from the stick's spring to the contacts and housing, was designed and made by hand, and the software layer was configured and tuned around it."],
    },
    quote: { text: "If you wish to make an apple pie from scratch, you must first invent the universe.", by: "Carl Sagan", source: "Cosmos" },
    next: [
      "Swap the nails for microswitches, so the contacts stop wearing and bouncing.",
      "Model the housing in SolidWorks and cut it on a CNC or 3D printer for a repeatable fit.",
      "Add a second action button for two-button games.",
      "Replace the configured tool with my own Python input layer, for direct control over debouncing and timing.",
    ],
    specs: [
      ["Controller", "Raspberry Pi, cased"],
      ["Inputs", "4 directions + fire button"],
      ["Interface", "Direct GPIO (pins 36, 32, 35, 12)"],
      ["Software", "GPIO-to-gamepad mapper, tuned debounce"],
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
    role: "Team member: circuit build and testing",
    tools: ["ESP32", "Breadboard", "Audio amplifier", "Speaker"],
    skills: ["ESP32", "Breadboard prototyping", "Audio amplification", "Rapid iteration", "Teamwork under time pressure"],
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
      body: ["Every team started with the same parts and the same clock. The only thing that counted was a working model."],
    },
    approach: [
      {
        heading: "Build around the ESP32",
        body: "The ESP32 pairs a fast processor with a 2.4 GHz radio, so one chip samples the audio, packs it into packets and transmits it. Builds like ours talk over ESP-NOW, Espressif's peer-to-peer protocol: no router, no pairing.",
      },
      {
        heading: "Drive the speaker",
        body: "A microcontroller pin can't drive a speaker on its own, so the audio goes through a small amplifier board to a compact speaker.",
      },
      {
        heading: "Add push-to-talk",
        body: "A single button switches the unit between talking and listening: hold to talk, release to hear the other side.",
      },
      {
        heading: "Keep it on one board",
        body: "Everything sits on one solderless breadboard, so the circuit stayed easy to read and quick to change.",
      },
    ],
    challenges: [
      {
        title: "The clock",
        problem: "A hard time limit, with every other team racing for the same finish line. Any fix that took minutes could cost the win.",
        fix: "No soldering. With the whole circuit on one breadboard, every correction was a wire moved and a re-test in seconds.",
      },
    ],
    result: {
      lead: "Ours was the first team to finish a working model.",
      body: ["Press the button to talk, release it to listen. The short clip shows it on the bench."],
    },
    quote: { text: "The best is the enemy of the good.", by: "Voltaire" },
    next: [
      "Move the circuit to a soldered perfboard with a battery, so it works away from a laptop.",
      "Design a handheld enclosure in Fusion 360 and 3D-print it.",
    ],
    specs: [
      ["Microcontroller", "ESP32 (Wi-Fi + Bluetooth)"],
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
    tagline: "A two-motor Arduino rover in C++ with two modes: drive a set shape, or follow a line on the floor.",
    year: "2024",
    disciplines: ["Hardware", "Software"],
    context: "Partner build",
    role: "Build, soldering, programming, testing (with a partner)",
    tools: ["Arduino Uno", "C++", "IR sensors", "Perfboard", "Soldering iron"],
    skills: ["C++ / Arduino", "PWM motor control", "IR line sensing", "Soldering", "Perfboard layout", "Calibration testing"],
    cover: {
      image: "arduino-robot/front",
      alt: "A two-wheel robot with an Arduino Uno and a hand-soldered perfboard on a hardboard chassis",
    },
    outcomes: [
      { value: "2", label: "driving modes: shapes and line following" },
      { value: "< ½", label: "the original build time to rebuild after the first board was fried" },
      { value: "0", label: "parts replaced to fix the drift" },
    ],
    purpose: {
      lead: "Make a rover drive itself accurately, on motors and wheels that were far from ideal.",
      body: [
        "The two motors didn't run at the same speed and the wheels were substandard. Swapping parts wasn't an option, so every problem had to be solved in the build and the code.",
      ],
    },
    approach: [
      {
        heading: "Build the drive",
        body: "Two DC gearmotors and a caster on a hardboard chassis, with an Arduino Uno on top as the controller.",
      },
      {
        heading: "Solder the driver board",
        body: "Hand-soldered an L293D dual H-bridge on perfboard, so the Uno's 5 V logic pins can switch motor current in either direction, with PWM on the enable pins setting each motor's speed.",
      },
      {
        heading: "Shape mode",
        body: "Programmed timed movement sequences in C++ (straight runs and turns of set duration) so the rover traces geometric shapes on its own.",
      },
      {
        heading: "Line-following mode",
        body: "Two downward-facing IR sensors under the front read the floor. When one side sees the line, the code slows that side's motor to steer back over it.",
      },
    ],
    challenges: [
      {
        title: "Dead board, full restart",
        problem: "Partway through the build the first Arduino was fried. The board was dead and the build had to start over.",
        cause: "During testing the rover was hooked to a battery tester instead of its normal supply. The tester delivered far more than the circuit was built for: the motors ran away and the board burned out.",
        fix: "Started again from bare parts on a new board, checking every connection and the supply polarity before each power-up, with motor power kept off the logic side. Knowing the build the second time, we finished the rebuild in less than half the original time.",
      },
      {
        title: "Drift",
        problem: "Over repeated test runs the rover wandered off its path, and the shapes didn't close.",
        cause: "Equal PWM never gave equal speed: the two motors had different outputs, and gearbox slop and wheel friction added their own bias. With differential steering, any speed difference becomes a steady turn.",
        fix: "Calibrated each motor's PWM duty cycle, then adjusted turn timing and the movement sequences run by run until both sides matched and the shapes came out consistent.",
      },
    ],
    result: {
      lead: "A rover that draws its shapes consistently and follows a line, on the same imperfect motors and wheels it started with.",
    },
    quote: { text: "Failure is only the opportunity more intelligently to begin again.", by: "Henry Ford", source: "My Life and Work" },
    next: [
      "Add wheel encoders for closed-loop speed control instead of fixed PWM offsets.",
      "Use PID steering in line-following mode for smoother, faster tracking.",
      "Give the motors a fused, separate supply to protect the logic board.",
    ],
    specs: [
      ["Controller", "Arduino Uno"],
      ["Drive", "Two DC gearmotors + caster"],
      ["Electronics", "L293D H-bridge, hand-soldered perfboard"],
      ["Sensing", "2 × downward IR sensors"],
      ["Language", "C++"],
      ["Control", "PWM-calibrated, two modes"],
    ],
    gallery: [
      { image: "arduino-robot/three-quarter", alt: "Three-quarter view of the Arduino rover", caption: "Arduino Uno on the hardboard chassis." },
      { image: "arduino-robot/sensor-board", alt: "Hand-soldered perfboard and downward-facing sensors under the chassis", caption: "Hand-soldered board and line sensors under the chassis." },
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
    skills: ["Excel modelling", "Compound growth", "Marginal tax analysis", "ETF analysis", "Amortization"],
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
    challenges: [
      {
        title: "Unequal tax treatment",
        problem: "TFSA, RRSP and FHSA are taxed differently going in and coming out, so their balances can't be compared at face value.",
        fix: "Modelled each account with its own tax treatment and the shift in marginal bracket over time, so the three could be compared on the same footing.",
      },
    ],
    result: {
      lead: "A reusable model that turns each of these questions into numbers that can be compared side by side.",
    },
    quote: { text: "A guess compounds too." },
    next: [
      "Replace the single growth rate with a range of return scenarios.",
      "Rebuild the model in Python so scenarios can be swept automatically.",
    ],
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
