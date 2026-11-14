// SolidWorks models shown in the CAD section of Work.
// Renders live in public/images/cad/ (source PNGs in the project files, cad-renders/).
// Notes describe only what the model shows. Add context (class, purpose) when Haneet confirms it.

import type { Figure } from "./projects";

export type CadModel = {
  id: string;
  title: string;
  kind: "Assembly" | "Part" | "Just for fun";
  note: string;
  /** First figure is the hero; the rest show as thumbnails. The keychain shows its first two side by side (model vs. built). */
  figures: Figure[];
  /** Grid footprint on large screens. */
  size: "hero" | "wide" | "regular";
  /** Taller hero plate on large screens, to match a neighbour that has thumbnails. */
  tall?: boolean;
};

export const cadModels: CadModel[] = [
  {
    id: "keychain",
    title: "Keychain",
    kind: "Assembly",
    note: "A gear held between two plates and linked to the split ring through a clevis. One plate is countersunk and the other counterbored so the screw heads sit flush. Each part was modelled on its own, assembled in SolidWorks, then made for real.",
    size: "hero",
    figures: [
      { image: "cad/keychain-assembly-isometric", alt: "SolidWorks render of the assembled keychain: a purple gear between two steel plates, a clevis and a split ring", caption: "SolidWorks assembly" },
      { image: "cad/keychain-real", alt: "Photo of the finished keychain on a marble counter: purple gear, aluminium plates, clevis and split ring", caption: "As built" },
      { image: "cad/keychain-clevis", alt: "SolidWorks render of a clevis: a cylindrical body with a flat-sided tang and cross holes", caption: "Clevis" },
      { image: "cad/keychain-spacer", alt: "SolidWorks render of a block spacer with a concave curved face and a through hole", caption: "Curved spacer" },
      { image: "cad/keychain-top-plate", alt: "SolidWorks render of a rounded plate with three countersunk holes", caption: "Top plate, countersunk" },
      { image: "cad/keychain-bottom-plate", alt: "SolidWorks render of a rounded plate with three counterbored holes", caption: "Bottom plate, counterbored" },
    ],
  },
  {
    id: "brake-trunnion",
    title: "Brake balance centre trunnion",
    kind: "Part",
    note: "In a car with separate front and rear master cylinders, the pedal pushes on a balance bar instead of a single cylinder. This trunnion sits at the centre of that bar: its end journals let it pivot in the pedal, and the bar passes through the cross hole. Shifting the pivot along the bar splits the pedal force unevenly between front and rear, which is how brake bias is set.",
    size: "hero",
    figures: [{ image: "cad/shaft-isometric", alt: "SolidWorks render of a brake balance centre trunnion: a turned steel part with pivot journals at each end and a flat-sided centre block with a cross hole", caption: "Isometric" }],
  },
  {
    id: "coffee-mug",
    title: "Coffee mug",
    kind: "Part",
    note: "A body that twists from a square base to a round rim, with a swept handle. Engraved “Waterloo Mech 31” inside and my name underneath.",
    size: "hero",
    figures: [
      { image: "cad/coffee-mug-isometric", alt: "SolidWorks render of a copper-coloured mug whose body twists from a square base to a round rim", caption: "Isometric" },
      { image: "cad/coffee-mug-inside", alt: "Top view into the mug showing “Waterloo Mech 31” engraved on the inside base", caption: "Inside: Waterloo Mech 31" },
      { image: "cad/coffee-mug-name", alt: "Underside of the mug with “Haneet Singh” engraved on the base", caption: "Base: engraved name" },
    ],
  },
  {
    id: "cylinder",
    title: "Cylinder assembly",
    kind: "Assembly",
    note: "Rendered transparent to show the inner core and base inside the tapered housing.",
    size: "hero",
    tall: true,
    figures: [{ image: "cad/cylinder-assembly-isometric", alt: "Transparent SolidWorks render of a tapered cylindrical housing with an inner core and base visible", caption: "Transparent isometric" }],
  },
  {
    id: "bird-feeder",
    title: "Bird feeder",
    kind: "Part",
    note: "A star-shaped base, a swept arm and a slotted ring at the top.",
    size: "regular",
    figures: [{ image: "cad/bird-feeder", alt: "SolidWorks render of a bird feeder: star-shaped base, curved swept arm and a slotted ring", caption: "Isometric" }],
  },
  {
    id: "bracket",
    title: "U-bracket",
    kind: "Part",
    note: "Two bored bosses on a pocketed base, with mounting holes in the sides.",
    size: "regular",
    figures: [{ image: "cad/pillow-block-isometric", alt: "SolidWorks render of a copper U-shaped bracket with two bored bosses and side mounting holes", caption: "Isometric" }],
  },
  {
    id: "letter-a",
    title: "The letter A",
    kind: "Just for fun",
    note: "An extruded A fused onto a rounded lug. No brief, just a funny design.",
    size: "regular",
    figures: [{ image: "cad/fun-letter-a", alt: "SolidWorks render of a copper block shaped like the letter A joined to a rounded lug with a hole", caption: "Isometric" }],
  },
];
