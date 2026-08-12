export const projects = [
  { slug: "focus-frames", category: "Productivity app", title: "Focus Frames", summary: "A calm visual timer for shaping deep-work sessions without watching the clock.", color: "mint", status: "In development", year: "2026", challenge: "Most timers add urgency to work that already feels pressured.", approach: "Focus Frames turns time into a quiet, visual container—with gentle transitions and no noisy dashboards.", outcomes: ["Fast session presets", "Distraction-free full-screen mode", "Accessible colour and motion settings"] },
  { slug: "signal-garden", category: "Electronics", title: "Signal Garden", summary: "A small connected display that turns live environmental data into ambient light.", color: "coral", status: "Prototype", year: "2026", challenge: "Useful environmental data often lives in dashboards nobody checks.", approach: "Signal Garden makes that data glanceable, physical and expressive using a low-power display and simple sensors.", outcomes: ["Modular sensor design", "Low-power enclosure", "Local-first data processing"] },
  { slug: "contour-stories", category: "Data & maps", title: "Contour Stories", summary: "Interactive map essays that make places, movement and change easier to understand.", color: "blue", status: "Ongoing", year: "2025", challenge: "Maps are powerful, but complex map interfaces can bury the story.", approach: "Contour Stories combines focused narrative, restrained cartography and small interactive moments.", outcomes: ["Responsive story maps", "Accessible data summaries", "Reusable map narrative system"] },
  { slug: "build-small-tools", category: "Online course", title: "Build Small Tools", summary: "A practical course about designing and shipping useful software without unnecessary complexity.", color: "sand", status: "Planning", year: "2026", challenge: "People with useful ideas often get stuck before a small project becomes real.", approach: "The course follows a complete, realistic build from deciding scope through launch and iteration.", outcomes: ["Project-first lessons", "Reusable planning templates", "Honest launch workflow"] },
] as const;

export const posts = [
  { slug: "small-tools-lasting-value", title: "Small tools can have lasting value", excerpt: "A case for making focused software that solves one real problem exceptionally well.", date: "18 July 2026", read: "5 min read", category: "Making" },
  { slug: "designing-calm-interfaces", title: "Designing calm interfaces", excerpt: "Practical choices that help useful products feel quieter, clearer and more considerate.", date: "02 June 2026", read: "7 min read", category: "Design" },
  { slug: "maps-need-a-point-of-view", title: "Maps need a point of view", excerpt: "Why thoughtful editing matters as much as accurate data in a map-led story.", date: "11 April 2026", read: "6 min read", category: "Data & maps" },
] as const;

export const supportApps = [
  { title: "Focus Frames", text: "Set up sessions, manage sounds and motion, or troubleshoot notifications.", topics: ["Getting started", "Timers & presets", "Accessibility"] },
  { title: "Signal Garden", text: "Connect a device, calibrate sensors and understand status lights.", topics: ["Device setup", "Connectivity", "Sensor help"] },
  { title: "General support", text: "Privacy, purchases, feedback and questions that aren't tied to one product.", topics: ["Privacy", "Purchases", "Send feedback"] },
] as const;
