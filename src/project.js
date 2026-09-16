import { projects } from "./projectsData.js";

// State
let currentProjectIndex = 0;
let currentSlideIndex = 0;
let isSpeaking = false;
let slideInterval = null;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCanvas();
  loadProjectFromUrl();
  setupDropdown();
  setupEventListeners();
  setupImageSlider();
  setupLightbox();
  setupSpeechSynthesis();
});

function getProjectFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return 0;

  // Check by string ID or title slug
  const foundIndex = projects.findIndex(
    (p) =>
      p.id.toLowerCase() === id.toLowerCase() ||
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id.toLowerCase()
  );

  if (foundIndex !== -1) return foundIndex;

  // Check if numeric index
  const numIndex = parseInt(id, 10);
  if (!isNaN(numIndex) && numIndex >= 0 && numIndex < projects.length) {
    return numIndex;
  }

  return 0;
}

function loadProjectFromUrl() {
  currentProjectIndex = getProjectFromUrl();
  renderProject(currentProjectIndex);
}

function renderProject(index) {
  const project = projects[index];
  if (!project) return;

  currentProjectIndex = index;

  // Update URL without full reload if user navigated via dropdown/pager
  const newUrl = `${window.location.pathname}?id=${project.id}`;
  window.history.replaceState({ projectId: project.id }, "", newUrl);

  // Update Page Title
  document.getElementById("page-title").textContent = `${project.title} | Technical Architecture & Breakdown`;
  document.getElementById("breadcrumb-project-title").textContent = project.title;

  // Header meta
  document.getElementById("project-category-badge").textContent = project.category;
  document.getElementById("project-period-badge").textContent = project.period;

  // Main title & tagline
  document.getElementById("project-detail-title").textContent = project.title;
  document.getElementById("project-detail-tagline").textContent = project.tagline || project.description;

  // Actions Bar
  const actionsContainer = document.getElementById("project-detail-actions");
  const liveBtn = project.live
    ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="button button-primary detail-action-btn magnetic">
         <span class="btn-icon">🌐</span> Live Demo
       </a>`
    : "";

  const codeBtn = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="button button-ghost detail-action-btn magnetic">
         <span class="btn-icon">💻</span> View Code
       </a>`
    : "";

  const audioBtn = `
    <button id="project-audio-toggle" class="button button-ghost detail-action-btn magnetic" type="button" aria-label="Listen to project overview">
      <span class="audio-btn-icon">🔊</span>
      <span class="audio-btn-text">Listen Overview</span>
    </button>
  `;

  const shareBtn = `
    <button id="project-share-btn" class="button button-ghost detail-action-btn magnetic" type="button" aria-label="Copy share link">
      <span class="btn-icon">🔗</span> Share
    </button>
  `;

  actionsContainer.innerHTML = `${liveBtn}${codeBtn}${audioBtn}${shareBtn}`;

  // Full Description
  document.getElementById("project-full-desc").textContent = project.description;

  // Highlights List
  const highlightsList = document.getElementById("project-highlights-list");
  highlightsList.innerHTML = project.highlights
    .map(
      (item) => `
        <li class="highlight-item">
          <span class="highlight-icon">✓</span>
          <span class="highlight-text">${item}</span>
        </li>
      `
    )
    .join("");

  // System Specs Grid
  const specsGrid = document.getElementById("system-specs-grid");
  const specs = project.systemSpecs || {
    architecture: "Spring Boot Microservice Pattern",
    persistence: "PostgreSQL with Spring Data JPA",
    security: "Stateless Security & Input Sanitization",
    features: "Dynamic Search, Real-Time Processing",
  };

  specsGrid.innerHTML = `
    <div class="spec-card">
      <div class="spec-icon">🏛️</div>
      <div class="spec-title">Architecture</div>
      <div class="spec-value">${specs.architecture}</div>
    </div>
    <div class="spec-card">
      <div class="spec-icon">💾</div>
      <div class="spec-title">Persistence</div>
      <div class="spec-value">${specs.persistence}</div>
    </div>
    <div class="spec-card">
      <div class="spec-icon">🛡️</div>
      <div class="spec-title">Security</div>
      <div class="spec-value">${specs.security}</div>
    </div>
    <div class="spec-card">
      <div class="spec-icon">⚡</div>
      <div class="spec-title">Key Capability</div>
      <div class="spec-value">${specs.features}</div>
    </div>
  `;

  // Tech Stack Chips
  const techContainer = document.getElementById("project-tech-chips");
  techContainer.innerHTML = project.tech
    .map((tech) => `<span class="project-tech-badge">${tech}</span>`)
    .join("");

  // Images on Right Column
  const uiImg = document.getElementById("project-ui-img");
  uiImg.src = project.image;
  uiImg.alt = `${project.title} UI Dashboard Preview`;

  const devImg = document.getElementById("project-dev-img");
  devImg.src = project.devImage;
  devImg.alt = `${project.title} Developer Problem-Solving Scene`;

  // Dynamic Captions
  const prob = project.problemSolved || {
    challenge: project.description,
    solution: project.highlights[0] || "",
    outcome: "High reliability and scalable architecture.",
  };

  document.getElementById("ui-caption-desc").textContent =
    `Production dashboard for ${project.title}. Shows system workflows, active metrics, search filters, and user interaction components.`;

  document.getElementById("dev-caption-desc").textContent =
    `Workstation scene for ${project.title}. Visualizes the developer, illuminated idea symbol, and holographic architecture resolving: "${prob.solution.slice(0, 110)}..."`;

  // Update Dropdown selector value
  const dropdown = document.getElementById("project-select-dropdown");
  if (dropdown) {
    dropdown.value = index;
  }

  // Update Pager Button Labels
  const prevIndex = (index - 1 + projects.length) % projects.length;
  const nextIndex = (index + 1) % projects.length;

  document.getElementById("prev-project-btn").innerHTML = `<span>← ${projects[prevIndex].title.split(" - ")[0]}</span>`;
  document.getElementById("next-project-btn").innerHTML = `<span>${projects[nextIndex].title.split(" - ")[0]} →</span>`;

  // Reset image slider to first slide
  goToSlide(0);

  // Attach dynamic button handlers
  const audioToggle = document.getElementById("project-audio-toggle");
  if (audioToggle) {
    audioToggle.addEventListener("click", toggleAudio);
  }

  const shareBtnEl = document.getElementById("project-share-btn");
  if (shareBtnEl) {
    shareBtnEl.addEventListener("click", copyShareLink);
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
  const textCol = document.getElementById("project-text-column");
  if (textCol) textCol.scrollTo({ top: 0, behavior: "smooth" });
}

function setupImageSlider() {
  const container = document.getElementById("pictures-scroll-container");
  const prevBtn = document.getElementById("slider-prev-btn");
  const nextBtn = document.getElementById("slider-next-btn");
  const tabDots = document.querySelectorAll(".slider-tab-dot");
  const showcase = document.querySelector(".pictures-slider-showcase");

  if (!container) return;

  // Arrow clicks
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentSlideIndex === 0 ? 1 : 0);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentSlideIndex === 0 ? 1 : 0);
    });
  }

  // Tab dots click
  tabDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = parseInt(dot.dataset.target || "0", 10);
      goToSlide(target);
    });
  });

  // Track manual scroll / swipe
  let scrollTimeout = null;
  container.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const activeIdx = Math.round(scrollLeft / width);
      if (activeIdx !== currentSlideIndex && (activeIdx === 0 || activeIdx === 1)) {
        updateSlideUI(activeIdx);
      }
    }, 80);
  });

  // Auto-scroll every 4.5 seconds (pauses on hover)
  startAutoSlide();

  if (showcase) {
    showcase.addEventListener("mouseenter", stopAutoSlide);
    showcase.addEventListener("mouseleave", startAutoSlide);
  }
}

