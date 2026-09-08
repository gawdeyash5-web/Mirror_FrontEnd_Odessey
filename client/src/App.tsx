import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Compass,
  Copy,
  Feather,
  Globe2,
  LockKeyhole,
  Menu,
  Orbit,
  Plus,
  RotateCcw,
  Share2,
  Sparkles,
  Trash2,
  UserRound,
  X,
  Zap,
} from "lucide-react";

export interface MirrorOption {
  id: string;
  label: string;
  sub: string;
  tone: "cobalt" | "peach" | "sage" | "sand";
}

export interface Situation {
  id: string;
  category: string;
  person: string;
  age: string;
  city: string;
  avatar: string;
  image: string;
  title: string;
  short: string;
  prompt: string;
  options: MirrorOption[];
  original: string; // matches option.label
  whyTitle: string;
  why: string;
  context: string;
  tags: string[];
  isUserCreated?: boolean;
}

const defaultSituations: Situation[] = [
  {
    id: "arjun",
    category: "Family / Career",
    person: "Arjun",
    age: "29",
    city: "Pune",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=85",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
    title: "The offer that asks you to leave home.",
    short: "A life-changing role arrives at exactly the wrong time.",
    prompt:
      "I've been offered a role at a company overseas. It would double my salary and accelerate my career by at least five years. But my mother was recently diagnosed with early-stage Alzheimer's.",
    options: [
      {
        id: "opt-1",
        label: "Take the job overseas",
        sub: "A new city. A faster career. A different life.",
        tone: "cobalt",
      },
      {
        id: "opt-2",
        label: "Stay in Pune with family",
        sub: "Family. Familiarity. Being there when it counts.",
        tone: "peach",
      },
      {
        id: "opt-3",
        label: "Negotiate a 6-month delay",
        sub: "Ask for time to establish medical and family support.",
        tone: "sage",
      },
    ],
    original: "Stay in Pune with family",
    whyTitle: "The weight of proximity",
    why: "I knew the opportunity might never come again. But my mother needed someone close. For me, the decision wasn't really about the job.",
    context:
      "Arjun is the eldest of three siblings. His mother had always been the person who made a new city feel like home. His younger brother was finishing university abroad, and his father had quietly admitted he was struggling with the practical parts of care.",
    tags: ["FAMILY", "CAREER", "RESPONSIBILITY"],
  },
  {
    id: "mira",
    category: "Friendship / Money",
    person: "Mira",
    age: "34",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=85",
    title: "The loan that could change a friendship.",
    short: "Your closest friend asks for more than you can comfortably give.",
    prompt:
      "Your closest friend asks to borrow a large amount of money. You know they may not be able to repay it, but you also know the request comes after a year they never talk about.",
    options: [
      {
        id: "opt-1",
        label: "Lend the full amount",
        sub: "Trust the friendship. Absorb the financial risk completely.",
        tone: "cobalt",
      },
      {
        id: "opt-2",
        label: "Set a clear boundary",
        sub: "Protect the friendship and offer non-financial support.",
        tone: "peach",
      },
      {
        id: "opt-3",
        label: "Give a smaller gift",
        sub: "Offer what you can afford to lose without debt or resentment.",
        tone: "sand",
      },
    ],
    original: "Set a clear boundary",
    whyTitle: "Friendship without an invoice",
    why: "I wanted to help without turning our friendship into a debt ledger. Saying yes to the full amount would have made every quiet moment feel like an invoice.",
    context:
      "Mira had been the friend everyone called when a plan fell apart. This time, she had just signed the lease on her first home and was carrying a private fear that one generous decision could undo years of careful work.",
    tags: ["TRUST", "BOUNDARIES", "FRIENDSHIP"],
  },
  {
    id: "noah",
    category: "Work / Ethics",
    person: "Noah",
    age: "31",
    city: "London",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    title: "The credit that lands in your lap.",
    short: "Your manager is about to credit only you for work everyone shared.",
    prompt:
      "You contributed equally to a project, but your manager is about to credit only you for its success. Speaking up could change your promotion. Staying quiet could change your team.",
    options: [
      {
        id: "opt-1",
        label: "Speak up immediately",
        sub: "Correct the record publicly in the meeting.",
        tone: "cobalt",
      },
      {
        id: "opt-2",
        label: "Accept the credit quietly",
        sub: "Take the momentum and advocate for the team later.",
        tone: "peach",
      },
      {
        id: "opt-3",
        label: "Send a written correction",
        sub: "Document each person's exact contribution after the call.",
        tone: "sage",
      },
      {
        id: "opt-4",
        label: "Decline the promotion",
        sub: "Insist on collective recognition before moving forward.",
        tone: "sand",
      },
    ],
    original: "Speak up immediately",
    whyTitle: "Rooms where others are seen",
    why: "The promotion was tempting, but the thing I wanted to be known for was building rooms where other people could be seen too.",
    context:
      "Noah's team had missed two deadlines the previous quarter. He knew the promotion would give him influence, but he also knew the people doing the invisible work had fewer options and less protection than he did.",
    tags: ["CREDIT", "COURAGE", "WORK"],
  },
  {
    id: "elena",
    category: "Integrity / Leadership",
    person: "Elena",
    age: "36",
    city: "Berlin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=85",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85",
    title: "The deal with a hidden fracture.",
    short: "Your co-founder is negotiating behind the board's back during a critical round.",
    prompt:
      "You discover your co-founder has been quietly talking to a direct competitor about an acquisition. Confronting them now could sink the funding round your entire team depends on.",
    options: [
      {
        id: "opt-1",
        label: "Confront immediately",
        sub: "Transparency first, regardless of the immediate funding impact.",
        tone: "cobalt",
      },
      {
        id: "opt-2",
        label: "Wait until the round closes",
        sub: "Secure the company's survival runway, then address the breach.",
        tone: "peach",
      },
    ],
    original: "Confront immediately",
    whyTitle: "Trust before survival",
    why: "A company that survives on a lie isn't a company worth building. I'd rather fail with integrity than succeed with a broken partnership.",
    context:
      "Elena had poured three years of personal savings into the company. Her team of twelve relied on this round for payroll, but she had seen how hidden fractures inevitably destroy organizations from within.",
    tags: ["INTEGRITY", "LEADERSHIP", "STARTUPS"],
  },
];

const STORAGE_KEY = "mirror_custom_situations_v1";

function loadAllSituations(): Situation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSituations;
    const custom = JSON.parse(raw);
    if (Array.isArray(custom)) {
      return [...defaultSituations, ...custom];
    }
  } catch (e) {
    console.error("Failed to load custom situations from localStorage:", e);
  }
  return defaultSituations;
}

function saveCustomSituation(newSit: Situation) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: Situation[] = raw ? JSON.parse(raw) : [];
    const filtered = existing.filter((s) => s.id !== newSit.id);
    filtered.unshift(newSit);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error("Failed to save custom situation:", e);
  }
}

export interface Echo {
  id: string;
  mirrorId: string;
  reflection: "Yes" | "No" | "I'm not sure";
  path: string; // The selected path/option label (supports 2, 3, or 4 options)
  text: string;
  timestamp: number;
  authorTag?: string;
  isCurrentUser?: boolean;
}

