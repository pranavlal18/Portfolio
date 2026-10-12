export const HERO_CONTENT = `MCA graduate & Python developer building LLM apps, RAG pipelines & LangGraph agents — FastAPI, PostgreSQL, vector search, AWS Bedrock.`;

export const ABOUT_TEXT = `I'm an AI-focused full-stack developer based in Thrissur, Kerala, building LLM applications, RAG pipelines, and multi-agent systems with Python. I completed my MCA at Vidya Academy (2023-2025, CGPA 8.3) after my BCA at Christ College (2020-2023, CGPA 7.6), and I've shipped production work as a Software Engineer Trainee at Digicyfr and a Fullstack Developer Intern at Odin Tech — from Odoo ERP and Next.js features to FastAPI + PostgreSQL services and database optimizations. I care about AI systems that hold up in the real world: evaluated, observable, and delivered end to end.`;

export const PROJECTS = [
  {
    title: "Fisherman Safety Agent",
    subtitle: "9-node LangGraph · GO/CAUTION/NO-GO",
    description:
      "AI-powered marine safety advisory for fishermen along the Kerala coast. A 9-node LangGraph pipeline combines real-time ocean data, INCOIS Potential Fishing Zone forecasts, and boat-specific profiles to deliver GO / CAUTION / NO-GO safety decisions, ranked fishing zones with fuel estimates, and Malayalam voice advisories.",
    image: null,
    technologies: ["LangGraph", "FastAPI", "Python", "Next.js", "Leaflet", "Groq"],
    github: "https://github.com/pranavlal18/fisherman-safety-agent",
    highlights: [
      "9-node LangGraph pipeline evaluating wave, wind, current, and IMD alert data against boat limits for a GO / CAUTION / NO-GO decision with risk score",
      "PFZ zone ranking via a Relative Utility Score balancing fish likelihood, fuel cost, and current alignment, with unreachable-zone fuel warnings",
      "Malayalam voice advisories (LLM → translation → edge-tts) plus a bilingual Next.js + Leaflet interactive map UI",
    ],
  },
  {
    title: "DudhWala",
    subtitle: "React Native Expo · Supabase dairy delivery ops",
    description:
      "Dairy delivery operations app built with React Native (Expo) on a Supabase backend. Delivery agents get GPS-tagged drop-off tracking, customer payments with a running credit ledger, and generated PDF reports, while over-the-air updates ship through EAS and Sentry captures crashes in production.",
    image: null,
    technologies: ["React Native", "Expo", "Supabase", "PostgreSQL", "EAS Update", "Sentry"],
    github: null,
    highlights: [
      "GPS tagging of deliveries in React Native (Expo) backed by Supabase (PostgreSQL)",
      "Payments with a per-customer credit ledger plus generated PDF reports",
      "Over-the-air releases via EAS Update and crash monitoring with Sentry",
    ],
  },
  {
    title: "CodeRAG",
    subtitle: "Multi-repo RAG for codebases",
    description:
      "Retrieval-Augmented Generation system for GitHub repositories that turns any codebase into something you can converse with. It ingests repos, chunks Python with AST awareness, stores embeddings in ChromaDB, retrieves with hybrid dense + BM25 search plus cross-encoder reranking, and answers through a LangGraph workflow with source citations.",
    image: null,
    technologies: ["LangGraph", "FastAPI", "ChromaDB", "LlamaIndex", "Sentence Transformers", "Groq"],
    github: "https://github.com/pranavlal18/coderag",
    highlights: [
      "GitHub repo ingestion with AST-aware Python code chunking and metadata-rich embeddings in ChromaDB",
      "Hybrid dense + BM25 retrieval with cross-encoder reranking for grounded, citation-backed answers",
      "LangGraph-orchestrated workflow with multi-turn conversational memory over a FastAPI backend",
    ],
  },
  {
    title: "SalesPilot AI",
    subtitle: "LangGraph lead analysis & outreach",
    description:
      "AI-powered sales assistant that analyzes leads and generates personalized outreach messages. A multi-step LangGraph pipeline loads a lead, analyzes it, drafts outreach, reviews, and saves — running on FastAPI with PostgreSQL, SQLAlchemy, Alembic migrations, and Docker, with Groq or AWS Bedrock as LLM providers.",
    image: null,
    technologies: ["LangGraph", "LangChain", "FastAPI", "PostgreSQL", "Alembic", "Docker", "Langfuse"],
    github: "https://github.com/pranavlal18/salespilot-ai",
    highlights: [
      "LangGraph multi-step workflow: load leads → analyze → draft outreach → review → save",
      "FastAPI + PostgreSQL 16 with SQLAlchemy ORM, Alembic migrations, and Docker Compose",
      "Groq or AWS Bedrock LLM providers with Langfuse tracing every LLM call",
    ],
  },
  {
    title: "Fake Review Detector",
    subtitle: "TF-IDF + Logistic Regression · 86.7% accuracy",
    description:
      "ML system that classifies product reviews as Fake or Original. A scikit-learn pipeline (TF-IDF + Logistic Regression) trained on ~40K labeled reviews with 5-fold cross-validation, served through a FastAPI prediction API with every prediction logged to PostgreSQL, fully containerized with Docker Compose.",
    image: null,
    technologies: ["scikit-learn", "Python", "FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/pranavlal18/fake-review-detector",
    highlights: [
      "TF-IDF + Logistic Regression pipeline reaching 86.7% accuracy (F1 86.5) via 5-fold CV on ~40K reviews",
      "FastAPI /predict endpoint serving the trained model with every prediction logged to PostgreSQL",
      "Fully containerized with Docker Compose: one-shot training job, serving API, and database",
    ],
  },
  {
    title: "BingeTime",
    subtitle: "Offline-first TV & movie tracker",
    description:
      "Personal TV show and movie tracker built with Expo and React Native. It runs offline-first on a local Supabase (PostgreSQL) database, syncs metadata from TMDb, and covers shows, movies, discovery, and watch statistics in a dark-first UI with switchable themes.",
    image: null,
    technologies: ["Expo", "React Native", "TypeScript", "Supabase", "TMDb", "Zustand"],
    github: "https://github.com/pranavlal18/bingetime",
    highlights: [
      "Offline-first Expo app with a local Supabase (PostgreSQL) database and TMDb metadata sync",
      "Shows, Movies, Discover, and Profile tabs with watch stats, streaks, and new-episode push notifications",
      "6 switchable themes, 60 FPS FlashList lists, and TanStack Query offline persistence",
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "Software Engineer Trainee",
    org: "Digicyfr",
    period: "Nov 2025–Mar 2026",
    bullets: [
      "Built features across Odoo ERP and Next.js, delivering full-stack changes from backend logic to UI.",
      "Debugged and tested production issues and integrated REST APIs for reliable delivery.",
    ],
  },
  {
    role: "Fullstack Developer Intern",
    org: "Odin Tech",
    period: "Jun 2025–Sep 2025",
    bullets: [
      "Built backend services with FastAPI and PostgreSQL, shipping REST APIs for product features.",
      "Developed Next.js frontend features and optimized database queries for faster load times.",
    ],
  },
];

export const SKILLS = [
  { group: "Generative AI & Agents", items: ["LLM Applications", "Prompt Engineering", "RAG", "LangChain", "LangGraph"] },
  { group: "Backend & Data", items: ["Python", "SQL", "FastAPI", "REST APIs", "PostgreSQL", "ChromaDB"] },
  { group: "ML", items: ["scikit-learn", "TensorFlow", "TF-IDF", "Model Evaluation"] },
  { group: "Cloud & Tools", items: ["AWS Bedrock", "Docker", "Git", "Langfuse"] },
];

export const EDUCATION = [
  {
    school: "Vidya Academy",
    degree: "MCA",
    period: "2023-2025",
    score: "CGPA 8.3",
  },
  {
    school: "Christ College",
    degree: "BCA",
    period: "2020-2023",
    score: "CGPA 7.6",
  },
];

export const CERTIFICATIONS = [
  "AWS Cloud Practitioner Essentials",
  "ASAP AI/ML Developer",
  "YIP District Winner",
];

export const CONTACT = {
  email: "pranavlal18@gmail.com",
  phoneNo: "+91 9188883090",
  github: "https://github.com/pranavlal18",
  linkedin: "https://www.linkedin.com/in/pranavlalkb",
  location: "Thrissur, Kerala",
};
