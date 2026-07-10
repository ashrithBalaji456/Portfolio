const skillCategories = [
  { title: "Languages", icon: "{ }", skills: ["Java"] },
  { title: "Backend and Frameworks", icon: "API", skills: ["Spring Boot", "Spring Cloud", "REST APIs"] },
  { title: "Databases", icon: "DB", skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis"] },
  { title: "Tools and Platforms", icon: "CLI", skills: ["Postman", "Swagger", "Docker", "Git", "Selenium"] },
  { title: "Testing", icon: "QA", skills: ["Selenium Automation Testing", "API Testing"] },
];

const projects = [
  {
    title: "Nexus Subscription Center",
    period: "July 2026",
    category: "Backend API",
    tags: ["Backend", "Data"],
    description: "Built a Subscription Management Platform to track recurring subscriptions, renewal dates, pricing, billing cycles, and subscription status.",
    highlights: [
      "Developed RESTful APIs using Spring Boot with a layered Controller–Service–Repository architecture",
      "Implemented complete subscription lifecycle management, including creation, updates, renewals, cancellation, soft deletion, and permanent deletion",
      "Added dashboard analytics to track active subscriptions, upcoming renewals, expired subscriptions, and monthly and yearly spending",
      "Implemented client-specific data isolation using anonymous client identification and request-level context handling",
      "Added searching, filtering, sorting, and pagination to efficiently manage and explore subscription records"
    ],
    tech: ["Java 17", "Spring Boot", "Spring Data JPA", "Hibernate", "PostgreSQL", "React.js", "Maven"],
    github: "https://github.com/ashrithBalaji456/Nexus_Subscription_Center_Backend",
    live: null,
  },
  {
    title: "Referral Hub - Automated Job Outreach",
    period: "July 2026",
    category: "Backend API",
    tags: ["Backend", "Data", "Docker"],
    description:
      "Full-stack job outreach and referral platform automating personalized email campaigns, managing HR contacts, templates, and resumes.",
    highlights: [
      "Designed RESTful APIs for contacts, templates, resume uploads, campaign config, and email history tracking",
      "Integrated Spring Mail and Gmail SMTP to generate personalized MIME emails with resume attachments",
      "Implemented automated campaign execution with Spring Scheduler cron expressions and timezone-aware scheduling",
      "Designed a PostgreSQL data model with Spring Data JPA and Hibernate to manage relationships and history",
      "Implemented recipient eligibility checks, duplicate-send prevention, cooldown rules, and batch processing",
      "Structured with layered architecture (Controller, Service, Repository, DTO) and centralized logging (SLF4J)"
    ],
    tech: ["Java", "Spring Boot", "JPA", "Hibernate", "PostgreSQL", "React", "Maven", "SLF4J", "SMTP", "Postman", "Git"],
    github: "https://github.com/ashrithBalaji456/Referal_Hub_Backend",
    live: null,
  },
  {
    title: "Tasker - AHT Productivity Tracking System",
    period: "May 2026",
    category: "Backend API",
    tags: ["Backend", "Data", "Docker"],
    description:
      "Full-stack productivity tracking system built at Ethara.ai for AHT analytics, attendance, tasker workflows, and admin reporting.",
    highlights: [
      "Engineered JWT authentication with role-based access control and BCrypt password encryption",
      "Built punch-in and punch-out attendance flows with automatic 7 PM punch-out and smart day classification",
      "Designed AHT validation that auto-flags tasks exceeding target handle time by 50%",
      "Developed admin project catalog management, tasker history tracking, feedback, and daily productivity reports",
      "Implemented leave requests, re-punch recovery, and missing project request workflows",
      "Deployed Spring Boot on Render, React/Vite on Vercel, and PostgreSQL with Docker",
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "React", "Vite", "Docker", "Render", "Vercel"],
    github: "https://lnkd.in/gwNQh9f8",
    live: "https://lnkd.in/g4QSzmCK",
  },
  {
    title: "Hospital Management System - Backend",
    period: "Apr 2026",
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
    title: "Service Manager",
    period: "Mar 2026",
    category: "Backend API",
    tags: ["Backend", "Data"],
    description: "Vehicle Service Management System to manage vehicles, service records, mileage, and maintenance schedules.",
    highlights: [
      "Developed RESTful APIs using Spring Boot with a layered Controller–Service–Repository architecture",
      "Implemented automatic service-status classification (Overdue, Due by Mileage, Due This Week, OK)",
      "Added date-based and mileage-based maintenance tracking to identify vehicles requiring service",
      "Implemented service history management, mileage updates, quick service completion, and dashboard analytics",
      "Integrated PostgreSQL for persistent storage with optional H2 database support for local testing"
    ],
    tech: ["Java 17", "Spring Boot", "JPA", "Hibernate", "PostgreSQL", "H2", "Maven"],
    github: "https://github.com/ashrithBalaji456/Service_Manage_Backend",
    live: null,
  },
  {
    title: "PulseFit - Microservices Fitness Platform",
    period: "Jan 2026",
    category: "Microservices",
    tags: ["Backend", "Microservices", "AI", "Data"],
    description: "Built a microservices-based fitness tracking platform designed to manage user activity, workout progress, analytics, and AI-driven insights through independent services.",
    highlights: [
      "Implemented a secure authentication and authorization flow using Keycloak, OAuth2, PKCE, and JWT for protected access across the system",
      "Designed an API Gateway + Eureka service discovery architecture to route requests cleanly and support independently deployable services",
      "Developed event-driven communication using Apache Kafka so activity events could be published asynchronously and processed by downstream consumers",
      "Used polyglot persistence with PostgreSQL for relational data and MongoDB for flexible activity documents based on service needs",
      "Followed a monorepo microservices structure to keep all services in one repository while maintaining clear domain separation",
      "Added Docker-based deployment support and designed the system for scalability, loose coupling, and independent service evolution"
    ],
    tech: ["Java 17", "Spring Boot", "Spring Cloud Gateway", "Eureka", "Keycloak", "OAuth2", "PKCE", "JWT", "Kafka", "PostgreSQL", "MongoDB", "Docker"],
    github: "https://github.com/ashrithBalaji456/FitNess_Tracker_Microservices",
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
    github: "https://github.com/ashrithBalaji456/MovieRecommendation-Backend",
    live: "https://movie-recommendation-frontend-zeta.vercel.app/",
  },
  {
    title: "Quiz Application - Microservices",
    period: "Dec 2025",
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
    title: "AI Email Reply Generator",
    period: "Nov 2025",
    category: "AI Backend",
    tags: ["Backend", "AI"],
    description: "Context-aware reply generation service powered by Google Gemini and Spring Boot.",
    highlights: [
      "Built resilient WebClient retry and timeout logic",
      "Integrated Gemini API with secure environment-based routing",
      "Configured CORS and API routing for stable client-server communication",
    ],
    tech: ["Spring Boot", "Google Gemini API", "REST API", "WebClient"],
    github: "https://github.com/ashrithBalaji456/email-reply-backend",
    live: "https://email-reply-frontend.vercel.app/",
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
    period: "Completed May 2026",
    grade: "GPA: 7.92/10",
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
    value: "linkedin.com/in/ashrith-balaji-gudla-5768302a8",
    href: "https://www.linkedin.com/in/ashrith-balaji-gudla-5768302a8/",
  },
  {
    icon: "icon-github",
    label: "GitHub",
    value: "github.com/ashrithBalaji456",
    href: "https://github.com/ashrithBalaji456",
  },
];

const filters = ["All", "Backend", "Microservices", "AI", "Data", "Docker"];
const assistantPrompts = [
  "What roles is Ashrith looking for?",
  "Tell me about the hospital project",
  "Summarize the internship experience",
  "What is the startup idea?",
  "How can I contact Ashrith?",
];

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
            <button class="button button-ghost project-audio-btn magnetic" data-index="${index}" aria-label="Listen to project details">
              <span class="audio-btn-icon" style="display:inline-flex; align-items:center; margin-right:4px;">
                <svg class="speaker-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              </span>
              <span class="audio-btn-text">Listen</span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function setupProjectAudio() {
  const container = document.querySelector("#projects-grid");
  
  window.resetProjectAudioButtons = function() {
    // Reset projects buttons
    document.querySelectorAll(".project-audio-btn").forEach(btn => {
      btn.classList.remove("playing");
      const textSpan = btn.querySelector(".audio-btn-text");
      if (textSpan) textSpan.textContent = "Listen";
      const iconSpan = btn.querySelector(".audio-btn-icon");
      if (iconSpan) {
        iconSpan.innerHTML = `
          <svg class="speaker-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        `;
      }
    });

    // Reset startup thought button
    const startupBtn = document.querySelector(".startup-audio-btn");
    if (startupBtn) {
      startupBtn.classList.remove("playing");
      const sText = startupBtn.querySelector(".audio-btn-text");
      if (sText) sText.textContent = "Listen";
      const sIcon = startupBtn.querySelector(".audio-btn-icon");
      if (sIcon) {
        sIcon.innerHTML = `
          <svg class="speaker-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        `;
      }
    }
  };

  window.stopAllSpeech = function() {
    if (typeof window !== "undefined") {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (window.portraitAudio) {
        window.portraitAudio.pause();
      }
      const video = document.querySelector("#portrait-video");
      if (video) {
        video.pause();
      }
      window.resetProjectAudioButtons();
      
      const portraitBtn = document.querySelector("#portrait-control-btn");
      if (portraitBtn) {
        portraitBtn.classList.remove("playing");
        const playIcon = portraitBtn.querySelector(".play-icon");
        const pauseIcon = portraitBtn.querySelector(".pause-icon");
        if (playIcon) playIcon.style.display = "inline";
        if (pauseIcon) pauseIcon.style.display = "none";
      }
    }
  };

  const getActiveIndianVoice = (voices) => {
    const enInVoices = voices.filter(v => v.lang.toLowerCase().replace("_", "-").startsWith("en-in") || v.name.toLowerCase().includes("india"));
    let selectedVoice = enInVoices.find(v => v.name.toLowerCase().includes("ravi") || v.name.toLowerCase().includes("prabhat") || v.name.toLowerCase().includes("male")) || enInVoices[0];
    
    if (!selectedVoice) {
      const maleKeywords = ["male", "david", "mark", "george", "google us english", "microsoft"];
      for (const kw of maleKeywords) {
        const found = voices.find(v => 
          v.lang.startsWith("en") && 
          v.name.toLowerCase().includes(kw) &&
          (kw === "microsoft" ? (v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("mark")) : true)
        );
        if (found) {
          selectedVoice = found;
          break;
        }
      }
    }
    return selectedVoice || voices.find(v => v.lang.startsWith("en")) || voices[0] || null;
  };

  if (container) {
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".project-audio-btn");
      if (!btn) return;

      const index = parseInt(btn.dataset.index);
      const project = projects[index];
      if (!project) return;

      if (btn.classList.contains("playing")) {
        window.stopAllSpeech();
        return;
      }

      window.stopAllSpeech();

      btn.classList.add("playing");
      const textSpan = btn.querySelector(".audio-btn-text");
      if (textSpan) textSpan.textContent = "Stop";
      
      const iconSpan = btn.querySelector(".audio-btn-icon");
      if (iconSpan) {
        iconSpan.innerHTML = `
          <svg class="speaker-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          </svg>
        `;
      }

      const speechText = `Project ${project.title}. ${project.description} Key points: ${project.highlights.join(". ")}.`;

      if (typeof window !== "undefined" && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(speechText);
        
        if (typeof window.speechSynthesis.getVoices === "function") {
          const voices = window.speechSynthesis.getVoices();
          const voice = getActiveIndianVoice(voices);
          if (voice) {
            utterance.voice = voice;
            utterance.rate = 1.03;
            utterance.pitch = 1.02;
          }
        }

        utterance.onend = () => {
          btn.classList.remove("playing");
          if (textSpan) textSpan.textContent = "Listen";
          if (iconSpan) {
            iconSpan.innerHTML = `
              <svg class="speaker-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            `;
          }
        };

        utterance.onerror = () => {
          btn.classList.remove("playing");
          if (textSpan) textSpan.textContent = "Listen";
          if (iconSpan) {
            iconSpan.innerHTML = `
              <svg class="speaker-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            `;
          }
        };

        window.speechSynthesis.speak(utterance);
      }
    });
  }

  // Startup thought audio click handler
  const startupBtn = document.querySelector(".startup-audio-btn");
  if (startupBtn) {
    startupBtn.addEventListener("click", () => {
      if (startupBtn.classList.contains("playing")) {
        window.stopAllSpeech();
        return;
      }

      window.stopAllSpeech();

      startupBtn.classList.add("playing");
      const textSpan = startupBtn.querySelector(".audio-btn-text");
      if (textSpan) textSpan.textContent = "Stop";
      
      const iconSpan = startupBtn.querySelector(".audio-btn-icon");
      if (iconSpan) {
        iconSpan.innerHTML = `
          <svg class="speaker-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          </svg>
        `;
      }

      const speechText = "Startup thought: What if delivery apps could create jobs? Impact Bite Link. Placing the right resume in front of the right person. A social-impact delivery platform idea that uses everyday food orders to improve access and visibility for unemployed, skilled youth. The platform asks users for their occupation during login, then intelligently matches one to two relevant and verified candidate resumes to an order through QR codes or in-app cards. The goal is not to replace job portals, but to bypass noise with targeted visibility.";

      if (typeof window !== "undefined" && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(speechText);
        
        if (typeof window.speechSynthesis.getVoices === "function") {
          const voices = window.speechSynthesis.getVoices();
          const voice = getActiveIndianVoice(voices);
          if (voice) {
            utterance.voice = voice;
            utterance.rate = 1.03;
            utterance.pitch = 1.02;
          }
        }

        utterance.onend = () => {
          startupBtn.classList.remove("playing");
          if (textSpan) textSpan.textContent = "Listen";
          if (iconSpan) {
            iconSpan.innerHTML = `
              <svg class="speaker-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            `;
          }
        };

        utterance.onerror = () => {
          startupBtn.classList.remove("playing");
          if (textSpan) textSpan.textContent = "Listen";
          if (iconSpan) {
            iconSpan.innerHTML = `
              <svg class="speaker-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            `;
          }
        };

        window.speechSynthesis.speak(utterance);
      }
    });
  }
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
    .map((contact, index) => {
      const isExternal = contact.href.startsWith("http");

      return `
        <a class="contact-card reveal-item" href="${contact.href}" ${externalAttrs(contact.href)} style="--delay:${index * 70}ms" aria-label="Open ${contact.label}">
          <div class="contact-icon">${iconSpan(contact.icon, contact.iconText)}</div>
          <span>${contact.label}</span>
          <strong>${contact.value}</strong>
          ${isExternal ? '<span class="contact-arrow icon icon-external" aria-hidden="true"></span>' : ""}
        </a>
      `
    })
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
    ".skill-card, .project-card, .startup-card, .startup-step, .impact-card, .timeline-card, .education-card, .stack-card, .publication-card, .profile-card, .contact-card"
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