const defaultEchoes: Record<string, Echo[]> = {
  arjun: [
    {
      id: "echo-arjun-1",
      mirrorId: "arjun",
      reflection: "No",
      path: "Take the job overseas",
      text: "I thought I would choose the job immediately. After reading the context, I'm not sure anymore. Career acceleration can wait, but early-stage Alzheimer's doesn't give you time back.",
      timestamp: Date.now() - 1000 * 60 * 60 * 36,
      authorTag: "Someone who chose TAKE THE JOB",
    },
    {
      id: "echo-arjun-2",
      mirrorId: "arjun",
      reflection: "Yes",
      path: "Stay in Pune with family",
      text: "I chose STAY because I imagined my own family in the same situation. Some promotions arrive twice in a career; parents don't.",
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
      authorTag: "Someone who chose STAY",
    },
    {
      id: "echo-arjun-3",
      mirrorId: "arjun",
      reflection: "I'm not sure",
      path: "Negotiate a 6-month delay",
      text: "I wanted the opportunity, but I couldn't justify making the decision irreversible without exploring whether compromise was possible first.",
      timestamp: Date.now() - 1000 * 60 * 60 * 14,
      authorTag: "Someone who chose NEGOTIATE A DELAY",
    },
    {
      id: "echo-arjun-4",
      mirrorId: "arjun",
      reflection: "Yes",
      path: "Take the job overseas",
      text: "Providing long-term financial security through higher income is often the only sustainable way to fund continuous private medical care in Pune.",
      timestamp: Date.now() - 1000 * 60 * 60 * 6,
      authorTag: "Someone who chose TAKE THE JOB",
    },
  ],
  mira: [
    {
      id: "echo-mira-1",
      mirrorId: "mira",
      reflection: "Yes",
      path: "Set a clear boundary",
      text: "I chose BOUNDARY because friendship without an invoice is the only kind that lasts through real crises. Unspoken financial debt corrodes trust.",
      timestamp: Date.now() - 1000 * 60 * 60 * 48,
      authorTag: "Someone who chose SET A CLEAR BOUNDARY",
    },
    {
      id: "echo-mira-2",
      mirrorId: "mira",
      reflection: "No",
      path: "Lend the full amount",
      text: "I instinctively wanted to say yes to the full loan. But learning that Mira was carrying private fear for her first home changed everything for me.",
      timestamp: Date.now() - 1000 * 60 * 60 * 20,
      authorTag: "Someone who chose LEND THE FULL AMOUNT",
    },
    {
      id: "echo-mira-3",
      mirrorId: "mira",
      reflection: "I'm not sure",
      path: "Give a smaller gift",
      text: "Gifting what you can afford protects both your savings and the relationship, though it leaves the larger problem unresolved.",
      timestamp: Date.now() - 1000 * 60 * 60 * 8,
      authorTag: "Someone who chose GIVE A SMALLER GIFT",
    },
  ],
  noah: [
    {
      id: "echo-noah-1",
      mirrorId: "noah",
      reflection: "Yes",
      path: "Speak up immediately",
      text: "If you swallow stolen credit early in your career, you teach leadership that your silence can be purchased cheaply. Integrity cannot be retrofitted.",
      timestamp: Date.now() - 1000 * 60 * 60 * 30,
      authorTag: "Someone who chose SPEAK UP IMMEDIATELY",
    },
    {
      id: "echo-noah-2",
      mirrorId: "noah",
      reflection: "I'm not sure",
      path: "Send a written correction",
      text: "Public confrontation in a meeting often triggers defensive backlash. A paper trail preserves team equity while leaving room for diplomatic resolution.",
      timestamp: Date.now() - 1000 * 60 * 60 * 18,
      authorTag: "Someone who chose SEND A WRITTEN CORRECTION",
    },
    {
      id: "echo-noah-3",
      mirrorId: "noah",
      reflection: "No",
      path: "Accept the credit quietly",
      text: "I thought about taking the promotion and pulling the team up later, but the erosion of trust in the room happens the minute that meeting ends.",
      timestamp: Date.now() - 1000 * 60 * 60 * 4,
      authorTag: "Someone who chose ACCEPT THE CREDIT",
    },
  ],
  elena: [
    {
      id: "echo-elena-1",
      mirrorId: "elena",
      reflection: "Yes",
      path: "Confront immediately",
      text: "A startup built on a known lie will inevitably rupture when the stakes are 10x higher. Better to reset now than face securities litigation later.",
      timestamp: Date.now() - 1000 * 60 * 60 * 22,
      authorTag: "Someone who chose CONFRONT IMMEDIATELY",
    },
    {
      id: "echo-elena-2",
      mirrorId: "elena",
      reflection: "No",
      path: "Sign first, confront later",
      text: "Twelve people depend on payroll next Tuesday. I chose the company's survival first, but now see how poisonous that compromise is.",
      timestamp: Date.now() - 1000 * 60 * 60 * 12,
      authorTag: "Someone who chose SIGN FIRST",
    },
    {
      id: "echo-elena-3",
      mirrorId: "elena",
      reflection: "I'm not sure",
      path: "Confront immediately",
      text: "Principles are easy from the sidelines. When payroll is 48 hours away and lives depend on the wire, every decision feels like an existential agony.",
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
      authorTag: "Someone who chose CONFRONT IMMEDIATELY",
    },
  ],
};

const ECHOES_STORAGE_KEY = "mirror_echoes_v1";

function loadAllEchoes(): Record<string, Echo[]> {
  try {
    const raw = localStorage.getItem(ECHOES_STORAGE_KEY);
    if (!raw) return defaultEchoes;
    const customEchoes: Record<string, Echo[]> = JSON.parse(raw);
    const merged: Record<string, Echo[]> = { ...defaultEchoes };
    for (const key of Object.keys(customEchoes)) {
      merged[key] = [...customEchoes[key], ...(defaultEchoes[key] || [])];
    }
    return merged;
  } catch (e) {
    console.error("Failed to load echoes from localStorage:", e);
    return defaultEchoes;
  }
}

function saveEchoToStorage(mirrorId: string, newEcho: Echo) {
  try {
    const raw = localStorage.getItem(ECHOES_STORAGE_KEY);
    const customEchoes: Record<string, Echo[]> = raw ? JSON.parse(raw) : {};
    const list = customEchoes[mirrorId] ? [...customEchoes[mirrorId]] : [];
    list.unshift(newEcho);
    customEchoes[mirrorId] = list;
    localStorage.setItem(ECHOES_STORAGE_KEY, JSON.stringify(customEchoes));
  } catch (e) {
    console.error("Failed to save echo to localStorage:", e);
  }
}

type MirrorStage = "situation" | "locked" | "reflecting" | "reveal" | "why" | "context" | "reflect";

const ease = [0.22, 1, 0.36, 1] as const;

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`logo-mark ${inverse ? "logo-inverse" : ""}`} aria-label="MIRROR home">
      <span className="logo-dot" />
      <span>MIRROR</span>
    </Link>
  );
}

