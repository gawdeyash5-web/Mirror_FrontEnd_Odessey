# MIRROR — Project Documentation

## Reimagining Social Interaction Through Perspective

---

## Executive Summary

**MIRROR** is a reimagined social experience that challenges the conventional mechanics of social media. Instead of organizing human connection around infinite feeds, likes, follower counts, and passive consumption, MIRROR anchors social interaction around real-life human dilemmas.

By turning social engagement into an exercise of stepping into another person's shoes, deciding before seeing their choice, and reflecting on how their context differs from our own, MIRROR creates meaningful social connections rooted in perspective rather than popularity.

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Design Opportunity](#2-design-opportunity)
3. [Project Vision & Design Principles](#3-project-vision--design-principles)
4. [Core Concept & The Conceptual Triad](#4-core-concept--the-conceptual-triad)
5. [Why MIRROR Is a Social Experience](#5-why-mirror-is-a-social-experience)
6. [Full User Journey](#6-full-user-journey)
7. [Interaction Model](#7-interaction-model)
8. [Content Model & Taxonomy](#8-content-model--taxonomy)
9. [Feature Architecture](#9-feature-architecture)
10. [Profile & Identity](#10-profile--identity)
11. [Community Model](#11-community-model)
12. [Personalization Engine](#12-personalization-engine)
13. [Authentication & Session Architecture](#13-authentication--session-architecture)
14. [Navigation Architecture & Route Hierarchy](#14-navigation-architecture--route-hierarchy)
15. [Accessibility Implementation](#15-accessibility-implementation)
16. [Responsive Design System](#16-responsive-design-system)
17. [Technical Architecture](#17-technical-architecture)
18. [Data Persistence & Schemas](#18-data-persistence--schemas)
19. [Error Resilience & Defensive Storage](#19-error-resilience--defensive-storage)
20. [Testing & Verification Evidence](#20-testing--verification-evidence)
21. [Feature-to-Requirement Compliance Matrix](#21-feature-to-requirement-compliance-matrix)
22. [Bonus Evaluation Areas](#22-bonus-evaluation-areas)
23. [Architectural Limitations & Prototype Scope](#23-architectural-limitations--prototype-scope)
24. [Future Evolution & Roadmap](#24-future-evolution--roadmap)

---

## 1. Problem Statement

The following authoritative problem statement defines the requirements and constraints of this project:

> *"Social media has become an integral part of how Gen Z communicates, discovers content, builds communities, expresses identity, and stays connected.*
>
> *However, most social platforms still revolve around familiar patterns: infinite scrolling, likes, followers, short-form content, and algorithm-driven feeds.*
>
> *Your challenge is to reimagine what social interaction could look like beyond these conventional patterns.*
>
> *Design and build a completely new social experience that changes how people connect, communicate, discover, participate, or build communities.*
>
> *Think beyond the conventional feed.*
>
> *Your solution should demonstrate:*
> - *A clear and original social interaction concept*
> - *A unique interaction model or user flow*
> - *A distinctive visual language and interface*
> - *A thoughtful content system*
> - *New or improved ways for people to connect and engage*
> - *A polished and responsive frontend experience*
>
> *Important:*
> *Do not build another Instagram, Snapchat, Reddit, or Twitter/X clone.*
> *The goal is not to recreate an existing social platform.*
> *The goal is to rethink social interaction itself and present an experience that feels fresh, purposeful, and believable.*
>
> *Think different. Reimagine social. Build the next experience."*

---

## 2. Design Opportunity

### The Feed Paradigm
Modern social platforms rely predominantly on a standardized set of mechanics:
- **Continuous Feeds**: Optimizing for session length through passive scrolling.
- **Pre-Determined Consensus**: Posts arrive accompanied by public counts (likes, retweets, upvotes) and visible comments that prime the viewer's reaction before they have processed the content.
- **Asymmetric Validation**: Followers and like counts turn human expression into a contest for social capital.

### The MIRROR Provocation
These mechanics are exceptionally effective for mass distribution and ad monetization, but they inherently reduce social participation to **reacting to content**. 

MIRROR identifies a profound design opportunity by asking:

> **"What if social interaction began with a decision instead?"**

When you are asked what you would do in another person's situation *before* you know what they did, your cognitive relationship to that person fundamentally transforms:
1. You cannot merely agree or disagree; you must weigh the tradeoffs yourself.
2. You become personally invested in the outcome.
3. When the creator's decision and reasoning are subsequently revealed, you experience genuine empathy or surprise rather than detached evaluation.

---

## 3. Project Vision & Design Principles

MIRROR is guided by six foundational design principles:

### 1. Perspective Over Popularity
Interaction is not structured to elevate the most agreeable or sensational post. The platform measures depth of contemplation, diversity of reasoning, and honest reflection rather than numerical popularity.

### 2. Participation Before Reaction
Users do not consume passively. Before accessing the creator's reasoning or community reactions, participants must take an active stance and commit to a decision.

### 3. Understanding Before Judgment
By withholding the creator's choice until the participant makes theirs, MIRROR eliminates reflexive judgment. You understand the dilemma before evaluating the person.

### 4. Reflection Over Engagement Metrics
The ultimate goal of an interaction is not to trigger another click, but to stimulate internal reflection: *"Knowing why they chose what they did, does it change how I see the situation?"*

### 5. Human Context Over Isolated Content
Decisions do not occur in vacuums. Every crossroads includes the creator's lived context, life constraints, background, and personal principles.

### 6. Social Without Conventional Social Mechanics
MIRROR establishes a vibrant social network through real human authors, user-generated dilemmas, discovery mechanisms, perspective comparisons, and community Echoes—without needing likes, follower counts, or algorithmic engagement loops.

---

## 4. Core Concept & The Conceptual Triad

MIRROR replaces the three pillars of traditional social media:

```
┌───────────────────────┬──────────────────────────────────┬────────────────────────────────────────┐
│ Dimension             │ Conventional Social Platforms    │ MIRROR Reimagination                   │
├───────────────────────┼──────────────────────────────────┼────────────────────────────────────────┤
│ THE SOCIAL OBJECT     │ A post / media snippet / photo   │ A SITUATION (a real-life crossroads)   │
│ THE INTERACTION       │ A like / upvote / emoji reaction │ A DECISION (committing to a path)      │
│ THE CONNECTION        │ Following a profile / fan base   │ A PERSPECTIVE (empathic alignment)     │
└───────────────────────┴──────────────────────────────────┴────────────────────────────────────────┘
```

- **The Creator's Crossroads** becomes the focal point of interaction.
- **The Participant's Decision** creates cognitive commitment.
- **The Split Reveal & Context** fosters human understanding.
- **The Echo** builds collective wisdom across diverse viewpoints.

---

## 5. Why MIRROR Is a Social Experience

A common misconception when departing from conventional feeds is confusing an original social product with a solitary survey tool. MIRROR is fundamentally a multi-player social network:

### The MIRROR Social Graph
Conventional platforms build social graphs based on directional following (`User A -> follows -> User B`). MIRROR builds a **contextual perspective graph**:

```
                  ┌──────────────────────┐
                  │       CREATOR        │
                  │  (Identity, Values)  │
                  └──────────┬───────────┘
                             │
                      publishes crossroads
                             │
                             ▼
                  ┌──────────────────────┐
                  │      SITUATION       │
                  │ (Context, Dilemma)   │
                  └──────────┬───────────┘
                             │
                      entered by
                             │
                             ▼
                  ┌──────────────────────┐
                  │     PARTICIPANT      │
                  │   (Lived Mindset)    │
                  └──────────┬───────────┘
                             │
                      makes commitment
                             │
                             ▼
                  ┌──────────────────────┐
                  │       DECISION       │
                  │  (Blind Choice Locked)│
                  └──────────┬───────────┘
                             │
                      evaluates against creator
                             │
                             ▼
                  ┌──────────────────────┐
                  │      REFLECTION      │
                  │(Did your view shift?)│
                  └──────────┬───────────┘
                             │
                      contributes
                             │
                             ▼
                  ┌──────────────────────┐
                  │         ECHO         │
                  │ (Collective Wisdom)  │
                  └──────────────────────┘
```

### Social Mechanics Implemented in MIRROR
1. **Identified People**: Every situation is anchored by a real author with a public bio, age, location, and perspective thesis.
2. **User-Generated Content**: Any participant can step into the role of creator and publish their own real-life crossroads.
3. **Open Discovery**: Explore catalogs categorize situations across 7 life domains, allowing users to find dilemmas that resonate with their current life stage.
4. **Direct Perspective Comparison**: After locking a choice, participants see exactly how their moral and strategic instincts compare to the author's.
5. **Community Echoes**: A shared space where participants articulate their reasoning, debate subtleties, and read how others resolved the dilemma.
6. **Perspective Identity**: Profiles reflect what you value, how you decide, and how often your perspectives shift when exposed to new context.

---

## 6. Full User Journey

The end-to-end user lifecycle spans six primary phases:

```
CREATE
  │  Creator publishes a real crossroads with 2–4 viable options and private reasoning.
  ▼
PUBLISH
  │  Situation is validated and indexed into the public Explore catalog.
  ▼
DISCOVER
  │  Participants browse Today's Mirror, search keywords, or filter by life themes.
  ▼
ENTER SITUATION
  │  Participant reads the dilemma prompt; creator's choice remains strictly hidden.
  ▼
BLIND DECISION
  │  Participant weighs the choices based purely on their own values and instincts.
  ▼
LOCK CHOICE
  │  Tactile commitment: the decision is permanently locked before any reveal occurs.
  ▼
SPLIT REVEAL
  │  Side-by-side comparison: Participant's choice vs. Creator's choice.
  ▼
UNDERSTAND CONTEXT
  │  Creator's private reasoning, life constraints, and ethical principles are unlocked.
  ▼
COMPARE PERSPECTIVES
  │  Visual alignment analysis showing where the participant and creator converged or diverged.
  ▼
REFLECT
  │  Participant answers: "Knowing this context, would you still choose the same?"
  ▼
LEAVE ECHO
  │  Participant writes a perspective note, permanently contributing to the situation's community tapestry.
  ▼
SHARE & PROFILE
  │  Perspective is logged to the user's Profile, updating their dynamic Perspective DNA.
```

---

## 7. Interaction Model

### 1. Blind Decision-Making
When a user opens `/mirror` or `/mirror/:id`, the dilemma's outcome is sequestered. The UI prevents any peeking, displaying neutral option cards that prompt the user to introspect: *"What would you do?"*

### 2. Two-Stage Decision Commitment
To ensure decisions are thoughtful rather than accidental:
- **Stage 1 (Select)**: Clicking an option activates a highlighted state, displaying a summary of that pathway. The participant can freely switch choices.
- **Stage 2 (Lock)**: The user explicitly clicks **"LOCK MY DECISION"**. This commits the choice, triggering an irreversible reveal transition.

### 3. The Split Perspective Reveal
Upon locking, the single dilemma view splits into a comparative presentation:
- **Left Column**: The participant's choice, highlighted in high-contrast cobalt.
- **Right Column**: The creator's actual choice, highlighted in warm sand or soft peach.

### 4. Context & Constraint Unveiling
Below the reveal, the creator's previously hidden reasoning expands:
- **The Governing Principle**: A thematic summary of their core values (e.g., *"Ownership over safety"*).
- **The Lived Context**: The emotional, financial, or personal realities that made the decision necessary.

### 5. Three-Point Reflection
Participants are asked: *"Knowing this, would you still choose the same?"*
- **YES**: The participant held their ground despite differing context.
- **NO**: The creator's reasoning prompted an authentic shift in perspective.
- **I'M NOT SURE**: The dilemma proved nuanced and difficult to resolve neatly.

### 6. Perspective Shift Notes & Echoes
Participants can document their internal reasoning:
- **Private Perspective Note**: Stored locally in their personal activity record.
- **Public Echo**: Published to the situation's Echo wall for other participants to discover and reflect upon.

---

## 8. Content Model & Taxonomy

MIRROR treats dilemmas as structured content objects rather than arbitrary markdown or image blobs.

### Content Hierarchy
```
Situation Record
├── Metadata
│   ├── id: string (unique identifier, e.g. "maya", "devon", or generated uuid)
│   ├── title: string (the headline dilemma)
│   ├── short: string (concise editorial summary)
│   ├── category: CategoryType (one of 7 core categories)
│   ├── tags: string[] (thematic tags, e.g. ["STARTUP", "GROWTH", "RISK"])
│   └── createdAt: timestamp
├── Creator Attribution
│   ├── creator: string (full display name)
│   ├── creatorAvatar: string (avatar URL or initial monogram)
│   ├── creatorBio: string (contextual background)
│   ├── creatorAge: string (demographic context)
│   └── creatorCity: string (geographical context)
├── The Crossroads
│   ├── prompt: string (the complete human narrative)
│   └── options: MirrorOption[] (2 to 4 distinct paths)
│       ├── id: string
│       ├── label: string (action-oriented statement)
│       ├── sub: string (tradeoff / consequence)
│       └── tone: "dark" | "cobalt" | "peach" | "sage"
├── Creator's Perspective
│   ├── original: string (the exact option label chosen by creator)
│   ├── whyTitle: string (the core philosophical principle)
│   ├── why: string (the detailed reasoning)
│   └── context: string (the surrounding circumstances)
└── Community Layer
    └── echoes: Echo[] (perspectives left by other participants)
```

### The 7 Core Categories
1. **CAREER**: Crossroads involving professional integrity, creative independence, promotions, or pivots.
2. **FAMILY**: Dilemmas balancing filial obligations, generational expectations, and personal autonomy.
3. **RELATIONSHIPS**: Complex choices around romantic partnership, friendship boundaries, and honesty.
4. **AMBITION**: Tradeoffs between safety, venture risk, and personal artistic calling.
5. **RISK**: High-stakes decisions involving uncertainty, financial sacrifice, or relocations.
6. **IDENTITY**: Moments of claiming one's true values, authentic self, or ethical standards.
7. **LIFE**: Everyday philosophical intersections and existential forks in the road.

---

## 9. Feature Architecture

The application is structured into modular client-side subsystems:

```
client/src/
├── App.tsx                      # Root orchestrator, routes, page views & modals
├── index.css                    # Design tokens, responsive layouts, CSS variables
├── components/
│   ├── ErrorBoundary.tsx        # Top-level fault tolerance and recovery boundary
│   └── ui/                      # Radix UI primitives and custom inputs
└── lib/
    ├── storage.ts               # Storage abstraction, defensive parsing, seed data
    ├── storage.test.ts          # Automated Vitest test suite for data integrity
    └── utils.ts                 # Classname merge helpers
```

### Key Subsystems
1. **Crossroads Engine**: Manages blind state, selection, lock confirmation, and split reveal transitions.
2. **Explore & Search Catalog**: Implements multi-attribute filtering (category, query, participation state).
3. **Creation Studio**: 5-step guided wizard validating option constraints and creator attribution.
4. **Identity & DNA Calculator**: Dynamically derives psychological tendencies from participant decision history.
5. **Community Echoes Wall**: Organizes participant reflections by decision outcome.
6. **Demo Session Manager**: Provides instant guest access, user registration, and profile editing.

---

## 10. Profile & Identity

A MIRROR profile is explicitly designed as a **record of perspective**, deliberately rejecting vanity metrics.

### Four Functional Views
- **OVERVIEW**:
  - Displays creator persona, bio, city, and personal perspective thesis.
  - Summarizes key participation metrics: *Mirrors Explored*, *Decisions Locked*, *Reflections Logged*, *Echoes Shared*.
  - Hosts the interactive **Perspective DNA** visualization.
- **MY MIRRORS**:
  - Displays all crossroads authored and published by the user.
  - Provides quick links to view public dilemmas or copy direct share URLs.
  - Shows empty state with direct action to create a new situation.
- **ACTIVITY**:
  - A chronological ledger of every dilemma entered.
  - Documents the chosen option, the creator's option, whether perspectives aligned, and the participant's reflection.
- **SAVED**:
  - Bookmarked crossroads saved for later consideration or deep reflection.

### Dynamic Perspective DNA
Rather than assigning arbitrary static badges, the profile dynamically analyzes user actions:
- **Intuition vs. Calculation**: Derived from decision speed and option selection.
- **Independence vs. Empathy**: Derived from frequency of holding ground vs. shifting perspective upon reading creator reasoning.
- **Risk Tolerance**: Derived from choices made in RISK and AMBITION categories.

---

## 11. Community Model

Community on MIRROR is established through shared vulnerability and differing perspectives rather than follower graphs.

### Echoes as Collective Wisdom
An Echo is a participant's perspective contribution left on a situation:
- **Author Attribution**: Participant's name, avatar, and background.
- **Reflection Context**: Explicitly tagged with whether the author's perspective shifted (*Changed view*, *Held ground*, or *Contemplative*).
- **Nuanced Commentary**: Focuses on *why* the participant chose their path, providing future visitors with varied life viewpoints.

### No Algorithmic Ranking
Echoes are sorted chronologically or filtered by reflection category. There is no "upvoting to the top," preventing the formation of artificial echo chambers.

---

## 12. Personalization Engine

MIRROR personalizes the experience through meaningful cognitive tracking rather than opaque tracking algorithms:

### 1. The Perspective Journey
Tracks the user's progression across three developmental tiers:
- **Explorer**: Stepping into unfamiliar crossroads and observing diverse choices.
- **Contributor**: Locking decisions, testing personal values, and writing Echoes.
- **Perspective Author**: Publishing authentic crossroads from one's own life to challenge the community.

### 2. Participation State Indicators
Across the Explore catalog, situations automatically reflect the user's personal history:
- **"DECIDED"**: Indicates situations where the user has already participated and reflected.
- **"NEW PERSPECTIVE"**: Highlights unexplored dilemmas awaiting the user's decision.

---

## 13. Authentication & Session Architecture

### Transparent Hackathon Implementation
MIRROR implements a **frontend-only demo authentication system**. 

> **Security & Prototype Notice**: This authentication layer is strictly intended for demonstration purposes in a frontend hackathon environment. It does not communicate with a remote authentication server, does not issue signed JWTs, and does not store encrypted passwords.

### Session Lifecycle
- **Guest Exploration**: Users can explore, decide, and reflect without logging in; interactions are stored under a local guest profile.
- **Quick Demo Sign-In**: One-click demo credentials allow instant evaluation of full profile capabilities.
- **Custom Account Creation**: Users can sign up with their name, handle, and perspective thesis, immediately establishing a local identity.
- **Data Export & Reset**: Users can export their full activity ledger as JSON or reset their local profile with one click.

---

## 14. Navigation Architecture & Route Hierarchy

MIRROR uses a declarative, client-side routing hierarchy powered by Wouter:

```
/                         # Landing Page (Philosophy, provocative hero, feature breakdown)
├── /mirror               # Default Interactive Crossroads (Today's Mirror)
├── /mirror/:id           # Direct Permalink to specific situation (e.g., /mirror/maya)
├── /explore              # Discover Situations (Search, category filters, creator links)
├── /create               # 5-Step Creation Studio (Author, preview, publish)
├── /profile              # Personal Profile (Overview, My Mirrors, Activity, Saved)
├── /profile?creator=...  # Creator Profile (Public view of situations by author)
├── /login                # Demo Session Sign-In
├── /signup               # Demo Session Registration
├── /how-it-works         # Step-by-Step Experience Guide
├── /about                # Platform Manifesto & The Social Triad
└── /* (Catch-all)        # Custom 404 with return link
```

### Navigation Modalities
- **Desktop Header**: Persistent sticky navigation with active route highlights, direct action buttons, and user avatar.
- **Mobile Drawer**: Slide-out overlay drawer accessible via hamburger menu, fully trapping focus and supporting ESC key dismissal.

---

## 15. Accessibility Implementation

Accessibility was treated as an essential product requirement rather than an afterthought:

### Implemented Capabilities
- **Semantic Structure**: Built using native HTML5 landmark elements (`<header>`, `<main>`, `<section>`, `<nav>`) and proper heading depth (`<h1>` through `<h3>`).
- **Keyboard Traversal**: Every interactive control (decision cards, action buttons, tab switchers, inputs) is reachable and operable via keyboard (`Tab`, `Shift+Tab`, `Space`, `Enter`).
- **Visible Focus States**: Custom, high-contrast focus rings (`outline: 2px solid var(--cobalt)`) styled with `:focus-visible` to ensure keyboard navigation is clear.
- **ARIA Live Announcements**: Dynamic alerts use `aria-live="polite"` to notify screen reader users when a decision is locked or when tabs switch.
- **User Preference Controls**:
  - **Reduce Motion**: Disables Framer Motion springs and CSS animations for users with vestibular sensitivities.
  - **Larger Text**: Increases base typographical scaling across all screens.
  - **High Contrast**: Heightens border contrast and color separation.

> **Honest Compliance Statement**: Accessibility was manually verified across all primary user flows using keyboard navigation and accessibility inspectors. We do not claim third-party "WCAG certification."

---

## 16. Responsive Design System

The application was built from the ground up using a responsive fluid grid system:

### Breakpoint Verification Matrix
- **375px (Small Mobile / iPhone SE)**: Single-column stacked decision cards; full-width action buttons; touch-optimized hit areas (minimum 44px); hidden decorative illustrations to preserve screen real estate.
- **390px (Modern Mobile / iPhone 13/14/15)**: Enhanced spacing; fluid card typography; accessible mobile navigation drawer.
- **768px (Tablet / iPad)**: Two-column Explore grid; flexible split-reveal view; persistent header navigation.
- **1024px (Small Laptop / iPad Pro)**: Side-by-side split reveal; multi-column metadata; inline author attribution.
- **1440px+ (Desktop & Ultra-wide)**: Constrained max-width editorial containers (1200px); balanced whitespace; refined typographic hierarchy.

> **Verification Note**: All layouts were manually tested across these breakpoints; no unintended horizontal overflow occurs.

---

## 17. Technical Architecture

### Architectural Flow Diagram

```
┌────────────────────────────────────────────────────────┐
│                   BROWSER CLIENT                       │
│  React 19  •  TypeScript 5.6  •  Vite 7  •  Wouter    │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    PAGE ROUTER                         │
│   Landing • Mirror • Explore • Create • Profile        │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│               COMPONENT & UI LAYER                     │
│  - Crossroads Engine       - Explore Filters           │
│  - Split Reveal Views      - Creation Studio Form      │
│  - Perspective DNA Radar   - Mobile Navigation Drawer  │
│  - Top-Level ErrorBoundary (Fault Isolation)           │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│          DEFENSIVE STORAGE & NORMALIZATION             │
│            (client/src/lib/storage.ts)                 │
│  - normalizeSituationRecord()                          │
│  - normalizeEchoRecord()                               │
│  - Safe JSON.parse wrappers with try/catch fallback    │
│  - Activity & DNA calculation utilities                │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│               LOCALSTORAGE REPOSITORY                  │
│  mirror_situations_v3   mirror_activity_v3             │
│  mirror_echoes_v3       mirror_user_v3                 │
│  mirror_saved_v3        mirror_settings_v3             │
└────────────────────────────────────────────────────────┘
```

### Key Source Files & Responsibilities
- `client/src/App.tsx`: Main application entry point containing page routers, interactive crossroads components, creation workflows, profile views, and modal dialogs.
- `client/src/lib/storage.ts`: The central data abstraction layer managing schema normalizations, defensive reads/writes, seed situation defaults, and user activity logging.
- `client/src/lib/storage.test.ts`: Automated test suite exercising storage persistence, legacy schema migrations, corrupted JSON recovery, and activity tracking.
- `client/src/components/ErrorBoundary.tsx`: Catches unhandled React lifecycle errors and provides an accessible recovery screen preventing white-screen crashes.
- `client/src/index.css`: Complete design system tokens, typography definitions, responsive layout rules, and animation styles.

---

## 18. Data Persistence & Schemas

All domain entities are strictly typed in TypeScript and saved to browser `localStorage`:

### 1. Situation Entity
```typescript
export interface Situation {
  id: string;
  creator: string;
  creatorAvatar: string;
  creatorBio?: string;
  creatorAge: string;
  creatorCity: string;
  category: string;
  title: string;
  short: string;
  prompt: string;
  options: MirrorOption[];
  original: string; // The creator's chosen path
  whyTitle: string;
  why: string;
  context: string;
  tags: string[];
  person?: string; // Legacy alias
  avatar?: string; // Legacy alias
  age?: string;    // Legacy alias
  city?: string;   // Legacy alias
  isUserCreated?: boolean;
  createdAt?: number;
}
```

### 2. Mirror Option Entity
```typescript
export interface MirrorOption {
  id: string;
  label: string;
  sub: string;
  tone?: "dark" | "cobalt" | "peach" | "sage";
}
```

### 3. Echo Entity
```typescript
export interface Echo {
  id: string;
  situationId: string;
  author: string;
  authorAvatar?: string;
  authorTag?: string;
  choice: string;
  reflection: "same" | "changed" | "unsure";
  note: string;
  timestamp: string;
  isCurrentUser?: boolean;
}
```

### 4. User Activity Entity
```typescript
export interface UserActivity {
  exploredMirrorIds: string[];
  decisions: Record<string, { choice: string; timestamp: number }>;
  reflections: Record<string, { reflection: "same" | "changed" | "unsure"; timestamp: number }>;
  perspectiveShiftNotes: Record<string, string>;
  dnaScores?: {
    intuitionVsCalculation: number;
    independenceVsEmpathy: number;
    riskTolerance: number;
  };
}
```

---

## 19. Error Resilience & Defensive Storage

A common point of failure in client-side applications is corrupted or malformed `localStorage` crashing the app on startup. MIRROR implements multi-tiered defensive programming:

### Defensive Normalization
Every record loaded from storage passes through `normalizeSituationRecord()`:
- Missing creators fallback to `"Anonymous Creator"`.
- Empty or truncated option lists are automatically restored with minimum viable choices.
- Missing titles or prompts are populated with safe defaults.
- Undefined tags fallback to `["PERSPECTIVE"]`.

### Malformed JSON Protection
All `localStorage.getItem()` calls are guarded by `try/catch` wrappers. If a user's browser has corrupted JSON (e.g., incomplete stringification or manual tampering):
1. The error is intercepted and logged.
2. The storage layer discards the corrupt payload and restores clean default seeds.
3. The application continues rendering without crashing.

### ErrorBoundary
Any unexpected rendering error is trapped by `<ErrorBoundary>`, presenting a clean, styled recovery screen with options to reset local state or return home.

---

## 20. Testing & Verification Evidence

All verification commands were executed directly against the codebase:

### 1. Automated Unit Tests
Executed via Vitest (`npx vitest run`):
```
 ✓ src/lib/storage.test.ts (10 tests) 18ms
   - loads default situations when storage is empty
   - saves and retrieves custom situations
   - records user decision accurately
   - records user reflection accurately
   - saves and toggles saved situations
   - updates demo user profile
   - calculates perspective DNA dynamically
   - normalizes malformed situation records safely
   - persists and queries echoes by situation
   - resists all forms of corrupted/malformed localStorage without crashing

 Test Files  1 passed (1)
      Tests  10 passed (10)
   Duration  754ms
```

### 2. Production Build
Executed via `npm run build`:
```
> vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

✓ 1974 modules transformed.
../dist/public/index.html                   0.60 kB │ gzip:   0.37 kB
../dist/public/assets/index-OF2N_U2C.css  176.46 kB │ gzip:  30.23 kB
../dist/public/assets/index-Cxru4Je2.js   491.07 kB │ gzip: 144.99 kB
✓ built in 5.76s
dist/index.js  788b
Exit code: 0
```

### 3. Static Type Analysis
Executed via `npm run check` (`tsc --noEmit`):
```
Exit code: 0 (0 TypeScript errors)
```

### 4. Console Verification
Across all verified routes, the browser developer console reported **0 runtime errors**.

---

## 21. Feature-to-Requirement Compliance Matrix

| Evaluation Area | What MIRROR Provides | UI Location | Why It Satisfies Requirement |
|---|---|---|---|
| **1. Core Social Interaction** | Blind decision-making, choice locking, split perspective reveal, and context unveiling. | `/mirror`, `/mirror/:id` | Replaces passive liking with active decision-making and genuine perspective comparison. |
| **2. User Profiles & Identity** | Profile overview, perspective thesis, My Mirrors, activity ledger, and dynamic Perspective DNA. | `/profile` | Replaces vanity follower counts with a qualitative record of how the user thinks and decides. |
| **3. Content Creation & Sharing** | 5-step guided creation studio to author real-life crossroads with custom paths and reasoning. | `/create` | Empowers users to publish high-leverage crossroads; includes instant link copying and web sharing. |
| **4. Content Discovery** | Multi-attribute search, 7 category filters, Today's Mirror, and participation status indicators. | `/explore`, `/` | Organizes content around human themes rather than algorithmic engagement loops. |
| **5. Community & Connection** | The Echoes tapestry allowing participants to leave perspective notes grouped by reflection outcome. | `/mirror/:id#echoes` | Fosters empathy and collective wisdom without toxic comment threads or like competition. |
| **6. Interactive Engagement** | Two-stage tactile locking, split-screen reveal animation, and post-reveal reflection choices. | `/mirror` | Makes engagement tactile, purposeful, and psychologically committing. |
| **7. Personalized Experience** | Interactive Perspective DNA and Journey progression calculated from actual user decisions. | `/profile`, `/explore` | Personalization is driven by transparent user actions rather than invasive algorithmic tracking. |
| **8. Navigation & User Flow** | Declarative Wouter routing, persistent header, mobile drawer, and catch-all 404 recovery. | Global navigation | Flawless end-to-end traversal across all 10 core routes with zero dead ends. |
| **9. Responsive & Accessible UI** | Mobile-first layout verified from 375px to 1440px+; keyboard support, focus rings, and ARIA alerts. | Entire application | Ensures universal usability across diverse devices and assistive technologies. |
| **10. Creative & Original Design** | Editorial aesthetic featuring warm ivory, charcoal, and electric cobalt typography. | Entire design system | Distinctive visual language that rejects both generic SaaS aesthetics and traditional feed clones. |

---

## 22. Bonus Evaluation Areas

### 1. Accessibility Features
- **Full Keyboard Navigation**: Every action can be completed without a mouse.
- **Focus Rings**: Non-clipped, high-contrast `:focus-visible` styling.
- **Dynamic Live Regions**: Announces decision commits to screen readers via `aria-live`.
- **System Settings**: In-app toggles for *Reduce Motion*, *Larger Text*, and *High Contrast*.

### 2. Performance Engineering
- **Zero Heavy Frameworks**: No Three.js, heavy 3D canvases, or monolithic chart suites.
- **Hardware-Accelerated Transitions**: Exclusively animates `transform` and `opacity`.
- **Zero Blocking Network Requests**: Client-side storage provides sub-millisecond route transitions.
- *Performance Statement*: Performance was engineered with clean implementation practices. Automated Lighthouse performance scores were not available in the final local verification environment.

### 3. Unique Interaction Model
- **Blind Decision**: Sequestering the author's answer until participant commitment.
- **Tactile Lock**: A distinct commitment phase that prevents casual clicking.
- **Split Reveal**: Side-by-side comparative layout contrasting participant vs. creator.
- **The Shift Assessment**: Explicitly asking whether new context altered one's original mindset.

### 4. Creative Storytelling
- **Editorial Tone**: Engaging copy that challenges conventional social patterns.
- **The Six-Stage Narrative**: A structured pedagogical journey from *Create* to *Echo*.
- **The Platform Manifesto**: Articulated on `/about` and `/how-it-works`, grounding the product in human empathy.

### 5. Animation Specifications
1. **Hero Perspective Tilt**: Subtle, graceful hover tilt on the landing page perspective card simulating depth.
2. **Choice Lock & Recede**: Unselected options softly fade while the chosen option transitions into the locked state.
3. **Split Reveal Wipe**: Comparative split container expands smoothly to reveal both perspectives side-by-side.
4. **Echo Entry Animation**: New perspective notes animate upward with subtle opacity fading upon submission.
5. **Toast Confirmation**: Clean, unobtrusive feedback toast notifying users of copied share links.

### 6. Design System Tokens
- **Palette**:
  - `Warm Ivory`: `#FBF9F5` (Background surface)
  - `Charcoal`: `#1F1E1D` (Primary typography and dark accents)
  - `Electric Cobalt`: `#2C40E8` (Focal highlights, active states, and brand anchor)
  - `Soft Peach`: `#F5EBE6` (Secondary option accents)
  - `Sage`: `#E8EFE9` (Reflective / positive states)
  - `Sand`: `#F0ECE1` (Neutral borders and card backgrounds)
- **Typography**:
  - Headings: `DM Serif Display` (Editorial gravitas and warmth)
  - Body & Controls: `Manrope` (Clean, contemporary, highly legible sans-serif)

---

## 23. Architectural Limitations & Prototype Scope

For complete transparency during hackathon evaluation:

1. **Frontend-Only Architecture**: The application operates entirely in the browser. There is no cloud backend, SQL database, or serverless API.
2. **Demo Authentication**: User accounts and sessions are maintained locally in browser memory and `localStorage`.
3. **Local Data Persistence**: Situations authored and reflections recorded on one device do not automatically synchronize to other devices.
4. **No Centralized Moderation**: User-created dilemmas and Echoes are stored locally; a production platform would require an automated and human moderation queue.
5. **Avatar Fallbacks**: In offline or restricted network environments, external avatar image URLs gracefully fall back to styled monogram initials.
6. **Lighthouse Audit**: An automated Lighthouse audit was not available during the final local verification run.

---

## 24. Future Evolution & Roadmap

If MIRROR progresses beyond this hackathon prototype, the recommended architectural roadmap includes:

- **Server-Backed Persistence**: Migrate the existing `storage.ts` interface to a secure PostgreSQL/Prisma or Firebase backend.
- **Production Authentication**: Implement passwordless authentication via WebAuthn / Passkeys or OAuth 2.0 (Google, Apple, GitHub).
- **Cross-Device Synchronization**: Enable real-time sync of personal Perspective DNA and bookmarked dilemmas across web and native mobile apps.
- **Collaborative & Multiparty Dilemmas**: Support crossroads authored by two opposing individuals (e.g., co-founders or partners) representing conflicting views of the same event.
- **Nuanced Perspective Analytics**: Longitudinal tracking showing how a user's decision-making frameworks evolve across different life stages.
- **Creator Audio & Video Context**: Allow creators to narrate their context through optional 60-second voice notes or short video context clips.

---

## Conclusion

MIRROR demonstrates that social technology does not have to rely on addiction loops, like counts, and algorithmic feeds to create compelling human connections. By grounding social interaction in the timeless human practice of sharing crossroads and contemplating perspectives, MIRROR offers a glimpse into a healthier, more thoughtful future for social media.
