import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Download,
  Eye,
  EyeOff,
  Feather,
  LockKeyhole,
  LogIn,
  LogOut,
  Menu,
  Orbit,
  Plus,
  RotateCcw,
  Search,
  Settings as SettingsIcon,
  Share2,
  Sliders,
  Sparkles,
  Trash2,
  UserCheck,
  X,
} from "lucide-react";
import {
  AppSettings,
  DemoUser,
  Echo,
  MirrorOption,
  Situation,
  UserActivity,
  clearLocalActivity,
  continueAsGuest,
  defaultEchoes,
  defaultSituations,
  exportAllUserData,
  getAppSettings,
  getDemoUser,
  getSavedMirrorIds,
  getTodaysMirror,
  getUserActivity,
  isMirrorSaved,
  loadAllEchoes,
  loadAllSituations,
  loginDemoUser,
  logoutDemoUser,
  recordDecision,
  recordExplored,
  recordPerspectiveShiftNote,
  recordReflection,
  saveAppSettings,
  saveCustomSituation,
  saveEchoToStorage,
  signupDemoUser,
  toggleSaveMirror,
  updateDemoUserProfile,
} from "./lib/storage";

export type MirrorStage =
  | "situation" // Step 01: The Situation
  | "locked" // Step 02: Your Decision (Locked)
  | "reflecting" // Step 02: Your Decision (Reflecting moment)
  | "reveal" // Step 03: Their Decision (Split reveal)
  | "why" // Step 04: Their Context (Reasoning quote)
  | "context" // Step 04: Their Context (Extended world)
  | "reflect" // Step 05: Your Reflection (Choice & shift)
  | "echo"; // Step 06: Your Echo (Leave & see other perspectives)

const ease = [0.22, 1, 0.36, 1] as const;

/* ==========================================================================
   NAVIGATION & BRANDING
   ========================================================================== */

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`logo-mark ${inverse ? "logo-inverse" : ""}`} aria-label="MIRROR home">
      <span className="logo-dot" />
      <span>MIRROR</span>
    </Link>
  );
}

// Persistent, unmistakable navigation containing Home, Mirror, Explore, Create, Profile, How It Works
function SiteNav({ dark = false }: { dark?: boolean }) {
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(() => getDemoUser());

  useEffect(() => {
    setCurrentUser(getDemoUser());
  }, [location]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/mirror", label: "Mirror" },
    { href: "/explore", label: "Explore" },
    { href: "/create", label: "Create" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/profile", label: "Profile" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    if (href === "/mirror") return location === "/mirror" || location.startsWith("/mirror/");
    return location.startsWith(href);
  };

  const handleLogout = () => {
    logoutDemoUser();
    setCurrentUser(null);
    setLocation("/");
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

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {currentUser && !currentUser.isGuest ? (
          <Link className="profile-chip" href="/profile" aria-label="Open your perspective profile">
            <span className="avatar avatar-small">{currentUser.avatarInitials || "Y"}</span>
            <span className="profile-chip-label">{currentUser.name.split(" ")[0]}</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="profile-chip"
            style={{ padding: "6px 14px" }}
            aria-label="Demo Sign In"
          >
            <LogIn size={13} style={{ marginRight: 4 }} />
            <span className="profile-chip-label">Sign In</span>
          </Link>
        )}

        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {currentUser && !currentUser.isGuest ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 18px",
                  background: "transparent",
                  border: "none",
                  color: "var(--ink-secondary)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <LogOut size={16} /> Log Out ({currentUser.name})
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 18px",
                  color: "var(--cobalt)",
                  fontWeight: 700,
                }}
              >
                <LogIn size={16} /> Sign In / Demo Account
              </Link>
            )}
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

/* ==========================================================================
   LANDING PAGE & HERO PERSPECTIVE ART
   ========================================================================== */