// FIX 6: Refined Navigation with clear active states and smooth transitions
function SiteNav({ dark = false }: { dark?: boolean }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: "/mirror", label: "Mirror" },
    { href: "/explore", label: "Explore" },
    { href: "/create", label: "Create" },
  ];

  const isActive = (href: string) => {
    if (href === "/mirror") {
      return location === "/mirror" || location.startsWith("/mirror/");
    }
    return location.startsWith(href);
  };

  return (
    <header className={`site-nav ${dark ? "site-nav-dark" : ""}`}>
      <Logo inverse={dark} />
      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href} className={active ? "active" : ""}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link className="profile-chip" href="/profile" aria-label="Open your profile">
        <span className="avatar avatar-small">Y</span>
        <span className="profile-chip-label">Yash</span>
      </Link>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation menu" aria-expanded={open}>
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Link href="/" className={location === "/" ? "active" : ""} onClick={() => setOpen(false)}>
              Home
            </Link>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/profile" onClick={() => setOpen(false)}>Your profile</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ArrowButton({
  children,
  href,
  onClick,
  variant = "dark",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "dark" | "light" | "outline";
}) {
  const className = `arrow-button arrow-${variant}`;
  const content = (
    <>
      <span>{children}</span>
      <span className="arrow-button-icon">
        <ArrowUpRight size={16} strokeWidth={2} />
      </span>
    </>
  );
  if (href) return <Link href={href} className={className}>{content}</Link>;
  return <button className={className} onClick={onClick}>{content}</button>;
}

// FIX 1: Interactive Hero Art with Perspective & Light Response
function InteractiveHeroArt() {
  const [coords, setCoords] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const [activeSide, setActiveSide] = useState<"left" | "right">("left");
  const artRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!artRef.current) return;
    const rect = artRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setCoords({
      x: nx * 32,
      y: ny * 32,
      rx: -ny * 16,
      ry: nx * 16,
    });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0, rx: 0, ry: 0 });
  };

  return (
    <div
      ref={artRef}
      className="landing-art"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Two overlapping perspectives in light"
    >
      <motion.div
        className="art-interactive-container"
        animate={{
          rotateX: coords.rx,
          rotateY: coords.ry,
          x: coords.x * 0.35,
          y: coords.y * 0.35,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 24 }}
      >
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="art-sun" />

        {/* TOP / UPPER LABELS */}
        <span className="art-angle-tag angle-a">ANGLE A</span>
        <span className="art-angle-tag angle-b">ANGLE B</span>

        {/* Dual Refraction Windows */}
        <motion.div
          className={`art-window window-left ${activeSide === "left" ? "window-active" : ""}`}
          animate={{ x: coords.x * 0.45, y: coords.y * 0.45 }}
          onClick={() => setActiveSide("left")}
          aria-label="Perspective One"
        >
          <span className="window-bottom-label label-one">ONE</span>
        </motion.div>

        <motion.div
          className={`art-window window-right ${activeSide === "right" ? "window-active" : ""}`}
          animate={{ x: -coords.x * 0.45, y: -coords.y * 0.45 }}
          onClick={() => setActiveSide("right")}
          aria-label="Perspective Other"
        >
          <span className="window-bottom-label label-other">OTHER</span>
        </motion.div>

        {/* Specular Glimmer tracking cursor */}
        <motion.div
          className="art-glimmer"
          animate={{
            left: `${50 + coords.x * 1.3}%`,
            top: `${46 + coords.y * 1.3}%`,
            opacity: activeSide === "left" ? 0.7 : 0.9,
          }}
          transition={{ type: "spring", stiffness: 130, damping: 20 }}
        />

        <div className="art-caption caption-top">SAME SITUATION</div>
        <div className="art-caption caption-bottom">DIFFERENT LIGHT</div>
        <div className="art-center-line" />

        {/* Interactive Perspective Pill */}
        <div
          className="art-mode-pill"
          onClick={() => setActiveSide((s) => (s === "left" ? "right" : "left"))}
          title="Click to shift perspective"
        >
          <span className="art-mode-dot" />
          <span>{activeSide === "left" ? "01 / DIRECT PERSPECTIVE" : "02 / REFLECTED PERSPECTIVE"}</span>
          <ArrowDownRight size={13} />
        </div>

        <div className="art-stamp">
          <Sparkles size={13} /> 01 / 07
        </div>
      </motion.div>
    </div>
  );
}

function LandingPage() {
  return (
    <main className="landing-page">
      <SiteNav />
      <section className="landing-hero">
        <div className="landing-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
            A social space for perspective
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            See<br /><em>differently.</em>
          </motion.h1>
          <motion.p className="landing-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            A social space built around the choices that shape us. Step into someone else&apos;s crossroads, before you know how they chose.
          </motion.p>
          <motion.div className="landing-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.42 }}>
            <ArrowButton href="/mirror">Enter mirror</ArrowButton>
            <Link href="/explore" className="text-link">Explore perspectives <ArrowDownRight size={15} /></Link>
          </motion.div>
        </div>
        <InteractiveHeroArt />
      </section>
      <section className="landing-footer">
        <div className="scroll-note"><span className="scroll-line" /> scroll to look around</div>
        <div className="landing-manifesto">The social object is a <em>situation.</em><br />The connection is a <em>perspective.</em></div>
        <div className="landing-mark">M / 2026</div>
      </section>
    </main>
  );
}

function StageBar({ stage }: { stage: MirrorStage }) {
  const labels = ["Situation", "Decision", "Reveal", "Context", "Reflect"];
  const current =
    stage === "situation"
      ? 0
      : stage === "locked" || stage === "reflecting"
      ? 1
      : stage === "reveal"
      ? 2
      : stage === "why" || stage === "context"
      ? 3
      : 4;
  return (
    <div className="stage-bar" aria-label="Mirror progress">
      {labels.map((label, index) => (
        <span key={label} className={index <= current ? "done" : ""}>
          <i>{String(index + 1).padStart(2, "0")}</i>
          {label}
        </span>
      ))}
    </div>
  );
}