function setupAssistant() {
  const toggle = document.querySelector(".assistant-toggle");
  const panel = document.querySelector("#portfolio-assistant");
  const closeButton = document.querySelector(".assistant-close");
  const messageList = document.querySelector("#assistant-messages");
  const suggestionList = document.querySelector("#assistant-suggestions");
  const form = document.querySelector("#assistant-form");
  const input = document.querySelector("#assistant-input");

  if (!toggle || !panel || !messageList || !suggestionList || !form || !input) return;

  const renderMessage = (role, text) => {
    const wrapper = document.createElement("article");
    wrapper.className = `assistant-message assistant-${role}`;

    const title = document.createElement("strong");
    title.textContent = role === "bot" ? "Portfolio AI" : "You";

    const body = document.createElement("div");
    text
      .split("\n")
      .filter(Boolean)
      .forEach((line) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = line;
        body.appendChild(paragraph);
      });

    wrapper.append(title, body);
    messageList.appendChild(wrapper);
    messageList.scrollTop = messageList.scrollHeight;
  };

  const renderTyping = () => {
    const typing = document.createElement("article");
    typing.className = "assistant-message assistant-bot";
    typing.dataset.typing = "true";
    typing.innerHTML = `
      <strong>Portfolio AI</strong>
      <div class="assistant-typing" aria-label="Assistant is thinking">
        <span></span><span></span><span></span>
      </div>
    `;
    messageList.appendChild(typing);
    messageList.scrollTop = messageList.scrollHeight;
    return typing;
  };

  const setOpen = (open) => {
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      window.setTimeout(() => input.focus(), 120);
    }
  };

  const keywords = (value) => value.toLowerCase();
  const assistantSummary =
    "Ashrith is a backend-focused Java and Spring Boot developer with projects in microservices, AI-enabled APIs, data services, and system design.";

  function buildAssistantReply(message) {
    const text = keywords(message);
    const projectMatch = projects.find((project) => {
      const titleWords = keywords(project.title).replace(/[^a-z0-9 ]/g, "").split(" ");
      return titleWords.some((word) => word.length > 3 && text.includes(word));
    });

    if (/(hello|hi|hey|good morning|good evening)/.test(text)) {
      return `Hi, I can help with Ashrith's projects, skills, internship, publication, startup idea, or contact details.\n${assistantSummary}`;
    }

    if (/(role|looking|hire|open to|job)/.test(text)) {
      return "Ashrith is looking for Backend Developer, Java Developer, and Software Developer roles.\nHe is especially aligned with API development, Spring Boot services, microservices, and backend system design.";
    }

    if (/(skill|stack|java|spring|database|tool|tech)/.test(text)) {
      return "Core stack: Java, Spring Boot, Spring Cloud, REST APIs, MySQL, PostgreSQL, MongoDB, Redis, Docker, Git, Swagger, Postman, and Selenium.\nThe strongest positioning is backend engineering with Java and Spring Boot.";
    }

    if (projectMatch) {
      return `${projectMatch.title} (${projectMatch.period})\n${projectMatch.description}\nKey points: ${projectMatch.highlights.slice(0, 3).join("; ")}.\nTech: ${projectMatch.tech.join(", ")}.`;
    }

    if (/(project|portfolio|work)/.test(text)) {
      return "Highlighted backend projects include Nexus Subscription Center, Referral Hub Automated Job Outreach, Tasker AHT Productivity Tracking System, Hospital Management System, Service Manager, Fitness Tracker Microservices, Quiz Microservices, and MoodFlix recommendation backend.\nAsk me about a specific one like nexus, referral hub, tasker, hospital, service manager, fitness, quiz, or startup.";
    }

    if (/(experience|intern|ethara|llm)/.test(text)) {
      return "Ashrith worked as an LLM Post Training Intern at Ethara AI from Jan 2026 to Apr 2026.\nThe work included data annotation, model evaluation, response quality improvement, dataset curation, and error analysis for better model reliability.";
    }

    if (/(education|college|school|gpa|certification|certification|oracle|wipro|salesforce)/.test(text)) {
      return "Education: B.Tech in CSE (AI and ML) at Institute of Aeronautical Engineering, completed May 2026, GPA 7.92/10.\nCertifications include Agentforce Specialist, AI Foundations Associate, and Java Full Stack.";
    }

    if (/(paper|publication|research|fastag|society)/.test(text)) {
      return "Ashrith published research on fraudulent FASTag transaction detection.\nThe paper is listed under Advanced Research Society for Science and Sociology and focuses on machine learning-based fraud identification using methods like Random Forest, Isolation Forest, and autoencoders.";
    }

    if (/(startup|impact|delivery|food|qr|job visibility)/.test(text)) {
      return "The startup thought is Impact Bite Link.\nIt is a delivery-platform idea where customer occupation helps match 1-2 relevant verified resumes of unemployed youth to a food order using QR codes or in-app cards.\nThe goal is to create access and visibility rather than compete only on discounts or speed.";
    }

    if (/(contact|email|phone|linkedin|github|resume)/.test(text)) {
      return "You can reach Ashrith at ashrithbalajigudla@gmail.com.\nLinkedIn: linkedin.com/in/ashrith-balaji-gudla-5768302a8\nGitHub: github.com/ashrithBalaji456\nPhone: +91 9110701428.";
    }

    return `${assistantSummary}\nTry asking about the hospital project, internship, startup idea, publication, or contact details.`;
  }

  assistantPrompts.forEach((prompt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "assistant-suggestion";
    button.textContent = prompt;
    button.addEventListener("click", () => {
      input.value = prompt;
      form.requestSubmit();
    });
    suggestionList.appendChild(button);
  });

  renderMessage(
    "bot",
    "Hi, I am Ashrith's portfolio assistant.\nAsk me about projects, backend skills, internship experience, the publication, the startup idea, or contact details."
  );

  toggle.addEventListener("click", () => setOpen(!panel.classList.contains("is-open")));
  closeButton.addEventListener("click", () => setOpen(false));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    renderMessage("user", message);
    input.value = "";

    const typing = renderTyping();
    window.setTimeout(() => {
      typing.remove();
      renderMessage("bot", buildAssistantReply(message));
    }, 520);
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

