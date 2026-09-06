export const portfolioData = {
  personal: {
    name: "Siddharth K",
    title: "AI-Assisted Web Developer",
    location: "Madurai, Tamil Nadu, India",
    email: "personalsiddharth387@gmail.com",
    github: "https://github.com/siddharth387-debug",
    linkedin: "https://www.linkedin.com/in/siddharth-k-b0a118340/",
    status: "Open to opportunities",

    supportingStatement:
      "I build full-stack web applications and integrate LLM-powered capabilities to turn conventional software into intelligent experiences.",
    shortBio:
      "Full-stack web developer with hands-on experience across the MERN stack, PHP/MySQL, REST API architecture, and production deployment. Focused on bridging reliable web engineering with pragmatic AI/LLM integration using structured prompt engineering and high-throughput inference APIs.",
    primaryTech: ["MERN Stack", "PHP", "MySQL", "Prompt Engineering", "LLMs", "REST APIs"]
  },

  projects: [
    {
      id: "rowl-ai",
      number: "01",
      name: "Rowl AI",
      category: "AI / Psychology Web Application",
      headline: "Mental Wellness & Reflection Platform",
      summary:
        "A psychology-focused mental wellness platform built using the MERN stack, integrating the Groq Cloud Inference API to power Sera AI for low-latency conversational reflections.",
      featured: true,
      hasAi: true,
      aiBadge: "AI / LLM Integrated",
      stack: [
        "MERN Stack",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Groq Cloud API",
        "JWT / Cookies",
        "Razorpay",
        "Vercel",
        "Render"
      ],
      liveUrl: "https://rowl-ai-pink.vercel.app/",
      githubUrl: "https://github.com/siddharth387-debug",
      timeline: "7-Week Production Cycle (2026)",
      caseStudy: {
        overview:
          "Independently designed, engineered, and deployed a full-stack mental wellness application end-to-end. Built to deliver private, structured emotional check-ins, guided journal prompts, and empathetic conversational interactions through an integrated AI companion named Sera AI.",
        problem:
          "Traditional mental wellness journaling and mood-tracking apps often feel static, cold, and manual, leading to steep user drop-off. Conversely, generic AI chatbots lack contextual grounding, produce high-latency delays, and present safety concerns if prompted without strict emotional guardrails and clear non-clinical boundaries.",
        solution:
          "Engineered a resilient MERN application with a decoupled AI layer. The client provides an intuitive, distraction-free environment for daily reflections, while the Express/Node backend authenticates sessions via HTTP-only cookies, manages journal persistence in MongoDB, and orchestrates ultra-low-latency conversational interactions via Groq Cloud Inference API.",
        architecture: {
          client: "React.js SPA (Vercel) with clean dark-mode UI and reactive chat state",
          backend: "Node.js & Express.js REST API (Render) handling auth, routes, and AI proxying",
          database: "MongoDB with indexed collections for users, encrypted reflection logs, and session journals",
          aiLayer: "Groq Cloud Inference API powering Sera AI (low-latency Llama inference with prompt safety constraints)",
          payment: "Razorpay payment integration with secure webhook verification"
        },
        aiWorkflow: {
          step1: "User initiates reflection prompt in the web client",
          step2: "Backend retrieves session context and sanitizes incoming user input",
          step3: "System injects ethical guardrails, empathetic persona parameters, and safety instructions",
          step4: "High-throughput inference call executed via Groq Cloud Inference API",
          step5: "Response is validated, logged to reflection state, and streamed to the React UI"
        },
        engineeringDecisions: [
          {
            title: "Security & Authentication",
            detail:
              "Implemented JSON Web Tokens (JWT) stored strictly in HTTP-only cookies with CSRF mitigation, preventing sensitive mental wellness session data from being vulnerable to script injection."
          },
          {
            title: "Low-Latency AI Pipeline",
            detail:
              "Integrated Groq Cloud Inference API instead of standard slow endpoints, slashing response latency and making conversational reflection feel immediate and natural."
          },
          {
            title: "Payment Webhooks Verification",
            detail:
              "Integrated Razorpay webhooks with cryptographic SHA-256 HMAC verification on the backend to handle billing events securely and asynchronously."
          },
          {
            title: "Production Deployment",
            detail:
              "Decoupled deployment pipeline: React client hosted on Vercel edge network and Node/Express backend containerized and deployed on Render with automated environment secrets."
          }
        ],
        nonClinicalNotice:
          "Sera AI is engineered strictly for guided self-reflection, mindfulness, and mood tracking. It is explicitly constrained against diagnosing or providing clinical psychiatric interventions."
      }
    },
    {
      id: "college-appraisal",
      number: "02",
      name: "Faculty Appraisal Management System",
      category: "AI-Assisted College Appraisal Platform",
      headline: "Institutional Appraisal & Evaluation Platform",
      summary:
        "A full-stack MERN application digitizing the institutional faculty appraisal lifecycle with multi-role RBAC, dynamic approval pipelines, automated PDF report generation, and AI-assisted summary drafting.",
      featured: false,
      hasAi: true,
      aiBadge: "AI-Assisted Workflow",
      stack: [
        "MERN Stack",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PDF Generation",
        "RBAC",
        "LLM API"
      ],
      liveUrl: null, // Academic project on campus network / staging
      githubUrl: "https://github.com/siddharth387-debug",
      timeline: "2026 – Present (Active Academic Project)",
      caseStudy: {
        overview:
          "An institutional academic platform engineered to modernize faculty performance appraisal, scholarly output tracking, and administrative review workflows at Thiagarajar College of Engineering.",
        problem:
          "Annual faculty appraisal in higher education traditionally relies on cumbersome paper dossiers and disconnected spreadsheets. Heads of Departments (HODs) face overwhelming administrative burdens reviewing dozens of qualitative self-appraisals, tracking research metrics, and compiling standardized institutional audit reports.",
        solution:
          "Developed a unified MERN platform featuring role-based workflows: Faculty submit structured achievements (teaching, publications, student mentorship); HODs evaluate and score submissions; and an integrated LLM synthesizes qualitative accomplishments into concise, objective executive summaries paired with automated PDF document export.",
        architecture: {
          client: "React.js role-gated dashboards (Faculty Submission, HOD Evaluation, Admin Audit)",
          backend: "Express.js REST API with JWT role-based access control and approval state machines",
          database: "MongoDB storing appraisal submissions, scoring rubrics, and historical records",
          documentEngine: "Server-side PDF generation module rendering institutional appraisal dossiers",
          aiLayer: "Backend LLM integration providing objective accomplishment synthesis and draft evaluation summaries"
        },
        aiWorkflow: {
          step1: "Faculty submits multi-category self-appraisal with teaching logs and publication metrics",
          step2: "Backend validates structured inputs and constructs a prompt containing achievements against institutional benchmarks",
          step3: "LLM evaluates narrative clarity and generates a neutral, objective executive summary draft",
          step4: "System validates generated summary against safety filters and returns draft to HOD interface",
          step5: "HOD reviews, overrides or approves the evaluation before committing it to the final appraisal record"
        },
        engineeringDecisions: [
          {
            title: "Multi-Role RBAC State Machine",
            detail:
              "Engineered stateful transition workflows: Draft → Submitted → HOD Review → Dean Approval → Archived, strictly preventing unauthorized score tampering or out-of-order submissions."
          },
          {
            title: "Deterministic PDF Report Generation",
            detail:
              "Integrated programmatic PDF rendering to generate pixel-precise, printable institutional evaluation dossiers matching official accreditation formats."
          },
          {
            title: "Human-in-the-Loop AI Design",
            detail:
              "AI outputs are strictly framed as pre-review drafts. Evaluators retain 100% final authority, ensuring institutional accountability and eliminating bias risk."
          }
        ]
      }
    },
    {
      id: "service-marketplace",
      number: "03",
      name: "ServeHub — Service Marketplace",
      category: "Service Listing Web Application",
      headline: "Local Services Discovery & Booking Platform",
      summary:
        "A full-stack service marketplace enabling users to discover, book, and manage local services, built with PHP, relational MySQL schemas, and role-based access control.",
      featured: false,
      hasAi: false, // NOT an AI project!
      aiBadge: null,
      stack: [
        "PHP",
        "MySQL",
        "JavaScript",
        "HTML5 / CSS3",
        "Session Auth",
        "Relational Schema",
        "RBAC"
      ],
      liveUrl: null, // Localhost / Internal project
      githubUrl: "https://github.com/siddharth387-debug",
      timeline: "2024 – 2025",
      caseStudy: {
        overview:
          "An independent full-stack service marketplace engineered to demonstrate foundational web engineering principles, secure server-side session management, and normalized relational database architecture.",
        problem:
          "Finding reliable local service providers often suffers from fragmented listings, opaque pricing, and lack of verified booking records. Providers lack a consolidated interface to manage appointments, track client histories, and view customer reviews.",
        solution:
          "Engineered ServeHub using PHP and MySQL. Provides structured customer discovery, category filtering, a booking appointment pipeline, customer review submissions, and separate provider portals.",
        architecture: {
          frontend: "Responsive HTML5, CSS3, and Vanilla JavaScript with real-time input sanitization",
          backend: "PHP backend with modular routing, session-based authentication, and CSRF tokens",
          database: "Normalized relational MySQL database with indexed foreign keys and ACID transaction guarantees"
        },
        engineeringDecisions: [
          {
            title: "Normalized Relational Database Schema",
            detail:
              "Designed and indexed MySQL tables for `users`, `services`, `categories`, `bookings`, `payments`, and `reviews` to ensure referential integrity and fast query performance under joint lookups."
          },
          {
            title: "Session Authentication & Password Security",
            detail:
              "Implemented secure PHP session lifecycle handling with Bcrypt password hashing (`password_hash`), session regeneration upon login, and strict prepared statements to eliminate SQL injection vulnerabilities."
          },
          {
            title: "Role-Based Access Control (RBAC)",
            detail:
              "Engineered multi-tenant authorization logic separating Customer booking actions, Provider schedule management, and Administrator moderation privileges."
          }
        ]
      }
    }
  ],

  aiWorkflow: {
    heading: "How I Build With AI",
    subheading:
      "AI assists my development process, but generated output is evaluated, understood, tested and deliberately integrated into the application.",
    steps: [
      { step: "01", name: "Understand", desc: "Define functional requirements, edge cases, and architectural constraints." },
      { step: "02", name: "Decompose", desc: "Break complex workflows into modular functions, schemas, and API contracts." },
      { step: "03", name: "Prompt", desc: "Craft role-constrained, context-rich prompts with explicit schema definitions." },
      { step: "04", name: "Explore", desc: "Analyze proposed implementations, alternate patterns, and security trade-offs." },
      { step: "05", name: "Evaluate", desc: "Scrutinize generated code against codebase conventions and performance rules." },
      { step: "06", name: "Implement", desc: "Integrate verified components into the active codebase with precision." },
      { step: "07", name: "Test", desc: "Validate edge cases, auth boundaries, payload validation, and unit flows." },
      { step: "08", name: "Debug", desc: "Diagnose stack traces and state anomalies systematically with AI assistance." },
      { step: "09", name: "Validate", desc: "Confirm end-to-end integration across UI, server endpoints, and database." },
      { step: "10", name: "Deploy", desc: "Ship to staging/production with verified environment variables and CI/CD." }
    ]
  },

  promptEngineering: {
    heading: "Prompt Engineering",
    subheading:
      "A systematic approach to working with Large Language Models. Production prompts must be structured, deterministic, and verifiable.",
    formula: [
      { label: "Role", desc: "Sets domain expertise and operational tone" },
      { label: "Context", desc: "Provides existing architecture, state, and environment constraints" },
      { label: "Task", desc: "Specific, unambiguous objective to execute" },
      { label: "Constraints", desc: "Security rules, performance limits, and dependency restrictions" },
      { label: "Expected Output", desc: "Strict format specification (e.g., deterministic JSON schema)" }
    ],
    comparison: {
      naive: {
        title: "Weak / Vague Prompt",
        prompt: "Write a backend API in node js to save user reflections with emotional tags.",
        issues: [
          "No authentication context specified (risks unauthenticated endpoint)",
          "No validation rules (vulnerable to empty or malformed inputs)",
          "Undefined response contract (inconsistent client-side error handling)",
          "Unspecified database driver or schema structure"
        ],
        outputPreview:
          "// Generic, vulnerable code snippet...\napp.post('/reflections', (req, res) => {\n  db.collection('reflections').insertOne(req.body);\n  res.send('Saved');\n});"
      },
      structured: {
        title: "Structured Engineering Prompt",
        role: "Senior Node.js & Express Security Engineer",
        context:
          "MERN stack mental wellness app (Rowl AI). Request is protected by JWT HTTP-only cookie middleware which attaches verified `req.user.id`.",
        task:
          "Implement the `createReflection` controller method with input validation, transaction error handling, and MongoDB persistence via Mongoose.",
        constraints:
          "1. Require `moodTag` (enum: ['calm','anxious','focused','tired','hopeful']) and non-empty `content` (max 2000 chars).\n2. Sanitize inputs to prevent NoSQL injection and XSS.\n3. Return deterministic HTTP status codes (201 created, 400 validation error, 500 server error).\n4. Never leak internal database stack traces to the client.",
        expectedOutput:
          "Production Express controller wrapped in async handler, returning standard JSON contract: { success: boolean, data?: object, error?: string }",
        outputPreview:
          "export const createReflection = async (req, res) => {\n  try {\n    const { moodTag, content } = req.body;\n    if (!VALID_MOODS.includes(moodTag) || !content?.trim()) {\n      return res.status(400).json({ success: false, error: 'Invalid reflection payload' });\n    }\n    const sanitized = sanitizeInput(content);\n    const doc = await Reflection.create({\n      userId: req.user.id,\n      moodTag,\n      content: sanitized\n    });\n    return res.status(201).json({ success: true, data: doc });\n  } catch (err) {\n    logger.error('Reflection creation error', { userId: req.user.id, error: err.message });\n    return res.status(500).json({ success: false, error: 'Internal processing error' });\n  }\n};"
      }
    }
  },

  engineeringPhilosophy: {
    heading: "AI Is Part of the Engineering Workflow",
    statement:
      "I use LLMs not only for generating code, but for exploring solutions, understanding implementation choices, debugging, refining prompts and integrating AI capabilities into real applications.",
    principles: [
      {
        title: "Engineering Judgment First",
        detail:
          "AI proposes; engineering decides. Every line of code, schema modification, and API structure is vetted against production reliability standards."
      },
      {
        title: "Contract-Driven Development",
        detail:
          "Using strict JSON schemas and TypeScript/JSDoc contracts to ensure AI outputs match exact web application requirements."
      },
      {
        title: "Ethical & Responsible Boundaries",
        detail:
          "Applying rigorous guardrails to conversational AI components (such as in Rowl AI), explicitly avoiding medical claims or unmonitored actions."
      }
    ]
  },

  skills: {
    heading: "Technical Skills",
    categories: [
      {
        name: "Full-Stack Development",
        skills: ["React.js", "JavaScript (ES6+)", "Node.js", "Express.js", "PHP", "HTML5", "CSS3", "REST APIs"]
      },
      {
        name: "Databases",
        skills: ["MongoDB", "MySQL", "Mongoose", "Relational Schema Design", "CRUD Operations"]
      },
      {
        name: "AI & Assisted Engineering",
        skills: [
          "Prompt Engineering",
          "Large Language Models (LLMs)",
          "Groq Cloud Inference API",
          "Claude Code Orchestration",
          "Structured Output Validation",
          "Context Construction"
        ]
      },
      {
        name: "Tools, Platforms & Deployment",
        skills: ["Git", "GitHub", "VS Code", "Vercel", "Render", "Postman", "Linux Basics"]
      },
      {
        name: "Core Engineering Concepts",
        skills: [
          "JWT Authentication",
          "HTTP-only Cookies",
          "Role-Based Access Control (RBAC)",
          "Webhook Integrations (Razorpay)",
          "Server-side PDF Generation"
        ]
      }
    ]
  },

  education: [
    {
      institution: "Thiagarajar College of Engineering, Madurai",
      degree: "Master of Computer Applications (MCA)",
      period: "2025 – 2027",
      grade: "CGPA: 8.47 / 10.0",
      status: "In Progress"
    },
    {
      institution: "N.M.S. S. Vellaichamy Nadar College, Madurai",
      degree: "B.Sc. Information Technology",
      period: "2022 – 2025",
      grade: "CGPA: 7.62 / 10.0",
      status: "Completed"
    }
  ],

  certifications: [
    {
      title: "Full Stack Developer",
      issuer: "CSC Computer Education",
      type: "Professional Certification"
    },
    {
      title: "HDFD (Hardware & Networking) Full Stack Developer",
      issuer: "CSC Computer Education",
      type: "Comprehensive Diploma"
    },
    {
      title: "C/C++ Programming",
      issuer: "Blue Perl, Madurai",
      type: "Systems Foundations"
    },
    {
      title: "ANRF Certification",
      issuer: "Anusandhan National Research Foundation",
      type: "Research & Technical Recognition"
    }
  ]
};