// FIX 9 & 17: Choice surface component supporting 2, 3, or 4 options with tones
function ChoiceSurface({
  choice,
  selected,
  muted,
  onClick,
  letter,
}: {
  choice: MirrorOption;
  selected: boolean;
  muted: boolean;
  onClick: () => void;
  letter: string;
}) {
  return (
    <button
      type="button"
      className={`choice-surface choice-${choice.tone} ${selected ? "selected" : ""} ${muted ? "muted" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="choice-letter">{letter}</span>
      <span className="choice-content">
        <strong>{choice.label}</strong>
        <span>{choice.sub}</span>
      </span>
      <span className="choice-arrow">
        <ArrowUpRight size={20} strokeWidth={1.8} />
      </span>
      {selected && (
        <span className="choice-check">
          <Check size={14} strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
}

// FIX 2, 3, 4, 5, 9, 17, 18: Complete Participant Mirror Experience
function MirrorPage({ id = "arjun" }: { id?: string }) {
  const allSituations = useMemo(() => loadAllSituations(), []);
  const situation = useMemo(() => {
    return allSituations.find((item) => item.id === id) ?? allSituations[0];
  }, [allSituations, id]);

  const [stage, setStage] = useState<MirrorStage>("situation");
  const [choice, setChoice] = useState<string | null>(null);
  const [reflection, setReflection] = useState<string | null>(null);

  // Echo System State
  const [echoText, setEchoText] = useState("");
  const [submittedEcho, setSubmittedEcho] = useState<Echo | null>(null);
  const [echoFilter, setEchoFilter] = useState<"all" | "Yes" | "No" | "I'm not sure">("all");
  const [echoesMap, setEchoesMap] = useState<Record<string, Echo[]>>(() => loadAllEchoes());

  useEffect(() => {
    setStage("situation");
    setChoice(null);
    setReflection(null);
    setEchoText("");
    setSubmittedEcho(null);
    setEchoFilter("all");
  }, [id]);

  const mirrorEchoes = useMemo(() => {
    return echoesMap[situation.id] || defaultEchoes[situation.id] || [];
  }, [echoesMap, situation.id]);

  const displayedEchoes = useMemo(() => {
    if (echoFilter === "all") return mirrorEchoes;
    return mirrorEchoes.filter((e) => e.reflection === echoFilter);
  }, [mirrorEchoes, echoFilter]);

  const filterCount = (filterType: "all" | "Yes" | "No" | "I'm not sure") => {
    if (filterType === "all") return mirrorEchoes.length;
    return mirrorEchoes.filter((e) => e.reflection === filterType).length;
  };

  const handleLeaveEcho = () => {
    if (!echoText.trim() || !choice || !reflection) return;
    const newEcho: Echo = {
      id: `echo-${Date.now()}`,
      mirrorId: situation.id,
      reflection: reflection as "Yes" | "No" | "I'm not sure",
      path: choice,
      text: echoText.trim(),
      timestamp: Date.now(),
      authorTag: `You (chose ${choice})`,
      isCurrentUser: true,
    };
    saveEchoToStorage(situation.id, newEcho);
    setEchoesMap(loadAllEchoes());
    setSubmittedEcho(newEcho);
  };

  const userChoseSame = choice?.toLowerCase() === situation.original.toLowerCase();

  const lock = () => {
    if (!choice) return;
    setStage("locked");
    window.setTimeout(() => setStage("reflecting"), 900);
    window.setTimeout(() => setStage("reveal"), 2300);
  };

  const currentNumber = allSituations.findIndex((s) => s.id === situation.id) + 1;
  const totalCount = allSituations.length;

  return (
    <main className={`mirror-page mirror-stage-${stage}`}>
      <SiteNav />
      <div className="mirror-shell">
        <div className="mirror-meta-row">
          <div className="mirror-person">
            <span className="avatar">
              {situation.avatar ? <img src={situation.avatar} alt="" /> : <span>{situation.person[0]}</span>}
            </span>
            <span>
              <strong>{situation.person}</strong>
              <small>{situation.age} · {situation.city}</small>
            </span>
          </div>
          <StageBar stage={stage} />
          <span className="mirror-count">
            MIRROR <b>{String(currentNumber).padStart(2, "0")}</b> / {String(totalCount).padStart(2, "0")}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {stage === "situation" && (
            <motion.section
              key="situation"
              className="situation-layout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="situation-copy">
                <div className="category-mark">
                  <span className="category-dot" /> {situation.category}
                </div>
                {/* FIX 2: Medium editorial situation typography */}
                <h1>{situation.prompt}</h1>
                <div className="situation-aside">
                  <span className="vertical-label">A CROSSROADS FROM {situation.person.toUpperCase()}</span>
                  <p>There is no right answer here. Only the perspective you can stand behind.</p>
                </div>
              </div>

              <div className="choice-area">
                <p className="choice-kicker">
                  Before you know how they chose<span>·</span> choose your path
                </p>
                {/* FIX 9 & 17: Multi-option participant layout */}
                <div className={`choice-stack ${situation.options.length === 4 ? "choice-stack-grid" : ""}`}>
                  {situation.options.map((opt, index) => {
                    const letter = String.fromCharCode(65 + index);
                    return (
                      <React.Fragment key={opt.id}>
                        <ChoiceSurface
                          choice={opt}
                          letter={letter}
                          selected={choice === opt.label}
                          muted={!!choice && choice !== opt.label}
                          onClick={() => setChoice(opt.label)}
                        />
                        {situation.options.length === 2 && index === 0 && (
                          <div className="versus">
                            <span>or</span>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* FIX 3: Clearly visible, prominent real Lock button */}
                <AnimatePresence>
                  {choice && (
                    <motion.div
                      className="lock-row"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                    >
                      <span className="lock-note">
                        <LockKeyhole size={13} /> Your choice remains sealed until reveal
                      </span>
                      <button className="lock-button" onClick={lock} aria-label="Lock my decision">
                        <span>Lock my decision</span>
                        <span className="lock-button-icon">
                          <ArrowUpRight size={17} strokeWidth={2.2} />
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}

          {(stage === "locked" || stage === "reflecting") && (
            <motion.section key="locked" className="decision-moment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <span className="decision-overline">{stage === "reflecting" ? "A moment of reflection" : "You chose"}</span>
              <h1>{stage === "reflecting" ? "Reflecting…" : choice}</h1>
              <div className="decision-pulse">
                <span />
                <span />
                <span />
              </div>
              <p>Hold onto this choice.<br />Their answer is on the other side.</p>
            </motion.section>
          )}

          {/* FIX 18: Reveal Stage */}
          {stage === "reveal" && (
            <motion.section key="reveal" className="reveal-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.65 }}>
              <div className="reveal-heading">
                <div>
                  <span className="eyebrow">The same crossroads, two ways through</span>
                  <h1>
                    {userChoseSame ? (
                      <>You saw it<br /><em>the same way.</em></>
                    ) : (
                      <>You saw the same<br /><em>crossroads differently.</em></>
                    )}
                  </h1>
                </div>
                <span className="reveal-status-pill">
                  {userChoseSame ? "Matched Perspective" : "Divergent Crossroads"}
                </span>
              </div>

              <div className="split-reveal">
                <div className="reveal-half reveal-you">
                  <span className="reveal-label">You Chose</span>
                  <strong>{choice}</strong>
                  <small>Your instinct, before knowing their side.</small>
                </div>
                <div className="reflective-line">
                  <span>↕</span>
                </div>
                <div className="reveal-half reveal-them">
                  <span className="reveal-label">{situation.person} Chose</span>
                  <strong>{situation.original}</strong>
                  <small>The choice they made, before you arrived.</small>
                </div>
              </div>

              {/* FIX 4: Real action button */}
              <div className="reveal-actions">
                <button
                  className="reveal-why"
                  onClick={() => setStage("why")}
                  aria-label="Why did they choose this?"
                >
                  <span>Why did they choose this?</span>
                  <span className="reveal-why-icon">
                    <ArrowDownRight size={17} strokeWidth={2.2} />
                  </span>
                </button>
                <span className="reveal-footnote">No verdicts. Just another angle.</span>
              </div>
            </motion.section>
          )}

          {/* FIX 5 & 8: Improved Perspective Shift / Context Experience */}
          {(stage === "why" || stage === "context" || stage === "reflect") && (
            <motion.section
              key="context-flow"
              className={`context-section ${stage === "context" ? "context-step" : ""} ${stage === "reflect" ? "reflect-step" : ""}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease }}
            >
              {stage === "why" && (
                <>
                  <div className="context-topline">
                    <span className="eyebrow">The reason underneath</span>
                    <span>02 / 03</span>
                  </div>
                  <blockquote>“{situation.why}”</blockquote>
                  <div className="context-bottom">
                    <div className="tag-row">
                      {situation.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {/* FIX 4: Real action button */}
                    <button className="side-button" onClick={() => setStage("context")}>
                      <span>See their side</span>
                      <span className="side-button-icon">
                        <ArrowUpRight size={17} strokeWidth={2.2} />
                      </span>
                    </button>
                  </div>
                </>
              )}

              {stage === "context" && (
                <>
                  <div className="context-topline">
                    <span className="eyebrow">Perspective shift</span>
                    <span>03 / 03</span>
                  </div>
                  <div className="side-intro">
                    <span className="side-orb">
                      <Orbit size={24} />
                    </span>
                    <p>
                      For a moment,<br />
                      <em>see it from their side.</em>
                    </p>
                  </div>

                  <div className="context-grid">
                    <div className="context-image" style={{ backgroundImage: `url(${situation.image})` }}>
                      <span>{situation.person}&apos;s world</span>
                    </div>
                    <div className="context-copy">
                      <span className="eyebrow">Their Context</span>
                      <h2 className="context-thematic-title">{situation.whyTitle}</h2>
                      <p>{situation.context}</p>
                      <div className="context-question">
                        <span>Knowing this,</span>
                        <strong>would you still choose the same?</strong>
                      </div>
                      {/* FIX 4 & 7: Real interactive controls */}
                      <div className="reflect-choice-row">
                        <button
                          className="reflect-choice-btn"
                          onClick={() => {
                            setReflection("Yes");
                            setStage("reflect");
                          }}
                        >
                          Yes
                        </button>
                        <button
                          className="reflect-choice-btn"
                          onClick={() => {
                            setReflection("No");
                            setStage("reflect");
                          }}
                        >
                          No
                        </button>
                        <button
                          className="reflect-choice-btn"
                          onClick={() => {
                            setReflection("I'm not sure");
                            setStage("reflect");
                          }}
                        >
                          I&apos;m not sure
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {stage === "reflect" && (
                <div className="reflection-result">
                  <span className="result-symbol">
                    {reflection === "Yes" ? "↺" : reflection === "No" ? "↗" : "~"}
                  </span>
                  <span className="eyebrow">Your reflection</span>
                  <h2>
                    {reflection === "Yes"
                      ? "Your choice stayed the same."
                      : reflection === "No"
                      ? "Context changed your perspective."
                      : "Some choices need more room."}
                  </h2>
                  <p>
                    {reflection === "Yes"
                      ? "Understanding their world didn't make your path less true. It made the distance between you more interesting."
                      : reflection === "No"
                      ? "That little pause is the point of MIRROR. A different life can make a different answer feel possible."
                      : "Not every crossroads resolves itself on first looking. You can carry the question with you."}
                  </p>

                  {/* MIRROR-SPECIFIC ECHO SYSTEM */}
                  <div className="echo-system-wrap" style={{ marginTop: "4vh" }}>
                    {!submittedEcho ? (
                      <div className="echo-form-card">
                        <div className="echo-form-header">
                          <span className="eyebrow" style={{ color: "#4354bb" }}>YOUR ECHO</span>
                          <span className="echo-context-tag">
                            Reflection: {reflection} · Path: {choice}
                          </span>
                        </div>
                        <h3 className="echo-form-title">What stayed with you?</h3>
                        <p className="echo-form-sub">
                          Leave your short reflection after seeing their side. An Echo is a piece of perspective left in the room, not a comment.
                        </p>
                        <textarea
                          className="echo-textarea"
                          rows={3}
                          value={echoText}
                          onChange={(e) => setEchoText(e.target.value)}
                          placeholder={
                            reflection === "No"
                              ? "What changed your mind?"
                              : reflection === "I'm not sure"
                              ? "What's still pulling you in the other direction?"
                              : "What reinforced your decision after understanding their side?"
                          }
                          aria-label="Your echo reflection"
                        />
                        <div className="echo-btn-row">
                          <span style={{ fontSize: 11, color: "#8a867e", letterSpacing: ".04em" }}>
                            Associated with path: <strong>{choice}</strong>
                          </span>
                          <button
                            type="button"
                            className="echo-submit-btn"
                            disabled={!echoText.trim()}
                            onClick={handleLeaveEcho}
                            aria-label="Leave your echo"
                          >
                            <span>LEAVE YOUR ECHO</span>
                            <span className="echo-submit-btn-icon">
                              <ArrowUpRight size={16} strokeWidth={2.2} />
                            </span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        className="echo-success-banner"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="echo-success-title">
                          <span className="echo-success-dot" />
                          YOUR ECHO IS IN THE ROOM.
                        </div>
                        <div className="echo-card-meta">
                          <span
                            className={`echo-pill echo-pill-${
                              submittedEcho.reflection === "Yes"
                                ? "yes"
                                : submittedEcho.reflection === "No"
                                ? "no"
                                : "unsure"
                            }`}
                          >
                            REFLECTION: {submittedEcho.reflection.toUpperCase()}
                          </span>
                          <span className="echo-path-badge">
                            PATH: {submittedEcho.path}
                          </span>
                        </div>
                        <blockquote className="echo-card-quote">“{submittedEcho.text}”</blockquote>
                        <span className="echo-card-author">— Your contributed perspective</span>
                      </motion.div>
                    )}

                    {/* OTHER ECHOES ORGANIZED BY PERSPECTIVE */}
                    <div className="echoes-perspective-stream">
                      <div className="echoes-stream-header">
                        <div>
                          <span className="eyebrow">PERSPECTIVES IN THE ROOM</span>
                          <h4 className="echoes-stream-title">OTHER ECHOES</h4>
                        </div>
                        <div className="echoes-filter-row">
                          <button
                            type="button"
                            className={`echoes-filter-btn ${echoFilter === "all" ? "active" : ""}`}
                            onClick={() => setEchoFilter("all")}
                          >
                            ALL PERSPECTIVES ({filterCount("all")})
                          </button>
                          <button
                            type="button"
                            className={`echoes-filter-btn ${echoFilter === "Yes" ? "active" : ""}`}
                            onClick={() => setEchoFilter("Yes")}
                          >
                            ECHOES WHO SAID YES ({filterCount("Yes")})
                          </button>
                          <button
                            type="button"
                            className={`echoes-filter-btn ${echoFilter === "No" ? "active" : ""}`}
                            onClick={() => setEchoFilter("No")}
                          >
                            ECHOES WHO SAID NO ({filterCount("No")})
                          </button>
                          <button
                            type="button"
                            className={`echoes-filter-btn ${echoFilter === "I'm not sure" ? "active" : ""}`}
                            onClick={() => setEchoFilter("I'm not sure")}
                          >
                            STILL UNSURE ({filterCount("I'm not sure")})
                          </button>
                        </div>
                      </div>

                      <div className="echoes-card-stack">
                        {displayedEchoes.length === 0 ? (
                          <div style={{ padding: "28px 0", color: "#8a867e", fontStyle: "italic", fontSize: 13 }}>
                            No echoes in this perspective yet. Be the first to leave one above.
                          </div>
                        ) : (
                          displayedEchoes.map((item) => (
                            <div key={item.id} className="echo-card-item">
                              <div className="echo-card-meta">
                                <span
                                  className={`echo-pill echo-pill-${
                                    item.reflection === "Yes"
                                      ? "yes"
                                      : item.reflection === "No"
                                      ? "no"
                                      : "unsure"
                                  }`}
                                >
                                  {item.reflection === "Yes"
                                    ? "STILL SAME CHOICE"
                                    : item.reflection === "No"
                                    ? "PERSPECTIVE SHIFTED"
                                    : "STILL UNSURE"}
                                </span>
                                <span className="echo-path-badge">
                                  PATH: {item.path}
                                </span>
                              </div>
                              <blockquote className="echo-card-quote">“{item.text}”</blockquote>
                              <span className="echo-card-author">
                                — {item.authorTag || `Someone who chose ${item.path}`}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="reflection-actions" style={{ marginTop: "6vh" }}>
                    <ArrowButton href="/explore">Explore another mirror</ArrowButton>
                    <Link
                      href="/"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: ".12em",
                        fontWeight: 800,
                        color: "#57544e",
                        padding: "10px 18px",
                        borderRadius: 99,
                        border: "1px solid rgba(28,28,27,0.15)",
                        background: "#fff",
                      }}
                    >
                      <ArrowLeft size={14} /> Back to Home
                    </Link>
                    <Link href="/profile" className="text-link">
                      See how you think <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {stage === "situation" && <div className="mirror-corner-note"><span>01</span> stay curious</div>}
      {stage !== "situation" && stage !== "reflect" && (
        <button
          className="mirror-back"
          onClick={() => setStage(stage === "context" ? "why" : stage === "why" ? "reveal" : "situation")}
        >
          <ArrowLeft size={15} /> back
        </button>
      )}
    </main>
  );
}

function ExplorePage() {
  const [allSituations] = useState(() => loadAllSituations());
  const [active, setActive] = useState(allSituations[0]?.id || "arjun");

  return (
    <main className="explore-page">
      <SiteNav />
      <section className="explore-hero">
        <div>
          <span className="eyebrow">A collection of crossroads</span>
          <h1>
            Perspectives<br />
            <em>waiting for</em><br />
            your decision.
          </h1>
        </div>
        <div className="explore-intro">
          <p>Step into a life that isn&apos;t yours. Make the call before you meet the person who made it.</p>
          <span className="explore-index">04 / {allSituations.length}</span>
        </div>
      </section>

      <section className="featured-mirror">
        <div className="featured-image" style={{ backgroundImage: `url(${allSituations[0].image})` }}>
          <div className="image-wash" />
          <div className="featured-label">
            <span>Featured mirror</span>
            <span>{allSituations[0].category}</span>
          </div>
          <div className="featured-quote">
            What do we owe<br />
            <em>the people who made us?</em>
          </div>
          <Link href={`/mirror/${allSituations[0].id}`} className="round-arrow" aria-label="Open featured mirror">
            <ArrowUpRight size={22} />
          </Link>
        </div>
        <div className="featured-caption">
          <span>01</span>
          <p>{allSituations[0].person} is standing between the life he imagined and the one that needs him now.</p>
          <Link href={`/mirror/${allSituations[0].id}`}>
            Enter this mirror <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <section className="explore-rail-section">
        <div className="rail-heading">
          <div>
            <span className="eyebrow">Keep looking</span>
            <h2>
              Situations you<br />
              <em>might not expect.</em>
            </h2>
          </div>
          <div className="rail-controls">
            <span>01 — {allSituations.length}</span>
            <button aria-label="Previous">
              <ArrowLeft size={17} />
            </button>
            <button aria-label="Next">
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>

        <div className="story-rail">
          {allSituations.map((item, index) => (
            <Link
              href={`/mirror/${item.id}`}
              className={`story-card ${active === item.id ? "story-active" : ""}`}
              key={item.id}
              onMouseEnter={() => setActive(item.id)}
            >
              <div className="story-photo" style={{ backgroundImage: `url(${item.image})` }}>
                <div className="story-number">0{index + 1}</div>
                {item.isUserCreated && <div className="story-badge">Your Created Mirror</div>}
                <div className="story-hover">
                  What would you do? <ArrowUpRight size={15} />
                </div>
              </div>
              <div className="story-info">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.person} · {item.city} · {item.options.length} paths</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="explore-categories">
        <span className="eyebrow">Find your edge</span>
        <div className="category-links">
          {[
            "Choices you’d never make",
            "People who think like you",
            "Unexpected perspectives",
            "Ethical crossroads",
            "Family & belonging",
            "Career & risk",
          ].map((item, i) => (
            <Link href="/mirror" key={item}>
              <span>0{i + 1}</span>
              {item}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

// FIX 7, 8, 10, 12, 13, 14, 15, 16: Upgraded 5-Step Create Flow with Multi-Option Builder & Post-Creation Preview
function CreatePage() {
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [prompt, setPrompt] = useState(
    "I was offered the opportunity to acquire our biggest rival at a steep discount, but it required secretly firing their entire founding team on day one."
  );
  const [category, setCategory] = useState("Ethics & Ambition");
  const [title, setTitle] = useState("The hostile acquisition offer");
  const [person, setPerson] = useState("Yash");
  const [city, setCity] = useState("Mumbai");

  // Step 3: 2 to 4 options
  const [options, setOptions] = useState<MirrorOption[]>([
    {
      id: "opt-1",
      label: "Take the deal and execute the cut",
      sub: "Consolidate the market and protect your own company's lead.",
      tone: "cobalt",
    },
    {
      id: "opt-2",
      label: "Walk away entirely",
      sub: "Refuse to build victory on deceptive terms.",
      tone: "peach",
    },
    {
      id: "opt-3",
      label: "Counter with an open partnership",
      sub: "Propose a transparent merger where founders keep their roles.",
      tone: "sage",
    },
  ]);

  // Step 4: WHICH PATH DID YOU CHOOSE? (NO free text!)
  const [selectedChoice, setSelectedChoice] = useState<string>("Walk away entirely");

  // Step 5: Creator's context & why
  const [whyTitle, setWhyTitle] = useState("Winning without wreckage");
  const [why, setWhy] = useState(
    "Winning by breaking an unwritten code of honor destroys the reason you wanted to build in the first place."
  );
  const [context, setContext] = useState(
    "Our board pushed hard for the deal, citing fiduciary duty to maximize market share. But the rival founders had mentored me early in my journey. The long-term reputational cost of betrayal far exceeded any short-term market consolidation."
  );
  const [tags, setTags] = useState("ETHICS, ACQUISITION, LEADERSHIP");

  // Created Situation Object
  const [createdSituation, setCreatedSituation] = useState<Situation | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Option Builder helpers
  const handleAddOption = () => {
    if (options.length >= 4) return;
    const nextIndex = options.length;
    const nextLetter = String.fromCharCode(65 + nextIndex);
    const tones: ("cobalt" | "peach" | "sage" | "sand")[] = ["cobalt", "peach", "sage", "sand"];
    const newOpt: MirrorOption = {
      id: `opt-${Date.now()}`,
      label: `Option ${nextLetter}`,
      sub: "Describe this alternative path...",
      tone: tones[nextIndex % tones.length],
    };
    const updated = [...options, newOpt];
    setOptions(updated);
    if (!selectedChoice) {
      setSelectedChoice(newOpt.label);
    }
  };

  const handleRemoveOption = (indexToRemove: number) => {
    if (options.length <= 2) return;
    const removed = options[indexToRemove];
    const updated = options.filter((_, idx) => idx !== indexToRemove);
    setOptions(updated);
    if (selectedChoice === removed.label) {
      setSelectedChoice(updated[0]?.label || "");
    }
  };

  const handleUpdateOption = (index: number, field: keyof MirrorOption, value: string) => {
    const updated = [...options];
    const prevLabel = updated[index].label;
    updated[index] = { ...updated[index], [field]: value };
    setOptions(updated);
    if (field === "label" && selectedChoice === prevLabel) {
      setSelectedChoice(value);
    }
  };

  const handleFinishCreate = () => {
    const newSituation: Situation = {
      id: `mirror-${Date.now().toString(36)}`,
      category: category.trim() || "Perspective",
      person: person.trim() || "Anonymous",
      age: "28",
      city: city.trim() || "Global",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=85",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=85",
      title: title.trim() || "A decisive crossroads",
      short: "A crossroads that changed how they think.",
      prompt: prompt.trim(),
      options,
      original: selectedChoice || options[0]?.label,
      whyTitle: whyTitle.trim() || "The principle behind the choice",
      why: why.trim(),
      context: context.trim(),
      tags: tags
        .split(",")
        .map((t) => t.trim().toUpperCase())
        .filter(Boolean),
      isUserCreated: true,
    };

    saveCustomSituation(newSituation);
    setCreatedSituation(newSituation);
    setShowPreview(true);
  };

  // FIX 10 & 15: Post-Creation Mirror Preview Screen
  if (showPreview && createdSituation) {
    return (
      <main className="preview-page">
        <SiteNav />
        <div className="preview-shell">
          <div className="preview-header-bar">
            <div>
              <span className="eyebrow">Published to Local Experience</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
                <span className="preview-badge">
                  <span className="preview-pulse" /> Live in Demo
                </span>
                <span style={{ fontSize: 11, color: "#74716a", fontWeight: 700 }}>
                  ID: {createdSituation.id}
                </span>
              </div>
            </div>
            <Link href="/explore" className="text-link">
              Explore all mirrors <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="preview-card">
            <div className="preview-title-block">
              <span className="eyebrow">{createdSituation.category} · {createdSituation.person} ({createdSituation.city})</span>
              <h1>YOUR MIRROR</h1>
              <p>Ready to be seen from another perspective.</p>
            </div>

            <div className="preview-situation-box">
              <span>The Situation</span>
              <p>“{createdSituation.prompt}”</p>
            </div>

            <span className="preview-section-title">Your Defined Paths ({createdSituation.options.length})</span>
            <div className="preview-paths-grid">
              {createdSituation.options.map((opt, idx) => {
                const isCreatorChoice = opt.label === createdSituation.original;
                return (
                  <div
                    key={opt.id}
                    className={`preview-path-card ${isCreatorChoice ? "creator-choice" : ""}`}
                  >
                    {isCreatorChoice && (
                      <span className="preview-choice-tag">Your Choice</span>
                    )}
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#4354bb" }}>
                      OPTION {String.fromCharCode(65 + idx)}
                    </span>
                    <strong>{opt.label}</strong>
                    <span>{opt.sub}</span>
                  </div>
                );
              })}
            </div>

            <div className="preview-context-box">
              <span className="eyebrow">The Context & Reasoning</span>
              <h3>“{createdSituation.whyTitle}”</h3>
              <p style={{ fontStyle: "italic", marginBottom: 12, color: "#3a3832" }}>
                “{createdSituation.why}”
              </p>
              <p>{createdSituation.context}</p>
            </div>

            {/* FIX 10 & 16: View as participant, Edit, Share */}
            <div className="preview-actions-bar">
              <Link
                href={`/mirror/${createdSituation.id}`}
                className="preview-action-primary"
                aria-label="View as participant"
              >
                <span>View as Participant</span>
                <span className="preview-action-primary-icon">
                  <ArrowUpRight size={18} strokeWidth={2.2} />
                </span>
              </Link>

              <div className="preview-sub-actions">
                <button
                  type="button"
                  className="preview-action-btn"
                  onClick={() => setShowPreview(false)}
                >
                  <RotateCcw size={14} /> Edit
                </button>
                <button
                  type="button"
                  className="preview-action-btn"
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/mirror/${createdSituation.id}`;
                    navigator.clipboard.writeText(shareUrl).then(
                      () => showToast("Mirror link copied to clipboard!"),
                      () => showToast(`Link: /mirror/${createdSituation.id}`)
                    );
                  }}
                >
                  <Share2 size={14} /> Share
                </button>
                <button
                  type="button"
                  className="preview-action-btn"
                  onClick={() => {
                    setShowPreview(false);
                    setStep(0);
                  }}
                >
                  <Plus size={14} /> Create Another
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toast feedback */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className="toast-floating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Check size={16} color="#7dd3fc" strokeWidth={2.5} />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
  }

  const stepHeaders = [
    { number: "01", label: "What happened?", sub: "Start with the moment everything became a question." },
    { number: "02", label: "What made this a crossroads?", sub: "Define the stakes and the category of this dilemma." },
    { number: "03", label: "What were your possible paths?", sub: "Define 2 to 4 distinct choices people can evaluate." },
    { number: "04", label: "Which path did you choose?", sub: "Select the option you actually took. No free text." },
    { number: "05", label: "Why did you choose this?", sub: "Share the deeper context and the principle behind your call." },
  ];

  const currentStepInfo = stepHeaders[step];

  return (
    <main className="create-page">
      <SiteNav />
      <section className="create-layout">
        <div className="create-intro">
          <span className="eyebrow">A place for the questions that stay</span>
          <h1>
            Create<br />
            <em>a mirror.</em>
          </h1>
          <p>Share a crossroads that changed how you think.</p>
          <div className="create-progress">
            <span style={{ width: `${((step + 1) / stepHeaders.length) * 100}%` }} />
          </div>
          <div className="create-progress-label">
            <span>0{step + 1} / 0{stepHeaders.length}</span>
            <span>Step by step</span>
          </div>
        </div>

        <div className="create-form-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="create-step"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
            >
              <span className="step-number">{currentStepInfo.number}</span>
              <h2>{currentStepInfo.label}</h2>
              <p style={{ fontSize: 13, color: "#6a6676", marginTop: -16, marginBottom: 24 }}>
                {currentStepInfo.sub}
              </p>

              {/* STEP 01: The situation narrative */}
              {step === 0 && (
                <div>
                  <textarea
                    autoFocus
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the situation without revealing how you chose..."
                    aria-label="What happened"
                  />
                  <div className="create-tip">
                    <Feather size={16} />
                    <span>There&apos;s no right or wrong answer. Focus on the tension at the moment of decision.</span>
                  </div>
                </div>
              )}

              {/* STEP 02: Crossroads & Context metadata */}
              {step === 1 && (
                <div className="create-input-row">
                  <div className="create-field-group">
                    <label className="create-field-label">Category</label>
                    <input
                      type="text"
                      className="create-text-input"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Family / Career, Ethics & Ambition"
                    />
                  </div>
                  <div className="create-field-group">
                    <label className="create-field-label">Situation Headline</label>
                    <input
                      type="text"
                      className="create-text-input"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. The offer that asks you to leave home"
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div className="create-field-group">
                      <label className="create-field-label">Your Name</label>
                      <input
                        type="text"
                        className="create-text-input"
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                        placeholder="e.g. Yash"
                      />
                    </div>
                    <div className="create-field-group">
                      <label className="create-field-label">City</label>
                      <input
                        type="text"
                        className="create-text-input"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Mumbai"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 03: Distinct Multi-Option Builder (2 to 4 options) */}
              {step === 2 && (
                <div>
                  <div className="options-builder-container">
                    {options.map((opt, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      return (
                        <div key={opt.id} className="create-option-card">
                          <div className="option-card-header">
                            <span className="option-card-letter">PATH {letter}</span>
                            {options.length > 2 && (
                              <button
                                type="button"
                                className="option-remove-btn"
                                onClick={() => handleRemoveOption(idx)}
                                title="Remove path"
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            className="option-title-input"
                            value={opt.label}
                            onChange={(e) => handleUpdateOption(idx, "label", e.target.value)}
                            placeholder="e.g. Take the job"
                          />
                          <input
                            type="text"
                            className="option-sub-input"
                            value={opt.sub}
                            onChange={(e) => handleUpdateOption(idx, "sub", e.target.value)}
                            placeholder="Nuance / description of this choice..."
                          />
                          <div className="option-tone-select">
                            <span className="option-tone-label">Tone:</span>
                            {(["cobalt", "peach", "sage", "sand"] as const).map((t) => (
                              <span
                                key={t}
                                className={`tone-dot ${t} ${opt.tone === t ? "active" : ""}`}
                                onClick={() => handleUpdateOption(idx, "tone", t)}
                                title={t}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {options.length < 4 && (
                    <button
                      type="button"
                      className="add-option-btn"
                      onClick={handleAddOption}
                    >
                      <Plus size={15} /> Add another path ({options.length}/4)
                    </button>
                  )}
                </div>
              )}

              {/* STEP 04: WHICH PATH DID YOU CHOOSE? (NO FREE TEXT!) */}
              {step === 3 && (
                <div>
                  <div className="step4-picker-list">
                    {options.map((opt, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      const isSelected = selectedChoice === opt.label;
                      return (
                        <div
                          key={opt.id}
                          className={`step4-option-item ${isSelected ? "selected" : ""}`}
                          onClick={() => setSelectedChoice(opt.label)}
                        >
                          <div className="step4-item-info">
                            <div className="step4-item-label">
                              <span className="step4-item-badge">{letter}</span>
                              <span>{opt.label}</span>
                            </div>
                            <span className="step4-item-sub">{opt.sub}</span>
                          </div>
                          <div className="step4-radio-circle">
                            {isSelected && <Check size={13} strokeWidth={3} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="create-tip">
                    <LockKeyhole size={15} />
                    <span>
                      Your choice remains hidden from participants until after they lock their own decision.
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 05: Reasoning & Extended Context */}
              {step === 4 && (
                <div className="create-input-row">
                  <div className="create-field-group">
                    <label className="create-field-label">Thematic Title / Thesis</label>
                    <input
                      type="text"
                      className="create-text-input"
                      value={whyTitle}
                      onChange={(e) => setWhyTitle(e.target.value)}
                      placeholder="e.g. The weight of proximity"
                    />
                  </div>
                  <div className="create-field-group">
                    <label className="create-field-label">The Reason Underneath (Quote)</label>
                    <textarea
                      rows={2}
                      className="create-text-input"
                      style={{ resize: "vertical", minHeight: 70 }}
                      value={why}
                      onChange={(e) => setWhy(e.target.value)}
                      placeholder="e.g. I knew the opportunity might never come again. But my mother needed someone close..."
                    />
                  </div>
                  <div className="create-field-group">
                    <label className="create-field-label">Extended Story Context</label>
                    <textarea
                      rows={3}
                      className="create-text-input"
                      style={{ resize: "vertical", minHeight: 90 }}
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="The background information that changes how someone understands your situation..."
                    />
                  </div>
                  <div className="create-field-group">
                    <label className="create-field-label">Tags (comma separated)</label>
                    <input
                      type="text"
                      className="create-text-input"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="ETHICS, LEADERSHIP, RISK"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="create-nav">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft size={15} /> Back
                </button>

                {step < stepHeaders.length - 1 ? (
                  <button
                    type="button"
                    className="next-step"
                    onClick={() => {
                      if (step === 2 && !selectedChoice && options.length > 0) {
                        setSelectedChoice(options[0].label);
                      }
                      setStep(step + 1);
                    }}
                  >
                    <span>Continue</span>
                    <ArrowUpRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="next-step"
                    onClick={handleFinishCreate}
                  >
                    <span>Create mirror & Preview</span>
                    <Sparkles size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

function ProfilePage() {
  const [selectedNode, setSelectedNode] = useState(2);
  const nodes = [
    { x: 13, y: 62, label: "Trust", state: "matched", mirror: "mira" },
    { x: 31, y: 27, label: "Risk", state: "different", mirror: "arjun" },
    { x: 51, y: 55, label: "Family", state: "shifted", mirror: "arjun" },
    { x: 70, y: 22, label: "Credit", state: "matched", mirror: "noah" },
    { x: 82, y: 67, label: "Belonging", state: "different", mirror: "mira" },
    { x: 61, y: 86, label: "Courage", state: "shifted", mirror: "noah" },
  ];

  return (
    <main className="profile-page">
      <SiteNav />
      <section className="profile-hero">
        <div className="profile-identity">
          <div className="profile-avatar">
            <span>Y</span>
            <div className="avatar-ring" />
          </div>
          <span className="eyebrow">A living record of your decisions</span>
          <h1>
            How<br />
            <em>you think.</em>
          </h1>
          <p>You tend to choose stability when uncertainty affects the people you care about.</p>
          <Link href="/create" className="profile-edit">
            Add a new mirror <Plus size={16} />
          </Link>
        </div>
        <div className="profile-stats">
          <div>
            <strong>47</strong>
            <span>situations explored</span>
          </div>
          <div>
            <strong>31</strong>
            <span>different perspectives</span>
          </div>
          <div>
            <strong>08</strong>
            <span>perspective shifts</span>
          </div>
          <div>
            <strong>19</strong>
            <span>shared decisions</span>
          </div>
        </div>
      </section>

      <section className="landscape-section">
        <div className="landscape-heading">
          <div>
            <span className="eyebrow">Your decision landscape</span>
            <h2>
              Every answer<br />
              <em>leaves a trace.</em>
            </h2>
          </div>
          <div className="landscape-legend">
            <span><i className="legend-dot matched" /> matched</span>
            <span><i className="legend-dot different" /> different</span>
            <span><i className="legend-dot shifted" /> shifted</span>
          </div>
        </div>
        <div className="landscape">
          <div className="landscape-grid" />
          {nodes.map((node, index) => (
            <Link
              href={`/mirror/${node.mirror}`}
              className={`landscape-node node-${node.state} ${selectedNode === index ? "node-selected" : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              key={node.label}
              onMouseEnter={() => setSelectedNode(index)}
              onFocus={() => setSelectedNode(index)}
            >
              <span className="node-core" />
              <span className="node-orbit" />
              <span className="node-label">{node.label}</span>
              {selectedNode === index && (
                <span className="node-tooltip">
                  <b>{node.label}</b>
                  <small>You chose differently from {index * 11 + 29}%.</small>
                </span>
              )}
            </Link>
          ))}
          <div className="landscape-center">
            <Orbit size={19} />
            <span>you</span>
          </div>
          <div className="landscape-note">
            hover a node<br />to see the trace
          </div>
        </div>
      </section>

      <section className="profile-footer">
        <span className="eyebrow">A note to keep</span>
        <blockquote>“Understanding someone else is not the same as agreeing with them.”</blockquote>
        <Link href="/explore" className="text-link">
          Keep exploring <ArrowUpRight size={15} />
        </Link>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main className="not-found">
      <Logo />
      <h1>That mirror isn&apos;t here.</h1>
      <Link href="/">
        Return to the beginning <ArrowUpRight size={16} />
      </Link>
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/mirror/:id">{(params) => <MirrorPage id={params.id} />}</Route>
      <Route path="/mirror" component={() => <MirrorPage />} />
      <Route path="/explore" component={ExplorePage} />
      <Route path="/create" component={CreatePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}