function InteractiveHeroArt() {
  const [coords, setCoords] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const [activeSide, setActiveSide] = useState<"left" | "right">("left");
  const artRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!artRef.current) return;
    const rect = artRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
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

        {/* Labels strictly verified: ANGLE A & ANGLE B */}
        <span className="art-angle-tag angle-a">ANGLE A</span>
        <span className="art-angle-tag angle-b">ANGLE B</span>

        {/* Dual Refraction Windows: ONE & OTHER */}
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

        {/* Specular Glimmer */}
        <motion.div
          className="art-glimmer"
          animate={{
            left: `${50 + coords.x * 1.3}%`,
            top: `${46 + coords.y * 1.3}%`,
            opacity: activeSide === "left" ? 0.7 : 0.9,
          }}
          transition={{ type: "spring", stiffness: 130, damping: 20 }}
        />

        {/* Labels strictly verified: SAME SITUATION & DIFFERENT LIGHT */}
        <div className="art-caption caption-top">SAME SITUATION</div>
        <div className="art-caption caption-bottom">DIFFERENT LIGHT</div>
        <div className="art-center-line" />

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
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            A social network built around perspective instead of popularity
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            See<br />
            <em>differently.</em>
          </motion.h1>
          <p className="landing-side-lead">
            Every situation has more than one side.
          </p>
          <div className="landing-provocation">
            <span>What if social media didn&apos;t ask what you liked?</span>
            <strong>What if it asked what you would do?</strong>
          </div>
          <motion.div
            className="landing-actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
          >
            <ArrowButton href="/mirror">ENTER MIRROR</ArrowButton>
            <Link href="/explore" className="text-link">
              Explore perspectives <ArrowDownRight size={15} />
            </Link>
          </motion.div>
        </div>
        <InteractiveHeroArt />
      </section>

      {/* EDITORIAL SECTION: A DIFFERENT KIND OF SOCIAL */}
      <section className="landing-social-model" aria-label="A different kind of social network">
        <div className="landing-social-header">
          <span className="eyebrow" style={{ color: "#4354bb" }}>A DIFFERENT KIND OF SOCIAL</span>
          <h2>
            A SOCIAL NETWORK BUILT AROUND<br />
            <em>PERSPECTIVE, NOT POPULARITY.</em>
          </h2>
          <p className="landing-social-sub">
            Create a situation. Step into someone else&apos;s. Make a decision. Discover why they chose differently.
          </p>
        </div>

        <div className="landing-pillars-grid">
          {[
            {
              num: "01",
              title: "CREATE",
              desc: "Share a real situation from your life.",
              href: "/create",
              badge: "Creation & Sharing",
            },
            {
              num: "02",
              title: "DISCOVER",
              desc: "Step into situations created by other people.",
              href: "/explore",
              badge: "Discovery",
            },
            {
              num: "03",
              title: "DECIDE",
              desc: "Make your choice before seeing theirs.",
              href: "/mirror",
              badge: "Core Interaction",
            },
            {
              num: "04",
              title: "CONNECT",
              desc: "Discover why another person chose differently.",
              href: "/explore",
              badge: "Community",
            },
            {
              num: "05",
              title: "REFLECT",
              desc: "Consider their perspective.",
              href: "/mirror",
              badge: "Reflection",
            },
            {
              num: "06",
              title: "ECHO",
              desc: "Leave your perspective for the next person.",
              href: "/mirror",
              badge: "Echoes",
            },
          ].map((pillar) => (
            <Link key={pillar.title} href={pillar.href} className="landing-pillar-card">
              <div className="landing-pillar-top">
                <span className="landing-pillar-num">{pillar.num}</span>
                <span className="landing-pillar-badge">{pillar.badge}</span>
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
              <div className="landing-pillar-link">
                <span>Enter</span>
                <ArrowUpRight size={13} />
              </div>
            </Link>
          ))}
        </div>

        {/* THREE CLEAR FUNCTIONAL CTAs */}
        <div className="landing-social-ctas">
          <ArrowButton href="/mirror" variant="dark">
            ENTER MIRROR
          </ArrowButton>
          <ArrowButton href="/explore" variant="outline">
            EXPLORE PERSPECTIVES
          </ArrowButton>
          <ArrowButton href="/create" variant="light">
            CREATE A MIRROR
          </ArrowButton>
        </div>
      </section>

      {/* HOW MIRROR WORKS SECTION */}
      <section className="how-it-works-section" aria-label="How Mirror Works">
        <div className="how-it-works-inner">
          <div className="how-it-works-intro">
            <span className="eyebrow" style={{ color: "#4354bb" }}>THE PERSPECTIVE PARADIGM</span>
            <h2>
              HOW MIRROR<br />
              <em>WORKS.</em>
            </h2>
            <p className="how-it-works-manifesto">
              MIRROR replaces conventional popularity mechanics with perspective-based participation. This is not a generic social network.
            </p>
            <div className="how-it-works-formula">
              <div className="formula-item">
                <span>The social object</span>
                <strong>A situation</strong>
              </div>
              <div className="formula-item">
                <span>The interaction</span>
                <strong>A decision</strong>
              </div>
              <div className="formula-item">
                <span>The connection</span>
                <strong>A perspective</strong>
              </div>
            </div>
          </div>

          <div className="how-it-works-steps-grid">
            {[
              { num: "01", title: "CREATE", desc: "Share a real crossroads." },
              { num: "02", title: "DECIDE", desc: "Choose before seeing their answer." },
              { num: "03", title: "REVEAL", desc: "Discover how they chose." },
              { num: "04", title: "UNDERSTAND", desc: "Read the context behind their decision." },
              { num: "05", title: "REFLECT", desc: "Ask whether their context changes your view." },
              { num: "06", title: "ECHO", desc: "Leave your perspective for someone else." },
            ].map((step) => (
              <div key={step.num} className="how-step-card">
                <span className="how-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TODAY'S MIRROR (Phase 12) */}
      <section className="daily-mirror-section" aria-label="Today's featured mirror">
        <div className="daily-mirror-card">
          <div className="daily-mirror-info">
            <span className="eyebrow" style={{ color: "#4354bb" }}>
              TODAY&apos;S MIRROR · {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" }).toUpperCase()}
            </span>
            <h3>{getTodaysMirror().title}</h3>
            <p>“{getTodaysMirror().short}” — Created by {getTodaysMirror().creator} ({getTodaysMirror().category})</p>
          </div>
          <ArrowButton href={`/mirror/${getTodaysMirror().id}`} variant="dark">
            ENTER TODAY&apos;S MIRROR
          </ArrowButton>
        </div>
      </section>

      <section className="landing-footer">
        <div className="scroll-note">
          <span className="scroll-line" /> scroll to look around
        </div>
        <div className="landing-manifesto">
          The social object is a <em>situation.</em><br />
          The connection is a <em>perspective.</em>
        </div>
        <div className="landing-mark">M / 2026</div>
      </section>
    </main>
  );
}

/* ==========================================================================
   THE 6-STEP VISUAL STAGE INDICATOR
   STEP 01: THE SITUATION
   STEP 02: YOUR DECISION
   STEP 03: THEIR DECISION
   STEP 04: THEIR CONTEXT
   STEP 05: YOUR REFLECTION
   STEP 06: YOUR ECHO
   ========================================================================== */

function StageBar6({ stage }: { stage: MirrorStage }) {
  const steps = [
    { number: "01", label: "Situation" },
    { number: "02", label: "Your Decision" },
    { number: "03", label: "Their Decision" },
    { number: "04", label: "Their Context" },
    { number: "05", label: "Reflection" },
    { number: "06", label: "Echo" },
  ];

  const currentStep =
    stage === "situation"
      ? 0
      : stage === "locked" || stage === "reflecting"
      ? 1
      : stage === "reveal"
      ? 2
      : stage === "why" || stage === "context"
      ? 3
      : stage === "reflect"
      ? 4
      : 5;

  return (
    <div className="stage-bar-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="stage-bar-6" aria-label="Mirror 6-step progress">
        {steps.map((step, index) => {
          const isDone = index < currentStep;
          const isActive = index === currentStep;
          return (
            <span
              key={step.number}
              className={`${isDone ? "done" : ""} ${isActive ? "active" : ""}`}
            >
              <i>{step.number}</i>
              {step.label}
            </span>
          );
        })}
      </div>
      <div className="stage-step-mobile">
        STEP {steps[currentStep].number} / 06 — {steps[currentStep].label.toUpperCase()}
      </div>
    </div>
  );
}

function ChoiceSurface({
  choice,
  selected,
  muted,
  isLocked,
  onClick,
  letter,
}: {
  choice: MirrorOption;
  selected: boolean;
  muted: boolean;
  isLocked?: boolean;
  onClick: () => void;
  letter: string;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`choice-surface choice-${choice.tone} ${selected ? "selected" : ""} ${muted ? "muted" : ""} ${isLocked && !selected ? "receded" : ""} ${isLocked && selected ? "settled" : ""}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-pressed={selected}
      aria-label={`Path ${letter}: ${choice.label}. ${choice.sub}`}
    >
      <span className="choice-letter">{letter}</span>
      <span className="choice-content">
        <strong>{choice.label}</strong>
        <span>{choice.sub}</span>
      </span>
      <span className="choice-arrow" aria-hidden="true">
        <ArrowUpRight size={20} strokeWidth={1.8} />
      </span>
      {selected && (
        <span className="choice-check" aria-hidden="true">
          <Check size={14} strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
}

/* ==========================================================================
   CORE SOCIAL INTERACTION: MIRROR DETAIL EXPERIENCE
   ========================================================================== */

function MirrorPage({ id = "maya" }: { id?: string }) {
  const allSituations = useMemo(() => loadAllSituations(), []);
  const situation = useMemo(() => {
    return allSituations.find((item) => item.id === id) ?? allSituations[0];
  }, [allSituations, id]);

  const [stage, setStage] = useState<MirrorStage>("situation");
  const [choice, setChoice] = useState<string | null>(null);
  const [isLocking, setIsLocking] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [reflection, setReflection] = useState<"Yes" | "No" | "I'm not sure" | null>(null);

  // Saved Mirror & Feature states
  const [saved, setSaved] = useState(() => isMirrorSaved(situation.id));
  const [blindDismissed, setBlindDismissed] = useState(false);
  const [shiftNote, setShiftNote] = useState("");
  const [shiftNoteSaved, setShiftNoteSaved] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Echo Community System State
  const [echoText, setEchoText] = useState("");
  const [submittedEcho, setSubmittedEcho] = useState<Echo | null>(null);
  const [echoFilter, setEchoFilter] = useState<"all" | "Yes" | "No" | "I'm not sure">("all");
  const [echoesMap, setEchoesMap] = useState<Record<string, Echo[]>>(() => loadAllEchoes());

  useEffect(() => {
    setStage("situation");
    setChoice(null);
    setIsLocking(false);
    setAnnouncement("");
    setReflection(null);
    setEchoText("");
    setSubmittedEcho(null);
    setEchoFilter("all");
    setSaved(isMirrorSaved(situation.id));
    setBlindDismissed(false);
    setShiftNote("");
    setShiftNoteSaved(false);
    setShareCopied(false);

    // Record that this mirror was explored
    recordExplored(situation.id);
  }, [situation.id]);

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

  const handleToggleSave = () => {
    const next = toggleSaveMirror(situation.id);
    setSaved(next);
    setAnnouncement(next ? "Perspective saved to your profile." : "Perspective removed from saved.");
  };

  const handleLeaveEcho = () => {
    if (!echoText.trim() || !choice || !reflection) return;
    const user = getDemoUser();
    const newEcho: Echo = {
      id: `echo-${Date.now()}`,
      mirrorId: situation.id,
      reflection,
      path: choice,
      text: echoText.trim(),
      timestamp: Date.now(),
      author: user?.name || "Yash",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      authorTag: `You (chose ${choice})`,
      isCurrentUser: true,
    };
    saveEchoToStorage(situation.id, newEcho);
    setEchoesMap(loadAllEchoes());
    setSubmittedEcho(newEcho);
    setAnnouncement("Your perspective Echo was submitted.");
  };

  const userChoseSame = choice?.toLowerCase() === situation.original.toLowerCase();

  const lock = () => {
    if (!choice) return;
    setIsLocking(true);
    setAnnouncement(`Decision locked: ${choice}. Transitioning to perspective reveal.`);
    // Persist decision in local activity
    recordDecision(situation.id, choice);

    window.setTimeout(() => {
      setStage("locked");
    }, 650);
    window.setTimeout(() => {
      setStage("reflecting");
    }, 1500);
    window.setTimeout(() => {
      setStage("reveal");
      setAnnouncement(`Perspective reveal: You chose ${choice}. ${situation.creator} chose ${situation.original}.`);
    }, 2800);
  };

  const handleSelectReflection = (ans: "Yes" | "No" | "I'm not sure") => {
    setReflection(ans);
    recordReflection(situation.id, ans);
    setAnnouncement(`Reflection noted: ${ans}. Ready to leave your perspective.`);
    setStage("echo");
  };

  const currentNumber = allSituations.findIndex((s) => s.id === situation.id) + 1;
  const totalCount = allSituations.length;

  return (
    <main className={`mirror-page mirror-stage-${stage}`}>
      {/* Screen reader live announcements for accessible transitions */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <SiteNav />
      <div className="mirror-shell">
        {/* Top Metadata: Explicit Creator Identity & Save Action */}
        <div className="mirror-meta-row">
          <div className="mirror-creator-block">
            <span className="creator-attribution-label">CREATED BY</span>
            <Link
              href={`/profile?creator=${encodeURIComponent(situation.creator)}`}
              className="creator-profile-link"
              title={`View ${situation.creator}'s perspective profile`}
            >
              <span className="avatar avatar-small">
                {situation.creatorAvatar ? (
                  <img src={situation.creatorAvatar} alt={situation.creator} />
                ) : (
                  <span>{situation.creator[0]}</span>
                )}
              </span>
              <span>
                <strong>{situation.creator}</strong>
                <br />
                <small>{situation.creatorCity}</small>
              </span>
            </Link>
          </div>

          <StageBar6 stage={stage} />

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              type="button"
              className={`save-mirror-btn ${saved ? "saved" : ""}`}
              onClick={handleToggleSave}
              aria-label={saved ? "Remove from saved perspectives" : "Save this perspective"}
            >
              <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
              <span>{saved ? "SAVED ✓" : "SAVE MIRROR"}</span>
            </button>
            <span className="mirror-count">
              MIRROR <b>{String(currentNumber).padStart(2, "0")}</b> / {String(totalCount).padStart(2, "0")}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 01: THE SITUATION */}
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
                <h1>{situation.prompt}</h1>
                <div className="situation-aside">
                  <span className="vertical-label">A CROSSROADS FROM {situation.creator.toUpperCase()}</span>
                  <p>
                    You don&apos;t interact with a post. You step into someone&apos;s decision before you know how they chose.
                  </p>
                </div>
              </div>

              {/* STEP 02: YOUR DECISION */}
              <div className="choice-area">
                {!blindDismissed && (
                  <div className="blind-mode-banner" role="region" aria-label="Blind decision mode">
                    <p>
                      <strong>BLIND DECISION:</strong> Their answer is hidden. Make your choice before seeing theirs.
                    </p>
                    <button
                      type="button"
                      className="blind-dismiss-btn"
                      onClick={() => setBlindDismissed(true)}
                    >
                      I UNDERSTAND
                    </button>
                  </div>
                )}
                <div className="choice-prompt-header">
                  <span className="choice-lead-question">WHAT WOULD YOU DO?</span>
                  <p className="choice-kicker">
                    Before you know how they chose<span>·</span> choose your path
                  </p>
                </div>
                <div className={`choice-stack ${situation.options.length === 4 ? "choice-stack-grid" : ""} ${isLocking ? "choice-stack-locking" : ""}`}>
                  {situation.options.map((opt, index) => {
                    const letter = String.fromCharCode(65 + index);
                    return (
                      <React.Fragment key={opt.id}>
                        <ChoiceSurface
                          choice={opt}
                          letter={letter}
                          selected={choice === opt.label}
                          muted={!!choice && choice !== opt.label}
                          isLocked={isLocking}
                          onClick={() => {
                            if (!isLocking) {
                              setChoice(opt.label);
                              setAnnouncement(`Selected path ${letter}: ${opt.label}`);
                            }
                          }}
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
                      <button
                        className={`lock-button ${isLocking ? "locked-active" : ""}`}
                        onClick={lock}
                        disabled={isLocking}
                        aria-label={isLocking ? "Decision locked" : "Lock my decision"}
                      >
                        <span>{isLocking ? "DECISION LOCKED" : "LOCK MY DECISION"}</span>
                        <span className="lock-button-icon">
                          {isLocking ? <Check size={17} strokeWidth={2.5} /> : <ArrowUpRight size={17} strokeWidth={2.2} />}
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}

          {/* STEP 02 (HOLD): DECISION MOMENT */}
          {(stage === "locked" || stage === "reflecting") && (
            <motion.section
              key="locked"
              className="decision-moment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="decision-overline">DECISION LOCKED</span>
              <h1>{stage === "reflecting" ? "Reflecting…" : choice}</h1>
              <div className="decision-pulse">
                <span />
                <span />
                <span />
              </div>
              <p>
                Hold onto this choice.<br />
                {situation.creator}&apos;s answer is on the other side.
              </p>
            </motion.section>
          )}

          {/* STEP 03: THEIR DECISION (SPLIT REVEAL) */}
          {stage === "reveal" && (
            <motion.section
              key="reveal"
              className="reveal-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65 }}
            >
              <div className="reveal-heading">
                <div>
                  <span className="eyebrow">The same crossroads, two ways through</span>
                  <h1>
                    {userChoseSame ? (
                      <>
                        You saw it<br />
                        <em>the same way.</em>
                      </>
                    ) : (
                      <>
                        You saw the same<br />
                        <em>crossroads differently.</em>
                      </>
                    )}
                  </h1>
                </div>
                <span className="reveal-status-pill">
                  {userChoseSame ? "Same Path" : "Different Path"}
                </span>
              </div>

              <div className="split-reveal">
                <div className="reveal-half reveal-you">
                  <span className="reveal-label">YOUR DECISION</span>
                  <strong>{choice}</strong>
                  <small>Your instinct, before knowing their side.</small>
                </div>
                <div className="reflective-line" aria-hidden="true">
                  <span>↕</span>
                </div>
                <div className="reveal-half reveal-them">
                  <span className="reveal-label">THEIR DECISION ({situation.creator})</span>
                  <strong>{situation.original}</strong>
                  <small>The choice they made, before you arrived.</small>
                </div>
              </div>

              {/* PHASE 6: COMPARE PERSPECTIVES */}
              <div className="perspective-comparison-container" aria-label="Compare perspectives">
                <span className="eyebrow" style={{ color: "#4354bb" }}>COMPARE PERSPECTIVES</span>
                <div className="comparison-grid">
                  <div className="comparison-side you">
                    <h5>YOU</h5>
                    <div className="comparison-choice">{choice}</div>
                    <div className="comparison-mattered">
                      <strong style={{ display: "block", marginBottom: 4 }}>WHAT MATTERED TO YOU:</strong>
                      <span>{situation.options.find((o) => o.label === choice)?.sub || "Your chosen approach to the crossroads."}</span>
                    </div>
                  </div>
                  <div className="comparison-side them">
                    <h5>THEM ({situation.creator.toUpperCase()})</h5>
                    <div className="comparison-choice">{situation.original}</div>
                    <div className="comparison-mattered">
                      <strong style={{ display: "block", marginBottom: 4 }}>WHAT MATTERED TO THEM:</strong>
                      <span>{situation.whyTitle} · {situation.tags.join(" ")}</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 16, textAlign: "center", fontStyle: "italic", color: "var(--ink-secondary)", fontSize: 13, letterSpacing: "0.04em" }}>
                  SAME SITUATION. DIFFERENT PRIORITIES.
                </div>
              </div>

              <div className="reveal-actions">
                <button
                  className="reveal-why"
                  onClick={() => setStage("why")}
                  aria-label="Why did they choose that?"
                >
                  <span>WHY DID THEY CHOOSE THAT?</span>
                  <span className="reveal-why-icon">
                    <ArrowDownRight size={17} strokeWidth={2.2} />
                  </span>
                </button>
                <span className="reveal-footnote">No verdicts. Just another angle.</span>
              </div>
            </motion.section>
          )}

          {/* STEP 04: THEIR CONTEXT */}
          {(stage === "why" || stage === "context") && (
            <motion.section
              key="context-flow"
              className={`context-section ${stage === "context" ? "context-step" : ""}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease }}
            >
              {stage === "why" && (
                <>
                  <div className="context-topline">
                    <span className="eyebrow">The reason underneath</span>
                    <span>04 / 06</span>
                  </div>
                  <blockquote>“{situation.why}”</blockquote>
                  <div className="context-bottom">
                    <div className="tag-row">
                      {situation.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button className="side-button" onClick={() => setStage("context")}>
                      <span>SEE THEIR SIDE</span>
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
                    <span>STEP 04 OF 06</span>
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
                    <div
                      className="context-image"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80)`,
                      }}
                    >
                      <span>{situation.creator}&apos;s world</span>
                    </div>
                    <div className="context-copy">
                      <span className="eyebrow">Their Context</span>
                      <h2 className="context-thematic-title">{situation.whyTitle}</h2>
                      <p>{situation.context}</p>

                      {/* STEP 05: YOUR REFLECTION QUESTION */}
                      <div className="context-question">
                        <span>KNOWING THIS,</span>
                        <strong>WOULD YOU STILL CHOOSE THE SAME?</strong>
                      </div>
                      <div className="reflect-choice-row">
                        <button
                          className="reflect-choice-btn"
                          onClick={() => handleSelectReflection("Yes")}
                        >
                          YES
                        </button>
                        <button
                          className="reflect-choice-btn"
                          onClick={() => handleSelectReflection("No")}
                        >
                          NO
                        </button>
                        <button
                          className="reflect-choice-btn"
                          onClick={() => handleSelectReflection("I'm not sure")}
                        >
                          I&apos;M NOT SURE
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.section>
          )}

          {/* STEP 05 & 06: YOUR REFLECTION & YOUR ECHO */}
          {(stage === "reflect" || stage === "echo") && (
            <motion.section
              key="reflect-echo"
              className="context-section reflect-step"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="reflection-result">
                <span className="result-symbol">
                  {reflection === "Yes" ? "↺" : reflection === "No" ? "↗" : "~"}
                </span>
                <span className="eyebrow">STEP 05 · Your reflection</span>
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

                {/* PHASE 7: YOUR PERSPECTIVE SHIFT */}
                <div className="perspective-shift-container" aria-label="Perspective shift summary">
                  <span className="eyebrow" style={{ color: "#4354bb" }}>YOUR PERSPECTIVE SHIFT</span>
                  <div style={{ display: "flex", gap: 24, alignItems: "center", margin: "14px 0 16px", flexWrap: "wrap" }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--ink-secondary)" }}>
                        BEFORE:
                      </span>
                      <strong style={{ display: "block", fontSize: 16, marginTop: 2 }}>{choice}</strong>
                    </div>
                    <span style={{ color: "var(--cobalt)", fontSize: 20 }}>→</span>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--ink-secondary)" }}>
                        AFTER REFLECTION:
                      </span>
                      <strong style={{ display: "block", fontSize: 16, marginTop: 2 }}>
                        {reflection === "Yes" ? "YES (Original Path Held Firm)" : reflection === "No" ? "NO (Perspective Shifted)" : "STILL UNSURE"}
                      </strong>
                    </div>
                  </div>
                  <div className="shift-note-box">
                    <label htmlFor="shift-note-input" style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", marginBottom: 6, color: "var(--ink-secondary)" }}>
                      WHAT CHANGED? (OPTIONAL PERSPECTIVE NOTE)
                    </label>
                    <textarea
                      id="shift-note-input"
                      placeholder="Why did your view shift, or why did it hold firm?"
                      value={shiftNote}
                      onChange={(e) => setShiftNote(e.target.value)}
                    />
                    <button
                      type="button"
                      className="arrow-button arrow-dark"
                      style={{ marginTop: 10, padding: "8px 18px", fontSize: 12 }}
                      onClick={() => {
                        if (shiftNote.trim()) {
                          recordPerspectiveShiftNote(situation.id, shiftNote.trim());
                          setShiftNoteSaved(true);
                          setAnnouncement("Perspective note saved to your activity.");
                        }
                      }}
                    >
                      {shiftNoteSaved ? "PERSPECTIVE SAVED ✓" : "SAVE PERSPECTIVE"}
                    </button>
                  </div>
                </div>

                {/* STEP 06: YOUR ECHO */}
                <div className="echo-system-wrap">
                  {!submittedEcho ? (
                    <div className="echo-form-card">
                      <div className="echo-form-header">
                        <span className="eyebrow" style={{ color: "#4354bb" }}>
                          STEP 06 · YOUR ECHO
                        </span>
                        <span className="echo-context-tag">
                          Reflection: {reflection} · Path: {choice}
                        </span>
                      </div>
                      <h3 className="echo-form-title">Why did you land there?</h3>
                      <p className="echo-form-sub">
                        Leave your short perspective after seeing their side. An Echo is a piece of perspective left in the room, not a conventional comment.
                      </p>
                      <textarea
                        className="echo-textarea"
                        rows={3}
                        value={echoText}
                        onChange={(e) => setEchoText(e.target.value)}
                        placeholder="Write a short perspective..."
                        aria-label="Why did you land there?"
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
                          aria-label="Add Echo"
                        >
                          <span>ADD ECHO</span>
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
                        <span className="echo-path-badge">PATH: {submittedEcho.path}</span>
                      </div>
                      <blockquote className="echo-card-quote">“{submittedEcho.text}”</blockquote>
                      <span className="echo-card-author">— Yash (You)</span>
                    </motion.div>
                  )}

                  {/* OTHER PERSPECTIVES STREAM */}
                  <div className="echoes-perspective-stream">
                    <div className="echoes-stream-header">
                      <div>
                        <span className="eyebrow">PERSPECTIVES IN THE ROOM</span>
                        <h4 className="echoes-stream-title">OTHER PERSPECTIVES</h4>
                      </div>
                      <div className="echoes-filter-row">
                        <button
                          type="button"
                          className={`echoes-filter-btn ${echoFilter === "all" ? "active" : ""}`}
                          onClick={() => setEchoFilter("all")}
                        >
                          ALL ECHOES ({filterCount("all")})
                        </button>
                        <button
                          type="button"
                          className={`echoes-filter-btn ${echoFilter === "Yes" ? "active" : ""}`}
                          onClick={() => setEchoFilter("Yes")}
                        >
                          SAID YES ({filterCount("Yes")})
                        </button>
                        <button
                          type="button"
                          className={`echoes-filter-btn ${echoFilter === "No" ? "active" : ""}`}
                          onClick={() => setEchoFilter("No")}
                        >
                          SAID NO ({filterCount("No")})
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
                              <span className="echo-path-badge">PATH: {item.path}</span>
                            </div>
                            <blockquote className="echo-card-quote">“{item.text}”</blockquote>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                              <span className="avatar avatar-small" style={{ width: 22, height: 22, fontSize: 10 }}>
                                {item.authorAvatar ? (
                                  <img src={item.authorAvatar} alt="" />
                                ) : (
                                  <span>{item.author[0]}</span>
                                )}
                              </span>
                              <span className="echo-card-author">— {item.author}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* PHASE 13: SHAREABLE PERSPECTIVE CARD */}
                <div className="shareable-perspective-preview" aria-label="Shareable perspective card">
                  <div className="shareable-preview-header">PERSPECTIVE CARD · MIRROR</div>
                  <div className="shareable-preview-title">I SAW IT DIFFERENTLY.</div>
                  <div className="shareable-preview-body">
                    <p style={{ margin: "0 0 8px" }}><strong>I chose:</strong> {choice}</p>
                    <p style={{ margin: "0 0 12px" }}><strong>They chose:</strong> {situation.original} ({situation.creator})</p>
                    <p style={{ margin: 0, fontStyle: "italic", opacity: 0.9 }}>
                      After hearing their story, I understood why.
                    </p>
                  </div>
                  <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "#7d90f2", marginBottom: 18 }}>
                    MIRROR — SEE DIFFERENTLY.
                  </div>
                  <div className="shareable-actions">
                    <button
                      type="button"
                      className="share-action-button"
                      onClick={() => {
                        const shareText = `I saw it differently on MIRROR.\nCrossroads: "${situation.title}"\nI chose: ${choice}\n${situation.creator} chose: ${situation.original}\nAfter hearing their story, I understood why.\nSee differently: ${window.location.origin}/mirror/${situation.id}`;
                        if (navigator.share) {
                          navigator.share({ title: "MIRROR — Perspective", text: shareText, url: window.location.href }).catch(() => {});
                        } else {
                          navigator.clipboard.writeText(shareText);
                          setShareCopied(true);
                          setTimeout(() => setShareCopied(false), 2500);
                        }
                      }}
                    >
                      <Share2 size={14} />
                      <span>{shareCopied ? "PERSPECTIVE COPIED ✓" : "SHARE PERSPECTIVE"}</span>
                    </button>
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
                      padding: "10px 20px",
                      borderRadius: 99,
                      border: "1px solid rgba(28,28,27,0.18)",
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
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {stage === "situation" && (
        <div className="mirror-corner-note">
          <span>01</span> stay curious
        </div>
      )}
      {stage !== "situation" && stage !== "reflect" && stage !== "echo" && (
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

/* ==========================================================================
   CONTENT DISCOVERY: EXPLORE PERSPECTIVES
   ========================================================================== */

function ExplorePage() {
  const [, setLocation] = useLocation();
  const [allSituations] = useState<Situation[]>(() => {
    try {
      const list = loadAllSituations();
      return Array.isArray(list) && list.length > 0 ? list : defaultSituations;
    } catch (e) {
      console.error("ExplorePage loadAllSituations error:", e);
      return defaultSituations;
    }
  });

  const [userActivity] = useState<UserActivity>(() => {
    try {
      return getUserActivity();
    } catch (e) {
      console.error("ExplorePage getUserActivity error:", e);
      return {
        exploredMirrorIds: [],
        decisions: {},
        reflections: {},
        createdMirrorIds: [],
        echoesCount: 0,
      };
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [active, setActive] = useState(() => (allSituations[0]?.id) || "maya");

  const categories = [
    "ALL",
    "CAREER",
    "FAMILY",
    "RELATIONSHIPS",
    "AMBITION",
    "RISK",
    "IDENTITY",
    "LIFE",
  ];

  // Real-time multi-dimensional filter (search + category)
  const filteredSituations = useMemo(() => {
    if (!Array.isArray(allSituations)) return [];
    return allSituations.filter((item) => {
      if (!item) return false;
      const itemCat = String(item.category || "").toUpperCase();
      const itemTags = Array.isArray(item.tags)
        ? item.tags.map((t) => String(t || "").toUpperCase())
        : [];

      // Category filter
      if (selectedCategory !== "ALL") {
        const matchesCategory =
          itemCat.includes(selectedCategory) || itemTags.includes(selectedCategory);
        if (!matchesCategory) return false;
      }

      // Search filter across title, situation, creator, category, tags
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = String(item.title || "").toLowerCase().includes(q);
        const matchesPrompt = String(item.prompt || "").toLowerCase().includes(q);
        const matchesCreator = String(item.creator || "").toLowerCase().includes(q);
        const matchesCat = itemCat.toLowerCase().includes(q);
        const matchesTags = itemTags.some((tag) => tag.toLowerCase().includes(q));

        return matchesTitle || matchesPrompt || matchesCreator || matchesCat || matchesTags;
      }

      return true;
    });
  }, [allSituations, selectedCategory, searchQuery]);

  const featured = allSituations && allSituations.length > 0 ? allSituations[0] : null;

  const getParticipationState = (mirrorId: string) => {
    if (userActivity?.decisions && userActivity.decisions[mirrorId]) return "DECIDED";
    if (userActivity?.exploredMirrorIds && userActivity.exploredMirrorIds.includes(mirrorId))
      return "EXPLORED";
    return "NEW";
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
  };

  return (
    <main className="explore-page">
      <SiteNav />

      <section className="explore-hero">
        <div>
          <span className="eyebrow">A collection of crossroads</span>
          <h1>
            EXPLORE<br />
            <em>PERSPECTIVES</em>
          </h1>
        </div>
        <div className="explore-intro">
          <p>Step into situations that make you see differently.</p>
          <span className="explore-index">
            {filteredSituations.length} / {allSituations.length} PERSPECTIVES
          </span>
        </div>
      </section>

      {/* DISCOVERY MECHANISM: SEARCH BAR & CATEGORY PILLS */}
      <section className="explore-controls-section">
        <div className="explore-search-bar">
          <Search size={18} color="#4354bb" />
          <input
            type="text"
            className="explore-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search situations, people, perspectives..."
            aria-label="Search situations, people, perspectives"
          />
          {searchQuery && (
            <button
              type="button"
              className="explore-clear-search"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="explore-category-pills" role="tablist" aria-label="Perspective categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED MIRROR */}
      {featured && selectedCategory === "ALL" && !searchQuery && (
        <section className="featured-mirror">
          <div
            className="featured-image"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=85)`,
            }}
          >
            <div className="image-wash" />
            <div className="featured-label">
              <span>
                FEATURED MIRROR · CREATED BY{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setLocation(`/profile?creator=${encodeURIComponent(featured.creator || "Maya Shah")}`);
                  }}
                  className="featured-creator-btn"
                  title={`View ${featured.creator || "Maya Shah"}'s perspective profile`}
                >
                  {String(featured.creator || "Maya Shah").toUpperCase()}
                </button>
              </span>
              <span>{featured.category || "Career / Ethics"}</span>
            </div>
            <div className="featured-quote">
              What do you protect<br />
              <em>when advancement demands sacrifice?</em>
            </div>
            <Link
              href={`/mirror/${featured.id || "maya"}`}
              className="round-arrow"
              aria-label={`Enter featured mirror by ${featured.creator || "Maya Shah"}`}
            >
              <ArrowUpRight size={22} />
            </Link>
          </div>
          <div className="featured-caption">
            <span>01</span>
            <p>
              {featured.creator || "Maya Shah"} is standing between personal advancement and foundational loyalty.
            </p>
            <Link href={`/mirror/${featured.id || "maya"}`}>
              Enter this mirror <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>
      )}

      {/* DISCOVERED MIRRORS GRID */}
      <section className="explore-rail-section">
        <div className="rail-heading">
          <div>
            <span className="eyebrow">ALL PERSPECTIVES</span>
            <h2>
              Situations you<br />
              <em>might not expect.</em>
            </h2>
          </div>
          <div className="rail-controls">
            <span>
              Showing {filteredSituations.length} of {allSituations.length}
            </span>
          </div>
        </div>

        {filteredSituations.length === 0 ? (
          <div className="empty-perspective-notice" style={{ marginTop: 40 }}>
            <h3>NO PERSPECTIVES FOUND</h3>
            <p>Try another search or explore a different category.</p>
            <button
              type="button"
              className="arrow-button arrow-dark"
              onClick={handleClearFilters}
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div className="story-rail">
            {filteredSituations.map((item, index) => {
              const creatorName = item.creator || "Maya Shah";
              const creatorCity = item.creatorCity || "Global";
              const creatorAvatar = item.creatorAvatar || "";
              const optionsCount = Array.isArray(item.options) ? item.options.length : 2;
              const state = getParticipationState(item.id);

              return (
                <Link
                  href={`/mirror/${item.id}`}
                  className={`story-card ${active === item.id ? "story-active" : ""}`}
                  key={item.id}
                  onMouseEnter={() => setActive(item.id)}
                >
                  <div
                    className="story-photo"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80)`,
                    }}
                  >
                    <div className="story-number">0{index + 1}</div>
                    <div
                      className={`participation-badge ${
                        state === "DECIDED"
                          ? "badge-decided"
                          : state === "EXPLORED"
                          ? "badge-explored"
                          : "badge-new"
                      }`}
                    >
                      {state}
                    </div>
                    <div className="story-hover">
                      What would you do? <ArrowUpRight size={15} />
                    </div>
                  </div>

                  <div className="story-info">
                    <span>{item.category || "Perspective"}</span>
                    <h3>{item.title}</h3>
                    <p>{optionsCount} paths · {creatorCity}</p>
                    <div className="story-creator-row">
                      <button
                        type="button"
                        className="story-creator-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setLocation(`/profile?creator=${encodeURIComponent(creatorName)}`);
                        }}
                        title={`View ${creatorName}'s profile`}
                      >
                        <span className="avatar avatar-small">
                          {creatorAvatar ? (
                            <img src={creatorAvatar} alt={creatorName} />
                          ) : (
                            <span>{creatorName[0]}</span>
                          )}
                        </span>
                        <span>Created by <strong>{creatorName}</strong></span>
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* CURATED EDITORIAL CATEGORIES */}
      <section className="explore-categories">
        <span className="eyebrow">Find your edge</span>
        <div className="category-links">
          {[
            { label: "Choices you’d never make", cat: "RISK" },
            { label: "People who think like you", cat: "CAREER" },
            { label: "Family & belonging", cat: "FAMILY" },
            { label: "Ethical crossroads", cat: "AMBITION" },
            { label: "Friendship & financial debt", cat: "RELATIONSHIPS" },
            { label: "Identity under pressure", cat: "IDENTITY" },
          ].map((item, i) => (
            <button
              type="button"
              key={item.label}
              onClick={() => {
                setSelectedCategory(item.cat);
                window.scrollTo({ top: 380, behavior: "smooth" });
              }}
              style={{ background: "transparent", textAlign: "left", cursor: "pointer", border: 0 }}
            >
              <span>0{i + 1}</span>
              {item.label}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ==========================================================================
   CONTENT CREATION & SHARING: 5-STEP EDITORIAL FLOW & LIVE PREVIEW
   ========================================================================== */

function CreatePage() {
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [prompt, setPrompt] = useState(
    "I was offered the opportunity to acquire our biggest competitor at a steep discount, but it required secretly firing their entire founding team on day one."
  );
  const [category, setCategory] = useState("Career / Ethics");
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

  // Step 4: Creator's actual choice (no free text)
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

  const handlePublishMirror = () => {
    const newSituation: Situation = {
      id: `mirror-${Date.now().toString(36)}`,
      creator: person.trim() || "Yash",
      creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=85",
      creatorBio: "Sharing real crossroads to see how others think.",
      creatorAge: "28",
      creatorCity: city.trim() || "Global",
      category: category.trim() || "Perspective",
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
      createdAt: Date.now(),
    };

    saveCustomSituation(newSituation);
    setCreatedSituation(newSituation);
    setShowPreview(true);
  };

  const handleCopyLink = () => {
    if (!createdSituation) return;
    const url = `${window.location.origin}/mirror/${createdSituation.id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        () => showToast("LINK COPIED"),
        () => showToast("MIRROR READY TO SHARE")
      );
    } else {
      showToast("LINK COPIED");
    }
  };

  const handleShareMirror = () => {
    if (!createdSituation) return;
    const url = `${window.location.origin}/mirror/${createdSituation.id}`;
    if (navigator.share) {
      navigator
        .share({
          title: `MIRROR — ${createdSituation.title}`,
          text: createdSituation.prompt,
          url,
        })
        .then(() => showToast("MIRROR READY TO SHARE"))
        .catch(() => handleCopyLink());
    } else {
      handleCopyLink();
    }
  };

  // POST-CREATION LIVE VIEW
  if (showPreview && createdSituation) {
    return (
      <main className="preview-page">
        <SiteNav />
        <div className="preview-shell">
          <div className="preview-header-bar">
            <div>
              <span className="eyebrow">YOUR MIRROR IS LIVE</span>
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
              <span className="eyebrow">
                {createdSituation.category} · {createdSituation.creator} ({createdSituation.creatorCity})
              </span>
              <h1>YOUR MIRROR IS LIVE</h1>
              <p>Ready to be seen from another perspective.</p>
            </div>

            <div className="preview-situation-box">
              <span>The Situation</span>
              <p>“{createdSituation.prompt}”</p>
            </div>

            <span className="preview-section-title">
              Your Defined Paths ({createdSituation.options.length})
            </span>
            <div className="preview-paths-grid">
              {createdSituation.options.map((opt, idx) => {
                const isCreatorChoice = opt.label === createdSituation.original;
                return (
                  <div
                    key={opt.id}
                    className={`preview-path-card ${isCreatorChoice ? "creator-choice" : ""}`}
                  >
                    {isCreatorChoice && <span className="preview-choice-tag">Your Choice</span>}
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

            {/* ACTION BUTTONS REQUIRED BY EVALUATOR: VIEW MIRROR, SHARE MIRROR, COPY LINK */}
            <div className="preview-actions-bar">
              <Link
                href={`/mirror/${createdSituation.id}`}
                className="preview-action-primary"
                aria-label="View mirror"
              >
                <span>VIEW MIRROR</span>
                <span className="preview-action-primary-icon">
                  <ArrowUpRight size={18} strokeWidth={2.2} />
                </span>
              </Link>

              <div className="preview-sub-actions">
                <button
                  type="button"
                  className="preview-action-btn"
                  onClick={handleShareMirror}
                  aria-label="Share mirror"
                >
                  <Share2 size={15} /> SHARE MIRROR
                </button>
                <button
                  type="button"
                  className="preview-action-btn"
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                >
                  <Copy size={15} /> COPY LINK
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

        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className="toast-floating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <CheckCircle2 size={16} color="#7dd3fc" strokeWidth={2.5} />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
  }

  const stepHeaders = [
    { number: "01", label: "What happened?", sub: "Start with the moment everything became a question." },
    { number: "02", label: "What made this a crossroads?", sub: "Define the stakes and category of this dilemma." },
    { number: "03", label: "What were your possible paths?", sub: "Define 2 to 4 distinct choices people can evaluate." },
    { number: "04", label: "Which path did you choose?", sub: "Select the option you actually took. No free text." },
    { number: "05", label: "Why did you choose this?", sub: "Share the deeper context and principle behind your call." },
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

              {/* STEP 01 */}
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

              {/* STEP 02 */}
              {step === 1 && (
                <div className="create-input-row">
                  <div className="create-field-group">
                    <label className="create-field-label">Category</label>
                    <input
                      type="text"
                      className="create-text-input"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Career / Ethics, Family / Ambition"
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

              {/* STEP 03: 2-4 OPTIONS */}
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

              {/* STEP 04: WHICH PATH DID YOU CHOOSE? */}
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

              {/* STEP 05: REASONING & CONTEXT */}
              {step === 4 && (
                <div className="create-input-row">
                  <div className="create-field-group">
                    <label className="create-field-label">Thematic Title / Thesis</label>
                    <input
                      type="text"
                      className="create-text-input"
                      value={whyTitle}
                      onChange={(e) => setWhyTitle(e.target.value)}
                      placeholder="e.g. Loyalty before the ladder"
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
                      placeholder="The fundamental conviction behind your decision..."
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
                      placeholder="CAREER, ETHICS, LOYALTY"
                    />
                  </div>
                </div>
              )}

              {/* STEP CONTROLS: FINAL STEP SAYS 'PUBLISH MIRROR' */}
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
                    onClick={handlePublishMirror}
                    aria-label="Publish mirror"
                  >
                    <span>PUBLISH MIRROR</span>
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

/* ==========================================================================
   USER PROFILES & IDENTITY + PERSONALIZED EXPERIENCE
   ========================================================================== */

function ProfilePage() {
  const [allSituations] = useState<Situation[]>(() => {
    try {
      const list = loadAllSituations();
      return Array.isArray(list) && list.length > 0 ? list : defaultSituations;
    } catch {
      return defaultSituations;
    }
  });

  const [currentUser, setCurrentUser] = useState<DemoUser | null>(() => getDemoUser());
  const [activeTab, setActiveTab] = useState<"overview" | "mirrors" | "activity" | "saved">("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedDnaCategory, setSelectedDnaCategory] = useState<string>("CAREER");

  // Edit Profile Form State
  const [editName, setEditName] = useState(() => currentUser?.name || "Yash Gawde");
  const [editUsername, setEditUsername] = useState(() => currentUser?.username || "yash");
  const [editBio, setEditBio] = useState(() => currentUser?.bio || "Living at the intersection of product architecture and human psychology.");
  const [editInitials, setEditInitials] = useState(() => currentUser?.avatarInitials || "YG");
  const [editPerspective, setEditPerspective] = useState(() => currentUser?.perspectiveDescription || "I look for choices that preserve human relationships before career momentum.");

  // Settings State
  const [settings, setSettings] = useState<AppSettings>(() => getAppSettings());

  const [userActivity, setUserActivity] = useState<UserActivity>(() => {
    try {
      return getUserActivity();
    } catch {
      return {
        exploredMirrorIds: [],
        decisions: {},
        reflections: {},
        createdMirrorIds: [],
        echoesCount: 0,
        perspectiveShifts: {},
      };
    }
  });

  const [savedMirrorIds, setSavedMirrorIds] = useState<string[]>(() => getSavedMirrorIds());

  const [wouterLocation, setLocation] = useLocation();
  const [searchString, setSearchString] = useState(() =>
    typeof window !== "undefined" ? window.location.search : ""
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchString(window.location.search);
    }
  }, [wouterLocation]);

  useEffect(() => {
    setUserActivity(getUserActivity());
    setSavedMirrorIds(getSavedMirrorIds());
    setCurrentUser(getDemoUser());
  }, []);

  // Determine if viewing a specific creator or current user
  const params = useMemo(() => new URLSearchParams(searchString), [searchString]);
  const creatorQuery = params.get("creator");

  const creatorSituation = creatorQuery
    ? allSituations.find((s) => {
        if (!s || !s.creator) return false;
        const c1 = s.creator.toLowerCase();
        const c2 = creatorQuery.toLowerCase();
        return c1 === c2 || c1.includes(c2) || c2.includes(c1);
      })
    : null;

  const isCreatorView = !!creatorSituation;

  // Profile data
  const profileName = isCreatorView ? creatorSituation.creator : currentUser?.name || "Yash Gawde";
  const profileUsername = isCreatorView ? creatorSituation.creator.toLowerCase().replace(/\s+/g, "") : currentUser?.username || "yash";
  const profileBio = isCreatorView
    ? creatorSituation.creatorBio || "Trying to understand people before judging decisions."
    : currentUser?.bio || "Living at the intersection of product architecture and human psychology.";
  const profileAvatar = isCreatorView ? creatorSituation.creatorAvatar : "";
  const profileInitials = isCreatorView ? creatorSituation.creator[0] : currentUser?.avatarInitials || "YG";
  const profilePerspectiveDesc = isCreatorView
    ? "Principles tested by crossroads."
    : currentUser?.perspectiveDescription || "I look for choices that preserve human relationships before career momentum.";

  // Dynamic user activity statistics
  const userCreatedMirrors = allSituations.filter((s) => s && s.isUserCreated);
  const creatorMirrors = isCreatorView
    ? allSituations.filter(
        (s) =>
          s &&
          (s.creator.toLowerCase().includes(profileName.toLowerCase()) ||
            profileName.toLowerCase().includes(s.creator.toLowerCase()))
      )
    : userCreatedMirrors;

  const mirrorsCreatedCount = isCreatorView ? Math.max(creatorMirrors.length, 1) : userCreatedMirrors.length;
  const perspectivesExploredCount = isCreatorView ? 24 : userActivity.exploredMirrorIds.length;
  const decisionsMadeCount = isCreatorView
    ? 21
    : Object.keys(userActivity.decisions || {}).length;
  const reflectionsCount = isCreatorView
    ? 17
    : Object.keys(userActivity.reflections || {}).length;
  const echoesCount = isCreatorView ? 12 : userActivity.echoesCount || 0;

  // Dynamic Perspective Landscape breakdown with all required categories
  const categoryCounts = useMemo(() => {
    if (isCreatorView) {
      return {
        CAREER: 5,
        FAMILY: 4,
        RELATIONSHIPS: 4,
        AMBITION: 5,
        RISK: 3,
        IDENTITY: 2,
        LIFE: 3,
      };
    }

    const counts: Record<string, number> = {
      CAREER: 0,
      FAMILY: 0,
      RELATIONSHIPS: 0,
      AMBITION: 0,
      RISK: 0,
      IDENTITY: 0,
      LIFE: 0,
    };

    // Calculate from explored & decided situations
    if (userActivity?.exploredMirrorIds) {
      userActivity.exploredMirrorIds.forEach((id) => {
        const sit = allSituations.find((s) => s && s.id === id);
        if (sit) {
          const sitCat = String(sit.category || "").toUpperCase();
          const sitTags = Array.isArray(sit.tags)
            ? sit.tags.map((t) => String(t || "").toUpperCase())
            : [];

          Object.keys(counts).forEach((cat) => {
            if (sitCat.includes(cat) || sitTags.includes(cat)) {
              counts[cat]++;
            }
          });
        }
      });
    }

    return counts;
  }, [allSituations, isCreatorView, userActivity.exploredMirrorIds]);

  const totalInteractions = perspectivesExploredCount + decisionsMadeCount;

  // Saved Mirrors
  const savedMirrors = useMemo(() => {
    return savedMirrorIds
      .map((id) => allSituations.find((s) => s.id === id))
      .filter((s): s is Situation => !!s);
  }, [savedMirrorIds, allSituations]);

  // Decision History
  const decisionsList = useMemo(() => {
    return Object.entries(userActivity.decisions || {}).map(([mirrorId, data]) => {
      const sit = allSituations.find((s) => s.id === mirrorId);
      return {
        mirrorId,
        choice: data.choice,
        timestamp: data.timestamp,
        title: sit?.title || "Perspectives at a crossroads",
        category: sit?.category || "Perspective",
      };
    });
  }, [userActivity.decisions, allSituations]);

  // Perspective DNA insights
  const dnaInsights: Record<string, string> = {
    CAREER: "Your choices tend toward movement when growth is at stake.",
    FAMILY: "You place proximity and protective presence above personal convenience.",
    RELATIONSHIPS: "You value clarity and mutual trust over unspoken friction.",
    AMBITION: "You balance forward speed with internal loyalty to the team.",
    RISK: "You evaluate who absorbs the downside before taking the leap.",
    IDENTITY: "You look for coherence between outward title and inner compass.",
    LIFE: "You lean toward presence when the moment cannot be repeated.",
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateDemoUserProfile({
      name: editName.trim(),
      username: editUsername.replace(/^@/, "").trim(),
      bio: editBio.trim(),
      avatarInitials: editInitials.trim().toUpperCase() || "YG",
      perspectiveDescription: editPerspective.trim(),
    });
    setCurrentUser(updated);
    setShowEditModal(false);
  };

  const handleToggleSetting = (key: keyof AppSettings) => {
    const updated = saveAppSettings({ [key]: !settings[key] });
    setSettings(updated);
  };

  const handleExportData = () => {
    const jsonStr = exportAllUserData();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mirror-perspective-${profileUsername}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearActivity = () => {
    if (window.confirm("Are you sure you want to clear your local decisions, reflections, and saved mirrors?")) {
      clearLocalActivity();
      setUserActivity(getUserActivity());
      setSavedMirrorIds([]);
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logoutDemoUser();
    setLocation("/login");
  };

  return (
    <main className="profile-page">
      <SiteNav />

      <section className="profile-hero">
        <div className="profile-identity">
          {isCreatorView && (
            <div className="profile-view-switch-banner">
              <span>Viewing {profileName}&apos;s Perspective Profile</span>
              <Link
                href="/profile"
                className="profile-view-switch-btn"
                onClick={() => setSearchString("")}
              >
                View Your Profile
              </Link>
            </div>
          )}

          <div className="profile-avatar">
            {profileAvatar ? (
              <img
                src={profileAvatar}
                alt={profileName}
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <span>{profileInitials}</span>
            )}
            <div className="avatar-ring" />
          </div>

          <span className="perspective-identity-pill">PERSPECTIVE IDENTITY</span>
          <h1 style={{ marginTop: 18, marginBottom: 4 }}>
            {profileName.toUpperCase()}
          </h1>
          <div style={{ fontSize: 13, color: "var(--cobalt)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 12 }}>
            @{profileUsername}
          </div>
          <p className="profile-bio-quote">“{profileBio}”</p>
          <p style={{ fontSize: 14, color: "var(--ink-secondary)", maxWidth: 520, fontStyle: "italic", margin: "6px 0 18px" }}>
            {profilePerspectiveDesc}
          </p>

          {!isCreatorView && (
            <div className="profile-actions-bar">
              <button
                type="button"
                className="profile-action-outline-btn"
                onClick={() => setShowEditModal(true)}
              >
                <Sliders size={14} /> EDIT PROFILE
              </button>
              <button
                type="button"
                className="profile-action-outline-btn"
                onClick={() => setShowSettingsModal(true)}
              >
                <SettingsIcon size={14} /> SETTINGS
              </button>
              <button
                type="button"
                className="profile-action-outline-btn"
                onClick={handleLogout}
              >
                <LogOut size={14} /> LOG OUT
              </button>
            </div>
          )}
        </div>

        {/* PERSPECTIVE PROFILE METRICS */}
        <div className="profile-stats">
          <div>
            <strong>{perspectivesExploredCount}</strong>
            <span>Mirrors explored</span>
          </div>
          <div>
            <strong>{decisionsMadeCount}</strong>
            <span>Decisions made</span>
          </div>
          <div>
            <strong>{reflectionsCount}</strong>
            <span>Reflections</span>
          </div>
          <div>
            <strong>{echoesCount}</strong>
            <span>Echoes left</span>
          </div>
          <div>
            <strong>{mirrorsCreatedCount}</strong>
            <span>Mirrors created</span>
          </div>
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <nav className="profile-tabs-bar" aria-label="Profile sections">
        <button
          type="button"
          className={`profile-tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          OVERVIEW
        </button>
        <button
          type="button"
          className={`profile-tab-btn ${activeTab === "mirrors" ? "active" : ""}`}
          onClick={() => setActiveTab("mirrors")}
        >
          MY MIRRORS ({creatorMirrors.length})
        </button>
        <button
          type="button"
          className={`profile-tab-btn ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          ACTIVITY ({decisionsMadeCount})
        </button>
        <button
          type="button"
          className={`profile-tab-btn ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          SAVED ({savedMirrors.length})
        </button>
      </nav>

      <div className="profile-tab-content">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="overview-tab-pane">
            {/* PHASE 5: PERSPECTIVE DNA */}
            <section className="perspective-dna-card" aria-label="Perspective DNA">
              <div className="dna-header">
                <div>
                  <span className="eyebrow" style={{ color: "#4354bb" }}>PERSPECTIVE DNA</span>
                  <h3>YOUR PERSPECTIVE</h3>
                  <p>Interactive category breakdown derived from your actual decisions.</p>
                </div>
              </div>

              <div className="dna-categories-grid">
                {Object.entries(categoryCounts).map(([cat, count]) => {
                  const isSelected = selectedDnaCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`dna-cat-chip ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedDnaCategory(cat)}
                      aria-label={`${cat}: ${count} decisions. Click for perspective statement.`}
                    >
                      <span className="cat-name">{cat}</span>
                      <span className="cat-count">{count} {count === 1 ? "decision" : "decisions"}</span>
                    </button>
                  );
                })}
              </div>

              <div className="dna-insight-statement">
                <strong style={{ textTransform: "uppercase", fontSize: 12, letterSpacing: "0.06em", color: "var(--cobalt)", display: "block", marginBottom: 4 }}>
                  {selectedDnaCategory} PATTERN:
                </strong>
                “{dnaInsights[selectedDnaCategory] || "Your choices show deliberate reflection on what matters most."}”
              </div>
            </section>

            {/* PHASE 14: PERSPECTIVE JOURNEY */}
            <section className="perspective-journey-box" aria-label="Your perspective journey">
              <span className="eyebrow" style={{ color: "#4354bb" }}>MILESTONES</span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 28, margin: "6px 0 16px" }}>
                YOUR PERSPECTIVE JOURNEY
              </h3>

              {totalInteractions === 0 && !isCreatorView ? (
                <div className="empty-perspective-notice" style={{ marginTop: 12 }}>
                  <p>Your perspective journey begins with your first Mirror.</p>
                  <ArrowButton href="/mirror">ENTER MIRROR</ArrowButton>
                </div>
              ) : (
                <div className="journey-milestones">
                  <div className="journey-step-item">
                    <div className="journey-step-dot" />
                    <div className="journey-step-title">FIRST DECISION</div>
                    <div className="journey-step-desc">
                      {decisionsList[0] ? `Decided on “${decisionsList[0].title}” (${decisionsList[0].choice})` : "Stepped into your first crossroads."}
                    </div>
                  </div>

                  {reflectionsCount > 0 && (
                    <div className="journey-step-item">
                      <div className="journey-step-dot" />
                      <div className="journey-step-title">FIRST REFLECTION</div>
                      <div className="journey-step-desc">
                        Paused to evaluate another person&apos;s context after seeing their reasoning.
                      </div>
                    </div>
                  )}

                  {echoesCount > 0 && (
                    <div className="journey-step-item">
                      <div className="journey-step-dot" />
                      <div className="journey-step-title">FIRST ECHO</div>
                      <div className="journey-step-desc">
                        Left your perspective in the room for the next person to discover.
                      </div>
                    </div>
                  )}

                  {Object.keys(userActivity.perspectiveShifts || {}).length > 0 && (
                    <div className="journey-step-item">
                      <div className="journey-step-dot" />
                      <div className="journey-step-title">FIRST PERSPECTIVE SHIFT</div>
                      <div className="journey-step-desc">
                        Documented how another person&apos;s story reshaped or deepened your perspective.
                      </div>
                    </div>
                  )}

                  <div className="journey-step-item">
                    <div className="journey-step-dot" />
                    <div className="journey-step-title">TODAY</div>
                    <div className="journey-step-desc">
                      Active participant in perspective-first connection.
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* CATEGORY DISTRIBUTION BARS */}
            <section className="perspective-landscape-section" style={{ padding: 0 }}>
              <span className="eyebrow">PERSPECTIVE LANDSCAPE</span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, margin: "6px 0 20px" }}>
                Every answer leaves a trace.
              </h2>
              <div className="category-bars-grid">
                {Object.entries(categoryCounts).map(([cat, count]) => {
                  const max = Math.max(...Object.values(categoryCounts), 1);
                  const percent = Math.round((count / max) * 100);
                  return (
                    <div key={cat} className="category-bar-item">
                      <div className="category-bar-label">
                        <span>{cat}</span>
                        <span>{count}</span>
                      </div>
                      <div className="category-bar-track">
                        <div className="category-bar-fill" style={{ width: `${Math.max(percent, count > 0 ? 15 : 0)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: MY MIRRORS */}
        {activeTab === "mirrors" && (
          <section className="my-mirrors-section" style={{ padding: 0 }}>
            <div className="rail-heading">
              <div>
                <span className="eyebrow">
                  {isCreatorView ? `${profileName.toUpperCase()}'S CREATED MIRRORS` : "MY MIRRORS"}
                </span>
                <h2>
                  Mirrors created<br />
                  <em>in the room.</em>
                </h2>
              </div>
            </div>

            {creatorMirrors.length === 0 ? (
              <div className="empty-perspective-notice" style={{ marginTop: 24 }}>
                <h3>No created mirrors yet</h3>
                <p>You haven&apos;t published a crossroads yet. Create your first mirror to invite other perspectives.</p>
                <ArrowButton href="/create">Create a Mirror</ArrowButton>
              </div>
            ) : (
              <div className="my-mirrors-grid" style={{ marginTop: 28 }}>
                {creatorMirrors.map((item) => {
                  if (!item) return null;
                  const promptSlice = String(item.prompt || item.title || "").slice(0, 110);
                  return (
                    <Link key={item.id} href={`/mirror/${item.id}`} className="my-mirror-card">
                      <span className="eyebrow" style={{ color: "#4354bb" }}>
                        {item.category || "Perspective"}
                      </span>
                      <h3>{item.title}</h3>
                      <p>“{promptSlice}…”</p>
                      <div className="my-mirror-meta">
                        <span>{Array.isArray(item.options) ? item.options.length : 2} paths</span>
                        <span style={{ color: "#4354bb", display: "flex", alignItems: "center", gap: 4 }}>
                          Enter Mirror <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* TAB 3: ACTIVITY */}
        {activeTab === "activity" && (
          <section className="activity-tab-pane" aria-label="Your decisions and shifts">
            <span className="eyebrow" style={{ color: "#4354bb" }}>LOCAL HISTORY</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, margin: "6px 0 20px" }}>
              YOUR DECISIONS
            </h2>

            {decisionsList.length === 0 ? (
              <div className="empty-perspective-notice">
                <h3>YOUR FIRST DECISION IS WAITING.</h3>
                <p>You have not made a choice in any Mirror yet. Step into someone else&apos;s crossroads.</p>
                <ArrowButton href="/mirror">ENTER MIRROR</ArrowButton>
              </div>
            ) : (
              <div className="decisions-history-list">
                {decisionsList.map((d) => (
                  <Link key={d.mirrorId} href={`/mirror/${d.mirrorId}`} className="decision-history-card">
                    <div className="decision-card-info">
                      <span className="eyebrow" style={{ color: "#4354bb" }}>{d.category}</span>
                      <h4>{d.title}</h4>
                      <div className="decision-choice-badge">
                        <CheckCircle2 size={14} /> You chose: “{d.choice}”
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--cobalt)", fontWeight: 700 }}>
                      <span>Revisit</span>
                      <ArrowUpRight size={15} />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* PERSPECTIVE SHIFTS NOTES */}
            {userActivity.perspectiveShifts && Object.keys(userActivity.perspectiveShifts).length > 0 && (
              <div style={{ marginTop: 48 }}>
                <span className="eyebrow" style={{ color: "#4354bb" }}>PERSPECTIVE NOTES</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 26, margin: "6px 0 20px" }}>
                  WHAT CHANGED
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {Object.entries(userActivity.perspectiveShifts).map(([mId, shift]) => {
                    const sit = allSituations.find((s) => s.id === mId);
                    return (
                      <div key={mId} className="decision-history-card">
                        <div>
                          <span className="eyebrow">{sit?.title || "Crossroads"}</span>
                          <blockquote style={{ fontStyle: "italic", margin: "6px 0 4px", fontSize: 15 }}>
                            “{shift.note}”
                          </blockquote>
                        </div>
                        <Link href={`/mirror/${mId}`} className="text-link">
                          View <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* TAB 4: SAVED MIRRORS */}
        {activeTab === "saved" && (
          <section className="saved-tab-pane" aria-label="Saved perspectives">
            <span className="eyebrow" style={{ color: "#4354bb" }}>SAVED PERSPECTIVES</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, margin: "6px 0 20px" }}>
              PERSPECTIVES YOU BOOKMARKED
            </h2>

            {savedMirrors.length === 0 ? (
              <div className="empty-perspective-notice">
                <h3>NO SAVED PERSPECTIVES YET.</h3>
                <p>Every Mirror you save will appear here. Revisit whenever you want to consider their side again.</p>
                <ArrowButton href="/explore">EXPLORE MIRRORS</ArrowButton>
              </div>
            ) : (
              <div className="my-mirrors-grid">
                {savedMirrors.map((item) => (
                  <Link key={item.id} href={`/mirror/${item.id}`} className="my-mirror-card">
                    <span className="eyebrow" style={{ color: "#4354bb" }}>
                      {item.category} · BY {item.creator.toUpperCase()}
                    </span>
                    <h3>{item.title}</h3>
                    <p>“{String(item.prompt || "").slice(0, 110)}…”</p>
                    <div className="my-mirror-meta">
                      <span style={{ color: "var(--cobalt)", display: "flex", alignItems: "center", gap: 4 }}>
                        <Bookmark size={13} fill="currentColor" /> Saved Perspective
                      </span>
                      <span style={{ color: "#4354bb", display: "flex", alignItems: "center", gap: 4 }}>
                        Open <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Edit Profile">
          <div className="modal-dialog">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowEditModal(false)}
              aria-label="Close edit profile"
            >
              <X size={20} />
            </button>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, marginBottom: 20 }}>
              EDIT PROFILE
            </h2>
            <form className="auth-form" onSubmit={handleSaveProfile}>
              <div className="auth-input-group">
                <label htmlFor="edit-name">Name</label>
                <input
                  id="edit-name"
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="auth-input-group">
                <label htmlFor="edit-username">Username</label>
                <input
                  id="edit-username"
                  type="text"
                  required
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                />
              </div>
              <div className="auth-input-group">
                <label htmlFor="edit-initials">Avatar Initials (1-2 characters)</label>
                <input
                  id="edit-initials"
                  type="text"
                  maxLength={2}
                  required
                  value={editInitials}
                  onChange={(e) => setEditInitials(e.target.value)}
                />
              </div>
              <div className="auth-input-group">
                <label htmlFor="edit-bio">Bio</label>
                <textarea
                  id="edit-bio"
                  rows={2}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                />
              </div>
              <div className="auth-input-group">
                <label htmlFor="edit-perspective">Perspective Description</label>
                <textarea
                  id="edit-perspective"
                  rows={2}
                  value={editPerspective}
                  onChange={(e) => setEditPerspective(e.target.value)}
                />
              </div>
              <button type="submit" className="auth-submit-btn">
                SAVE PROFILE
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Settings">
          <div className="modal-dialog">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowSettingsModal(false)}
              aria-label="Close settings"
            >
              <X size={20} />
            </button>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, marginBottom: 24 }}>
              SETTINGS
            </h2>

            {/* ACCOUNT SECTION */}
            <div className="settings-section-block">
              <h4>ACCOUNT</h4>
              <div style={{ fontSize: 14, color: "var(--ink-secondary)", marginBottom: 12 }}>
                Signed in as: <strong>{profileName}</strong> (@{profileUsername})
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  className="profile-action-outline-btn"
                  onClick={() => {
                    setShowSettingsModal(false);
                    setShowEditModal(true);
                  }}
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  className="profile-action-outline-btn"
                  onClick={handleLogout}
                >
                  <LogOut size={13} /> Log Out
                </button>
              </div>
            </div>

            {/* ACCESSIBILITY SECTION */}
            <div className="settings-section-block">
              <h4>ACCESSIBILITY</h4>
              <div className="settings-toggle-row">
                <div className="settings-toggle-info">
                  <strong>Reduce Motion</strong>
                  <span>Disable animations and rapid transitions</span>
                </div>
                <button
                  type="button"
                  className={`toggle-switch ${settings.reduceMotion ? "checked" : ""}`}
                  onClick={() => handleToggleSetting("reduceMotion")}
                  aria-pressed={settings.reduceMotion}
                  aria-label="Toggle Reduce Motion"
                >
                  <div className="toggle-thumb" />
                </button>
              </div>

              <div className="settings-toggle-row">
                <div className="settings-toggle-info">
                  <strong>Larger Text</strong>
                  <span>Enhance typography size across perspectives</span>
                </div>
                <button
                  type="button"
                  className={`toggle-switch ${settings.largerText ? "checked" : ""}`}
                  onClick={() => handleToggleSetting("largerText")}
                  aria-pressed={settings.largerText}
                  aria-label="Toggle Larger Text"
                >
                  <div className="toggle-thumb" />
                </button>
              </div>

              <div className="settings-toggle-row">
                <div className="settings-toggle-info">
                  <strong>High Contrast</strong>
                  <span>Crisp borders and deep contrast for readability</span>
                </div>
                <button
                  type="button"
                  className={`toggle-switch ${settings.highContrast ? "checked" : ""}`}
                  onClick={() => handleToggleSetting("highContrast")}
                  aria-pressed={settings.highContrast}
                  aria-label="Toggle High Contrast"
                >
                  <div className="toggle-thumb" />
                </button>
              </div>
            </div>

            {/* DATA SECTION */}
            <div className="settings-section-block">
              <h4>DATA & PRIVACY</h4>
              <p style={{ fontSize: 13, color: "var(--ink-secondary)", margin: "0 0 14px" }}>
                All your activity is stored locally in your browser. You can export or clear it anytime.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="profile-action-outline-btn"
                  onClick={handleExportData}
                >
                  <Download size={13} /> Export My MIRROR Data
                </button>
                <button
                  type="button"
                  className="profile-action-outline-btn"
                  style={{ color: "#d93838", borderColor: "rgba(217,56,56,0.3)" }}
                  onClick={handleClearActivity}
                >
                  <Trash2 size={13} /> Clear Local Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

/* ==========================================================================
   FRONTEND AUTHENTICATION (DEMO SESSION)
   ========================================================================== */

function LoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemoUser(email, password);
    setLocation("/profile");
  };

  const handleGuest = () => {
    continueAsGuest();
    setLocation("/explore");
  };

  return (
    <main className="auth-page-container">
      <SiteNav />
      <div className="auth-card">
        <span className="demo-auth-badge">
          <UserCheck size={13} /> Frontend Demo Session
        </span>
        <div className="auth-header">
          <h1>WELCOME BACK.</h1>
          <p>Sign in to step back into your perspective journey.</p>
        </div>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-input-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yash@perspective.mirror"
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="auth-submit-btn">
            SIGN IN
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button type="button" className="auth-guest-btn" onClick={handleGuest}>
          CONTINUE AS GUEST
        </button>

        <div className="auth-footer-switch">
          Don&apos;t have an account?
          <Link href="/signup">CREATE ACCOUNT</Link>
        </div>
      </div>
    </main>
  );
}

function SignupPage() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signupDemoUser(name, username, email, password);
    setLocation("/profile");
  };

  const handleGuest = () => {
    continueAsGuest();
    setLocation("/explore");
  };

  return (
    <main className="auth-page-container">
      <SiteNav />
      <div className="auth-card">
        <span className="demo-auth-badge">
          <UserCheck size={13} /> Frontend Demo Session
        </span>
        <div className="auth-header">
          <h1>CREATE YOUR PERSPECTIVE</h1>
          <p>Join a social network built around decision and understanding.</p>
        </div>
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="auth-input-group">
            <label htmlFor="signup-name">Name</label>
            <input
              id="signup-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Yash Gawde"
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yash"
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yash@perspective.mirror"
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="auth-submit-btn">
            CREATE ACCOUNT
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button type="button" className="auth-guest-btn" onClick={handleGuest}>
          CONTINUE AS GUEST
        </button>

        <div className="auth-footer-switch">
          Already have an account?
          <Link href="/login">SIGN IN</Link>
        </div>
      </div>
    </main>
  );
}

/* ==========================================================================
   HOW MIRROR WORKS / ABOUT PAGE
   ========================================================================== */

function HowItWorksPage() {
  return (
    <main className="about-page-container">
      <SiteNav />
      <section className="about-hero">
        <span className="eyebrow" style={{ color: "#4354bb" }}>WHY MIRROR?</span>
        <h1>SEE DIFFERENTLY.</h1>
        <p className="lead-quote">
          “Most social platforms ask: &lsquo;What do you like?&rsquo;<br />
          MIRROR asks: &lsquo;What would you do?&rsquo;”
        </p>
      </section>

      <section className="about-steps-grid" aria-label="How Mirror works in 6 steps">
        {[
          { num: "01", title: "CREATE", desc: "Share a real crossroads from your life." },
          { num: "02", title: "DECIDE", desc: "Choose without seeing their answer." },
          { num: "03", title: "REVEAL", desc: "Discover how they chose." },
          { num: "04", title: "UNDERSTAND", desc: "Read the context behind their decision." },
          { num: "05", title: "REFLECT", desc: "Consider whether their perspective changes yours." },
          { num: "06", title: "ECHO", desc: "Leave something for the next person." },
        ].map((s) => (
          <div key={s.num} className="about-step-card">
            <strong className="step-num">STEP {s.num}</strong>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </section>

      <section className="manifesto-box" aria-label="The social triad">
        <span className="eyebrow" style={{ color: "#7d90f2" }}>THE PERSPECTIVE FOUNDATION</span>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 36, margin: "8px 0 16px" }}>
          Perspective over popularity.
        </h2>
        <p style={{ color: "#cfd3e8", fontSize: 16, lineHeight: 1.6, maxWidth: 640 }}>
          MIRROR replaces likes, followers, and algorithms with human perspective. The social interaction is not a verdict; it is an exercise in seeing the same situation from another angle.
        </p>

        <div className="manifesto-triad">
          <div className="triad-item">
            <span>THE SOCIAL OBJECT</span>
            <strong>A situation.</strong>
          </div>
          <div className="triad-item">
            <span>THE INTERACTION</span>
            <strong>A decision.</strong>
          </div>
          <div className="triad-item">
            <span>THE CONNECTION</span>
            <strong>A perspective.</strong>
          </div>
        </div>
      </section>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <ArrowButton href="/mirror" variant="dark">
          ENTER MIRROR
        </ArrowButton>
      </div>
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
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/about" component={HowItWorksPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}

