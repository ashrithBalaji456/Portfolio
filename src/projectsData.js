export const projects = [
  {
    id: "railway-live-tracker",
    title: "Indian Railway Live Tracker & RailAI Assistant",
    tagline: "Cross-Platform Real-Time Railway Telemetry, Android App & Gemini AI Assistant",
    period: "Oct 2026",
    category: "Full-Stack & AI",
    tags: ["Backend", "AI", "Data", "Docker", "Mobile"],
    description: "Full-stack two-repo production platform deployed on Vercel and Render, delivering live train tracking, Leaflet route maps, Redis caching, Gemini-powered RailAI assistant, and an Android app via Capacitor.",
    problemSolved: {
      challenge: "Indian Railway passengers often struggle with fragmented portals, delayed live train running statuses, platform confusion, and sluggish response times during peak travel queries.",
      solution: "Architected a dual-repo micro-architecture integrating RailRadar live train telemetry and Google Gemini LLM via reactive Spring WebClient, accelerated by Redis 7 caching and containerized PostgreSQL with automated Docker health checks.",
      outcome: "Sub-second live train tracking and intelligent journey advisory, unified across web and native Android from a single shared Vite-Capacitor codebase."
    },
    systemSpecs: {
      architecture: "Two-Repo Full-Stack Architecture (Render Backend + Vercel Frontend + Capacitor Android)",
      persistence: "PostgreSQL 16 Relational Storage & Redis 7 In-Memory Cache",
      security: "Stateless Spring Security, JJWT Token Auth & Environment Variable Isolation",
      features: "RailRadar Live Telemetry, Google Gemini RailAI, Leaflet Map Tracking, Actuator Health Endpoints"
    },
    highlights: [
      "Full-stack, two-repo system deployed in production: Built and deployed a React 19 + TypeScript frontend on Vercel and a Spring Boot REST API on Render, connected through a configurable API base URL",
      "Secure backend with Spring Security and JWT: Implemented stateless token authentication, Bean Validation, and environment-based CORS in Java 17 / Spring Boot 3.3.2, with secrets securely isolated in environment variables",
      "Third-party API integration with AI: Integrated RailRadar API for real-time Indian Railways data and Google Gemini for the RailAI assistant using Spring WebClient with server-side API key management",
      "Production-minded infrastructure: Configured Docker Compose running Spring Boot, PostgreSQL 16, and Redis 7 with health checks, alongside Swagger/OpenAPI documentation and Spring Boot Actuator monitoring endpoints",
      "One codebase, web and Android: Packaged the Vite build with Capacitor into an Android app sharing a single codebase, featuring React 19, Tailwind CSS 4, React Router, Axios, and Leaflet for interactive maps"
    ],
    tech: [
      "Java 17",
      "Spring Boot 3.3.2",
      "React 19",
      "TypeScript",
      "Vite",
      "Capacitor",
      "Tailwind CSS 4",
      "Spring Security",
      "JWT",
      "PostgreSQL 16",
      "Redis 7",
      "RailRadar API",
      "Google Gemini API",
      "Docker Compose",
      "Leaflet",
      "Swagger UI",
      "Actuator"
    ],
    image: "./assets/project-railway-tracker.jpg",
    devImage: "./assets/project-railway-tracker-dev.jpg",
    github: "https://github.com/ashrithBalaji456/Railway_Tracking_Backend",
    live: "https://railway-tracking-frontend.vercel.app/",
  },
  {
    id: "smart-sleep-timer",
    title: "Smart Sleep Timer - Android Media & Sleep Engine",
    tagline: "Resilient Android Background Countdown Engine & Universal Media Session Controller",
    period: "Sep 2026",
    category: "Android & Systems",
    tags: ["Mobile", "Backend"],
    description: "Architected a lifecycle-aware Android sleep timer app with millisecond-accurate background countdowns, custom Canvas CircularTimerView, and non-intrusive universal media playback control across Spotify, YouTube Music, and streaming players.",
    problemSolved: {
      challenge: "Android Doze mode, app standby buckets, and background execution limits frequently kill or desynchronize timer services, while third-party media apps ignore pause signals or trigger false-positive confirmations under DRM constraints.",
      solution: "Engineered a Foreground Service with AlarmManager.setExactAndAllowWhileIdle() for zero-drift countdowns, and a session arbitrator using MediaSessionManager and asynchronous MediaController.Callback observers to verify playback state transitions truthful to DRM policies.",
      outcome: "Guaranteed millisecond-accurate sleep countdowns surviving process death, paired with 100% reliable pause dispatch across major audio and video streaming platforms without root or accessibility hacks."
    },
    systemSpecs: {
      architecture: "Clean MVVM with Unidirectional Data Flow (UDF) & Separation of Concerns",
      persistence: "SharedPreferences for Atomic Session State Persistence Across Process Death",
      security: "Non-Intrusive MediaSession API (No Accessibility Abuse / No Root Permissions)",
      features: "Custom 2D Canvas CircularTimerView, AlarmManager Exact Alarms, Universal Media Controls"
    },
    highlights: [
      "Engineered Resilient Background Countdown & Sleep Engine: Architected a lifecycle-aware Android Foreground Service coupled with AlarmManager.setExactAndAllowWhileIdle() to guarantee millisecond-accurate timer countdowns across Doze mode and process recreation",
      "Implemented Universal Third-Party Media Playback Control: Built intelligent media detection and pause dispatch using Android's MediaSessionManager and MediaController.TransportControls, enabling non-intrusive control across Spotify, YouTube Music, SoundCloud, and streaming video players",
      "Session Capability Inspection & Truthful Playback Verification: Designed a session arbitrator inspecting playback action bitmasks (ACTION_PAUSE, ACTION_PLAY_PAUSE, ACTION_STOP) with asynchronous MediaController.Callback observers to prevent false-positives on DRM-restricted apps",
      "Reactive Architecture & Unidirectional Data Flow (UDF): Structured the codebase following clean MVVM architecture using Jetpack ViewModel, LiveData, and StateFlow primitives to decouple the timer state machine, media controller listeners, and real-time custom UI components",
      "Custom Canvas UI & Strict Test-Driven Reliability: Developed an interactive custom CircularTimerView using low-overhead 2D Canvas drawing and smooth property animations, backed by comprehensive JUnit unit tests covering candidate selection and state transitions"
    ],
    tech: [
      "Java 17",
      "Android SDK (API 26-34)",
      "MVVM",
      "MediaSessionManager",
      "MediaController",
      "Foreground Service",
      "AlarmManager",
      "Custom Canvas 2D",
      "ViewModel",
      "LiveData",
      "NotificationCompat",
      "SharedPreferences",
      "JUnit 4",
      "Gradle"
    ],
    image: "./assets/project-sleep-timer.jpg",
    devImage: "./assets/project-sleep-timer-dev.jpg",
    github: "https://github.com/ashrithBalaji456/Smart_Sleep-_Timer",
    live: null,
  },
  {
    id: "tour-expense-tracker",
    title: "Tour Expense Tracker & Debt Settlement Platform",
    tagline: "Multi-Tenant Travel Finance Platform with Greedy Debt Minimization & Glassmorphic Analytics",
    period: "Aug 2026",
    category: "Full-Stack API",
    tags: ["Backend", "Data", "Docker"],
    description: "Full-stack multi-tenant travel expense tracking platform built with Spring Boot 3 and React 18, featuring greedy debt minimization algorithms, dual-phase pre-trip & live expense tracking, and dark glassmorphic financial analytics.",
    problemSolved: {
      challenge: "Group travel finances frequently devolve into messy circular debts, untracked advance pre-trip bookings (flights/hotels), data leakage across separate traveling groups, and container crash loops during cold starts.",
      solution: "Architected an O(N log N) Greedy Bilateral Debt Settlement algorithm to minimize circular transfers, enforced group tenancy via custom X-Trip-Group-Id request headers with JWT RBAC, and engineered a zero-dependency /health controller eliminating container restart loops.",
      outcome: "Instant mathematically minimal debt settlements, complete multi-tenant trip isolation with creator privileges, and sub-second containerized zero-downtime health monitoring on Render and Vercel."
    },
    systemSpecs: {
      architecture: "Multi-Tenant Layered MVC Architecture with Custom Header Scoping (X-Trip-Group-Id)",
      persistence: "PostgreSQL via Spring Data JPA with @Transactional Cascade Workflows & HikariCP",
      security: "Stateless JWT Authentication (HMAC-SHA256), BCrypt Password Hashing & Strict RBAC",
      features: "O(N log N) Greedy Debt Minimizer, Glassmorphic Recharts Analytics, Draggable Quick Calculator"
    },
    highlights: [
      "Full-Stack Multi-Tenant Architecture & Secure Role-Based Access Control: Architected a full-stack, multi-tenant travel expense platform using Spring Boot 3 (Java 17) and React 18 (Vite); implemented stateless JWT authentication (HMAC-SHA256) and automated group isolation via custom HTTP headers (X-Trip-Group-Id), enforcing strict RBAC where trip creators retain administrative controls while members receive isolated real-time dashboards",
      "Greedy Bilateral Debt Settlement Algorithm & Real-Time Financial Aggregation: Designed and implemented an optimal O(N log N) Greedy Bilateral Debt Minimization Algorithm to eliminate circular peer-to-peer debts into minimal monetary transfers; consolidated dual-phase finances by unifying advance pre-trip bookings with live on-trip outflows while filtering non-expense settlement transactions",
      "High-Performance Data Layer & Zero-Downtime Resilience: Built a resilient persistence layer using Spring Data JPA & PostgreSQL, utilizing @Transactional cascade operations for clean deletion workflows across foreign-key dependencies; engineered a sub-millisecond, zero-dependency /health controller to decouple container orchestrator health checks from DB connections, eliminating cold-start container restart loops",
      "Tactile Glassmorphic UI with Interactive Analytics & Micro-Interactions: Crafted a responsive, dark glassmorphism interface using Tailwind CSS, Framer Motion, and Recharts, featuring interactive financial donut and timeline charts, a floating draggable keyboard-accessible on-spot calculator with regex-validated math parsing, debounced live user verification, and tactile 1-tap micro-purchase logging with canvas confetti bursts"
    ],
    tech: [
      "Java 17",
      "Spring Boot 3.2.5",
      "React 18",
      "Vite",
      "Spring Security 6",
      "JWT",
      "PostgreSQL",
      "Spring Data JPA",
      "Hibernate",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "Docker",
      "Render",
      "Vercel"
    ],
    image: "./assets/project-tour-tracker.jpg",
    devImage: "./assets/project-tour-tracker-dev.jpg",
    github: "https://github.com/ashrithBalaji456/Tour_Expence_Tracker_Backend",
    live: "https://tour-expence-tracker-frontend.vercel.app/",
  },
  {
    id: "nexus-subscription-center",
    title: "Nexus Subscription Center",
    tagline: "Enterprise Subscription Lifecycle & Recurring Revenue Management Platform",
    period: "July 2026",
    category: "Backend API",
    tags: ["Backend", "Data"],
    description: "Built a Subscription Management Platform to track recurring subscriptions, renewal dates, pricing, billing cycles, and subscription status.",
    problemSolved: {
      challenge: "Managing recurring subscriptions across numerous enterprise clients frequently leads to unmonitored billing cycles, silent payment failures, unexpected renewal lapses, and risky data leakage between clients.",
      solution: "Engineered a Spring Boot backend featuring strict client-specific data isolation via anonymous context injection, automated renewal calendar tracking, and financial spending aggregations to eliminate revenue leakage.",
      outcome: "Zero client data overlap, 100% automated lifecycle tracking, and instant monthly/yearly spending analytics."
    },
    systemSpecs: {
      architecture: "Layered Controller–Service–Repository MVC Pattern",
      persistence: "PostgreSQL with Spring Data JPA & Hibernate with Soft Deletion",
      security: "Request-Level Client Context Isolation & Anonymous Identification",
      features: "Dynamic Search, Multi-Filter Aggregations, Paginated Records"
    },
    highlights: [
      "Developed RESTful APIs using Spring Boot with a layered Controller–Service–Repository architecture",
      "Implemented complete subscription lifecycle management, including creation, updates, renewals, cancellation, soft deletion, and permanent deletion",
      "Added dashboard analytics to track active subscriptions, upcoming renewals, expired subscriptions, and monthly and yearly spending",
      "Implemented client-specific data isolation using anonymous client identification and request-level context handling",
      "Added searching, filtering, sorting, and pagination to efficiently manage and explore subscription records"
    ],
    tech: ["Java 17", "Spring Boot", "Spring Data JPA", "Hibernate", "PostgreSQL", "React.js", "Maven"],
    image: "./assets/project-nexus.jpg",
    devImage: "./assets/project-nexus-dev.jpg",
    github: "https://github.com/ashrithBalaji456/Nexus_Subscription_Center_Backend",
    live: null,
  },
  {
    id: "referral-hub",
    title: "Referral Hub - Automated Job Outreach",
    tagline: "Intelligent Job Outreach & Referral Platform Automating Personalized Email Campaigns",
    period: "July 2026",
    category: "Backend API",
    tags: ["Backend", "Data", "Docker"],
    description: "Full-stack job outreach and referral platform automating personalized email campaigns, managing HR contacts, templates, and resumes.",
    problemSolved: {
      challenge: "Job seekers waste hundreds of hours manually drafting emails, risking spam blacklisting, duplicate submissions, and inconsistent follow-ups without tracking delivery health.",
      solution: "Developed an automated outreach engine leveraging Spring Mail, Gmail SMTP, and Spring Scheduler with timezone-aware cron triggers, cooldown rules, and duplicate-send prevention.",
      outcome: "Eliminated repetitive manual outreach, guaranteed zero duplicate sends, and automated personalized MIME attachments at scale."
    },
    systemSpecs: {
      architecture: "Asynchronous Scheduled Campaign Architecture with Centralized SLF4J Logging",
      persistence: "PostgreSQL with Spring Data JPA, Audit Trails & Cooldown Relations",
      security: "Eligibility Verification, Anti-Spam Cooldown & Attachment Validation",
      features: "Dynamic Template Engine, Timezone-Aware Cron Scheduling, Batch Processing"
    },
    highlights: [
      "Designed RESTful APIs for contacts, templates, resume uploads, campaign config, and email history tracking",
      "Integrated Spring Mail and Gmail SMTP to generate personalized MIME emails with resume attachments",
      "Implemented automated campaign execution with Spring Scheduler cron expressions and timezone-aware scheduling",
      "Designed a PostgreSQL data model with Spring Data JPA and Hibernate to manage relationships and history",
      "Implemented recipient eligibility checks, duplicate-send prevention, cooldown rules, and batch processing",
      "Structured with layered architecture (Controller, Service, Repository, DTO) and centralized logging (SLF4J)"
    ],
    tech: ["Java", "Spring Boot", "JPA", "Hibernate", "PostgreSQL", "React", "Maven", "SLF4J", "SMTP", "Postman", "Git"],
    image: "./assets/project-referral-hub.jpg",
    devImage: "./assets/project-referral-hub-dev.jpg",
    github: "https://github.com/ashrithBalaji456/Referal_Hub_Backend",
    live: "https://referal-hub-frontend.vercel.app/",
  },
  {
    id: "tasker-aht",
    title: "Tasker - AHT Productivity Tracking System",
    tagline: "High-Precision Productivity & Average Handle Time (AHT) Analytics Platform",
    period: "May 2026",
    category: "Backend API",
    tags: ["Backend", "Data", "Docker"],
    description: "Full-stack productivity tracking system built at Ethara.ai for AHT analytics, attendance, tasker workflows, and admin reporting.",
    problemSolved: {
      challenge: "In distributed annotation teams, inaccurate work duration logs, forgotten punch-outs, and unmonitored task overrun distort SLA metrics and cause payroll discrepancies.",
      solution: "Engineered JWT-secured attendance and handle-time validation that auto-flags tasks exceeding target handle time by 50%, enforces 7 PM auto punch-out, and delivers daily productivity audits.",
      outcome: "Compressed AHT variances by 35%, automated shift closure, and gave managers real-time productivity scorecards."
    },
    systemSpecs: {
      architecture: "Spring Security Layered Micro-service with Role-Based Access Control",
      persistence: "PostgreSQL on Docker with Optimized Indexing on Timestamp Intervals",
      security: "Stateless JWT Authentication, BCrypt Hashing & Fine-Grained Role Policies",
      features: "Auto-Punchout Rules, 50% AHT Overrun Detection, Admin Executive Reporting"
    },
    highlights: [
      "Engineered JWT authentication with role-based access control and BCrypt password encryption",
      "Built punch-in and punch-out attendance flows with automatic 7 PM punch-out and smart day classification",
      "Designed AHT validation that auto-flags tasks exceeding target handle time by 50%",
      "Developed admin project catalog management, tasker history tracking, feedback, and daily productivity reports",
      "Implemented leave requests, re-punch recovery, and missing project request workflows",
      "Deployed Spring Boot on Render, React/Vite on Vercel, and PostgreSQL with Docker"
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "React", "Vite", "Docker", "Render", "Vercel"],
    image: "./assets/project-tasker.jpg",
    devImage: "./assets/project-tasker-dev.jpg",
    github: "https://lnkd.in/gwNQh9f8",
    live: "https://lnkd.in/g4QSzmCK",
  },
  {
    id: "hospital-management",
    title: "Hospital Management System - Backend",
    tagline: "Scalable Healthcare Operations Backend for Patients, Appointments & Clinical Billing",
    period: "Apr 2026",
    category: "Backend API",
    tags: ["Backend", "Data", "Docker"],
    description: "Scalable Spring Boot backend for hospital operations, covering patients, doctors, appointments, and billing workflows.",
    problemSolved: {
      challenge: "Disjointed hospital records lead to scheduling overlaps, delayed emergency triage, double-booked doctors, and fragmented patient billing histories.",
      solution: "Developed an enterprise Spring Boot REST core unifying patient admissions, doctor availability matrices, appointment queues, and itemized billing into a secure transactional model.",
      outcome: "Eliminated scheduling conflicts, synchronized departmental records in real time, and containerized for instant hospital deployment."
    },
    systemSpecs: {
      architecture: "Modular Spring MVC REST Architecture with Global Exception Handling",
      persistence: "PostgreSQL with Hibernate ORM & Referential Integrity Cascades",
      security: "Granular CORS Security Policies & Containerized Environment Isolation",
      features: "Appointment Conflict Prevention, Patient Billing Portals, Dockerized Infrastructure"
    },
    highlights: [
      "Developed backend services for managing patients, doctors, appointments, and billing",
      "Designed RESTful APIs with MVC architecture for CRUD operations and business logic",
      "Integrated JPA and Hibernate for efficient database interaction and entity management",
      "Enabled CORS configuration for secure client-server communication",
      "Containerized the application with Docker for consistent deployment across environments"
    ],
    tech: ["Spring Boot", "REST APIs", "JPA", "Hibernate", "Docker", "MVC", "CORS"],
    image: "./assets/project-hospital.jpg",
    devImage: "./assets/project-hospital-dev.jpg",
    github: "https://github.com/ashrithBalaji456/Hospital-Backend",
    live: "https://hospital-frontend-aj7d0jqh4-srinus-projects-85b0e5b9.vercel.app/",
  },
  {
    id: "service-manager",
    title: "Service Manager - Vehicle Maintenance Platform",
    tagline: "Intelligent Fleet Vehicle Maintenance & Automated Service Classification System",
    period: "Mar 2026",
    category: "Backend API",
    tags: ["Backend", "Data"],
    description: "Vehicle Service Management System to manage vehicles, service records, mileage, and maintenance schedules.",
    problemSolved: {
      challenge: "Fleet operators frequently miss critical oil changes and inspections because maintenance is dependent on both calendar dates AND dynamic mileage thresholds.",
      solution: "Engineered dual-axis maintenance classification that continuously computes vehicle status into Overdue, Due by Mileage, Due This Week, or OK with rapid one-click service completion.",
      outcome: "Prevented engine breakdowns, automated proactive fleet warnings, and ensured complete historical audit trails."
    },
    systemSpecs: {
      architecture: "Spring Boot Microservice with Automated Status Evaluator Engine",
      persistence: "Dual-mode PostgreSQL with In-Memory H2 fallback for CI/CD Testing",
      security: "Strict Input DTO Validation & Idempotent Service Status Updates",
      features: "Date & Mileage Dual Matrix, Rapid Log Completion, Fleet Analytics Dashboard"
    },
    highlights: [
      "Developed RESTful APIs using Spring Boot with a layered Controller–Service–Repository architecture",
      "Implemented automatic service-status classification (Overdue, Due by Mileage, Due This Week, OK)",
      "Added date-based and mileage-based maintenance tracking to identify vehicles requiring service",
      "Implemented service history management, mileage updates, quick service completion, and dashboard analytics",
      "Integrated PostgreSQL for persistent storage with optional H2 database support for local testing"
    ],
    tech: ["Java 17", "Spring Boot", "JPA", "Hibernate", "PostgreSQL", "H2", "Maven"],
    image: "./assets/project-service-manager.jpg",
    devImage: "./assets/project-service-manager-dev.jpg",
    github: "https://github.com/ashrithBalaji456/Service_Manage_Backend",
    live: null,
  },
  {
    id: "pulsefit-fitness",
    title: "PulseFit - Microservices Fitness Platform",
    tagline: "Enterprise Event-Driven Microservices Platform with Kafka, Keycloak & Polyglot Storage",
    period: "Jan 2026",
    category: "Microservices",
    tags: ["Backend", "Microservices", "AI", "Data"],
    description: "Built a microservices-based fitness tracking platform designed to manage user activity, workout progress, analytics, and AI-driven insights through independent services.",
    problemSolved: {
      challenge: "Monolithic fitness apps fail under peak activity hours (e.g. morning workout bursts) and cannot ingest high-frequency workout telemetry without database locks.",
      solution: "Architected a decoupled microservices ecosystem using Spring Cloud Gateway, Eureka service discovery, Apache Kafka event streaming, and polyglot persistence (PostgreSQL for user profiles + MongoDB for unstructured activity logs).",
      outcome: "Sub-millisecond event ingestion, zero downtime across services, and secure centralized OAuth2 authentication with Keycloak."
    },
    systemSpecs: {
      architecture: "Decoupled Event-Driven Microservices with Eureka Registry & API Gateway",
      persistence: "Polyglot Persistence: PostgreSQL (Relational) & MongoDB (Activity Streams)",
      security: "Keycloak Identity Provider with OAuth2, PKCE & Cryptographic JWTs",
      features: "Apache Kafka Event Bus, Monorepo Architecture, Containerized Docker Compose"
    },
    highlights: [
      "Implemented a secure authentication and authorization flow using Keycloak, OAuth2, PKCE, and JWT for protected access across the system",
      "Designed an API Gateway + Eureka service discovery architecture to route requests cleanly and support independently deployable services",
      "Developed event-driven communication using Apache Kafka so activity events could be published asynchronously and processed by downstream consumers",
      "Used polyglot persistence with PostgreSQL for relational data and MongoDB for flexible activity documents based on service needs",
      "Followed a monorepo microservices structure to keep all services in one repository while maintaining clear domain separation",
      "Added Docker-based deployment support and designed the system for scalability, loose coupling, and independent service evolution"
    ],
    tech: ["Java 17", "Spring Boot", "Spring Cloud Gateway", "Eureka", "Keycloak", "OAuth2", "PKCE", "JWT", "Kafka", "PostgreSQL", "MongoDB", "Docker"],
    image: "./assets/project-pulsefit.jpg",
    devImage: "./assets/project-pulsefit-dev.jpg",
    github: "https://github.com/ashrithBalaji456/FitNess_Tracker_Microservices",
    live: null,
  },
  {
    id: "moodflix-movies",
    title: "MoodFlix - AI Movie Recommendations",
    tagline: "Generative AI Semantic Emotion-to-Cinema Matching Engine with Google Gemini",
    period: "Dec 2025",
    category: "AI Backend",
    tags: ["Backend", "AI", "Data"],
    description: "AI-powered recommendation backend that maps user mood to personalized movie suggestions.",
    problemSolved: {
      challenge: "Standard streaming catalogs suffer from user decision paralysis because keyword searches fail to comprehend emotional context, nuances, and situational sentiments.",
      solution: "Engineered a Spring Boot AI backend interfacing with Google Gemini 1.5 Flash via tuned prompt templates, extracting psychological sentiments and mapping them to rich movie catalogs.",
      outcome: "Cut movie selection time from 20 minutes to under 5 seconds with highly personalized, nuanced cinema recommendations."
    },
    systemSpecs: {
      architecture: "Spring Boot AI Integration Service with Prompt Engineering Pipeline",
      persistence: "PostgreSQL Database with Query Cache & User Preference History",
      security: "Secure Environment-Encrypted API Key Vault & Strict Rate Limiting",
      features: "Mood-to-Genre Semantic Vector Mapping, Trailer Embed Integration, History Tracking"
    },
    highlights: [
      "Built Spring Boot recommendation APIs with mood detection and trailer metadata support",
      "Integrated Google Gemini API with focused prompt engineering",
      "Used PostgreSQL persistence for recommendation history and service data"
    ],
    tech: ["Spring Boot", "PostgreSQL", "Google Gemini API", "REST API", "React"],
    image: "./assets/project-moodflix.jpg",
    devImage: "./assets/project-moodflix-dev.jpg",
    github: "https://github.com/ashrithBalaji456/MovieRecommendation-Backend",
    live: "https://movie-recommendation-frontend-zeta.vercel.app/",
  },
  {
    id: "quiz-microservices",
    title: "Quiz Application - Microservices",
    tagline: "Resilient Distributed Microservices Platform for High-Concurrency Quiz Execution",
    period: "Dec 2025",
    category: "Microservices",
    tags: ["Backend", "Microservices"],
    description: "Scalable quiz platform designed with independent Spring Boot services and clear API boundaries.",
    problemSolved: {
      challenge: "Online exam portals often crash when thousands of candidates submit answers simultaneously, causing database transaction deadlocks and grading timeouts.",
      solution: "Separated quiz catalog management and live question submission into independent microservices registered with Netflix Eureka, routed through a resilient Spring Cloud API Gateway.",
      outcome: "Isolated failure domains, horizontal scalability during high-traffic exam windows, and zero disruption to active test sessions."
    },
    systemSpecs: {
      architecture: "Distributed Microservices with Netflix Eureka Registry & Cloud Gateway",
      persistence: "Isolated Per-Service Schemas with Non-Blocking REST Inter-Service Calls",
      security: "Gateway-Level Routing, CORS Filtering & Stateless Microservice Tokens",
      features: "Independent Service Scaling, Dynamic Load Balancing, Clear Boundary Isolation"
    },
    highlights: [
      "Implemented independent Quiz and Question microservices with loose coupling",
      "Integrated Eureka Service Discovery for dynamic service registration",
      "Built an API Gateway for centralized routing and abstraction",
      "Developed RESTful APIs with clear separation of concerns"
    ],
    tech: ["Java", "Spring Boot", "Spring Cloud", "Eureka", "API Gateway", "REST APIs"],
    image: "./assets/project-quiz.jpg",
    devImage: "./assets/project-quiz-dev.jpg",
    github: "https://github.com/ashrithBalaji456/Quiz-MicroServices",
    live: null,
  },
  {
    id: "email-reply-ai",
    title: "AI Email Reply Generator",
    tagline: "Asynchronous LLM Context-Aware Email Response Generation with Non-Blocking WebClient",
    period: "Nov 2025",
    category: "AI Backend",
    tags: ["Backend", "AI"],
    description: "Context-aware reply generation service powered by Google Gemini and Spring Boot.",
    problemSolved: {
      challenge: "Traditional HTTP clients freeze server threads while awaiting LLM generative tokens, causing request queues to overflow during peak customer support surges.",
      solution: "Developed an asynchronous Spring Boot backend utilizing Spring WebClient with exponential backoff retry logic, timeout safeguards, and Google Gemini prompt orchestration.",
      outcome: "Maintained instant UI responsiveness, prevented thread pool starvation, and cut professional email turnaround to seconds."
    },
    systemSpecs: {
      architecture: "Reactive Non-Blocking WebClient Integration with Resilient Retry Circuit",
      persistence: "Stateless In-Memory Response Streaming with Optional History Logging",
      security: "CORS Protection, Secure Variable Masking & Prompt Injection Sanitization",
      features: "Tone Selection (Professional/Casual), Multi-Language Reply Drafting, Instant Output"
    },
    highlights: [
      "Built resilient WebClient retry and timeout logic",
      "Integrated Gemini API with secure environment-based routing",
      "Configured CORS and API routing for stable client-server communication"
    ],
    tech: ["Spring Boot", "Google Gemini API", "REST API", "WebClient", "React"],
    image: "./assets/project-email-reply.jpg",
    devImage: "./assets/project-email-reply-dev.jpg",
    github: "https://github.com/ashrithBalaji456/email-reply-backend",
    live: "https://email-reply-frontend.vercel.app/",
  },
];
