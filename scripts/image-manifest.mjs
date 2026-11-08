// Source photo -> published image. crop = [left, top, right, bottom] as fractions.
export default [
  // Accessibility ramps (Action Medical field installs)
  { file: "ramp-2__IMG_9046.jpg", slug: "ramps", name: "finished-run" },
  { file: "ramp-2__IMG_9044.jpg", slug: "ramps", name: "finished-landing" },
  { file: "ramp-2__IMG_9047.jpg", slug: "ramps", name: "finished-side" },
  { file: "ramp-2__IMG_9039.jpg", slug: "ramps", name: "frame-posts" },
  { file: "ramp-2__IMG_9041.jpg", slug: "ramps", name: "module-sawhorse" },
  { file: "ramp-2__IMG_9038.jpg", slug: "ramps", name: "module-stack" },
  { file: "ramp-1__IMG_7113.jpg", slug: "ramps", name: "layout-sheet", rotate: 270, crop: [0.268, 0.04, 0.74, 0.8], quality: 82 } // title block cropped out,
  { file: "ramp-1__IMG_7115.jpg", slug: "ramps", name: "switchback-frame" },
  { file: "ramp-1__IMG_7118.jpg", slug: "ramps", name: "site-staging", crop: [0, 0, 1, 0.82] },
  // ESP32 walkie-talkie
  { file: "bluetooth-walkie-talkie__IMG_8198.jpg", slug: "walkie-talkie", name: "esp32-board", crop: [0, 0.3, 1, 1] },
  { file: "walkie-frame.jpg", slug: "walkie-talkie", name: "breadboard" },
  // Arduino robot
  { file: "arduino__IMG_2112.jpg", slug: "arduino-robot", name: "front" },
  { file: "arduino__IMG_2110.jpg", slug: "arduino-robot", name: "three-quarter" },
  { file: "arduino__IMG_2113.jpg", slug: "arduino-robot", name: "sensor-board" },
  // Raspberry Pi joystick
  { file: "pi__IMG_8619.jpg", slug: "pi-joystick", name: "joystick-and-pi" },
  { file: "pi__IMG_8620.jpg", slug: "pi-joystick", name: "joystick-detail" },
  { file: "pi__IMG_8618.jpg", slug: "pi-joystick", name: "gpio-mapping", crop: [0.3, 0.3, 0.98, 0.72] },
  { file: "pi__IMG_8627.jpg", slug: "pi-joystick", name: "arcade-config", crop: [0, 0.2, 1, 0.85] },
];
