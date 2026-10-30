export const portfolioData = {
  personal: {
    name: "Siddharth K",
    title: "AI-Assisted Web Developer",
    location: "Tamil Nadu, India",
    availability: "Available for Full-Stack Roles (Remote · Chennai · Anywhere)",
    workPreference: "Remote · Chennai · Relocation Anywhere",
    email: "personalsiddharth387@gmail.com",
    github: "https://github.com/siddharth387-debug",
    linkedin: "https://www.linkedin.com/in/siddharth-k-b0a118340/",
    status: "Open to opportunities (Remote / Chennai / Anywhere)",

    supportingStatement:
      "I build full-stack web applications and integrate LLM-powered capabilities to turn conventional software into intelligent experiences.",
    shortBio:
      "Full-stack web developer with hands-on experience across the MERN stack, PHP/MySQL, REST API architecture, and application deployment. Focused on combining reliable web development with practical AI/LLM integration using structured prompt engineering and LLM APIs.",
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
      githubUrl: "https://github.com/siddharth387-debug/rowl-ai",
      filterTags: ["all", "ai", "mern"],
      timeline: "7-Week Production Cycle (2026)",
      caseStudy: {
        overview:
          "Independently designed, engineered, and deployed a full-stack mental wellness application end-to-end. Built to deliver private, structured emotional check-ins, guided journal prompts, and empathetic conversational interactions through an integrated AI companion named Sera AI.",
        problem:
          "Traditional mental wellness journaling and mood-tracking apps often feel static, cold, and manual, leading to steep user drop-off. Conversely, generic AI chatbots lack contextual grounding, produce high-latency delays, and present safety concerns if prompted without strict emotional guardrails and clear non-clinical boundaries.",
        solution:
          "Engineered a full-stack MERN application with an integrated AI layer. The client provides an intuitive, distraction-free environment for daily reflections, while the Express/Node backend authenticates sessions via HTTP-only cookies, manages journal persistence in MongoDB, and integrates conversational reflection interactions using the Groq Cloud Inference API.",
        architecture: {
          client: "React.js SPA (Vercel) with clean dark-mode UI and reactive chat state",
          backend: "Node.js & Express.js REST API (Render) handling auth, routes, and AI proxying",
          database: "MongoDB with indexed collections for users, encrypted reflection logs, and session journals",
          aiLayer: "Groq Cloud Inference API powering Sera AI (responsive Llama inference with prompt safety constraints)",
          payment: "Razorpay payment integration with secure webhook verification"
        },
        aiWorkflow: {
          step1: "User initiates reflection prompt in the web client",
          step2: "Backend retrieves session context and sanitizes incoming user input",
          step3: "System injects ethical guidelines, empathetic persona parameters, and safety instructions",
          step4: "Inference call executed via Groq Cloud API",
          step5: "Response is validated, logged to reflection state, and streamed to the React UI"
        },
        engineeringDecisions: [
          {
            title: "Security & Authentication",
            detail:
              "Implemented JSON Web Tokens (JWT) stored strictly in HTTP-only cookies with CSRF mitigation, preventing sensitive mental wellness session data from being vulnerable to script injection."
          },
          {
            title: "Responsive AI Integration",
            detail:
              "Integrated Groq Cloud Inference API to keep conversational responses fast and natural for daily reflections."
          },
          {
            title: "Payment Webhooks Verification",
            detail:
              "Integrated Razorpay webhooks with cryptographic SHA-256 HMAC verification on the backend to handle billing events securely and asynchronously."
          },
          {
            title: "Application Deployment",
            detail:
              "Decoupled deployment pipeline: React client hosted on Vercel and Node/Express backend containerized and deployed on Render with managed environment secrets."
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
      liveUrl: "https://tce-apprisal.vercel.app/",
      githubUrl: "https://github.com/siddharth387-debug/Tce-apprisal",
      filterTags: ["all", "ai", "mern"],
      timeline: "2026 – Present (Active Institutional System)",
      caseStudy: {
        overview:
          "An institutional academic platform engineered to modernize faculty performance appraisal, scholarly output tracking, and administrative review workflows at Thiagarajar College of Engineering.",
        problem:
          "Annual faculty appraisal in higher education traditionally relies on cumbersome paper dossiers and disconnected spreadsheets. Heads of Departments (HODs) face overwhelming administrative burdens reviewing dozens of qualitative self-appraisals, tracking research metrics, and compiling standardized institutional audit reports.",
        solution:
          "Developed a unified MERN platform featuring 4-tier role-based workflows (Faculty, HoD, Registrar, Principal) across a 9-section accreditation rubric (200 marks), hardened JWT leadership guards on review endpoints, custom multi-year appraisal cycles, and automated server-side PDF dossier generation with digital audit seals.",
        architecture: {
          client: "React.js role-gated dashboards (Faculty Submission, HOD Evaluation, Registrar & Principal Audit)",
          backend: "Express.js REST API with hardened JWT role-based access control and leadership authorization guards",
          database: "MongoDB storing multi-year appraisal submissions, 9-section scoring rubrics (including Utility Patents & Section 9.2/9.3 metrics), and audit trails",
          documentEngine: "Server-side PDF generation module rendering institutional appraisal dossiers with digital verification seals",
          aiLayer: "Backend LLM integration providing objective accomplishment synthesis and draft evaluation summaries"
        },
        aiWorkflow: {
          step1: "Faculty submits multi-category 9-section self-appraisal (200 marks) with teaching logs, patents, and publication metrics",
          step2: "Backend enforces JWT & leadership role guards and validates structured inputs against institutional rubrics",
          step3: "LLM evaluates narrative clarity and generates a neutral, objective executive summary draft",
          step4: "System validates generated summary against safety filters and routes dossier through HoD → Registrar → Principal pipeline",
          step5: "Leadership reviews, overrides, or approves the evaluation before generating the digitally sealed PDF appraisal dossier"
        },
        engineeringDecisions: [
          {
            title: "4-Tier RBAC & Leadership Endpoint Guards",
            detail:
              "Engineered strict JWT authentication and role-based transition guards (Faculty → HoD → Registrar → Principal) across all review and multi-year appraisal endpoints."
          },
          {
            title: "Standardized PDF Report & Digital Audit Seal",
            detail:
              "Integrated server-side PDF generation to export formatted 9-section evaluation dossiers (200 marks) matching institutional accreditation guidelines."
          },
          {
            title: "Human-in-the-Loop AI Evaluation Synthesis",
            detail:
              "AI-generated summaries are strictly framed as drafts. Evaluators review, adjust, and approve content before committing it to the final appraisal record."
          }
        ]

      }
    },
    {
      id: "flowstate-lofi",
      number: "03",
      name: "FlowState Lo-Fi — Voice & Loop Extension",
      category: "Chrome Extension (Manifest V3) & Voice DSP",
      headline: "Hands-Free YouTube Beat Looping & Phonetic Voice Control",
      summary:
        "A Manifest V3 Chrome Extension engineered to replay, A–B loop, and bookmark beat drops in YouTube Lo-Fi mixes hands-free using a custom Phonetic Skeleton + Levenshtein fuzzy voice classifier, smart audio auto-ducking, and Bluetooth earbud MediaSession hooks.",
      featured: false,
      hasAi: true,
      aiBadge: "Phonetic Voice Engine",
      stack: [
        "Chrome Extension MV3",
        "JavaScript (ES6+)",
        "Web Speech API",
        "Levenshtein Classifier",
        "MediaSession API",
        "Audio Auto-Ducking",
        "Trusted-Types DOM"
      ],
      liveUrl: null,
      githubUrl: "https://github.com/siddharth387-debug/flowstate-lofi",
      filterTags: ["all", "ai", "extension"],
      timeline: "2026 (Developer Productivity Tool)",
      caseStudy: {
        overview:
          "Engineered a zero-latency Chrome Extension (Manifest V3) that allows developers to control 3-hour YouTube Lo-Fi mixes and coding tutorials completely hands-free via voice commands, keyboard hotkeys, or Bluetooth headphone taps without ever leaving their IDE.",
        problem:
          "When coding in a deep flow state to a multi-hour YouTube Lo-Fi mix, a specific 30-second beat subsection often hits that you want to replay or loop. Normally, developers must Alt+Tab out of their editor, hunt for the YouTube tab, and drag a tiny 3-hour timeline scrubber—losing focus and overshooting by 10 minutes. Furthermore, standard Web Speech API recognition struggles when background music is playing into the microphone or when commands are spoken casually.",
        solution:
          "Built FlowState Lo-Fi with a sliding delta-cursor stream processor over interim Web Speech transcripts (`maxAlternatives = 10`), paired with a custom Phonetic Skeleton + Levenshtein Edit-Distance classifier (`d ≤ 1`) for sub-second command recognition, automatic YouTube volume ducking during speech, A–B beat looping, and Bluetooth earbud tap interception via the MediaSession API.",
        architecture: {
          contentScript: "Trusted-Types compliant DOM engine (`content.js` + `content.css`) injecting the floating HUD widget & beat-drop drawer into YouTube",
          voiceEngine: "Web Speech API (`webkitSpeechRecognition`) with Sliding Delta-Cursor & Phonetic Skeleton + Levenshtein fuzzy matcher",
          audioDucking: "Smart volume auto-ducking state machine dipping YouTube HTML5 `<video>` gain when voice onset is detected",
          pageBridge: "Main-world `page-bridge.js` intercepting `navigator.mediaSession` hardware Next/Previous track events for Bluetooth earbuds",
          backgroundWorker: "Manifest V3 Service Worker (`background.js`) & `popup.js` synchronizing saved Beat Drop bookmarks via `chrome.storage`"
        },
        aiWorkflow: {
          step1: "User speaks 'Replay', 'Loop', 'Save', or 'Volume 30' while coding (or double-taps Bluetooth earbuds)",
          step2: "Smart Audio Auto-Ducking immediately dips YouTube playback volume so background music does not mask the microphone",
          step3: "Sliding Delta-Cursor extracts only newly spoken tokens from live interim `webkitSpeechRecognition` streams (`maxAlternatives = 10`)",
          step4: "Phonetic Skeleton + Levenshtein Edit-Distance classifier maps noisy/accented tokens (e.g., 'reeply' → 'replay') in <50ms",
          step5: "Content script executes exact HTML5 `<video>` timeline seek, locks A–B section loop, or persists Beat Drop bookmark"
        },
        engineeringDecisions: [
          {
            title: "Phonetic Skeleton & Levenshtein Fuzzy Classifier",
            detail:
              "Standard speech-to-text often mishears short commands over background music (e.g., 'ree-play' or 'loopp'). Implemented a phonetic consonant skeleton reducer and bounded Levenshtein edit-distance (`d ≤ 1`) across 10 recognition alternatives for near-instant, noise-resilient intent matching."
          },
          {
            title: "Sliding Delta-Cursor Stream Processing",
            detail:
              "Rather than waiting 1.5s for final speech utterances to close, tracked a monotonic word cursor over continuous interim transcripts so back-to-back commands fire in sub-second time without duplicate triggers."
          },
          {
            title: "YouTube Trusted-Types CSP Compliance",
            detail:
              "YouTube enforces strict Content Security Policy (`require-trusted-types-for 'script'`), blocking all `innerHTML` injections. Engineered a pure `document.createElement` UI renderer to mount the floating widget and bookmark drawer safely."
          },
          {
            title: "Bluetooth Earbud Hardware Bridge (`MediaSession`)",
            detail:
              "Injected a main-world page bridge to override YouTube's `navigator.mediaSession` handlers, allowing developers away from their desk to double-tap Previous/Next Track on Bluetooth headphones to rewind 30s or toggle A–B looping."
          }
        ]
      }
    },
    {
      id: "service-marketplace",
      number: "04",
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
      githubUrl: "https://github.com/siddharth387-debug/serviceMarketplace",
      filterTags: ["all", "php"],
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
    },
    {
      id: "developer-portfolio",
      number: "05",
      name: "Developer Portfolio & Prompt Inspector",
      category: "Frontend Architecture & CI/CD",
      headline: "Interactive Technical Portfolio with Live Tooling",
      summary:
        "A dark-technical developer portfolio engineered with React 19, Tailwind CSS v4, Lenis smooth scroll, GSAP animations, and automated GitHub Pages CI/CD. Features interactive project simulators, a Prompt Engineering Inspector, and real-time architectural diagrams.",
      featured: false,
      hasAi: true,
      aiBadge: "Interactive AI Inspector",
      stack: [
        "React 19",
        "Vite",
        "Tailwind CSS v4",
        "GSAP + ScrollTrigger",
        "Lenis Smooth Scroll",
        "React Router",
        "GitHub Actions CI/CD"
      ],
      liveUrl: "https://siddharth387-debug.github.io/",
      githubUrl: "https://github.com/siddharth387-debug/siddharth387-debug.github.io",
      filterTags: ["all", "ai", "frontend"],
      timeline: "2026",
      caseStudy: {
        overview:
          "Designed and engineered as a high-density, authentic technical portfolio reflecting modern developer platform aesthetics (Vercel, Supabase, Linear). Includes an interactive Prompt Engineering Inspector comparing unstructured vs structured LLM prompts.",
        problem:
          "Most developer portfolios rely on generic templates, static claims, and exaggerated metrics with zero demonstrable interactive proof of skill or architectural understanding.",
        solution:
          "Engineered a modular React 19 Single Page Application featuring interactive client state inspectors, zero-404 HashRouter routing tailored for GitHub Pages, and an automated GitHub Actions deployment pipeline triggered on git push.",
        architecture: {
          client: "React 19 with Tailwind CSS v4 and responsive component tree",
          routing: "React Router HashRouter ensuring seamless page reloads on static hosts",
          ciCd: "GitHub Actions workflow running linting, build verification, and deployment to GitHub Pages"
        },
        engineeringDecisions: [
          {
            title: "Zero-404 Client-Side Routing",
            detail:
              "Utilized HashRouter to eliminate the classic GitHub Pages 404 issue on deep links and sub-routes without requiring complex 404.html redirect scripts."
          },
          {
            title: "Interactive Prompt State Inspector",
            detail:
              "Built an interactive side-by-side prompt evaluator showing how structured JSON schemas and constraints prevent hallucination and format drift in production LLM pipelines."
          },
          {
            title: "Automated Continuous Deployment",
            detail:
              "Configured a GitHub Actions workflow with strict environment token permissions (`pages: write`, `id-token: write`) to test and deploy builds automatically on every push."
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
      { step: "01", name: "Understand", desc: "Define the requirement, expected behavior, edge cases, and constraints." },
      { step: "02", name: "Decompose", desc: "Break the problem into smaller functions, components, API tasks, or implementation steps." },
      { step: "03", name: "Prompt", desc: "Create structured prompts with relevant context, constraints, and expected output." },
      { step: "04", name: "Explore", desc: "Use AI to investigate possible implementations and alternative approaches." },
      { step: "05", name: "Evaluate", desc: "Review generated suggestions against the application's requirements and existing codebase." },
      { step: "06", name: "Implement", desc: "Adapt useful ideas and integrate them into the application." },
      { step: "07", name: "Test", desc: "Test the implementation using expected flows and edge cases." },
      { step: "08", name: "Debug", desc: "Use logs, errors, documentation, and AI assistance to investigate problems." },
      { step: "09", name: "Validate", desc: "Confirm that the implementation works correctly within the application." },
      { step: "10", name: "Deploy", desc: "Deploy the completed changes and verify the application in its target environment." }
    ]

  },

  promptEngineering: {
    heading: "Prompt Engineering",
    subheading:
      "A practical approach to working with Large Language Models. Structured prompts provide clear context, constraints, and consistent output formats.",
    formula: [
      { label: "Role", desc: "Sets domain expertise and operational tone" },
      { label: "Context", desc: "Provides existing architecture, state, and environment constraints" },
      { label: "Task", desc: "Specific, unambiguous objective to execute" },
      { label: "Constraints", desc: "Security rules, validation requirements, and dependency restrictions" },
      { label: "Expected Output", desc: "Format specification (e.g., structured JSON or defined code interface)" }
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
        role: "Full-Stack Node.js & Express Developer",
        context:
          "MERN stack mental wellness app (Rowl AI). Request is protected by JWT HTTP-only cookie middleware which attaches verified `req.user.id`.",
        task:
          "Implement the `createReflection` controller method with input validation, transaction error handling, and MongoDB persistence via Mongoose.",
        constraints:
          "1. Require `moodTag` (enum: ['calm','anxious','focused','tired','hopeful']) and non-empty `content` (max 2000 chars).\n2. Sanitize inputs to prevent NoSQL injection and XSS.\n3. Return appropriate HTTP status codes (201 created, 400 validation error, 500 server error).\n4. Avoid leaking internal database error messages to the client.",
        expectedOutput:
          "Express controller wrapped in async handler, returning a structured JSON response: { success: boolean, data?: object, error?: string }",
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
          "AI proposes; engineering decides. Every line of code, schema change, and component is reviewed, understood, and tested before integration."
      },
      {
        title: "Clear Interface Expectations",
        detail:
          "Defining explicit input/output structures and data shapes so AI assistance aligns directly with the application's actual requirements."
      },
      {
        title: "Responsible Application Boundaries",
        detail:
          "Designing clear instructions and boundaries for conversational features (such as in Rowl AI), keeping them focused on guided reflection without medical claims."
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