function startAutoSlide() {
  stopAutoSlide();
  slideInterval = setInterval(() => {
    const next = currentSlideIndex === 0 ? 1 : 0;
    goToSlide(next);
  }, 4500);
}

function stopAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

function goToSlide(index) {
  const container = document.getElementById("pictures-scroll-container");
  if (!container) return;

  const width = container.clientWidth;
  container.scrollTo({
    left: index * width,
    behavior: "smooth",
  });

  updateSlideUI(index);
}

function updateSlideUI(index) {
  currentSlideIndex = index;

  // Update tabs
  const tabDots = document.querySelectorAll(".slider-tab-dot");
  tabDots.forEach((dot) => {
    const target = parseInt(dot.dataset.target || "0", 10);
    if (target === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // Update badge header
  const badgeIcon = document.getElementById("slider-badge-icon");
  const badgeText = document.getElementById("slider-badge-text");

  if (index === 0) {
    if (badgeIcon) badgeIcon.textContent = "🖥️";
    if (badgeText) badgeText.textContent = "Slide 1 / 2 • UI Dashboard Preview";
  } else {
    if (badgeIcon) badgeIcon.textContent = "💡";
    if (badgeText) badgeText.textContent = "Slide 2 / 2 • Problem Solved & Dev Workstation";
  }
}

function setupDropdown() {
  const dropdown = document.getElementById("project-select-dropdown");
  if (!dropdown) return;

  dropdown.innerHTML = projects
    .map(
      (p, i) => `
      <option value="${i}" ${i === currentProjectIndex ? "selected" : ""}>
        ${i + 1}. ${p.title}
      </option>
    `
    )
    .join("");

  dropdown.addEventListener("change", (e) => {
    stopSpeech();
    renderProject(parseInt(e.target.value, 10));
  });
}

function setupEventListeners() {
  // Pager buttons
  document.getElementById("prev-project-btn").addEventListener("click", () => {
    stopSpeech();
    const prevIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    renderProject(prevIndex);
  });

  document.getElementById("next-project-btn").addEventListener("click", () => {
    stopSpeech();
    const nextIndex = (currentProjectIndex + 1) % projects.length;
    renderProject(nextIndex);
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      stopSpeech();
      const prevIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
      renderProject(prevIndex);
    } else if (e.key === "ArrowRight") {
      stopSpeech();
      const nextIndex = (currentProjectIndex + 1) % projects.length;
      renderProject(nextIndex);
    }
  });

  // Theme toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }
}

function setupLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const modalCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const backdrop = document.getElementById("lightbox-backdrop");

  function openLightbox(src, caption) {
    modalImg.src = src;
    modalCaption.textContent = caption;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.getElementById("wrap-ui-img").addEventListener("click", () => {
    const project = projects[currentProjectIndex];
    openLightbox(project.image, `${project.title} - UI Dashboard Interface`);
  });

  document.getElementById("wrap-dev-img").addEventListener("click", () => {
    const project = projects[currentProjectIndex];
    openLightbox(project.devImage, `${project.title} - Problem Solved & Developer Workstation`);
  });

  closeBtn.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", closeLightbox);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeLightbox();
    }
  });
}

