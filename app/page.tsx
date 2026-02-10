"use client";

import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, MapPin, 
  ChevronDown, ExternalLink, 
  Layers, Server, Zap, Globe, 
  Code2, Terminal, Cpu, Database, Cloud, Layout, 
  GraduationCap, Briefcase, ArrowUpRight, Sparkles
} from 'lucide-react';

// --- DATA ---
const PERSONAL = {
  name: "Dipika Ranabhat",
  role: "Full Stack Engineer & AI Architect",
  email: "dipika.ranabhat2001@gmail.com",
  location: "Vermillion, SD, USA",
  linkedin: "https://www.linkedin.com/in/dipika-ranabhat-734525205/",
  github: "https://github.com/qubeena07",
  bio: "I am a Software Engineer dedicated to building robust, distributed systems. I leverage my background in AI research to integrate intelligent, data-driven features into production-grade software.",
};

const EDUCATION = [
  {
    degree: "Master of Science in Computer Science",
    school: "University of South Dakota",
    date: "Aug 2024 - May 2026",
    location: "Vermillion, SD",
    desc: "Focusing on Advanced AI, Distributed Systems, and High-Performance Computing."
  },
  {
    degree: "Bachelor in Computer Science & Software Engineering",
    school: "University of Bedfordshire",
    date: "Sep 2019 - Mar 2023",
    location: "Luton, UK",
    desc: "Graduated with Honors. Capstone focus on Mobile Application Development."
  }
];

const EXPERIENCE = [
  {
    role: "Graduate Research Assistant",
    company: "University of South Dakota",
    date: "March 2025 - Present",
    bullets: [
      "Architected a RAG-based pipeline using LLMs for 'DentiMap', leading to its selection as a Finalist in the SD Governor's Giant Vision Competition.",
      "Conducting research on methodologies in Quantum Computing and AI applications in Endocrinology for academic publication.",
      "Executing technology commercialization and market validation via the NSF Great Plains I-Corps program."
    ]
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Delta V Logics & Solutions",
    date: "Apr 2023 - May 2024",
    bullets: [
      "Engineered distributed microservices handling 100,000+ concurrent users using Python and Django, optimizing database queries for high load.",
      "Reduced deployment time by 40% and boosted uptime by 30% via CI/CD pipelines (GitHub Actions, Docker, Azure).",
      "Improved system reliability by 35% by implementing robust PyTest frameworks for unit and integration testing."
    ]
  },
  {
    role: "Mobile App Developer",
    company: "Code Himalaya",
    date: "July 2022 - Oct 2023",
    bullets: [
      "Led full-cycle mobile development with Flutter and Dart, reducing application crash rates by 50% through rigorous testing.",
      "Integrated RESTful APIs ensuring 99.9% uptime for real-time data synchronization across platforms.",
      "Boosted app responsiveness by 40% leveraging insights from A/B testing and user feedback loops."
    ]
  }
];

const PROJECTS = [
  {
    title: "DentiMap",
    subtitle: "AI Diagnostic Tool",
    category: "AI",
    tech: ["Python", "RAG", "LLM", "React"],
    desc: "Award-winning AI screening tool utilizing RAG pipelines for high-accuracy diagnostics. Giant Vision Finalist."
  },
  {
    title: "Distributed Deep Learning",
    subtitle: "High Performance Computing",
    category: "Systems",
    tech: ["PyTorch DDP", "NCCL", "Python"],
    desc: "Scalable DL infrastructure. Optimized throughput by 50% (reducing training time from 60s to 30s) through strategic batch scaling."
  },
  {
    title: "Intelligent Hybrid Search",
    subtitle: "Information Retrieval",
    category: "AI",
    tech: ["Streamlit", "Transformers", "RRF", "NLTK"],
    desc: "Architected a full-stack hybrid information retrieval system. Integrated BM25 and Sentence Transformer algorithms."
  },
  {
    title: "Order In",
    subtitle: "Full Stack Mobile App",
    category: "Mobile",
    tech: ["Flutter", "Dart", "Firebase", "Node.js"],
    desc: "A robust food ordering application featuring real-time tracking, seamless payment integration, and a crash-free user experience."
  },
  {
    title: "Chowchow Express",
    subtitle: "Logistics Platform",
    category: "Web",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    desc: "Full-stack web application for logistics and user tracking. Implemented complex delivery route management and real-time dashboard."
  },
  {
    title: "Skin Cancer Detection",
    subtitle: "Medical AI",
    category: "AI",
    tech: ["TensorFlow", "ResNet50", "Python"],
    desc: "Medical image classification system using ResNet50 with custom layers to achieve high-accuracy detection of malignant lesions."
  },
  {
    title: "Pneumonia Detection",
    subtitle: "Computer Vision",
    category: "AI",
    tech: ["CNN", "Streamlit", "OpenCV"],
    desc: "Automated Chest X-Ray analysis tool utilizing Convolutional Neural Networks (CNNs) deployed via a Streamlit interface."
  },
  {
    title: "IoT Driver Drowsiness",
    subtitle: "Real-time Safety System",
    category: "AI",
    tech: ["OpenCV", "IoT", "CNN"],
    desc: "Real-time safety system using OpenCV and IoT sensors to detect driver fatigue and trigger audio/visual alerts."
  },
  {
    title: "Diabetes Prediction",
    subtitle: "Predictive Analytics",
    category: "AI",
    tech: ["Scikit-Learn", "Pandas", "ML"],
    desc: "Predictive modeling application analyzing health metrics to assess diabetes risk probabilities with high precision."
  },
  {
    title: "Expense Tracker",
    subtitle: "Finance Management",
    category: "Mobile",
    tech: ["Flutter", "SQLite", "Dart"],
    desc: "Personal finance management tool allowing users to track, categorize, and visualize daily expenses with local storage."
  },
  {
    title: "Tetris Clone",
    subtitle: "Game Engineering",
    category: "Mobile",
    tech: ["Flutter", "Game Engine"],
    desc: "Optimized mobile recreation of the classic Tetris game optimized for touch controls and smooth 60fps rendering."
  },
  {
    title: "Quiz App",
    subtitle: "Interactive Learning",
    category: "Mobile",
    tech: ["Flutter", "Dart", "JSON"],
    desc: "Interactive quiz application with score tracking, timer logic, and multiple categories dynamically loaded from JSON."
  }
];

