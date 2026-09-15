/**
 * Rocket Launch Opening Animation & Effects Module
 * Features:
 * - Interactive "Click to Open" Gate screen (no sudden auto-launch)
 * - Explosive Screen-Filling Iridescent 3D Bubble Burst & Floating Bubbles Simulation
 * - Web Audio API Synthesizer (Liquid Bubble Pops, Warp Chime Chords, Countdown Ticks, Thruster Rumble, Ignition Roar)
 * - Canvas Particle Engine (Stars, Bubbles, Fire Exhaust, Smoke Clouds)
 * - CSS Screen Rumble & Device Vibration Haptics
 * - Rocket Capsule with Ashrith Balaji's Profile Photo & Title
 * - Full Skip Launch & Replay Launch integration
 */

export class LaunchIntroController {
  constructor() {
    this.overlay = null;
    this.gate = null;
    this.gateBtn = null;
    this.hud = null;
    this.rocketContainer = null;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.bubbles = [];
    this.stars = [];
    this.tailStars = [];
    this.comets = [];
    this.nextTailStarTime = Date.now() + 800; // First tail star spawns in 0.8s
    this.nextCometTime = Date.now() + 1800; // First grand comet sweeps across in 1.8s
    this.timers = [];
    this.animFrameId = null;
    this.audioCtx = null;
    this.isMuted = false;
    this.isFinished = false;
    this.isGateOpen = false;
    this.countdownValue = 7;
    this.screenRumbleLevel = 0; // 0: none, 1: light, 2: heavy, 3: extreme
  }

  init() {
    this.overlay = document.querySelector("#launch-overlay");
    if (!this.overlay) return;

    this.gate = document.querySelector("#launch-gate");
    this.gateBtn = document.querySelector("#launch-gate-btn");
    this.hud = document.querySelector("#launch-hud");
    this.rocketContainer = document.querySelector("#launch-rocket-container");

    this.canvas = document.querySelector("#launch-canvas");
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
      this.initStars();
    }

    this.bubbleCanvas = document.querySelector("#launch-bubble-canvas");
    if (this.bubbleCanvas) {
      this.bubbleCtx = this.bubbleCanvas.getContext("2d");
    }

    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    // Ensure initial visual state: Gate is visible, HUD and Rocket hidden until user clicks!
    if (this.gate) {
      this.gate.classList.remove("launch-gate-leaving", "launch-gate-hidden");
    }
    if (this.hud) {
      this.hud.style.display = "none";
    }
    if (this.rocketContainer) {
      this.rocketContainer.style.display = "none";
    }

    document.body.style.overflow = "hidden";