function copyShareLink() {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => showToast("Project link copied to clipboard!"))
    .catch(() => showToast("Could not copy link."));
}

function showToast(message) {
  const toast = document.getElementById("project-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  setTimeout(() => {
    toast.classList.remove("visible");
  }, 2800);
}

function setupSpeechSynthesis() {
  window.addEventListener("beforeunload", () => {
    stopSpeech();
  });
}

function toggleAudio() {
  if (isSpeaking) {
    stopSpeech();
  } else {
    speakProject();
  }
}

function speakProject() {
  if (!window.speechSynthesis) {
    showToast("Speech synthesis not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const project = projects[currentProjectIndex];
  const prob = project.problemSolved || { challenge: "", solution: "" };
  const text = `Project: ${project.title}. ${project.description}. Highlights: ${project.highlights.slice(0, 3).join(". ")}. Technologies: ${project.tech.slice(0, 4).join(", ")}.`;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    isSpeaking = true;
    updateAudioBtnUI(true);
  };

  utterance.onend = () => {
    isSpeaking = false;
    updateAudioBtnUI(false);
  };

  utterance.onerror = () => {
    isSpeaking = false;
    updateAudioBtnUI(false);
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  isSpeaking = false;
  updateAudioBtnUI(false);
}

function updateAudioBtnUI(playing) {
  const btn = document.getElementById("project-audio-toggle");
  if (!btn) return;
  const icon = btn.querySelector(".audio-btn-icon");
  const text = btn.querySelector(".audio-btn-text");

  if (playing) {
    btn.classList.add("playing");
    if (icon) icon.textContent = "⏹️";
    if (text) text.textContent = "Stop Audio";
  } else {
    btn.classList.remove("playing");
    if (icon) icon.textContent = "🔊";
    if (text) text.textContent = "Listen Overview";
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = savedTheme ? savedTheme : prefersLight ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
}

function initCanvas() {
  const canvas = document.getElementById("project-stars-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const stars = [];
  const numStars = Math.min(Math.floor((width * height) / 9000), 140);

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.015 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
    });
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const starColor = isLight ? "rgba(79, 70, 229, " : "rgba(89, 234, 210, ";

    stars.forEach((s) => {
      s.alpha += s.speed * s.direction;
      if (s.alpha > 0.95 || s.alpha < 0.2) {
        s.direction *= -1;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${starColor}${s.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
