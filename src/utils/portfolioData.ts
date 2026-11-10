export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Machine Learning' | 'RAG & Systems' | 'Embedded & Robotics';
  period: string;
  role: string;
  image: string;
  summary: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  keyHighlights: string[];
  githubUrl: string;
  demoAvailable?: boolean;
  architectureDetails: {
    overview: string;
    pipeline: string[];
    benchmark: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  bullets: string[];
  skills: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  specialization: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  description: string;
  highlightText: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export const PERSONAL_INFO = {
  name: 'Pawan Rajput',
  title: 'CSE AIML',
  subheading: 'B.Tech CSE (AI/ML) · Batch 2026-27 · Rajarambapu Institute of Technology, Sangli',
  location: 'Sangli, Maharashtra, India',
  email: 'rajputpawan9765@gmail.com',
  phone: '+91 8010927311',
  phoneRaw: '+918010927311',
  github: 'https://github.com/Pawan8010',
  githubHandle: 'Pawan8010',
  linkedin: 'https://linkedin.com/in/pawanrajput8010',
  linkedinHandle: 'pawanrajput8010',
  resumeUrl: '/assets/aistudio/Pawan_Rajput_b621e1ce.pdf',
  status: 'Applying for Robotics Annotator & AI Internships',
  bio: 'Specializing in computer vision microservices, production RAG pipelines, and embedded edge systems. Proven track record shipping OWASP-compliant production code, reducing API response times by 77%, and leading a 15-member AI engineering team.',
  heroImage: '/src/assets/images/hero_tech_workspace_1794345669858.jpg',
  stats: [
    { value: '94.2%', label: 'Classification Accuracy', detail: 'MobileNetV2 in field trials' },
    { value: 'Top 1%', label: 'TCS CodeVita Rank', detail: 'Global rank 2,754 of 300K+' },
    { value: '77%', label: 'API Latency Drop', detail: 'Redis async caching (420ms → 95ms)' },
    { value: '15+', label: 'Engineers Led', detail: 'Matrix Mind Club tech team' },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'livestock-ai',
    title: 'LivestockAI — AI Cattle Breed Identifier',
    tagline: 'Image-classification microservice estimating cattle breed & crossbreed composition in the field.',
    category: 'AI & Machine Learning',
    period: 'Jan 2026 – Present',
    role: 'Lead Developer',
    image: '/src/assets/images/project_livestock_ai_1794345670339.jpg',
    summary: 'A computer vision microservice engineered to identify cattle breeds from smartphone photography and estimate crossbreed genetic makeup directly in agricultural field environments.',
    metrics: [
      { label: 'Classification Accuracy', value: '94.2%' },
      { label: 'Active Daily Users', value: '200+' },
      { label: 'Inference Latency', value: '< 180ms' },
    ],
    technologies: ['TensorFlow', 'MobileNetV2', 'FastAPI', 'Firebase', 'Python', 'Docker'],
    keyHighlights: [
      'Trained and evaluated a customized MobileNetV2 architecture in TensorFlow with transfer learning on extensive labeled breed datasets.',
      'Containerized and served inference via an asynchronous FastAPI microservice with Firebase Authentication and cloud storage.',
      'Optimized model quantization for edge mobile devices, delivering fast predictions even under low-bandwidth rural conditions.',
    ],
    githubUrl: 'https://github.com/Pawan8010/LivestockAI',
    demoAvailable: true,
    architectureDetails: {
      overview: 'End-to-end computer vision pipeline from mobile camera capture to TensorFlow feature extraction and FastAPI inference.',
      pipeline: [
        'Image Preprocessing: Normalization, cropping & test-time augmentation',
        'MobileNetV2 Backbone: Deep convolutional feature extraction',
        'Softmax & Regression Head: Multi-class breed classification & crossbreed composition estimate',
        'FastAPI Gateway: Async request validation, caching & telemetry logging',
      ],
      benchmark: 'Achieved 94.2% top-1 accuracy across 12 distinct Indian and European cattle breeds with over 200 daily field users.',
    },
  },
  {
    id: 'opsbrain-ai',
    title: 'OpsBrain AI — Hybrid RAG Knowledge Platform',
    tagline: 'Enterprise question-answering system combining keyword, vector (Qdrant), and graph (Neo4j) retrieval with Gemini.',
    category: 'RAG & Systems',
    period: 'Jan 2026 – Present',
    role: 'Full-Stack & Systems Developer',
    image: '/src/assets/images/project_opsbrain_rag_1794345671174.jpg',
    summary: 'An enterprise knowledge platform for industrial manuals and compliance blueprints where every generated answer is strictly grounded in verifiable source citations and audit trails.',
    metrics: [
      { label: 'Benchmark Pass Rate', value: '100%' },
      { label: 'Supported Formats', value: '6 Types' },
      { label: 'Automated CI Tests', value: '30+' },
    ],
    technologies: ['Docker', 'Qdrant', 'Neo4j', 'Gemini', 'Python', 'FastAPI', 'GitHub Actions'],
    keyHighlights: [
      'Engineered an ingestion engine processing 6 industrial formats (PDF, DOCX, PPTX, XLSX, CSV, HTML) into semantic, section-aware chunks.',
      'Unified dense vector search (Qdrant) and entity knowledge graphs (Neo4j) using reciprocal rank fusion (RRF) for zero hallucination.',
      'Integrated Google Gemini LLM with structured citation output, audit logs, and 30 automated GitHub Actions CI gating tests.',
      'Orchestrated 4 distinct services seamlessly under a Docker Compose deployment.',
    ],
    githubUrl: 'https://github.com/Pawan8010/OpsBrain-AI',
    demoAvailable: true,
    architectureDetails: {
      overview: 'Hybrid retrieval architecture linking chunk-level embedding vectors with entity-relationship knowledge graphs for high-precision industrial queries.',
      pipeline: [
        'Section-Aware Parser: Extracts tables, text hierarchies and metadata from 6 file formats',
        'Dual Indexing: Vector embeddings into Qdrant + Named entity relationships into Neo4j',
        'Hybrid Fusion & Reranking: Reciprocal Rank Fusion combines vector proximity with graph path relevance',
        'Grounded Synthesis: Gemini generates response with verified line-level source citations',
      ],
      benchmark: '100% pass rate on a 25-question industrial benchmark; zero hallucination on critical engineering tolerance questions.',
    },
  },
  {
    id: 'goldenhour-ai',
    title: 'GoldenHour — AI Emergency Triage Tool',
    tagline: 'Rapid 56-field patient clinical assessment & emergency prioritization prototype built in 24 hours.',
    category: 'AI & Machine Learning',
    period: 'Jan 2026 – Present',
    role: 'Lead Architect & Developer',
    image: '/src/assets/images/project_goldenhour_triage_1794345671595.jpg',
    summary: 'An emergency room clinical assistant built during an intense 24-hour sprint that ingests structured 56-field patient vitals and symptoms to compute rapid emergency severity scores.',
    metrics: [
      { label: 'Assessment Fields', value: '56 Points' },
      { label: 'Sprint Build Time', value: '24 Hours' },
      { label: 'System Modules', value: '3 Microservices' },
    ],
    technologies: ['Python', 'FastAPI', 'Scikit-Learn', 'Voice API', 'REST API', 'Docker'],
    keyHighlights: [
      'Architected a modular triage pipeline split into 3 independent services: ML Risk Scoring, Emergency Classification, and Voice Input API.',
      'Processed patient vitals (SpO2, heart rate, blood pressure, respiratory rate, coma scale) against emergency medical triage protocols.',
      'Built a responsive emergency physician dashboard for real-time risk tier visualization and queue management.',
    ],
    githubUrl: 'https://github.com/Pawan8010/GoldenHour',
    demoAvailable: true,
    architectureDetails: {
      overview: 'Real-time triage engine consuming multimodal telemetry and clinical notes to output an Emergency Severity Index (ESI) rating.',
      pipeline: [
        'Voice & Text Ingestion: Whisper-based emergency voice dictation and structured input',
        'Feature Vector Normalization: 56 standardized vital metrics and symptom flags',
        'Classifier Ensemble: Random Forest & Gradient Boosted model trained on clinical triage data',
        'Real-time Alerting: Priority webhook dispatch to designated trauma teams',
      ],
      benchmark: 'Evaluated against standard clinical emergency scenarios with sub-50ms response latency for instant bedside assessment.',
    },
  },
  {
    id: 'stm32-robotics',
    title: 'Embedded Robotics & Microcontroller Systems',
    tagline: 'Firmware development, sensor telemetry acquisition, and motor control using STM32 microcontrollers.',
    category: 'Embedded & Robotics',
    period: 'Jan 2026 – Present',
    role: 'Embedded Systems Developer',
    image: '/src/assets/images/hero_tech_workspace_1794345669858.jpg',
    summary: 'Hardware-level robotics engineering focused on bare-metal C/C++ firmware, low-latency sensor polling, and closed-loop motor control on ARM Cortex-M based STM32 microcontrollers.',
    metrics: [
      { label: 'Platform', value: 'STM32 ARM' },
      { label: 'Protocols', value: 'SPI, I2C, CAN' },
      { label: 'Latency', value: '< 10µs loop' },
    ],
    technologies: ['STM32', 'C/C++', 'FreeRTOS', 'Embedded Systems', 'Robotics', 'CAN Bus'],
    keyHighlights: [
      'Developed real-time sensor fusion drivers for IMUs, optical encoders, and ultrasonic rangefinders.',
      'Implemented PID feedback control loops for high-precision robotic actuation and trajectory smoothing.',
      'Integrated CAN and UART communication buses for bidirectional telemetry streaming with host controllers.',
    ],
    githubUrl: 'https://github.com/Pawan8010',
    demoAvailable: false,
    architectureDetails: {
      overview: 'Real-time embedded firmware architecture on STM32 microcontrollers communicating with higher-level AI perception nodes.',
      pipeline: [
        'Hardware Abstraction Layer (HAL): Direct register-level and DMA-driven peripheral control',
        'Sensor Polling Task: 1kHz IMU and encoder data acquisition via SPI/I2C',
        'PID Control Loop: High-speed PWM generation for actuator torque and position targeting',
        'Telemetry Dispatcher: Serial and CAN packetization for ROS/AI node ingestion',
      ],
      benchmark: 'Zero-jitter 1kHz execution loop with deterministic interrupt handling for robotic navigation.',
    },
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'codexintern',
    role: 'Software Developer Intern',
    company: 'CODEXINTERN',
    period: 'Jul 2025 – Aug 2025',
    summary: 'Contributed directly to core backend microservices, performance optimization, and rigorous security standards.',
    bullets: [
      'Shipped 3 production features with full unit and integration test suites across 8,000+ lines of reviewed, OWASP-compliant code.',
      'Active participant in engineering rigor: ran pull request reviews, automated CI checks, and participated in daily Agile standups.',
      'Profiled live services and architected an asynchronous Redis caching layer, slashing API response times by 77% (from 420ms down to 95ms).',
    ],
    skills: ['Redis', 'OWASP Security', 'Python', 'FastAPI', 'Agile', 'Unit Testing', 'CI/CD'],
  },
  {
    id: 'matrix-mind-club',
    role: 'Technical Head',
    company: 'Matrix Mind Club (RIT Sangli)',
    period: 'Aug 2024 – Present',
    summary: 'Leading technical strategy, engineering mentorship, and production AI software development across campus.',
    bullets: [
      'Lead a 15-member engineering team building AI-powered internal tools and real-time dashboards serving 500+ active campus users.',
      'Establish software architecture standards, modular component conventions, and automated code review pipelines.',
      'Mentor junior engineers in applied machine learning, Git collaboration workflows, and modern web frameworks.',
    ],
    skills: ['Technical Leadership', 'Team Mentorship', 'System Architecture', 'React', 'FastAPI', 'Code Reviews'],
  },
];

export const EDUCATION: Education = {
  institution: 'Rajarambapu Institute of Technology (RIT)',
  location: 'Sangli, Maharashtra, India',
  degree: 'Bachelor of Technology (B.Tech)',
  specialization: 'Computer Science and Engineering (Artificial Intelligence & Machine Learning)',
  period: '2023 – 2027',
  cgpa: '7.56 / 10',
  highlights: [
    'Specialized in AI/ML Foundations, Neural Networks, Computer Vision, and Distributed Systems.',
    'Elected Technical Head of Matrix Mind Club.',
    'Active participant in competitive programming and national-level hackathons.',
  ],
};

export const AWARDS: Award[] = [
  {
    title: 'Winner',
    organization: 'ET GenAI Hackathon 2026',
    year: '2026',
    description: 'Awarded 1st place among top engineering teams nationwide for developing innovative generative AI and agentic workflow solutions.',
    highlightText: '1st Place Nationwide',
  },
  {
    title: 'Finalist',
    organization: 'Frontend Battle 2.0, IIT Bhubaneswar',
    year: '2025',
    description: 'Selected as top finalist in rigorous competitive frontend engineering contest with 500+ nationwide participants.',
    highlightText: 'Top 500+ Participants',
  },
  {
    title: 'Global Rank 2,754 of 300,000+',
    organization: 'TCS CodeVita Season 13',
    year: '2025',
    description: 'Finished in the top 1% globally among more than 300,000 collegiate algorithmic programmers worldwide.',
    highlightText: 'Top 1% Worldwide',
  },
  {
    title: 'GSoC 2025 Contributor & GirlScript Top 5%',
    organization: 'Google Summer of Code & GirlScript Foundation',
    year: '2025',
    description: 'Active open-source contributor and ranked in the top 5% of contributors and mentors for GirlScript Summer of Code.',
    highlightText: 'Top 5% Contributor & Mentor',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Oracle Database SQL Certified Associate',
    issuer: 'Oracle Corporation',
    year: '2025',
  },
  {
    name: 'Cisco IoT Certified',
    issuer: 'Cisco & NASSCOM FutureSkills',
    year: '2025',
  },
  {
    name: 'Google SWE Fundamentals',
    issuer: 'Google',
    year: '2024',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI, Machine Learning & Vision',
    description: 'Model training, quantization, transfer learning, and RAG architectures.',
    skills: [
      { name: 'TensorFlow', level: 90, highlight: true },
      { name: 'MobileNetV2', level: 88, highlight: true },
      { name: 'Gemini 2.0 / LLMs', level: 92, highlight: true },
      { name: 'RAG Architectures', level: 90, highlight: true },
      { name: 'Qdrant (Vector DB)', level: 85 },
      { name: 'Neo4j (Knowledge Graph)', level: 82 },
      { name: 'Computer Vision', level: 86 },
    ],
  },
  {
    title: 'Programming Languages',
    description: 'Strong object-oriented, functional, and systems programming foundation.',
    skills: [
      { name: 'Python', level: 95, highlight: true },
      { name: 'TypeScript', level: 88, highlight: true },
      { name: 'JavaScript', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'SQL', level: 90, highlight: true },
      { name: 'C / C++', level: 80 },
    ],
  },
  {
    title: 'Frameworks & Full-Stack',
    description: 'Production APIs, asynchronous services, and reactive user interfaces.',
    skills: [
      { name: 'FastAPI', level: 94, highlight: true },
      { name: 'React.js', level: 90, highlight: true },
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 85 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'REST & GraphQL APIs', level: 88 },
    ],
  },
  {
    title: 'Databases, Systems & Cloud',
    description: 'High-throughput caching, containerization, and reliable persistent storage.',
    skills: [
      { name: 'Redis (Caching)', level: 90, highlight: true },
      { name: 'PostgreSQL', level: 88, highlight: true },
      { name: 'MongoDB', level: 84 },
      { name: 'Docker & Compose', level: 86, highlight: true },
      { name: 'Git & GitHub Actions CI', level: 92, highlight: true },
      { name: 'Firebase & Cloud Run', level: 85 },
    ],
  },
  {
    title: 'Robotics & Core Engineering',
    description: 'Low-level hardware interfacing and software engineering principles.',
    skills: [
      { name: 'STM32 Microcontroller', level: 84, highlight: true },
      { name: 'Data Structures & Algorithms', level: 92, highlight: true },
      { name: 'Object-Oriented Design (OOD)', level: 90 },
      { name: 'SOLID Principles', level: 90 },
      { name: 'Operating Systems & DBMS', level: 86 },
      { name: 'OWASP Security Guidelines', level: 85 },
    ],
  },
];