    this.bindEvents();
    this.startParticleLoop();
  }

  resizeCanvas() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    if (this.bubbleCanvas) {
      this.bubbleCanvas.width = window.innerWidth;
      this.bubbleCanvas.height = window.innerHeight;
    }
  }

  initStars() {
    this.stars = [];
    this.tailStars = [];
    this.comets = [];
    this.nextTailStarTime = Date.now() + 800; // First tail star in 0.8s
    this.nextCometTime = Date.now() + 1800; // First grand comet in 1.8s
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 2200);
    const starColors = ["#ffffff", "#ffffff", "#e0f2fe", "#fef08a", "#bae6fd", "#f8fafc"];

    for (let i = 0; i < starCount; i++) {
      const isHero = Math.random() < 0.09; // 9% prominent sparkling stars
      const isMedium = Math.random() < 0.28; // 28% medium sparkling stars

      this.stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: isHero ? Math.random() * 1.4 + 2.0 : (isMedium ? Math.random() * 0.8 + 1.2 : Math.random() * 0.5 + 0.6),
        baseAlpha: isHero ? Math.random() * 0.25 + 0.45 : Math.random() * 0.3 + 0.15,
        twinkleAmp: isHero ? Math.random() * 0.45 + 0.35 : Math.random() * 0.35 + 0.2,
        twinkleSpeed: Math.random() * 0.05 + 0.018,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        hasGlint: isHero,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
  }

  spawnTailStar() {
    if (!this.canvas) return;
    const isPortrait = this.canvas.height > this.canvas.width * 0.9;
    const fromLeft = Math.random() > 0.45;

    let startX, startY, angle;

    if (isPortrait || Math.random() < 0.65) {
      // Dive toward Earth horizon at the bottom
      startX = fromLeft
        ? Math.random() * (this.canvas.width * 0.45) - 30
        : this.canvas.width * (0.55 + Math.random() * 0.45) + 30;
      startY = Math.random() * (this.canvas.height * 0.25) - 40;
      const targetX = this.canvas.width * (0.2 + Math.random() * 0.6);
      const targetY = this.canvas.height + 30;
      angle = Math.atan2(targetY - startY, targetX - startX);
    } else {
      startX = fromLeft ? -50 : this.canvas.width + 50;
      startY = Math.random() * (this.canvas.height * 0.35) - 20;
      angle = fromLeft
        ? Math.PI * 0.25 + (Math.random() - 0.5) * 0.15
        : Math.PI * 0.75 + (Math.random() - 0.5) * 0.15;
    }

    const tailThemes = [
      { core: "#ffffff", glow: "rgba(56, 189, 248, 0.8)", tailTip: "rgba(56, 189, 248, 0.15)" },
      { core: "#ffffff", glow: "rgba(254, 240, 138, 0.85)", tailTip: "rgba(251, 191, 36, 0.15)" },
      { core: "#ffffff", glow: "rgba(192, 132, 252, 0.8)", tailTip: "rgba(168, 85, 247, 0.15)" },
      { core: "#ffffff", glow: "rgba(94, 234, 212, 0.85)", tailTip: "rgba(20, 184, 166, 0.15)" },
    ];
    const theme = tailThemes[Math.floor(Math.random() * tailThemes.length)];

    this.tailStars.push({
      x: startX,
      y: startY,
      len: Math.random() * 110 + 130, // Long glowing tail (130px - 240px)
      speed: Math.random() * 8 + 18, // Swift meteor speed
      angle,
      theme,
      life: 1.0,
      decay: Math.random() * 0.014 + 0.016,
    });
  }

  spawnComet() {
    if (!this.canvas) return;
    const isPortrait = this.canvas.height > this.canvas.width * 0.85;
    const fromLeft = Math.random() > 0.45;

    let startX, startY, angle, curveDir;

    // In mobile / desktop mode on mobile (or ~65% of comets on PC), comets dive directly into Earth!
    if (isPortrait || Math.random() < 0.65) {
      startX = fromLeft
        ? Math.random() * (this.canvas.width * 0.35) - 60
        : this.canvas.width * (0.65 + Math.random() * 0.35) + 60;
      startY = Math.random() * (this.canvas.height * 0.18) - 60;

      // Target Earth horizon situated at the bottom
      const targetX = this.canvas.width * (0.28 + Math.random() * 0.44);
      const targetY = this.canvas.height + 40;

      angle = Math.atan2(targetY - startY, targetX - startX);
      curveDir = fromLeft ? -1 : 1;
    } else {
      startX = fromLeft ? -120 : this.canvas.width + 120;
      startY = Math.random() * (this.canvas.height * 0.32) - 40;
      angle = fromLeft
        ? Math.PI * 0.22 + (Math.random() - 0.5) * 0.1
        : Math.PI * 0.78 + (Math.random() - 0.5) * 0.1;
      curveDir = fromLeft ? -1 : 1;
    }

    const cometTypes = [
      {
        nucleus: "#ffffff",
        innerComa: "#38bdf8",
        outerComa: "rgba(56, 189, 248, 0.28)",
        ionTail: "rgba(56, 189, 248, 0.75)",
        dustTail: "rgba(129, 140, 248, 0.35)",
        dustColor: "#7dd3fc",
      },
      {
        nucleus: "#ffffff",
        innerComa: "#f59e0b",
        outerComa: "rgba(251, 191, 36, 0.28)",
        ionTail: "rgba(251, 191, 36, 0.75)",
        dustTail: "rgba(249, 115, 22, 0.35)",
        dustColor: "#fde047",
      },
      {
        nucleus: "#ffffff",
        innerComa: "#2dd4bf",
        outerComa: "rgba(45, 212, 191, 0.28)",
        ionTail: "rgba(45, 212, 191, 0.75)",
        dustTail: "rgba(56, 189, 248, 0.35)",
        dustColor: "#5eead4",
      },
    ];
    const theme = cometTypes[Math.floor(Math.random() * cometTypes.length)];

    this.comets.push({
      x: startX,
      y: startY,
      speed: Math.random() * 1.5 + 3.4, // Graceful, majestic cosmic speed
      angle,
      curveDir,
      tailLen: Math.random() * 80 + 320,
      nucleusRadius: Math.random() * 1.0 + 3.5,
      theme,
      alpha: 0.0,
      maxAlpha: Math.random() * 0.12 + 0.88,
      fadeIn: true,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.08 + 0.06, // Rapid, lively twinkling rate
      reachedEarth: false,
    });
  }

  bindEvents() {
    const unlockAudio = () => {
      this.initAudio();
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
    };

    // Primary Click to Open Trigger
    if (this.gateBtn) {
      this.gateBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        unlockAudio();
        this.triggerGateOpen(e);
      });
    }

    if (this.gate) {
      this.gate.addEventListener("click", (e) => {
        if (!this.isGateOpen) {
          unlockAudio();
          this.triggerGateOpen(e);
        }
      });
    }

    const skipBtn = document.querySelector("#launch-skip-btn");
    if (skipBtn) {
      skipBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.skipLaunch();
      });
    }

    const muteBtn = document.querySelector("#launch-audio-toggle");
    if (muteBtn) {
      muteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.isMuted = !this.isMuted;
        muteBtn.classList.toggle("muted", this.isMuted);
        const icon = muteBtn.querySelector(".audio-icon");
        if (icon) {
          icon.textContent = this.isMuted ? "🔇" : "🔊";
        }
        if (!this.isMuted) {
          this.initAudio();
          this.playBubblePop(750, 0.08);
        }
      });
    }

    // Attach replay handlers to buttons across the portfolio
    document.querySelectorAll(".trigger-rocket-launch").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        unlockAudio();
        this.replayLaunch();
      });
    });
  }

  // Web Audio Synthesizer
  initAudio() {
    if (this.isMuted) return;
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
    } catch (e) {
      console.warn("Web Audio initialization skipped:", e);
    }
  }

  // Liquid bubble pop audio effect
  playBubblePop(freq = 600, duration = 0.08) {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    try {
      const time = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(freq * 2.3, time + duration * 0.65);

      gain.gain.setValueAtTime(0.35, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {}
  }

  playBubblePopSequence() {
    const popNotes = [520, 780, 640, 920, 840, 1150, 960, 1380, 1200, 1600, 720, 1080, 880, 1240];
    popNotes.forEach((freq, index) => {
      setTimeout(() => {
        this.playBubblePop(freq, 0.08);
      }, index * 70);
    });
  }

  playWarpChime() {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;
    try {
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A4, C#5, E5, A5, C#6, E6
      notes.forEach((freq, i) => {
        setTimeout(() => {
          this.playBeep(freq, 0.45, "triangle");
        }, i * 65);
      });
    } catch (e) {}
  }

  playBeep(freq = 800, duration = 0.2, type = "sine") {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    try {
      const time = this.audioCtx.currentTime;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.45, time);
      gain.gain.linearRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(time);
      osc.stop(time + duration);

      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 1.5, time);
      gain2.gain.setValueAtTime(0.2, time);
      gain2.gain.linearRampToValueAtTime(0.001, time + duration);

      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(time);
      osc2.stop(time + duration);
    } catch (e) {
      console.warn("playBeep error:", e);
    }
  }

  playEngineRumble(duration = 1.0) {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    try {
      const time = this.audioCtx.currentTime;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(60, time);
      osc.frequency.linearRampToValueAtTime(110, time + duration);

      gain.gain.setValueAtTime(0.35, time);
      gain.gain.linearRampToValueAtTime(0.001, time + duration);

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(180, time);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {
      console.warn("playEngineRumble error:", e);
    }
  }

  playIgnitionRoar(duration = 4.0) {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    try {
      const time = this.audioCtx.currentTime;

      const bufferSize = Math.floor(this.audioCtx.sampleRate * duration);
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.6;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, time);
      filter.frequency.linearRampToValueAtTime(1200, time + 0.6);
      filter.frequency.linearRampToValueAtTime(150, time + duration);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.1, time);
      gain.gain.linearRampToValueAtTime(0.8, time + 0.3);
      gain.gain.linearRampToValueAtTime(0.001, time + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);
      noise.start(time);

      const subOsc = this.audioCtx.createOscillator();
      const subGain = this.audioCtx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(140, time);
      subOsc.frequency.linearRampToValueAtTime(40, time + 1.5);

      subGain.gain.setValueAtTime(0.9, time);
      subGain.gain.linearRampToValueAtTime(0.001, time + 2.5);

      subOsc.connect(subGain);
      subGain.connect(this.audioCtx.destination);
      subOsc.start(time);
      subOsc.stop(time + 2.5);
    } catch (e) {
      console.warn("playIgnitionRoar error:", e);
    }
  }

  triggerHaptic(pattern) {
    if ("vibrate" in navigator && typeof navigator.vibrate === "function") {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  clearTimers() {
    if (this.timers && this.timers.length) {
      this.timers.forEach((t) => clearTimeout(t));
    }
    this.timers = [];
  }

  setRumble(level) {
    this.screenRumbleLevel = level;

    const targets = [
      this.hud,
      this.rocketContainer,
      document.querySelector(".launch-profile-card")
    ].filter(Boolean);

    targets.forEach((el) => {
      el.classList.remove("rumble-light", "rumble-heavy", "rumble-extreme");
      if (level === 1) el.classList.add("rumble-light");
      if (level === 2) el.classList.add("rumble-heavy");
      if (level === 3) el.classList.add("rumble-extreme");
    });
  }

  /**
   * Main Trigger: When User Clicks "Click to Open"
   */
  triggerGateOpen(e) {
    if (this.isGateOpen) return;
    this.isGateOpen = true;

    // 1. Audio sound effects
    this.initAudio();
    this.playBubblePopSequence();
    this.playWarpChime();
    this.triggerHaptic([60, 40, 60]);

    // 2. Spawn massive 3D bubble burst from click coordinate
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight * 0.55;
    if (e && typeof e.clientX === "number" && e.clientX > 0) {
      originX = e.clientX;
      originY = e.clientY;
    } else if (this.gateBtn) {
      const rect = this.gateBtn.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }

    // Spawn dramatic, giant bubbles covering the entire screen
    this.spawnBubbleBurst(originX, originY, 180);

    // 3. Smooth transition from Gate to Rocket Launch
    if (this.gate) {
      this.gate.classList.add("launch-gate-leaving");
    }

    // Step 1: Let the majestic bubbles bloom and float across the screen for 1.5s
    const t1 = setTimeout(() => {
      if (this.gate) {
        this.gate.classList.add("launch-gate-hidden");
      }
      if (this.hud) {
        this.hud.style.display = "flex";
      }
      if (this.rocketContainer) {
        this.rocketContainer.style.display = "flex";
        this.rocketContainer.className = "launch-rocket-container rocket-entering";
      }

      // Smoothly dissolve the bubbles over the next ~750ms as the rocket materializes
      this.dissolveRemainingBubbles();
    }, 1500);
    this.timers.push(t1);

    // Step 2: Start the countdown once the rocket has smoothly settled and bubbles naturally dissipated
    const t2 = setTimeout(() => {
      this.startCountdownSequence();
    }, 2350);
    this.timers.push(t2);
  }

  spawnBubbleBurst(originX, originY, count = 180) {
    const colors = [
      "#38bdf8", // Sky Cyan
      "#818cf8", // Indigo
      "#c084fc", // Purple
      "#f472b6", // Rose
      "#34d399", // Mint
      "#fbbf24", // Amber
      "#ffffff", // Crystal White
      "#67e8f9", // Bright Turquoise
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // High-velocity outward blast to reach every corner of the viewport
      const speed = Math.random() * 24 + 4.5;

      // Bubble size distribution:
      // ~30% Giant hero bubbles (radius 55px - 110px) to cover the whole screen!
      // ~45% Medium-large bubbles (radius 26px - 54px)
      // ~25% Sparkle accent bubbles (radius 10px - 25px)
      let radius;
      const sizeRand = Math.random();
      if (sizeRand < 0.30) {
        radius = Math.random() * 55 + 55; // 55px to 110px radius (up to 220px across!)
      } else if (sizeRand < 0.75) {
        radius = Math.random() * 28 + 26; // 26px to 54px radius
      } else {
        radius = Math.random() * 15 + 10; // 10px to 25px radius
      }

      this.bubbles.push({
        x: originX + (Math.random() * 40 - 20),
        y: originY + (Math.random() * 40 - 20),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 3.0 + 1.0),
        friction: 0.945, // Gentle deceleration as bubbles billow
        floatVy: -(Math.random() * 1.6 + 0.6), // Buoyant upward float
        radius: radius,
        growth: Math.random() * 0.12 + 0.03, // Slight natural soap bubble expansion
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.65,
        decay: Math.random() * 0.005 + 0.0035, // Natural ~2.5s floating lifespan
        wobbleSpeed: Math.random() * 0.05 + 0.02,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleAmp: Math.random() * 3.5 + 1.5,
      });
    }
  }

  dissolveRemainingBubbles() {
    // Gracefully accelerate fade-out of remaining bubbles as the rocket materializes
    this.bubbles.forEach((b) => {
      b.decay = Math.max(b.decay, 0.022);
    });
  }

  spawnAmbientBubbles() {
    // No ambient bubbles during countdown or rocket launch - bubbles only on click
  }

  startCountdownSequence() {
    this.isFinished = false;
    this.clearTimers();
    // Clear any residual bubbles before countdown begins so space is clean for the rocket
    this.bubbles = [];

    const countdownEl = document.querySelector("#launch-countdown-num");
    const statusTextEl = document.querySelector("#launch-status-text");
    const rocketEl = document.querySelector("#launch-rocket-container");

    if (rocketEl) {
      rocketEl.className = "launch-rocket-container rocket-prelaunch";
    }

    // 7-SECOND COUNTDOWN TIMELINE
    const steps = [
      { val: "7", status: "SYSTEMS ONLINE • INITIALIZING TELEMETRY", beep: 550, rumble: 1, haptic: [40] },
      { val: "6", status: "FUEL PUMPS & PRIMARY HYDRAULICS ENGAGED", beep: 600, rumble: 1, haptic: [50] },
      { val: "5", status: "VERIFYING SPRING BOOT & MICROSERVICES STACK", beep: 650, rumble: 1, haptic: [50, 30] },
      { val: "4", status: "GUIDANCE & VECTOR CONTROL SYSTEMS LOCKED", beep: 700, rumble: 2, haptic: [60, 40, 60], engine: true },
      { val: "3", status: "BOOSTER PRESSURE OPTIMAL • 100% CAPABILITY", beep: 750, rumble: 2, haptic: [80, 50, 80], engine: true },
      { val: "2", status: "MAIN ENGINE PRE-HEAT ACTIVATED", beep: 820, rumble: 2, haptic: [100, 50, 100], engine: true },
      { val: "1", status: "THRUSTERS IGNITED • LAUNCH IMMINENT", beep: 900, rumble: 2, haptic: [120, 60, 120], engine: true },
    ];

    steps.forEach((stepItem, index) => {
      const timer = setTimeout(() => {
        if (this.isFinished) return;
        this.countdownValue = stepItem.val;
        if (countdownEl) countdownEl.textContent = stepItem.val;
        if (statusTextEl) statusTextEl.textContent = stepItem.status;
        this.playBeep(stepItem.beep, 0.2);
        if (stepItem.engine) {
          this.playEngineRumble(0.9);
        }
        this.triggerHaptic(stepItem.haptic);
        this.setRumble(stepItem.rumble);
      }, index * 1000);
      this.timers.push(timer);
    });

    // 7000ms: GO! BLAST OFF!
    const goTimer = setTimeout(() => {
      if (this.isFinished) return;
      if (countdownEl) countdownEl.textContent = "GO!";
      if (statusTextEl) statusTextEl.textContent = "IGNITION! BLAST OFF! 🚀";
      this.playBeep(1250, 0.45, "triangle");
      this.playIgnitionRoar(3.8);
      this.triggerHaptic([200, 100, 300, 100, 400]);
      this.setRumble(3);

      if (rocketEl) {
        rocketEl.className = "launch-rocket-container rocket-launching";
      }

      const earthEl = document.querySelector("#launch-earth-horizon");
      if (earthEl) {
        earthEl.classList.add("earth-liftoff-active");
      }

      this.spawnIgnitionBurst();
    }, 7000);
    this.timers.push(goTimer);

    // 9800ms: Liftoff completion & dissolve into portfolio
    const finishTimer = setTimeout(() => {
      if (this.isFinished) return;
      this.finishLaunch();
    }, 9800);
    this.timers.push(finishTimer);
  }

  spawnIgnitionBurst() {
    const rocketEl = document.querySelector("#launch-rocket-container");
    if (!rocketEl) return;

    const rect = rocketEl.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.bottom - 40;

    // Burst flames & smoke particles
    for (let i = 0; i < 180; i++) {
      const angle = (Math.PI / 180) * (Math.random() * 120 + 30);
      const speed = Math.random() * 14 + 4;
      this.particles.push({
        x: startX + (Math.random() * 40 - 20),
        y: startY,
        vx: Math.cos(angle) * (Math.random() * 8 - 4),
        vy: Math.sin(angle) * speed,
        size: Math.random() * 18 + 8,
        color: Math.random() > 0.4 ? "#ff5500" : (Math.random() > 0.5 ? "#ffcc00" : "#ffffff"),
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        type: "fire",
      });
    }
  }

  startParticleLoop() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

    const loop = () => {
      this.updateAndRenderParticles();
      this.animFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  updateAndRenderParticles() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.bubbleCtx && this.bubbleCanvas) {
      this.bubbleCtx.clearRect(0, 0, this.bubbleCanvas.width, this.bubbleCanvas.height);
    }

    // 1. Draw Starfield with Realistic Twinkling & Diffraction Spikes
    this.stars.forEach((star) => {
      if (this.screenRumbleLevel >= 2) {
        star.y += star.speed * 4;
        if (star.y > this.canvas.height) star.y = 0;
      }

      // Dynamic sine-wave scintillation / twinkling
      star.twinklePhase += star.twinkleSpeed;
      const currentAlpha = Math.max(0.08, Math.min(1.0, star.baseAlpha + Math.sin(star.twinklePhase) * star.twinkleAmp));

      this.ctx.save();
      this.ctx.globalAlpha = currentAlpha;

      // Soft radiant aura around bright stars
      if (star.hasGlint && currentAlpha > 0.6) {
        const glowRadius = star.size * 2.8;
        const glowGrad = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius);
        glowGrad.addColorStop(0, star.color);
        glowGrad.addColorStop(0.35, "rgba(255, 255, 255, 0.3)");
        glowGrad.addColorStop(1, "transparent");
        this.ctx.fillStyle = glowGrad;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        this.ctx.fill();

        // 4-point diamond diffraction glint when star reaches peak twinkle
        if (currentAlpha > 0.78) {
          const spikeLen = star.size * 3.4 * ((currentAlpha - 0.78) / 0.22);
          this.ctx.strokeStyle = star.color;
          this.ctx.lineWidth = 0.75;
          this.ctx.beginPath();
          this.ctx.moveTo(star.x - spikeLen, star.y);
          this.ctx.lineTo(star.x + spikeLen, star.y);
          this.ctx.moveTo(star.x, star.y - spikeLen);
          this.ctx.lineTo(star.x, star.y + spikeLen);
          this.ctx.stroke();
        }
      }

      // Star core
      this.ctx.fillStyle = star.color;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Regular Interval Tail Stars & Majestic Comets Scheduler
    const now = Date.now();
    if (now >= this.nextTailStarTime && this.tailStars.length < 3) {
      this.spawnTailStar();
      this.nextTailStarTime = now + Math.random() * 1200 + 3200; // Regular interval every ~3.2-4.4s
    }
    if (now >= this.nextCometTime && this.comets.length < 2) {
      this.spawnComet();
      this.nextCometTime = now + Math.random() * 3000 + 8000; // Regular interval every ~8-11s
    }

    // A. Render Tail Stars (Swift meteors with clean glowing trailing streaks)
    for (let i = this.tailStars.length - 1; i >= 0; i--) {
      const ts = this.tailStars[i];
      ts.x += Math.cos(ts.angle) * ts.speed;
      ts.y += Math.sin(ts.angle) * ts.speed;
      ts.life -= ts.decay;

      // Disappear cleanly once it enters Earth atmosphere or reaches bottom
      const pastBottom = ts.y >= this.canvas.height - 40;
      if (ts.life <= 0 || pastBottom || ts.x < -120 || ts.x > this.canvas.width + 120) {
        this.tailStars.splice(i, 1);
        continue;
      }

      if (ts.life > 0) {
        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, ts.life);

        const tailX = ts.x - Math.cos(ts.angle) * ts.len;
        const tailY = ts.y - Math.sin(ts.angle) * ts.len;

        const streakGrad = this.ctx.createLinearGradient(tailX, tailY, ts.x, ts.y);
        streakGrad.addColorStop(0, "transparent");
        streakGrad.addColorStop(0.5, ts.theme.tailTip);
        streakGrad.addColorStop(0.85, ts.theme.glow);
        streakGrad.addColorStop(1, ts.theme.core);

        this.ctx.strokeStyle = streakGrad;
        this.ctx.lineWidth = 2.2;
        this.ctx.beginPath();
        this.ctx.moveTo(tailX, tailY);
        this.ctx.lineTo(ts.x, ts.y);
        this.ctx.stroke();

        // Glowing star head with cross glint
        this.ctx.fillStyle = ts.theme.core;
        this.ctx.beginPath();
        this.ctx.arc(ts.x, ts.y, 2.5, 0, Math.PI * 2);
        this.ctx.fill();

        const glintLen = 6.5;
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();
        this.ctx.moveTo(ts.x - glintLen, ts.y);
        this.ctx.lineTo(ts.x + glintLen, ts.y);
        this.ctx.moveTo(ts.x, ts.y - glintLen);
        this.ctx.lineTo(ts.x, ts.y + glintLen);
        this.ctx.stroke();

        this.ctx.restore();
      }
    }

    // B. Render Majestic Comets (Luminous gas coma & grand spreading ion/dust tail)
    for (let i = this.comets.length - 1; i >= 0; i--) {
      const c = this.comets[i];
      c.x += Math.cos(c.angle) * c.speed;
      c.y += Math.sin(c.angle) * c.speed;

      if (c.fadeIn) {
        c.alpha += 0.015;
        if (c.alpha >= c.maxAlpha) {
          c.alpha = c.maxAlpha;
          c.fadeIn = false;
        }
      }

      const margin = 200;
      const earthAtmosphereY = this.canvas.height - 130;
      const isTouchingEarth = c.y >= earthAtmosphereY;

      if (isTouchingEarth) {
        c.reachedEarth = true;
        // Atmospheric ablation: comet flares up and rapidly burns into Earth's blue atmosphere
        c.alpha -= 0.038;
      }

      const isPastBoundary = c.x < -margin || c.x > this.canvas.width + margin || c.y > this.canvas.height + 80 || (c.reachedEarth && c.alpha <= 0);
      if (isPastBoundary && !isTouchingEarth) {
        c.alpha -= 0.015;
      }

      if (c.alpha <= 0 && isPastBoundary) {
        this.comets.splice(i, 1);
        continue;
      }

      if (c.alpha > 0) {
        this.ctx.save();
        this.ctx.globalAlpha = c.alpha;

        // Earth Atmospheric Entry Ionization Flare (when plunging into Earth's blue horizon)
        if (c.y >= earthAtmosphereY - 80) {
          const entryBloom = Math.min(85, (c.y - (earthAtmosphereY - 80)) * 0.9 + 25);
          const bloomGrad = this.ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, entryBloom);
          bloomGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
          bloomGrad.addColorStop(0.3, c.theme.innerComa);
          bloomGrad.addColorStop(0.65, "rgba(56, 189, 248, 0.35)");
          bloomGrad.addColorStop(1, "transparent");

          this.ctx.save();
          this.ctx.globalAlpha = c.alpha * 0.85;
          this.ctx.fillStyle = bloomGrad;
          this.ctx.beginPath();
          this.ctx.arc(c.x, c.y, entryBloom, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        }

        const ux = Math.cos(c.angle);
        const uy = Math.sin(c.angle);
        const perpX = -uy;
        const perpY = ux;

        // 1. Broad Ethereal Curved Dust Tail (Multi-pass continuous vapor puffs - NO hard polygon edges!)
        const steps = 38;
        for (let s = steps; s >= 1; s--) {
          const t = s / steps;
          const dist = t * c.tailLen;
          // Natural solar wind parabolic curve
          const curveOffset = Math.pow(t, 1.4) * 45 * c.curveDir;
          const px = c.x - ux * dist + perpX * curveOffset;
          const py = c.y - uy * dist + perpY * curveOffset;

          // Billowing expansion from head to tail tip
          const r = 4 + Math.pow(t, 0.85) * 36;
          const pAlpha = (1 - t * 0.85) * c.alpha * 0.14;

          const vaporGrad = this.ctx.createRadialGradient(px, py, 0, px, py, r);
          vaporGrad.addColorStop(0, c.theme.tailColor1 || c.theme.innerComa);
          vaporGrad.addColorStop(0.4, c.theme.dustTail);
          vaporGrad.addColorStop(0.8, "rgba(56, 189, 248, 0.03)");
          vaporGrad.addColorStop(1, "transparent");

          this.ctx.save();
          this.ctx.globalAlpha = pAlpha;
          this.ctx.fillStyle = vaporGrad;
          this.ctx.beginPath();
          this.ctx.arc(px, py, r, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        }

        // 2. Electric Ion Tail (Straight, delicate ionized gas filament)
        const ionEndX = c.x - ux * (c.tailLen * 0.95);
        const ionEndY = c.y - uy * (c.tailLen * 0.95);

        const ionPasses = [
          { width: 12, color: "rgba(56, 189, 248, 0.08)" },
          { width: 5.5, color: "rgba(125, 211, 252, 0.22)" },
          { width: 2.0, color: "rgba(224, 242, 254, 0.65)" },
        ];

        for (const pass of ionPasses) {
          const ionGrad = this.ctx.createLinearGradient(c.x, c.y, ionEndX, ionEndY);
          ionGrad.addColorStop(0, pass.color);
          ionGrad.addColorStop(0.7, pass.color.replace(/[\d.]+\)$/, "0.04)"));
          ionGrad.addColorStop(1, "transparent");

          this.ctx.save();
          this.ctx.strokeStyle = ionGrad;
          this.ctx.lineWidth = pass.width;
          this.ctx.lineCap = "round";
          this.ctx.beginPath();
          this.ctx.moveTo(c.x, c.y);
          this.ctx.lineTo(ionEndX, ionEndY);
          this.ctx.stroke();
          this.ctx.restore();
        }

        // 3. Incandescent Gas Coma Halo (Glowing misty aura around nucleus)
        const comaRadius = c.nucleusRadius * 5.2;
        const comaGrad = this.ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, comaRadius);
        comaGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        comaGrad.addColorStop(0.2, c.theme.innerComa);
        comaGrad.addColorStop(0.55, c.theme.outerComa);
        comaGrad.addColorStop(0.85, "rgba(56, 189, 248, 0.05)");
        comaGrad.addColorStop(1, "transparent");

        this.ctx.save();
        this.ctx.fillStyle = comaGrad;
        this.ctx.beginPath();
        this.ctx.arc(c.x, c.y, comaRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        // 4. Brilliant Twinkling Starlight Nucleus (Dynamic scintillation & diamond glints)
        c.twinklePhase += c.twinkleSpeed;
        const headTwinkle = Math.sin(c.twinklePhase) * 0.32 + 0.68; // Smooth scintillation between 0.36 and 1.0
        const rotAngle = c.twinklePhase * 0.25; // Gentle celestial sparkle rotation

        this.ctx.save();
        this.ctx.translate(c.x, c.y);
        this.ctx.rotate(rotAngle);

        // Radiant starlight core
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(0, 0, c.nucleusRadius * 0.75 * headTwinkle, 0, Math.PI * 2);
        this.ctx.fill();

        // Dynamic 8-point diamond diffraction starburst (fading to fine needle points)
        const primarySpike = (c.nucleusRadius * 3.8 + 4) * headTwinkle;
        const secondarySpike = primarySpike * 0.52;

        const rayGrad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, primarySpike);
        rayGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
        rayGrad.addColorStop(0.25, c.theme.innerComa);
        rayGrad.addColorStop(0.7, "rgba(255, 255, 255, 0.15)");
        rayGrad.addColorStop(1, "transparent");

        this.ctx.strokeStyle = rayGrad;
        this.ctx.lineWidth = 1.1;
        this.ctx.beginPath();
        // Primary cross
        this.ctx.moveTo(-primarySpike, 0);
        this.ctx.lineTo(primarySpike, 0);
        this.ctx.moveTo(0, -primarySpike);
        this.ctx.lineTo(0, primarySpike);
        // Diagonal rays
        this.ctx.moveTo(-secondarySpike, -secondarySpike);
        this.ctx.lineTo(secondarySpike, secondarySpike);
        this.ctx.moveTo(-secondarySpike, secondarySpike);
        this.ctx.lineTo(secondarySpike, -secondarySpike);
        this.ctx.stroke();

        this.ctx.restore();

        this.ctx.restore();
      }
    }

    // 2. Render Bubbles (Screen-filling iridescent 3D bubbles from click burst)
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];

      b.vx *= b.friction;
      b.vy *= b.friction;
      b.x += b.vx;
      b.y += b.vy + b.floatVy;
      b.wobblePhase += b.wobbleSpeed;
      b.alpha -= b.decay;
      if (b.growth) {
        b.radius += b.growth;
      }

      // Check if bubble drifted completely off canvas or faded out
      const pad = b.radius + 80;
      if (b.alpha <= 0 || b.y < -pad || b.x < -pad || b.x > this.canvas.width + pad) {
        this.bubbles.splice(i, 1);
        continue;
      }

      this.drawBubble(b);
    }

    // 3. Generate Thruster Exhaust during ignition & launch
    const rocketEl = document.querySelector("#launch-rocket-container");
    if (rocketEl && this.screenRumbleLevel > 0) {
      const rect = rocketEl.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.bottom - 30;

      const pCount = this.screenRumbleLevel === 3 ? 12 : 5;
      for (let i = 0; i < pCount; i++) {
        this.particles.push({
          x: originX + (Math.random() * 24 - 12),
          y: originY + (Math.random() * 10),
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 12 + 6,
          size: Math.random() * 14 + 6,
          color: Math.random() > 0.3 ? "#ff6600" : "#ffdd33",
          alpha: 1,
          decay: Math.random() * 0.04 + 0.02,
          type: "fire",
        });

        if (Math.random() > 0.4) {
          this.particles.push({
            x: originX + (Math.random() * 40 - 20),
            y: originY + (Math.random() * 15),
            vx: (Math.random() - 0.5) * 5,
            vy: Math.random() * 4 + 2,
            size: Math.random() * 25 + 15,
            color: "rgba(180, 190, 210, 0.4)",
            alpha: 0.6,
            decay: Math.random() * 0.015 + 0.008,
            type: "smoke",
          });
        }
      }
    }

    // 4. Render Rocket Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.type === "fire") {
        p.size *= 0.96;
      } else if (p.type === "smoke") {
        p.size *= 1.03;
      }

      if (p.alpha <= 0 || p.size <= 0.5) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);

      if (p.type === "fire") {
        const radGrd = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        radGrd.addColorStop(0, "#ffffff");
        radGrd.addColorStop(0.4, p.color);
        radGrd.addColorStop(1, "rgba(255, 60, 0, 0)");
        this.ctx.fillStyle = radGrd;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }
  }

  drawBubble(b) {
    const ctx = this.bubbleCtx || this.ctx;
    const r = b.radius;
    const x = b.x + Math.sin(b.wobblePhase) * b.wobbleAmp;
    const y = b.y + Math.cos(b.wobblePhase) * (b.wobbleAmp * 0.6);

    ctx.save();
    ctx.globalAlpha = Math.max(0, b.alpha);

    // 1. Soft iridescent soap bubble gradient fill
    const fillGrad = ctx.createRadialGradient(
      x - r * 0.35, y - r * 0.35, r * 0.05,
      x, y, r
    );
    fillGrad.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    fillGrad.addColorStop(0.25, b.color + "22");
    fillGrad.addColorStop(0.7, b.color + "33");
    fillGrad.addColorStop(0.92, b.color + "66");
    fillGrad.addColorStop(1, "rgba(255, 255, 255, 0.8)");

    ctx.fillStyle = fillGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // 2. Luminous outer boundary ring with chromatic shimmer
    ctx.lineWidth = Math.max(1, r * 0.08);
    const strokeGrad = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    strokeGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    strokeGrad.addColorStop(0.35, b.color);
    strokeGrad.addColorStop(0.7, "rgba(255, 255, 255, 0.4)");
    strokeGrad.addColorStop(1, b.color);
    ctx.strokeStyle = strokeGrad;
    ctx.stroke();

    // 3. Primary curved specular highlight glint
    ctx.beginPath();
    ctx.arc(x, y, r * 0.76, Math.PI * 1.15, Math.PI * 1.48);
    ctx.lineWidth = Math.max(1.5, r * 0.15);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.92)";
    ctx.lineCap = "round";
    ctx.stroke();

    // 4. Secondary reflection point
    ctx.beginPath();
    ctx.arc(x + r * 0.45, y + r * 0.45, Math.max(1, r * 0.1), 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fill();

    ctx.restore();
  }

  skipLaunch() {
    this.finishLaunch();
  }

  finishLaunch() {
    if (this.isFinished) return;
    this.isFinished = true;

    this.clearTimers();
    this.setRumble(0);

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.overlay) {
      this.overlay.classList.add("launch-dissolve");
      setTimeout(() => {
        this.overlay.classList.remove("launch-active");
        this.overlay.classList.add("launch-hidden");
        document.body.style.overflow = "";
      }, 700);
    }
  }

  replayLaunch() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    this.isFinished = false;
    this.isGateOpen = false;
    this.clearTimers();
    this.bubbles = [];
    this.particles = [];
    this.tailStars = [];
    this.comets = [];
    this.nextTailStarTime = Date.now() + 800;
    this.nextCometTime = Date.now() + 1800;
    if (this.bubbleCtx && this.bubbleCanvas) {
      this.bubbleCtx.clearRect(0, 0, this.bubbleCanvas.width, this.bubbleCanvas.height);
    }

    if (this.overlay) {
      this.overlay.classList.remove("launch-hidden", "launch-dissolve");
      this.overlay.classList.add("launch-active");
    }

    // Reset gate, hud, and rocket
    if (this.gate) {
      this.gate.classList.remove("launch-gate-leaving", "launch-gate-hidden");
    }
    if (this.hud) {
      this.hud.style.display = "none";
    }
    if (this.rocketContainer) {
      this.rocketContainer.style.display = "none";
      this.rocketContainer.className = "launch-rocket-container rocket-prelaunch";
    }

    const earthEl = document.querySelector("#launch-earth-horizon");
    if (earthEl) {
      earthEl.classList.remove("earth-liftoff-active");
    }

    document.body.style.overflow = "hidden";
    this.startParticleLoop();
  }
}

export function initLaunchIntro() {
  const intro = new LaunchIntroController();
  intro.init();
  return intro;
}
