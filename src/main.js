import "./styles.css";

const skillCategories = [
  { title: "Languages", icon: "{ }", skills: ["Java"] },
  { title: "Backend and Frameworks", icon: "API", skills: ["Spring Boot", "Spring Cloud", "REST APIs"] },
  { title: "Databases", icon: "DB", skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis"] },
  { title: "Tools and Platforms", icon: "CLI", skills: ["Postman", "Swagger", "Docker", "Git", "Selenium"] },
  { title: "Testing", icon: "QA", skills: ["Selenium Automation Testing", "API Testing"] },
];

const projects = [
  {
    title: "Hospital Management System - Backend",
    period: "2026",
    category: "Backend API",
    tags: ["Backend", "Data", "Docker"],
    description: "Scalable Spring Boot backend for hospital operations, covering patients, doctors, appointments, and billing workflows.",
    highlights: [
      "Developed backend services for managing patients, doctors, appointments, and billing",
      "Designed RESTful APIs with MVC architecture for CRUD operations and business logic",
      "Integrated JPA and Hibernate for efficient database interaction and entity management",
      "Enabled CORS configuration for secure client-server communication",
      "Containerized the application with Docker for consistent deployment across environments",
    ],
    tech: ["Spring Boot", "REST APIs", "JPA", "Hibernate", "Docker", "MVC", "CORS"],
    github: "https://github.com/ashrithBalaji456/Hospital-Backend",
    live: "https://hospital-frontend-aj7d0jqh4-srinus-projects-85b0e5b9.vercel.app/",
  },
  {
    title: "Quiz Application - Microservices",
    period: "2025",
    category: "Microservices",
    tags: ["Backend", "Microservices"],
    description: "Scalable quiz platform designed with independent Spring Boot services and clear API boundaries.",
    highlights: [
      "Implemented independent Quiz and Question microservices with loose coupling",
      "Integrated Eureka Service Discovery for dynamic service registration",
      "Built an API Gateway for centralized routing and abstraction",
      "Developed RESTful APIs with clear separation of concerns",
    ],
    tech: ["Java", "Spring Boot", "Spring Cloud", "Eureka", "API Gateway", "REST APIs"],
    github: "https://github.com/ashrithBalaji456/Quiz-MicroServices",
    live: null,
  },
  {
    title: "Fitness Tracker - Microservices",
    period: "Jan 2026",
    category: "Microservices",
    tags: ["Backend", "Microservices", "AI", "Data"],
    description: "Cloud-native fitness tracking backend using Spring Boot microservices, Kafka, MongoDB, and Keycloak.",
    highlights: [
      "Designed event-driven architecture for AI-based workout recommendations",
      "Implemented OAuth2 PKCE authentication with JWT",
      "Developed scalable backend with service discovery and async messaging",
      "Exposed secure service APIs for analytics and recommendation workflows",
    ],
    tech: ["Spring Boot", "Kafka", "MongoDB", "Keycloak", "OAuth2", "JWT"],
    github: "https://github.com/ashrithBalaji456/PulseFit",
    live: null,
  },
  {
    title: "MoodFlix - AI Movie Recommendations",
    period: "Dec 2025",
    category: "AI Backend",
    tags: ["Backend", "AI", "Data"],
    description: "AI-powered recommendation backend that maps user mood to personalized movie suggestions.",
    highlights: [
      "Built Spring Boot recommendation APIs with mood detection and trailer metadata support",
      "Integrated Google Gemini API with focused prompt engineering",
      "Used PostgreSQL persistence for recommendation history and service data",
    ],
    tech: ["Spring Boot", "PostgreSQL", "Google Gemini API", "REST API"],
    github: "https://github.com/Balu7884/MovieRecommendation-Backed-1",
    live: "https://movie-recommendation-frontend-zeta.vercel.app/",
  },
  {
    title: "Journal Management System",
    period: "Jan - Mar 2025",
    category: "Backend",
    tags: ["Backend", "Data"],
    description: "Secure journaling platform with JWT authentication, role-based access, caching, and API docs.",
    highlights: [
      "Used Redis caching to reduce API latency by about 20ms",
      "Improved throughput by about 10% in core request paths",
      "Published REST APIs with Swagger and deployed on Apache Tomcat",
    ],
    tech: ["Java", "Spring Boot", "JWT", "MongoDB", "Swagger", "Tomcat", "Redis"],
    github: "https://github.com/Balu7884/Job-App",
    live: null,
  },
  {
    title: "Job Application Manager",
    period: "Jun - Jul 2024",
    category: "Backend API",
    tags: ["Backend", "Data"],
    description: "Backend service for tracking 1000+ job applications with filtering and persistent records.",
    highlights: [
      "Created Spring Boot REST APIs for application tracking and filtering",
      "Improved application tracking flow by about 40%",
      "Deployed on Tomcat with 99.8% uptime in a pilot run",
    ],
    tech: ["Java", "Spring Boot", "REST API", "PostgreSQL", "Tomcat"],
    github: "https://github.com/Balu7884/Job-App",
    live: null,
  },
  {
    title: "AI Email Reply Generator",
    period: "Oct - Nov 2025",
    category: "AI Backend",
    tags: ["Backend", "AI"],
    description: "Context-aware reply generation service powered by Google Gemini and Spring Boot.",
    highlights: [
      "Built resilient WebClient retry and timeout logic",
      "Integrated Gemini API with secure environment-based routing",
      "Configured CORS and API routing for stable client-server communication",
    ],
    tech: ["Spring Boot", "Google Gemini API", "REST API", "WebClient"],
    github: "https://github.com/Balu7884/Email-Reply",
    live: "https://email-reply-frontend.vercel.app/",
  },
  {
    title: "MGNREGA Data Services",
    period: "Jun - Oct 2025",
    category: "Data Backend",
    tags: ["Backend", "Data"],
    description: "Data service layer for employment and expenditure trend analysis across India.",
    highlights: [
      "Added auto-geolocation and filters to improve rural user engagement by about 30%",
      "Optimized Spring Boot services with PostgreSQL to reduce response time by 25%",
      "Built data views for regional trend exploration and expenditure comparison",
    ],
    tech: ["Spring Boot", "PostgreSQL", "REST API", "Geolocation API"],
    github: "https://github.com/Balu7884/MGNREGA",
    live: null,
  },
];

const experiences = [
  {
    title: "LLM Post Training Intern",
    company: "Ethara AI",
    period: "Jan 2026 - Apr 2026",
    location: "Remote",
    highlights: [
      "Worked on LLM post-training workflows including data annotation, evaluation, and response quality improvement",
      "Evaluated and improved model outputs based on correctness, coherence, and alignment with human expectations",
      "Contributed to AI data pipelines by curating high-quality training datasets for model fine-tuning",
      "Followed structured quality guidelines and collaborated with Quality Leads for consistent model performance",
      "Performed error analysis and feedback iteration to enhance LLM response accuracy and reliability",
    ],
    tech: ["LLM", "Data Annotation", "AI Training", "Model Evaluation", "NLP"],
  },
];

const education = [
  {
    institution: "Institute of Aeronautical Engineering, Hyderabad",
    degree: "B.Tech in CSE (AI and ML)",
    period: "Expected May 2026",
    grade: "GPA: 7.99/10",
  },
  {
    institution: "Sri Chaithanya Junior College, Hyderabad",
    degree: "Intermediate Education",
    period: "Completed Jun 2022",
    grade: "95.3%",
  },
  {
    institution: "CARMEL High School, Mancherial",
    degree: "Secondary Education",
    period: "Completed Mar 2020",
    grade: "GPA: 9.8/10",
  },
];

const certifications = [
  {
    name: "Agentforce Specialist",
    issuer: "Salesforce",
    date: "Mar 2025",
    link: "https://drive.google.com/file/d/1zLdRC66qIxJ0nUOEJC9bcNzshbc5KDS-/view?usp=drive_link",
  },
  {
    name: "AI Foundations Associate",
    issuer: "Oracle",
    date: "Apr 2025",
    link: "https://drive.google.com/file/d/1Kk0BxFn3vyK3En5e0xF2HnQwkjA4JDKx/view?usp=drive_link",
  },
  {
    name: "Java Full Stack",
    issuer: "Wipro",
    date: "Oct 2025",
    link: "https://drive.google.com/file/d/1v2aoC-pmMqFYStgDO7pFG6McmNRvBqrq/view?usp=drivesdk",
  },
];

const publications = [
  {
    title: "Detecting Fraudulent Transactions in FASTag Systems",
    authors: "Gudla Ashrith Balaji, Ms. B. Shirisha, Kudha Shashank, Akula Vamshi Krishna",
    institution: "Advanced Research Society for Science and Sociology",
    department: "Published research paper",
    abstract:
      "An advanced fraud identification framework powered by machine learning that uses payment history, outlier identification, and forecasting to identify illicit FASTag activity. The framework combines supervised classifiers such as Random Forest with unsupervised methods including Isolation Forest and autoencoders.",
    keywords: ["FASTag", "Machine Learning", "Random Forest", "Isolation Forest", "Autoencoder", "Real-time Analytics"],
    certificateLink: "https://drive.google.com/file/d/1D23bSGkGzw5KIxuA6fOyURo-Jl0XYyes/view?usp=drive_link",
  },
];

const profiles = [
  {
    name: "Code360",
    stats: "250+ problems solved",
    link: "https://www.naukri.com/code360/profile/ce88473c-abaf-45e3-95a7-1a109d90b17c",
  },
  {
    name: "LeetCode",
    stats: "250+ problems solved - 50-Day Badge",
    link: "https://leetcode.com/u/Balaji1428/",
  },
];

const achievements = [
  "Led a team of 3 members in developing a research-driven final-year project, resulting in a paper published by Advanced Research Society for Science and Sociology.",
  "Engineered multiple backend applications with scalable Spring Boot services and industry-standard architecture patterns.",
  "Selected for and completed a competitive paid internship at Ethara AI, contributing to LLM post-training and evaluation workflows.",
];

const contactInfo = [
  {
    icon: "icon-mail",
    label: "Email",
    value: "ashrithbalajigudla@gmail.com",
    href: "mailto:ashrithbalajigudla@gmail.com",
  },
  {
    iconText: "PH",
    label: "Phone",
    value: "+91 9110701428",
    href: "tel:+919110701428",
  },
  {
    icon: "icon-linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/ashrithgudla",
    href: "https://www.linkedin.com/in/ashrithgudla/",
  },
  {
    icon: "icon-github",
    label: "GitHub",
    value: "github.com/Balu7884",
    href: "https://github.com/Balu7884",
  },
];

const filters = ["All", "Backend", "Microservices", "AI", "Data", "Docker"];

function chipList(items) {
  return `<div class="chip-row">${items.map((item) => `<span class="chip">${item}</span>`).join("")}</div>`;
}

function externalAttrs(href) {
  return href && href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : "";
}

function iconSpan(iconClass, fallback = "") {
  return iconClass
    ? `<span class="icon ${iconClass}" aria-hidden="true"></span>`
    : `<span aria-hidden="true">${fallback}</span>`;
}

function renderSkills() {
  const grid = document.querySelector("#skills-grid");
  grid.innerHTML = skillCategories
    .map(
      (category, index) => `
        <article class="skill-card reveal-item" style="--delay:${index * 70}ms">
          <div class="skill-icon" aria-hidden="true">${category.icon}</div>
          <h3>${category.title}</h3>
          ${chipList(category.skills)}
        </article>
      `
    )
    .join("");
}

function renderFilters() {
  const bar = document.querySelector("#project-filters");
  bar.innerHTML = filters
    .map(
      (filter) => `
        <button class="filter-button magnetic ${filter === "All" ? "active" : ""}" type="button" data-filter="${filter}">
          ${filter}
        </button>
      `
    )
    .join("");
}

function renderProjects(activeFilter = "All") {
  const grid = document.querySelector("#projects-grid");
  grid.innerHTML = projects
    .map((project, index) => {
      const hidden = activeFilter !== "All" && !project.tags.includes(activeFilter);
      const liveLink = project.live
        ? `<a class="button button-primary magnetic" href="${project.live}" ${externalAttrs(project.live)}>
             <span class="icon icon-external" aria-hidden="true"></span> Live
           </a>`
        : "";

      return `
        <article class="project-card reveal-item ${hidden ? "hidden" : ""}" data-tags="${project.tags.join(",")}" style="--delay:${index * 55}ms">
          <div class="project-meta">
            <span>${project.period}</span>
            <small class="project-tag">${project.category}</small>
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          ${chipList(project.tech)}
          <ul>
            ${project.highlights.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <div class="project-links">
            <a class="button button-ghost magnetic" href="${project.github}" ${externalAttrs(project.github)}>
              <span class="icon icon-github" aria-hidden="true"></span> Code
            </a>
            ${liveLink}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderExperience() {
  const list = document.querySelector("#experience-list");
  list.innerHTML = experiences
    .map(
      (exp, index) => `
        <article class="timeline-card reveal-item" style="--delay:${index * 90}ms">
          <div class="timeline-head">
            <div class="timeline-badge" aria-hidden="true">AI</div>
            <div>
              <h3>${exp.title}</h3>
              <h4>${exp.company}</h4>
              <div class="subline">
                <span>${exp.period}</span>
                <span>${exp.location}</span>
              </div>
            </div>
          </div>
          <ul>
            ${exp.highlights.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          ${chipList(exp.tech)}
        </article>
      `
    )
    .join("");
}

function renderEducation() {
  const educationList = document.querySelector("#education-list");
  const certificationList = document.querySelector("#certification-list");

  educationList.innerHTML = education
    .map(
      (item, index) => `
        <article class="education-timeline-item reveal-item" style="--delay:${index * 95}ms">
          <div class="education-marker" aria-hidden="true">${education.length - index}</div>
          <div class="education-card">
            <span>${item.period}</span>
            <h3>${item.institution}</h3>
            <p>${item.degree}</p>
            <strong>${item.grade}</strong>
          </div>
        </article>
      `
    )
    .join("");

  certificationList.innerHTML = certifications
    .map(
      (item, index) => `
        <article class="stack-card reveal-item" style="--delay:${index * 70}ms">
          <span>${item.date}</span>
          <h3>${item.name}</h3>
          <p>${item.issuer}</p>
          <a class="cert-link" href="${item.link}" ${externalAttrs(item.link)}>
            View certificate <span class="icon icon-external" aria-hidden="true"></span>
          </a>
        </article>
      `
    )
    .join("");
}

function renderPublications() {
  const list = document.querySelector("#publication-list");
  list.innerHTML = publications
    .map(
      (pub, index) => `
        <article class="publication-card reveal-item" style="--delay:${index * 90}ms">
          <h3>${pub.title}</h3>
          <div class="publication-meta">
            <span>${pub.authors}</span>
            <span>${pub.institution}</span>
            <span>${pub.department}</span>
          </div>
          <p>${pub.abstract}</p>
          ${chipList(pub.keywords)}
          <a class="publication-link" href="${pub.certificateLink}" ${externalAttrs(pub.certificateLink)}>
            View certificate <span class="icon icon-external" aria-hidden="true"></span>
          </a>
        </article>
      `
    )
    .join("");
}

function renderProof() {
  const profileList = document.querySelector("#profile-list");
  const achievementList = document.querySelector("#achievement-list");

  profileList.innerHTML = profiles
    .map(
      (profile, index) => `
        <a class="profile-card reveal-item magnetic" href="${profile.link}" ${externalAttrs(profile.link)} style="--delay:${index * 80}ms">
          <span>Profile</span>
          <h3>${profile.name}</h3>
          <p>${profile.stats}</p>
          <span class="cert-link">Open <span class="icon icon-external" aria-hidden="true"></span></span>
        </a>
      `
    )
    .join("");

  achievementList.innerHTML = achievements
    .map(
      (achievement, index) => `
        <article class="stack-card reveal-item" style="--delay:${index * 80}ms">
          <span>Achievement ${index + 1}</span>
          <p>${achievement}</p>
        </article>
      `
    )
    .join("");
}

function renderContacts() {
  const grid = document.querySelector("#contact-grid");
  grid.innerHTML = contactInfo
    .map(
      (contact, index) => `
        <article class="contact-card reveal-item" style="--delay:${index * 70}ms">
          <div class="contact-icon">${iconSpan(contact.icon, contact.iconText)}</div>
          <span>${contact.label}</span>
          <a href="${contact.href}" ${externalAttrs(contact.href)}>${contact.value}</a>
        </article>
      `
    )
    .join("");
}

function setupRevealObserver() {
  const revealTargets = document.querySelectorAll("[data-reveal], .reveal-item");

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

function setupProjectFilters() {
  const filterBar = document.querySelector("#project-filters");
  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    const activeFilter = button.dataset.filter;
    filterBar.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
    renderProjects(activeFilter);
    setupRevealObserver();
    setupMagnetic();
    setupTiltCards();
  });
}

function setupNav() {
  const topbar = document.querySelector(".topbar");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll(".nav-links a");
  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  toggle.addEventListener("click", () => {
    const open = !topbar.classList.contains("nav-open");
    topbar.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      topbar.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        links.forEach((link) => link.classList.toggle("active", link === activeLink));
      });
    },
    { rootMargin: "-35% 0px -58% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupScrollProgress() {
  const progress = document.querySelector(".scroll-progress");
  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progress.style.width = `${value}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupMagnetic() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  document.querySelectorAll(".magnetic").forEach((element) => {
    if (element.dataset.magneticReady) return;
    element.dataset.magneticReady = "true";

    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}

function setupCursorAura() {
  const aura = document.querySelector(".cursor-aura");
  if (!aura || !window.matchMedia("(pointer: fine)").matches) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      document.body.style.setProperty("--mx", `${event.clientX}px`);
      document.body.style.setProperty("--my", `${event.clientY}px`);
    },
    { passive: true }
  );

  const tick = () => {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;
    aura.style.transform = `translate3d(${currentX - 140}px, ${currentY - 140}px, 0)`;
    requestAnimationFrame(tick);
  };

  tick();
}

function setupCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animateCounter = (counter) => {
    if (counter.dataset.counted) return;
    counter.dataset.counted = "true";

    const target = Number(counter.dataset.counter);
    const decimals = Number(counter.dataset.decimals || 0);
    const suffix = counter.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      counter.textContent = `${value.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = `${target.toFixed(decimals)}${suffix}`;
      }
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function setupTiltCards() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const cards = document.querySelectorAll(
    ".skill-card, .project-card, .startup-card, .startup-step, .impact-card, .timeline-card, .education-card, .stack-card, .publication-card, .profile-card, .contact-card, .hero-console"
  );

  cards.forEach((card) => {
    if (card.dataset.tiltReady) return;
    card.dataset.tiltReady = "true";

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;

      card.style.setProperty("--shine-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--shine-y", `${(y / rect.height) * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.style.removeProperty("--shine-x");
      card.style.removeProperty("--shine-y");
    });
  });
}

function setupCanvas() {
  const canvas = document.querySelector("#hero-canvas");
  const ctx = canvas.getContext("2d");
  const nodes = [
    { label: "API Gateway", x: 0.18, y: 0.28, color: "#59ead2" },
    { label: "Auth", x: 0.42, y: 0.2, color: "#ffd36b" },
    { label: "Spring Boot", x: 0.62, y: 0.34, color: "#9cf6a5" },
    { label: "Kafka", x: 0.82, y: 0.22, color: "#ff7897" },
    { label: "PostgreSQL", x: 0.72, y: 0.68, color: "#8ab4ff" },
    { label: "LLM Eval", x: 0.34, y: 0.68, color: "#ffd36b" },
    { label: "API Client", x: 0.13, y: 0.63, color: "#ff7897" },
  ];
  const links = [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [0, 6],
    [6, 5],
    [5, 4],
  ];
  const codeRows = [
    "GET /api/projects 200",
    "service.registry.sync()",
    "jwt.verify(request)",
    "kafka.publish(event)",
    "repository.findById()",
    "model.evaluate(answer)",
  ];

  let width = 0;
  let height = 0;
  let dpr = 1;
  let pointerX = 0.5;
  let pointerY = 0.5;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function nodePoint(node) {
    return {
      x: node.x * width + (pointerX - 0.5) * 18,
      y: node.y * height + (pointerY - 0.5) * 18,
    };
  }

  function drawNode(node, time, index) {
    const point = nodePoint(node);
    const pulse = Math.sin(time * 0.0024 + index) * 0.5 + 0.5;
    const w = node.label.length * 7 + 36;
    const h = 38;

    ctx.save();
    ctx.translate(point.x, point.y + Math.sin(time * 0.0016 + index) * 8);
    ctx.shadowColor = node.color;
    ctx.shadowBlur = 12 + pulse * 22;
    ctx.strokeStyle = `${node.color}88`;
    ctx.fillStyle = "rgba(255,255,255,0.075)";
    ctx.lineWidth = 1;
    roundRect(ctx, -w / 2, -h / 2, w, h, 8);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = node.color;
    ctx.font = "700 12px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.label, 0, 1);
    ctx.restore();
  }

  function drawLinks(time) {
    ctx.save();
    links.forEach(([fromIndex, toIndex], index) => {
      const from = nodePoint(nodes[fromIndex]);
      const to = nodePoint(nodes[toIndex]);
      const progress = (time * 0.00024 + index * 0.17) % 1;
      const packetX = from.x + (to.x - from.x) * progress;
      const packetY = from.y + (to.y - from.y) * progress;

      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      ctx.fillStyle = nodes[toIndex].color;
      ctx.shadowColor = nodes[toIndex].color;
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.restore();
  }

  function drawCodeRain(time) {
    ctx.save();
    ctx.globalAlpha = 0.42;
    ctx.font = "600 12px SFMono-Regular, Consolas, monospace";
    ctx.textBaseline = "top";
    for (let column = 0; column < 9; column += 1) {
      const x = 28 + column * 168 + Math.sin(time * 0.0008 + column) * 18;
      const offset = (time * (0.018 + column * 0.002) + column * 80) % (height + 160);
      for (let row = 0; row < 5; row += 1) {
        const y = (offset + row * 96) % (height + 130) - 100;
        const text = codeRows[(column + row) % codeRows.length];
        ctx.fillStyle = row % 2 ? "rgba(89,234,210,0.34)" : "rgba(255,255,255,0.18)";
        ctx.fillText(text, x, y);
      }
    }
    ctx.restore();
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(89,234,210,0.08)");
    gradient.addColorStop(0.38, "rgba(138,180,255,0.04)");
    gradient.addColorStop(0.66, "rgba(255,120,151,0.06)");
    gradient.addColorStop(1, "rgba(255,211,107,0.045)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    drawCodeRain(time);
    drawLinks(time);
    nodes.forEach((node, index) => drawNode(node, time, index));

    requestAnimationFrame(draw);
  }

  function roundRect(context, x, y, w, h, r) {
    context.beginPath();
    context.moveTo(x + r, y);
    context.lineTo(x + w - r, y);
    context.quadraticCurveTo(x + w, y, x + w, y + r);
    context.lineTo(x + w, y + h - r);
    context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    context.lineTo(x + r, y + h);
    context.quadraticCurveTo(x, y + h, x, y + h - r);
    context.lineTo(x, y + r);
    context.quadraticCurveTo(x, y, x + r, y);
    context.closePath();
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      pointerX = event.clientX / Math.max(window.innerWidth, 1);
      pointerY = event.clientY / Math.max(window.innerHeight, 1);
    },
    { passive: true }
  );
  window.addEventListener("resize", resize);

  resize();
  requestAnimationFrame(draw);
}

function boot() {
  renderSkills();
  renderFilters();
  renderProjects();
  renderExperience();
  renderEducation();
  renderPublications();
  renderProof();
  renderContacts();
  setupRevealObserver();
  setupProjectFilters();
  setupNav();
  setupScrollProgress();
  setupMagnetic();
  setupCursorAura();
  setupCounters();
  setupTiltCards();
  setupCanvas();
}

document.addEventListener("DOMContentLoaded", boot);
