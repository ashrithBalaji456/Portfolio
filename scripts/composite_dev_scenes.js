import sharp from "sharp";
import fs from "fs";
import path from "path";

async function generateScenes() {
  const width = 1376;
  const height = 768;

  const scenes = [
    {
      id: "service-manager",
      baseImage: "public/assets/project-nexus-dev.jpg",
      screenImage: "public/assets/project-service-manager.jpg",
      output: "public/assets/project-service-manager-dev.jpg",
      accentColor: "#f59e0b",
      glowColor: "#d97706",
      tintFilter: { r: 245, g: 158, b: 11, alpha: 0.12 },
      bulbTitle: "VEHICLE BREAKDOWNS SOLVED",
      bulbSubtitle: "Automated Mileage &amp; Service Schedule Tracking",
      iconSvg: `
        <circle cx="688" cy="130" r="48" fill="url(#bulbGlow)" stroke="#f59e0b" stroke-width="4" filter="url(#glow)"/>
        <!-- Lightbulb filament & wrench -->
        <path d="M670 120 L706 140 M670 140 L706 120 M688 100 L688 145" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
        <rect x="676" y="174" width="24" height="8" rx="3" fill="#fbbf24"/>
        <rect x="680" y="184" width="16" height="5" rx="2" fill="#d97706"/>
        <!-- Floating Idea Rays -->
        <line x1="688" y1="62" x2="688" y2="46" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
        <line x1="638" y1="84" x2="624" y2="72" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
        <line x1="738" y1="84" x2="752" y2="72" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
        <line x1="616" y1="130" x2="600" y2="130" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
        <line x1="760" y1="130" x2="776" y2="130" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
        <!-- Left HUD Badge: Service Status -->
        <g transform="translate(420, 80)">
          <rect width="180" height="74" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="#f59e0b" stroke-width="2" filter="url(#glow)"/>
          <circle cx="28" cy="28" r="10" fill="#ef4444"/>
          <text x="46" y="32" fill="#ffffff" font-size="14" font-family="system-ui, sans-serif" font-weight="bold">Overdue: 68k mi</text>
          <rect x="18" y="46" width="144" height="18" rx="6" fill="rgba(239, 68, 68, 0.25)"/>
          <text x="26" y="60" fill="#fca5a5" font-size="11" font-family="system-ui, sans-serif" font-weight="600">Oil Change • Immediate</text>
        </g>
        <!-- Right HUD Badge: Solved Metrics -->
        <g transform="translate(775, 80)">
          <rect width="185" height="74" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="#10b981" stroke-width="2" filter="url(#glow)"/>
          <circle cx="28" cy="28" r="10" fill="#10b981"/>
          <text x="46" y="32" fill="#ffffff" font-size="14" font-family="system-ui, sans-serif" font-weight="bold">Status: OK (42 Fleet)</text>
          <rect x="18" y="46" width="150" height="18" rx="6" fill="rgba(16, 185, 129, 0.25)"/>
          <text x="26" y="60" fill="#6ee7b7" font-size="11" font-family="system-ui, sans-serif" font-weight="600">Automated Reminders</text>
        </g>
      `
    },
    {
      id: "pulsefit",
      baseImage: "public/assets/project-nexus-dev.jpg",
      screenImage: "public/assets/project-pulsefit.jpg",
      output: "public/assets/project-pulsefit-dev.jpg",
      accentColor: "#a3e635",
      glowColor: "#84cc16",
      tintFilter: { r: 132, g: 204, b: 22, alpha: 0.12 },
      bulbTitle: "MONOLITH BOTTLENECKS SOLVED",
      bulbSubtitle: "Distributed Microservices &amp; Kafka Event Streams",
      iconSvg: `
        <circle cx="688" cy="130" r="48" fill="url(#bulbGlow)" stroke="#a3e635" stroke-width="4" filter="url(#glow)"/>
        <!-- Heartbeat pulse wave -->
        <path d="M656 130 L672 130 L678 114 L686 148 L694 122 L700 134 L706 130 L720 130" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <rect x="676" y="174" width="24" height="8" rx="3" fill="#bef264"/>
        <rect x="680" y="184" width="16" height="5" rx="2" fill="#65a30d"/>
        <!-- Floating Idea Rays -->
        <line x1="688" y1="62" x2="688" y2="46" stroke="#a3e635" stroke-width="4" stroke-linecap="round"/>
        <line x1="638" y1="84" x2="624" y2="72" stroke="#a3e635" stroke-width="4" stroke-linecap="round"/>
        <line x1="738" y1="84" x2="752" y2="72" stroke="#a3e635" stroke-width="4" stroke-linecap="round"/>
        <line x1="616" y1="130" x2="600" y2="130" stroke="#a3e635" stroke-width="4" stroke-linecap="round"/>
        <line x1="760" y1="130" x2="776" y2="130" stroke="#a3e635" stroke-width="4" stroke-linecap="round"/>
        <!-- Left HUD Badge: Microservices Telemetry -->
        <g transform="translate(415, 80)">
          <rect width="185" height="74" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="#a3e635" stroke-width="2" filter="url(#glow)"/>
          <text x="18" y="28" fill="#a3e635" font-size="12" font-family="system-ui, sans-serif" font-weight="bold">MICROSERVICES ARCH</text>
          <text x="18" y="48" fill="#ffffff" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Gateway + Kafka</text>
          <text x="18" y="64" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif">Asynchronous Event Stream</text>
        </g>
        <!-- Right HUD Badge: Live Activity Status -->
        <g transform="translate(775, 80)">
          <rect width="185" height="74" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="#06b6d4" stroke-width="2" filter="url(#glow)"/>
          <text x="18" y="28" fill="#06b6d4" font-size="12" font-family="system-ui, sans-serif" font-weight="bold">AI WORKOUT INSIGHTS</text>
          <text x="18" y="48" fill="#ffffff" font-size="13" font-family="system-ui, sans-serif" font-weight="600">142 BPM • 584 kcal</text>
          <text x="18" y="64" fill="#38bdf8" font-size="11" font-family="system-ui, sans-serif">Peak Recovery Optimized</text>
        </g>
      `
    },
    {
      id: "moodflix",
      baseImage: "public/assets/project-nexus-dev.jpg",
      screenImage: "public/assets/project-moodflix.jpg",
      output: "public/assets/project-moodflix-dev.jpg",
      accentColor: "#c084fc",
      glowColor: "#9333ea",
      tintFilter: { r: 168, g: 85, b: 247, alpha: 0.12 },
      bulbTitle: "DECISION FATIGUE SOLVED",
      bulbSubtitle: "Emotion-Aware Recommendations with Gemini AI",
      iconSvg: `
        <circle cx="688" cy="130" r="48" fill="url(#bulbGlow)" stroke="#c084fc" stroke-width="4" filter="url(#glow)"/>
        <!-- Cinema Filmstrip & Star -->
        <circle cx="674" cy="126" r="6" fill="#f43f5e"/>
        <circle cx="702" cy="126" r="6" fill="#38bdf8"/>
        <path d="M674 140 Q688 152 702 140" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
        <rect x="676" y="174" width="24" height="8" rx="3" fill="#e9d5ff"/>
        <rect x="680" y="184" width="16" height="5" rx="2" fill="#7e22ce"/>
        <!-- Floating Idea Rays -->
        <line x1="688" y1="62" x2="688" y2="46" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
        <line x1="638" y1="84" x2="624" y2="72" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
        <line x1="738" y1="84" x2="752" y2="72" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
        <line x1="616" y1="130" x2="600" y2="130" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
        <line x1="760" y1="130" x2="776" y2="130" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
        <!-- Left HUD Badge: Mood Selector -->
        <g transform="translate(415, 80)">
          <rect width="185" height="74" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="#f43f5e" stroke-width="2" filter="url(#glow)"/>
          <text x="18" y="28" fill="#fb7185" font-size="12" font-family="system-ui, sans-serif" font-weight="bold">MOOD SELECTOR</text>
          <text x="18" y="48" fill="#ffffff" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Joyful • Thriller • Chill</text>
          <text x="18" y="64" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif">Zero Browsing Scrolling</text>
        </g>
        <!-- Right HUD Badge: AI Match -->
        <g transform="translate(775, 80)">
          <rect width="185" height="74" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="#c084fc" stroke-width="2" filter="url(#glow)"/>
          <text x="18" y="28" fill="#c084fc" font-size="12" font-family="system-ui, sans-serif" font-weight="bold">GEMINI AI MATCH</text>
          <text x="18" y="48" fill="#ffffff" font-size="13" font-family="system-ui, sans-serif" font-weight="600">98% Match Identified</text>
          <text x="18" y="64" fill="#e2e8f0" font-size="11" font-family="system-ui, sans-serif">Instant Trailer &amp; Synopsis</text>
        </g>
      `
    },
    {
      id: "quiz",
      baseImage: "public/assets/project-nexus-dev.jpg",
      screenImage: "public/assets/project-quiz.jpg",
      output: "public/assets/project-quiz-dev.jpg",
      accentColor: "#60a5fa",
      glowColor: "#2563eb",
      tintFilter: { r: 37, g: 99, b: 235, alpha: 0.12 },
      bulbTitle: "EXAM TRAFFIC CRASHES SOLVED",
      bulbSubtitle: "Independent Quiz &amp; Question Microservices with Eureka",
      iconSvg: `
        <circle cx="688" cy="130" r="48" fill="url(#bulbGlow)" stroke="#60a5fa" stroke-width="4" filter="url(#glow)"/>
        <!-- Question mark and code symbol -->
        <text x="688" y="142" font-size="34" font-family="system-ui, sans-serif" font-weight="900" fill="#ffffff" text-anchor="middle">?</text>
        <rect x="676" y="174" width="24" height="8" rx="3" fill="#bfdbfe"/>
        <rect x="680" y="184" width="16" height="5" rx="2" fill="#1d4ed8"/>
        <!-- Floating Idea Rays -->
        <line x1="688" y1="62" x2="688" y2="46" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/>
        <line x1="638" y1="84" x2="624" y2="72" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/>
        <line x1="738" y1="84" x2="752" y2="72" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/>
        <line x1="616" y1="130" x2="600" y2="130" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/>
        <line x1="760" y1="130" x2="776" y2="130" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/>
        <!-- Left HUD Badge: Decoupled Services -->
        <g transform="translate(415, 80)">
          <rect width="185" height="74" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="#60a5fa" stroke-width="2" filter="url(#glow)"/>
          <text x="18" y="28" fill="#60a5fa" font-size="12" font-family="system-ui, sans-serif" font-weight="bold">SPRING CLOUD EUREKA</text>
          <text x="18" y="48" fill="#ffffff" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Quiz &amp; Question Split</text>
          <text x="18" y="64" fill="#93c5fd" font-size="11" font-family="system-ui, sans-serif">100% High Traffic Uptime</text>
        </g>
        <!-- Right HUD Badge: Dynamic Discovery -->
        <g transform="translate(775, 80)">
          <rect width="185" height="74" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="#10b981" stroke-width="2" filter="url(#glow)"/>
          <text x="18" y="28" fill="#10b981" font-size="12" font-family="system-ui, sans-serif" font-weight="bold">MICROSERVICES STATUS</text>
          <text x="18" y="48" fill="#ffffff" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Gateway: Active (200 OK)</text>
          <text x="18" y="64" fill="#6ee7b7" font-size="11" font-family="system-ui, sans-serif">Load Balanced Instances</text>
        </g>
      `
    },
    {
      id: "email-reply",
      baseImage: "public/assets/project-nexus-dev.jpg",
      screenImage: "public/assets/project-email-reply.jpg",
      output: "public/assets/project-email-reply-dev.jpg",
      accentColor: "#2dd4bf",
      glowColor: "#0d9488",
      tintFilter: { r: 13, g: 148, b: 136, alpha: 0.12 },
      bulbTitle: "EMAIL BURNOUT SOLVED",
      bulbSubtitle: "1-Click Context-Aware Replies with Google Gemini",
      iconSvg: `
        <circle cx="688" cy="130" r="48" fill="url(#bulbGlow)" stroke="#2dd4bf" stroke-width="4" filter="url(#glow)"/>
        <!-- Envelope & Sparkle -->
        <rect x="670" y="118" width="36" height="24" rx="4" fill="none" stroke="#ffffff" stroke-width="3"/>
        <path d="M670 120 L688 134 L706 120" stroke="#ffffff" stroke-width="3" fill="none"/>
        <rect x="676" y="174" width="24" height="8" rx="3" fill="#99f6e4"/>
        <rect x="680" y="184" width="16" height="5" rx="2" fill="#0f766e"/>
        <!-- Floating Idea Rays -->
        <line x1="688" y1="62" x2="688" y2="46" stroke="#2dd4bf" stroke-width="4" stroke-linecap="round"/>
        <line x1="638" y1="84" x2="624" y2="72" stroke="#2dd4bf" stroke-width="4" stroke-linecap="round"/>
        <line x1="738" y1="84" x2="752" y2="72" stroke="#2dd4bf" stroke-width="4" stroke-linecap="round"/>
        <line x1="616" y1="130" x2="600" y2="130" stroke="#2dd4bf" stroke-width="4" stroke-linecap="round"/>
        <line x1="760" y1="130" x2="776" y2="130" stroke="#2dd4bf" stroke-width="4" stroke-linecap="round"/>
        <!-- Left HUD Badge: Smart Tones -->
        <g transform="translate(415, 80)">
          <rect width="185" height="74" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="#2dd4bf" stroke-width="2" filter="url(#glow)"/>
          <text x="18" y="28" fill="#2dd4bf" font-size="12" font-family="system-ui, sans-serif" font-weight="bold">AI TONE SELECTOR</text>
          <text x="18" y="48" fill="#ffffff" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Professional • Friendly</text>
          <text x="18" y="64" fill="#5eead4" font-size="11" font-family="system-ui, sans-serif">Zero Drafting Time</text>
        </g>
        <!-- Right HUD Badge: WebClient Telemetry -->
        <g transform="translate(775, 80)">
          <rect width="185" height="74" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="#fbbf24" stroke-width="2" filter="url(#glow)"/>
          <text x="18" y="28" fill="#fbbf24" font-size="12" font-family="system-ui, sans-serif" font-weight="bold">WEBCLIENT LATENCY</text>
          <text x="18" y="48" fill="#ffffff" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Latency: 42ms (Online)</text>
          <text x="18" y="64" fill="#fde68a" font-size="11" font-family="system-ui, sans-serif">Resilient Retries Active</text>
        </g>
      `
    }
  ];

  for (const scene of scenes) {
    console.log(`Compositing scene for: ${scene.id}...`);

    // 1. Prepare Screen Inset (left monitor screen on developer desk)
    // In nexus_dev_problem_solved, left monitor screen occupies approx:
    // Left: 190, Top: 330, Width: 350, Height: 240
    const screenBuffer = await sharp(scene.screenImage)
      .resize(350, 240, { fit: "cover" })
      .toBuffer();

    // 2. Build SVG Overlay with Holographic Idea Bulb and HUD Badges
    const svgOverlay = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
            <stop offset="50%" stop-color="${scene.accentColor}" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="${scene.glowColor}" stop-opacity="0.1"/>
          </radialGradient>
        </defs>

        <!-- Room ambient color tint overlay -->
        <rect x="0" y="0" width="${width}" height="${height}" fill="rgba(${scene.tintFilter.r}, ${scene.tintFilter.g}, ${scene.tintFilter.b}, ${scene.tintFilter.alpha})"/>

        <!-- Holographic HUD Problem Solved Banner -->
        <g transform="translate(488, 22)">
          <rect width="400" height="42" rx="21" fill="rgba(15, 23, 42, 0.92)" stroke="${scene.accentColor}" stroke-width="2" filter="url(#glow)"/>
          <text x="200" y="27" fill="#ffffff" font-size="14" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">💡 ${scene.bulbTitle}</text>
        </g>

        <!-- Project Subtitle Pill -->
        <g transform="translate(518, 196)">
          <rect width="340" height="28" rx="14" fill="rgba(15, 23, 42, 0.85)" stroke="${scene.accentColor}" stroke-width="1.2"/>
          <text x="170" y="19" fill="${scene.accentColor}" font-size="12" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">✓ ${scene.bulbSubtitle}</text>
        </g>

        <!-- Specific Idea Symbol & HUD badges -->
        ${scene.iconSvg}
      </svg>
    `;

    // 3. Composite everything onto the base developer workstation
    await sharp(scene.baseImage)
      .composite([
        {
          input: screenBuffer,
          top: 330,
          left: 190,
          blend: "over"
        },
        {
          input: Buffer.from(svgOverlay),
          top: 0,
          left: 0,
          blend: "over"
        }
      ])
      .jpeg({ quality: 92 })
      .toFile(scene.output);

    console.log(`Generated: ${scene.output}`);
  }
  console.log("All 5 remaining developer problem-solving scenes created successfully!");
}

generateScenes().catch(console.error);
