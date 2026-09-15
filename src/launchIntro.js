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
      this.resizeCanvas();
      window.addEventListener("resize", () => this.resizeCanvas());
      this.initStars();
    }

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
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initStars() {
    this.stars = [];
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 3000);
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
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
    const popNotes = [520, 780, 640, 920, 840, 1150, 960, 1380, 1200, 1600];
    popNotes.forEach((freq, index) => {
      setTimeout(() => {
        this.playBubblePop(freq, 0.07);
      }, index * 45);
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

    this.spawnBubbleBurst(originX, originY, 140);

    // 3. Smooth transition from Gate to Rocket Launch
    if (this.gate) {
      this.gate.classList.add("launch-gate-leaving");
    }

    setTimeout(() => {
      if (this.gate) {
        this.gate.classList.add("launch-gate-hidden");
      }
      if (this.hud) {
        this.hud.style.display = "flex";
      }
      if (this.rocketContainer) {
        this.rocketContainer.style.display = "flex";
      }

      // Start the rocket countdown sequence
      this.startCountdownSequence();
    }, 450);
  }

  spawnBubbleBurst(originX, originY, count = 140) {
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
      const speed = Math.random() * 15 + 3.5;
      const radius = Math.random() * 26 + 10;
      this.bubbles.push({
        x: originX + (Math.random() * 16 - 8),
        y: originY + (Math.random() * 16 - 8),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 2.5,
        friction: 0.92,
        floatVy: -(Math.random() * 2.0 + 1.0),
        radius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.6,
        decay: Math.random() * 0.035 + 0.025, // Quick fade-out so bubbles exist only upon clicking
        wobbleSpeed: Math.random() * 0.06 + 0.025,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleAmp: Math.random() * 2.2 + 1,
        popped: false,
        popDroplets: [],
      });
    }
  }

  spawnAmbientBubbles() {
    // No ambient bubbles during countdown or rocket launch - bubbles only on click
  }

  startCountdownSequence() {
    this.isFinished = false;
    this.clearTimers();
    // Ensure all click-burst bubbles are completely cleared when countdown/rocket sequence begins
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

    // 1. Draw Starfield
    this.ctx.fillStyle = "#ffffff";
    this.stars.forEach((star) => {
      if (this.screenRumbleLevel >= 2) {
        star.y += star.speed * 4;
        if (star.y > this.canvas.height) star.y = 0;
      }
      this.ctx.globalAlpha = star.alpha;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // 2. Render Bubbles (Screen-filling iridescent 3D bubbles - click burst only)
    // Once countdown/rocket starts, zero bubbles are rendered
    const isRocketActive = this.rocketContainer && this.rocketContainer.style.display !== "none";
    if (!isRocketActive) {
      for (let i = this.bubbles.length - 1; i >= 0; i--) {
        const b = this.bubbles[i];

        b.vx *= b.friction;
        b.vy *= b.friction;
        b.x += b.vx;
        b.y += b.vy + b.floatVy;
        b.wobblePhase += b.wobbleSpeed;
        b.alpha -= b.decay;

        // Check if bubble drifted off top or faded
        if (b.alpha <= 0 || b.y < -50 || b.x < -50 || b.x > this.canvas.width + 50) {
          this.bubbles.splice(i, 1);
          continue;
        }

        this.drawBubble(b);
      }
    } else if (this.bubbles.length > 0) {
      this.bubbles = [];
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
    const ctx = this.ctx;
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

    document.body.style.overflow = "hidden";
    this.startParticleLoop();
  }
}

export function initLaunchIntro() {
  const intro = new LaunchIntroController();
  intro.init();
  return intro;
}