function setupTalkingPortrait() {
  const container = document.querySelector(".portrait-container");
  const img = document.querySelector("#portrait-img");
  const video = document.querySelector("#portrait-video");
  const controlBtn = document.querySelector("#portrait-control-btn");
  const playIcon = controlBtn?.querySelector(".play-icon");
  const pauseIcon = controlBtn?.querySelector(".pause-icon");
  const badge = document.querySelector("#portrait-badge");
  const visualizer = document.querySelector("#portrait-visualizer");
  const subContainer = document.querySelector("#portrait-subtitles-container");
  const subText = document.querySelector("#portrait-subtitles");

  if (!controlBtn || !img) return;

  const selfIntroText = "Hi, I'm Ashrith Balaji, a Java Developer from Hyderabad, India. I recently graduated with a B Tech in Computer Science and Engineering from the Institute of Aeronautical Engineering. I work with Java and Spring Boot to build backend systems and REST APIs. I'm now looking for a full-time Java developer role where I can work on real systems and keep growing. Thank you.";

  const audio = new Audio("./assets/self-intro.mp3");
  window.portraitAudio = audio;
  let subtitles = [];
  let useVideo = false;
  let useAudio = true;
  let audioCtx = null;
  let analyser = null;
  let sourceNode = null;
  let animationId = null;

  // Web Speech API variables
  let voices = [];
  let isSpeakingSpeech = false;
  let speechWords = [];
  let activeWordIndex = -1;

  // Load voices for Web Speech API
  const loadVoices = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    voices = window.speechSynthesis.getVoices();
  };
  if (typeof window !== "undefined" && window.speechSynthesis) {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }

  // Get English male voice
  const getMaleVoice = () => {
    loadVoices();
    const maleKeywords = ["male", "david", "mark", "george", "ravi", "google us english", "microsoft"];
    for (const kw of maleKeywords) {
      const found = voices.find(v => 
        v.lang.startsWith("en") && 
        v.name.toLowerCase().includes(kw) &&
        (kw === "microsoft" ? (v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("mark")) : true)
      );
      if (found) return found;
    }
    const enVoice = voices.find(v => v.lang.startsWith("en"));
    return enVoice || voices[0] || null;
  };

  // Load subtitles from JSON
  fetch("./assets/self-intro.json")
    .then((r) => r.json())
    .then((data) => {
      subtitles = data;
    })
    .catch((err) => {
      console.warn("Could not load subtitles from JSON, using estimated timing fallback", err);
      const words = selfIntroText.split(/\s+/);
      const duration = 25.5; // Estimated duration for the text
      const timePerWord = duration / words.length;
      subtitles = words.map((word, index) => ({
        word,
        start: Math.round(index * timePerWord * 100) / 100,
        end: Math.round((index + 1) * timePerWord * 100) / 100,
      }));
    });

  // Check if video file actually exists and is playable
  video.addEventListener("error", () => {
    console.log("Video not found or failed to load. Trying audio fallback.");
    useVideo = false;
    video.style.display = "none";
    img.style.display = "block";
  });

  video.addEventListener("canplaythrough", () => {
    useVideo = true;
  });

  // Check if audio file fails to load
  audio.addEventListener("error", () => {
    console.log("Audio file failed to load. Falling back to browser SpeechSynthesis.");
    useAudio = false;
  });

  // Force video load to trigger the error or canplaythrough event
  video.load();

  // Toggle playback
  controlBtn.addEventListener("click", () => {
    if (useVideo) {
      if (video.paused) {
        startPlayback(video);
      } else {
        pausePlayback(video);
      }
    } else if (useAudio) {
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      if (audio.paused) {
        startPlayback(audio);
      } else {
        pausePlayback(audio);
      }
    } else {
      // Browser SpeechSynthesis Mode (Level 3 Fallback)
      if (isSpeakingSpeech) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          controlBtn.classList.add("playing");
          if (playIcon) playIcon.style.display = "none";
          if (pauseIcon) pauseIcon.style.display = "inline";
          if (visualizer) visualizer.classList.add("active");
          renderVisualizer();
          updateTTSSubtitlesLoop();
        } else {
          window.speechSynthesis.pause();
          controlBtn.classList.remove("playing");
          if (playIcon) playIcon.style.display = "inline";
          if (pauseIcon) pauseIcon.style.display = "none";
          if (animationId) cancelAnimationFrame(animationId);
        }
      } else {
        speakWithTTS(selfIntroText);
      }
    }
  });

  function startPlayback(mediaElement) {
    // 1. Cancel any active speech synthesis immediately
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    isSpeakingSpeech = false;
    if (window.resetProjectAudioButtons) {
      window.resetProjectAudioButtons();
    }

    // 2. Pause the other media elements
    if (mediaElement === video && audio) {
      audio.pause();
      audio.currentTime = 0;
    } else if (mediaElement === audio && video) {
      video.pause();
      video.currentTime = 0;
    }

    mediaElement.play()
      .then(() => {
        controlBtn.classList.add("playing");
        if (playIcon) playIcon.style.display = "none";
        if (pauseIcon) pauseIcon.style.display = "inline";
        if (badge) badge.style.display = "none";
        if (subContainer) subContainer.style.display = "block";

        if (useVideo) {
          img.style.opacity = "0";
          video.style.display = "block";
          video.style.opacity = "1";
        }

        // Initialize Audio Analysis
        initAudioAnalysis(mediaElement);
        
        // Start Loops
        if (visualizer) {
          visualizer.classList.add("active");
          renderVisualizer();
        }
        updateSubtitles(mediaElement);
      })
      .catch((err) => {
        console.error("Playback failed, trying SpeechSynthesis fallback", err);
        // Only trigger fallback if both elements are indeed paused
        if (audio.paused && video.paused) {
          useAudio = false;
          speakWithTTS(selfIntroText);
        }
      });
  }

  function pausePlayback(mediaElement) {
    mediaElement.pause();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (window.resetProjectAudioButtons) {
      window.resetProjectAudioButtons();
    }
    controlBtn.classList.remove("playing");
    if (playIcon) playIcon.style.display = "inline";
    if (pauseIcon) pauseIcon.style.display = "none";
    
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  }

  const onEnded = () => {
    controlBtn.classList.remove("playing");
    if (playIcon) playIcon.style.display = "inline";
    if (pauseIcon) pauseIcon.style.display = "none";
    if (badge) badge.style.display = "flex";
    if (subContainer) subContainer.style.display = "none";
    if (visualizer) visualizer.classList.remove("active");

    if (useVideo) {
      video.style.opacity = "0";
      img.style.opacity = "1";
      setTimeout(() => {
        if (video.style.opacity === "0") {
          video.style.display = "none";
        }
      }, 400);
    }

    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };

  audio.addEventListener("ended", onEnded);
  video.addEventListener("ended", onEnded);
  audio.addEventListener("pause", () => {
    if (audio.ended) return;
    pausePlayback(audio);
  });
  video.addEventListener("pause", () => {
    if (video.ended) return;
    pausePlayback(video);
  });

  function speakWithTTS(text) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (window.resetProjectAudioButtons) {
      window.resetProjectAudioButtons();
    }

    // Pause all media elements
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    window.speechSynthesis.cancel();
    
    const voice = getMaleVoice();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
      // Adjust pitch/rate slightly for a younger 21-year-old male sounding voice if possible
      utterance.rate = 1.03;
      utterance.pitch = 1.02;
    }
    
    speechWords = text.split(/\s+/);
    activeWordIndex = -1;
    renderTTSSubtitles();
    
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        let charCount = 0;
        for (let i = 0; i < speechWords.length; i++) {
          const word = speechWords[i];
          if (event.charIndex >= charCount && event.charIndex < charCount + word.length + 5) {
            activeWordIndex = i;
            highlightTTSWord(i);
            break;
          }
          charCount += word.length + 1;
        }
      }
    };

    utterance.onstart = () => {
      isSpeakingSpeech = true;
      controlBtn.classList.add("playing");
      if (playIcon) playIcon.style.display = "none";
      if (pauseIcon) pauseIcon.style.display = "inline";
      if (badge) badge.style.display = "none";
      if (subContainer) subContainer.style.display = "block";
      if (visualizer) {
        visualizer.classList.add("active");
        renderVisualizer();
      }
      updateTTSSubtitlesLoop();
    };

    utterance.onend = () => {
      resetTTSState();
    };

    utterance.onerror = (err) => {
      console.error("SpeechSynthesis error:", err);
      resetTTSState();
    };

    window.speechSynthesis.speak(utterance);
  }

  function renderTTSSubtitles() {
    if (!subText) return;
    subText.innerHTML = "";
    speechWords.forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word;
      subText.appendChild(span);
    });
  }

  function highlightTTSWord(index) {
    if (!subText) return;
    const spans = subText.querySelectorAll("span");
    spans.forEach((span, i) => {
      if (i === index) {
        span.classList.add("active");
        span.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      } else {
        span.classList.remove("active");
      }
    });
  }

  function updateTTSSubtitlesLoop() {
    if (!isSpeakingSpeech || window.speechSynthesis.paused) return;
    highlightTTSWord(activeWordIndex);
    requestAnimationFrame(updateTTSSubtitlesLoop);
  }

  function resetTTSState() {
    isSpeakingSpeech = false;
    controlBtn.classList.remove("playing");
    if (playIcon) playIcon.style.display = "inline";
    if (pauseIcon) pauseIcon.style.display = "none";
    if (badge) badge.style.display = "flex";
    if (subContainer) subContainer.style.display = "none";
    if (visualizer) visualizer.classList.remove("active");
    window.speechSynthesis.cancel();
  }

  // Setup Web Audio API for real audio analysis
  function initAudioAnalysis(mediaElement) {
    if (audioCtx) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;

      sourceNode = audioCtx.createMediaElementSource(mediaElement);
      sourceNode.connect(analyser);
      analyser.connect(audioCtx.destination);
    } catch (err) {
      console.warn("Web Audio API not fully supported or routing failed", err);
    }
  }

  // Render visualizer canvas
  if (visualizer) {
    const canvasCtx = visualizer.getContext("2d");
    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = visualizer.getBoundingClientRect();
      visualizer.width = rect.width * dpr;
      visualizer.height = rect.height * dpr;
      canvasCtx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resizeCanvas);
    setTimeout(resizeCanvas, 200);

    const renderVisualizer = () => {
      if (!visualizer.classList.contains("active")) return;

      animationId = requestAnimationFrame(renderVisualizer);

      const width = visualizer.width / dpr;
      const height = visualizer.height / dpr;
      canvasCtx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) / 2 - 20;

      let bufferLength = 128;
      let dataArray = new Uint8Array(bufferLength);

      if (analyser) {
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
      } else {
        // Procedural speech visualizer animation for browser TTS fallback
        if (isSpeakingSpeech && !window.speechSynthesis.paused) {
          const time = Date.now() * 0.005;
          for (let i = 0; i < bufferLength; i++) {
            const base = Math.sin(time + i * 0.1) * 60 + 80;
            const noise = Math.random() * 25;
            const formant = Math.sin(time * 0.3 + i * 0.05) * 35;
            const rollOff = Math.max(0, 1 - i / bufferLength);
            dataArray[i] = Math.max(0, (base + noise + formant) * rollOff);
          }
        } else {
          dataArray.fill(0);
        }
      }

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      const pulseFactor = average / 255;

      // Draw ambient pulse glow behind the portrait
      canvasCtx.save();
      canvasCtx.beginPath();
      canvasCtx.arc(centerX, centerY, baseRadius + pulseFactor * 32, 0, Math.PI * 2);
      const pulseGrad = canvasCtx.createRadialGradient(
        centerX, centerY, baseRadius,
        centerX, centerY, baseRadius + 10 + pulseFactor * 40
      );
      pulseGrad.addColorStop(0, "rgba(89, 234, 210, 0.45)");
      pulseGrad.addColorStop(0.3, "rgba(138, 180, 255, 0.22)");
      pulseGrad.addColorStop(1, "rgba(255, 120, 151, 0)");
      canvasCtx.fillStyle = pulseGrad;
      canvasCtx.fill();
      canvasCtx.restore();

      // Draw frequency bar lines
      const numBars = 72;
      canvasCtx.save();
      canvasCtx.lineWidth = 2.5;
      
      for (let i = 0; i < numBars; i++) {
        const dataIndex = Math.floor((i / numBars) * bufferLength);
        const frequencyVal = dataArray[dataIndex];
        const barHeight = (frequencyVal / 255) * 36;

        const angle = (i / numBars) * Math.PI * 2;
        const xStart = centerX + Math.cos(angle) * baseRadius;
        const yStart = centerY + Math.sin(angle) * baseRadius;
        const xEnd = centerX + Math.cos(angle) * (baseRadius + barHeight);
        const yEnd = centerY + Math.sin(angle) * (baseRadius + barHeight);

        const grad = canvasCtx.createLinearGradient(xStart, yStart, xEnd, yEnd);
        grad.addColorStop(0, "#59ead2");
        grad.addColorStop(0.5, "#8ab4ff");
        grad.addColorStop(1, "rgba(255, 120, 151, 0.1)");

        canvasCtx.strokeStyle = grad;
        canvasCtx.beginPath();
        canvasCtx.moveTo(xStart, yStart);
        canvasCtx.lineTo(xEnd, yEnd);
        canvasCtx.stroke();
      }
      canvasCtx.restore();
    };
  }

  // Update subtitles for audio/video file
  function updateSubtitles(mediaElement) {
    if (!subText || !subContainer) return;
    if (mediaElement.paused || mediaElement.ended) return;

    const currentTime = mediaElement.currentTime;

    if (subText.children.length === 0 && subtitles.length > 0) {
      subText.innerHTML = "";
      subtitles.forEach((item) => {
        const span = document.createElement("span");
        span.textContent = item.word;
        span.dataset.start = item.start;
        span.dataset.end = item.end;
        subText.appendChild(span);
      });
    }

    const spans = subText.querySelectorAll("span");
    spans.forEach((span) => {
      const start = parseFloat(span.dataset.start);
      const end = parseFloat(span.dataset.end);

      if (currentTime >= start && currentTime <= end) {
        span.classList.add("active");
        span.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      } else {
        span.classList.remove("active");
      }
    });

    if (!mediaElement.paused && !mediaElement.ended) {
      requestAnimationFrame(() => updateSubtitles(mediaElement));
    }
  }
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
  setupAssistant();
  setupCanvas();
  setupTalkingPortrait();
  setupProjectAudio();
}

document.addEventListener("DOMContentLoaded", boot);