const SKILLS = [
  { 
    category: "Languages", 
    icon: <Terminal className="text-violet-400" />,
    items: [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
    ] 
  },
  { 
    category: "Frontend & Mobile", 
    icon: <Layout className="text-pink-400" />,
    items: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ] 
  },
  { 
    category: "Backend & Systems", 
    icon: <Server className="text-blue-400" />,
    items: [
      { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ] 
  },
  { 
    category: "DevOps & Cloud", 
    icon: <Cloud className="text-cyan-400" />,
    items: [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    ] 
  },
  { 
    category: "AI & Data Science", 
    icon: <Cpu className="text-indigo-400" />,
    items: [
      { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
    ] 
  }
];

// --- SECTION COMPONENTS ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="mb-12"
  >
    <div className="flex items-center gap-3 mb-2">
      <span className="w-10 h-1 bg-violet-500 rounded-full"></span>
      <span className="text-violet-400 font-mono text-sm tracking-widest uppercase font-bold">{subtitle}</span>
    </div>
    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
      {children}
    </h2>
  </motion.div>
);

const Card = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ 
      y: -10, 
      scale: 1.02,
      boxShadow: "0 20px 40px -20px rgba(139, 92, 246, 0.3)",
      borderColor: "rgba(139, 92, 246, 0.5)"
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
    className={`bg-[#131522]/70 backdrop-blur-xl border border-white/10 p-8 rounded-3xl transition-all ${className}`}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0b0d17] min-h-screen text-slate-200 font-sans selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden relative">
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Scroll Progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 z-50 origin-left" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 py-6 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="font-bold text-2xl text-white pointer-events-auto tracking-tighter"
        >
          Dipika<span className="text-violet-500">.R</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="bg-[#1e293b]/80 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full flex gap-6 shadow-2xl pointer-events-auto"
        >
          {['About', 'Education', 'Skills', 'Projects'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-xs md:text-sm font-medium transition-colors hover:text-white text-slate-400 hover:scale-110 active:scale-95"
            >
              {item}
            </button>
          ))}
        </motion.div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="about" className="min-h-screen flex items-center relative px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-violet-500/30 rounded-full bg-violet-500/10 text-violet-300 font-medium text-xs cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              Open to New Opportunities
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Dipika <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400">Ranabhat</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed mb-10">
              {PERSONAL.bio}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('projects')} 
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold transition-colors hover:bg-violet-50 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                See My Work <ChevronDown size={20} />
              </motion.button>
              
              <div className="flex gap-2 items-center px-4">
                <motion.a whileHover={{ y: -5 }} href={PERSONAL.github} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white border border-white/5"><Github size={20} /></motion.a>
                <motion.a whileHover={{ y: -5 }} href={PERSONAL.linkedin} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 border border-white/5"><Linkedin size={20} /></motion.a>
                <motion.a whileHover={{ y: -5 }} href={`mailto:${PERSONAL.email}`} className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-violet-400 border border-white/5"><Mail size={20} /></motion.a>
              </div>
            </div>
          </motion.div>

          {/* MASSIVE BOUNCY PROFILE WITH ROTATING RINGS */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, y: [0, -30, 0] }}
            transition={{ 
              opacity: { duration: 1 },
              scale: { duration: 1, type: "spring" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" } // Bouncy Float
            }}
            className="relative flex justify-center"
          >
            <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
               {/* Glowing Background */}
               <div className="absolute inset-0 bg-violet-600/30 rounded-full blur-[80px] animate-pulse" />
               
               {/* Rotating Outer Ring (Cyan) */}
               <motion.div 
                 className="absolute -inset-4 rounded-full border border-cyan-400/30 border-t-transparent border-l-transparent"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               />
               
               {/* Rotating Inner Ring (Violet) */}
               <motion.div 
                 className="absolute -inset-1 rounded-full border-2 border-violet-500/40 border-b-transparent border-r-transparent"
                 animate={{ rotate: -360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               />

               {/* Profile Image */}
               <div className="absolute inset-2 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl bg-[#0b0d17] z-10">
                  <img 
                    src="/profile.jpeg" 
                    alt="Dipika Ranabhat" 
                    className="w-full h-full object-cover object-top" // object-top fixes head cut-off
                    onError={(e) => {e.currentTarget.src = "https://placehold.co/800x800/1e293b/white?text=DR"}}
                  />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- EDUCATION SECTION --- */}
      <section id="education" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Foundation">Education</SectionTitle>
          <div className="space-y-6">
            {EDUCATION.map((edu, idx) => (
              <Card key={idx} delay={idx * 0.1} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 bg-violet-500/10 rounded-2xl text-violet-400 border border-violet-500/20">
                  <GraduationCap size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h3 className="text-2xl font-bold text-white">{edu.school}</h3>
                    <span className="text-slate-500 font-mono text-sm bg-white/5 px-3 py-1 rounded-full">{edu.date}</span>
                  </div>
                  <p className="text-violet-300 font-medium text-lg mb-2">{edu.degree}</p>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <MapPin size={14} />
                    <span>{edu.location}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-lg">{edu.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-32 px-6 max-w-7xl mx-auto">
        <SectionTitle subtitle="Toolkit">Technical Skills</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((cat, idx) => (
            <Card key={idx} delay={idx * 0.1} className="h-full">
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                <div className="p-3 bg-white/5 rounded-xl text-white">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{cat.category}</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {cat.items.map((skill, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex flex-col items-center gap-3 group/icon cursor-default"
                  >
                    <div className="w-14 h-14 p-3 bg-[#181a29] rounded-2xl border border-white/5 group-hover/icon:border-violet-500/50 group-hover/icon:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center shadow-lg">
                      {/* FULL COLOR LOGOS */}
                      <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 group-hover/icon:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* --- WORK EXPERIENCE --- */}
      <section id="work" className="py-32 px-6 max-w-5xl mx-auto">
        <SectionTitle subtitle="Career">Experience</SectionTitle>
        <div className="space-y-8 border-l-2 border-white/10 ml-3 md:ml-0 md:pl-0">
          {EXPERIENCE.map((job, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.8)] ring-4 ring-[#0b0d17]" />
              
              <Card className="hover:bg-white/5 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{job.company}</h3>
                    <p className="text-violet-400 font-medium text-lg flex gap-2 items-center">
                      <Briefcase size={16} /> {job.role}
                    </p>
                  </div>
                  <span className="mt-2 md:mt-0 px-4 py-1.5 bg-black/30 rounded-full text-xs font-mono text-cyan-200 border border-cyan-500/20">
                    {job.date}
                  </span>
                </div>
                <ul className="space-y-4">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-300 leading-relaxed">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- PROJECTS SECTION (Text Only / Bento) --- */}
      <section id="projects" className="py-32 px-6 max-w-[1400px] mx-auto bg-gradient-to-b from-[#0b0d17] to-[#120f2e]">
        <SectionTitle subtitle="Portfolio">Featured Work</SectionTitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {PROJECTS.map((project, idx) => (
              <Card key={idx} delay={idx * 0.1} className="flex flex-col h-full overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-violet-500/10 rounded-2xl text-violet-400 group-hover:text-white group-hover:bg-violet-500 transition-colors">
                    <Code2 size={24} />
                  </div>
                  <a href={PERSONAL.github} target="_blank" className="text-slate-500 hover:text-white transition-colors hover:scale-110">
                    <ArrowUpRight size={20} />
                  </a>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{project.title}</h3>
                <p className="text-sm text-violet-400/80 font-mono mb-4 uppercase tracking-wider">{project.subtitle}</p>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-[#0b0d17] text-slate-300 rounded-lg text-xs font-medium border border-white/5 shadow-inner">
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-[#120f2e] to-[#050505]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter"
          >
            Let's Build the Future.
          </motion.h2>
          <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">
            I'm currently available for full-time roles in Software Engineering and AI.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${PERSONAL.email}`} 
              className="flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-violet-200 rounded-full font-bold text-lg transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <Mail size={20} /> Email Me
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={PERSONAL.linkedin} 
              target="_blank" 
              className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-lg transition-colors border border-white/10"
            >
              <Linkedin size={20} /> LinkedIn
            </motion.a>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-500 font-mono text-sm">
            <MapPin size={14} /> {PERSONAL.location}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-600 text-sm bg-black border-t border-white/5 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <a href={PERSONAL.github} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all">
            <Github size={20} />
          </a>
          <a href={PERSONAL.linkedin} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all">
            <Linkedin size={20} />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Dipika Ranabhat. Engineered with Next.js & Tailwind.</p>
      </footer>
    </div>
  );
}