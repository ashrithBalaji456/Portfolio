/**
 * Rocket Launch Opening Animation & Effects Module
 * Features:
 * - High-performance 60fps Canvas Particle Engine (Fire, Smoke Clouds, Embers, Exhaust Shockwaves, Warp Stars)
 * - CSS Screen Shake & Device Vibration Haptics
 * - Web Audio API Synthesizer (Countdown Ticks, Thruster Sub-Bass, Ignition Roar, Launch Chime)
 * - Rocket Capsule with Ashrith Balaji's Profile Photo & Title
 * - Auto-run on landing + Replay Launch & Skip controls
 */

export class LaunchIntroController {
  constructor() {
    this.overlay = null;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.stars = [];
    this.animFrameId = null;
    this.audioCtx = null;
    this.isMuted = false;
    this.isFinished = false;
    this.step = 0; // 0: Init, 3: Count3, 2: Count2, 1: Count1, 0: Ignition/Launch
    this.countdownValue = 3;
    this.screenRumbleLevel = 0; // 0: none, 1: light, 2: heavy, 3: extreme
  }

  init() {
    this.overlay = document.querySelector("#launch-overlay");
    if (!this.overlay) return;

    this.canvas = document.querySelector("#launch-canvas");
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
      this.resizeCanvas();
      window.addEventListener("resize", () => this.resizeCanvas());
      this.initStars();
    }

    this.bindEvents();
    this.startSequence();
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
      const soundBtn = document.querySelector("#launch-start-sound-btn");
      if (soundBtn) {
        soundBtn.style.display = "none";
      }
    };

    const startBtn = document.querySelector("#launch-start-sound-btn");
    if (startBtn) {
      startBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        unlockAudio();
        this.playBeep(880, 0.25);
      });
    }

    window.addEventListener("touchstart", unlockAudio, { passive: true });
    window.addEventListener("touchend", unlockAudio, { passive: true });
    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    if (this.overlay) {
      this.overlay.addEventListener("click", unlockAudio);
    }

    const skipBtn = document.querySelector("#launch-skip-btn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => this.skipLaunch());
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
          this.playBeep(880, 0.2);
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

  playBeep(freq = 800, duration = 0.2, type = "sine") {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    try {
      const time = this.audioCtx.currentTime;

      // Primary tone
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.5, time);
      gain.gain.linearRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(time);
      osc.stop(time + duration);

      // Cyber Harmony chime
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 1.5, time);
      gain2.gain.setValueAtTime(0.25, time);
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

      // Low frequency thruster hum
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(60, time);
      osc.frequency.linearRampToValueAtTime(110, time + duration);

      gain.gain.setValueAtTime(0.4, time);
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

      // Heavy Noise Buffer
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

      // Deep Sub-Bass Explosion Sweep
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
      document.querySelector(".launch-hud"),
      document.querySelector("#launch-rocket-container"),
      document.querySelector(".launch-profile-card")
    ].filter(Boolean);

    targets.forEach((el) => {
      el.classList.remove("rumble-light", "rumble-heavy", "rumble-extreme");
      if (level === 1) el.classList.add("rumble-light");
      if (level === 2) el.classList.add("rumble-heavy");
      if (level === 3) el.classList.add("rumble-extreme");
    });
  }

  startSequence() {
    this.isFinished = false;
    this.clearTimers();

    if (this.overlay) {
      this.overlay.classList.remove("launch-hidden", "launch-dissolve");
      this.overlay.classList.add("launch-active");
    }
    document.body.style.overflow = "hidden";

    const countdownEl = document.querySelector("#launch-countdown-num");
    const statusTextEl = document.querySelector("#launch-status-text");
    const rocketEl = document.querySelector("#launch-rocket-container");

    if (rocketEl) {
      rocketEl.className = "launch-rocket-container rocket-prelaunch";
    }

    this.initAudio();
    this.startParticleLoop();

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
      const angle = (Math.PI / 180) * (Math.random() * 120 + 30); // downward fan
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
        star.y += star.speed * 4; // Warp effect during launch!
        if (star.y > this.canvas.height) star.y = 0;
      }
      this.ctx.globalAlpha = star.alpha;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // 2. Generate Thruster Exhaust during ignition & launch
    const rocketEl = document.querySelector("#launch-rocket-container");
    if (rocketEl && this.screenRumbleLevel > 0) {
      const rect = rocketEl.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.bottom - 30;

      const pCount = this.screenRumbleLevel === 3 ? 12 : 5;
      for (let i = 0; i < pCount; i++) {
        // Flame particles
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

        // Smoke billowing particles
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

    // 3. Render Particles
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
    setTimeout(() => {
      this.startSequence();
    }, 200);
  }
}

export function initLaunchIntro() {
  const intro = new LaunchIntroController();
  intro.init();
  return intro;
}
