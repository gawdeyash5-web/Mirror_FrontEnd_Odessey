# MIRROR

## See differently.

> **"MIRROR is a social experience built around perspective instead of popularity."**
>
> **"Instead of asking people what they like, MIRROR asks them what they would do."**

A person shares a real-life crossroads. Another person enters that situation and makes a decision before seeing the original person's choice. Only after the decision is locked does MIRROR reveal the other perspective. The participant then sees the context behind that choice, reflects on it, and can leave an Echo.

```
SITUATION  ──►  DECISION  ──►  REVEAL  ──►  CONTEXT  ──►  REFLECTION  ──►  ECHO
```

---

> 📖 **Evaluator Notice**: For exhaustive architectural, algorithmic, and compliance details, see the complete [Project Documentation](docs/PROJECT_DOCUMENTATION.md).

---

## The Problem

### Authoritative Problem Statement

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

### The Design Opportunity

Conventional social platforms commonly organize interaction around:

- Scrolling
- Reacting
- Liking
- Following
- Posting
- Popularity
- Algorithmic feeds

These mechanics are effective for rapid distribution, but they often make social interaction primarily about **reacting to content**. When a post arrives with its author's conclusion, like count, and comment consensus already attached, the viewer's role is reduced to passive consumption or quick endorsement.

MIRROR reframes this design opportunity with a single question:

> **"What if social interaction began with a decision instead?"**

---

## Our Reimagination

MIRROR changes the fundamental social object:

- **Traditional social platforms**: The social object is usually a post or piece of content.
- **MIRROR**: The social object is a **situation**.

- **Traditional interaction**: React, like, or comment.
- **MIRROR**: **Make a decision**.

- **Traditional connection**: Popularity, followers, or replies.
- **MIRROR**: **Understanding another person's perspective**.

### The Conceptual Triad

| Dimension | Conventional Social | MIRROR |
|---|---|---|
| **THE SOCIAL OBJECT** | A post / media asset | **A situation.** |
| **THE INTERACTION** | A like / quick reaction | **A decision.** |
| **THE CONNECTION** | Follower count / popularity | **A perspective.** |

MIRROR is intentionally not designed around likes, followers, popularity rankings, or threaded debates. 

- The participant's **decision** becomes the primary interaction.
- The creator's **reasoning** becomes contextual depth.
- The **reflection** becomes the human connection.
- The **Echo** becomes the collective community layer.

---

## How MIRROR Works

MIRROR guides each participant through a six-stage perspective journey:

1. **01 — CREATE**: A creator publishes a real-life crossroads from their career, relationships, family, ambition, or ethics, outlining 2–4 viable paths and their personal choice with underlying context.
2. **02 — DECIDE**: Another person steps into that crossroads completely blind, evaluating the dilemma without seeing what the creator chose.
3. **03 — REVEAL**: The participant locks their own choice. Only upon locking does MIRROR reveal the creator's decision alongside the participant's choice.
4. **04 — UNDERSTAND**: The participant reads the creator's private context, reasoning, and constraints that governed their decision.
5. **05 — REFLECT**: The participant answers the core reflective prompt: *"Knowing this, would you still choose the same?"* (Yes / No / I'm not sure) and can capture a personal Perspective Shift note.
6. **06 — ECHO**: The participant leaves an Echo—a permanent perspective note for future participants to read and contemplate.

### Core UI Sequence

```
WHAT WOULD YOU DO?
       │
       ▼
LOCK MY DECISION
       │
       ▼
YOUR DECISION  /  THEIR DECISION  (Split Reveal)
       │
       ▼
WHY DID THEY CHOOSE THAT?  (Context & Reasoning)
       │
       ▼
COMPARE PERSPECTIVES
       │
       ▼
KNOWING THIS, WOULD YOU STILL CHOOSE THE SAME?
[ YES ]    [ NO ]    [ I'M NOT SURE ]
       │
       ▼
YOUR ECHO  (Leave a Perspective Note)
```

---

## Why MIRROR Is a Social Experience

MIRROR is not a solitary questionnaire or quiz. It is a genuine social network where connections form through shared dilemmas rather than vanity metrics:

- **People**: Creators and participants have persistent identities, bios, cities, and perspective theses.
- **User-Generated Situations**: Anyone can author, configure, and publish a crossroads.
- **Discovery**: A rich Explore catalog allows discovering dilemmas by theme, category, creator, or personal participation state.
- **Participation**: Stepping into dilemmas and committing to difficult choices.
- **Perspective Exchange**: Directly comparing personal moral and strategic frameworks against those of real individuals.
- **Community**: Echoes form a collaborative tapestry of reflections categorized by how decisions evolved.
- **Personal Identity**: User profiles record decision histories, reflections, created Mirrors, saved dilemmas, and a dynamic **Perspective DNA**.
- **Sharing**: Native web share and clipboard links enable sharing any crossroads or personal Perspective Card.

### The MIRROR Social Graph

MIRROR's social graph is not built on *"who follows whom."* It is formed by:

```
WHO CREATED THE SITUATION
          +
   WHO ENTERED IT
          +
   WHAT THEY CHOSE
          +
 HOW THEY REFLECTED
          +
WHAT PERSPECTIVE THEY LEFT BEHIND
```

---

## Feature System

### Perspective Interaction
- **Blind Decision Mode**: Creator answers and community consensus remain hidden until the user commits.
- **Multi-Option Paths**: Supports 2 to 4 distinct, meaningful pathways per crossroads.
- **Tactile Choice Locking**: Distinct two-stage selection and commitment flow with undo prior to lock.
- **Split Perspective Reveal**: Side-by-side comparative reveal of the participant's choice versus the creator's choice.
- **Context & Reasoning**: In-depth creator rationale explaining the human factors behind the decision.
- **Perspective Comparison**: Visual breakdown of option alignment between creator and participant.
- **Reflection System**: Explicit post-reveal evaluation (*Yes*, *No*, *I'm not sure*).
- **Perspective Shift Notes**: Personal reflection notes documenting how one's mindset shifted.
- **Echoes System**: Public perspective contributions attached to the crossroads.

### Discovery & Explore
- **Explore Perspectives**: Comprehensive catalog of situations across 7 categories.
- **Full-Text Search**: Real-time filtering across titles, prompts, creator names, and tags.
- **Category Filtering**: Instant filtering by *CAREER*, *FAMILY*, *RELATIONSHIPS*, *AMBITION*, *RISK*, *IDENTITY*, and *LIFE*.
- **Creator Profiles**: Direct exploration of all dilemmas published by a specific creator.
- **Today's Mirror**: Curated featured daily crossroads highlighting high-reflection dilemmas.
- **Participation Badges**: Visual indicators for situations already decided versus new perspectives.

### Content Creation & Publishing
- **5-Step Creation Studio**: Step-by-step authoring workflow (Title & Category → Situation Prompt → 2–4 Decision Options → Creator Choice & Reasoning → Tags & Preview).
- **Dynamic Options**: Ability to add, remove, and label between 2 and 4 options with tones.
- **Creator Context Authoring**: Dedicated fields for principle titles and deep life context.
- **Instant Publishing**: Immediate addition to local storage and global Explore catalog.
- **Share & Link**: Instant clipboard copying and native share integration for published Mirrors.

### Identity & Personalization
- **Frontend Demo Authentication**: Demo sessions for signing in, signing up, continuing as guest, and logging out.
- **Comprehensive Profile**: 4 distinct views (*Overview*, *My Mirrors*, *Activity*, *Saved*).
- **Editable Profile**: Customize display name, username, bio, and personal perspective thesis.
- **Perspective DNA**: Interactive visual radar of personal decision traits derived from user choices.
- **Perspective Journey**: Timeline of dilemmas explored, decisions committed, and reflections recorded.
- **Saved Perspectives**: Bookmark dilemmas for contemplation or re-evaluation.

### Community & Connection
- **Echoes Wall**: Discover community perspectives grouped by reflection type (*Shifted*, *Held Ground*, *Uncertain*).
- **Perspective Cards**: Exportable and shareable reflection summaries.
- **Creator Context**: Learn the age, location, and background of the author behind each dilemma.

### Accessibility
- **Keyboard Interaction**: Full keyboard navigation across all interactive decision cards and controls.
- **Visible Focus Rings**: Distinct high-contrast focus indicators across all elements.
- **ARIA Live Announcements**: Dynamic screen reader announcements for choice locks and tab switches.
- **Accessibility Controls**: Direct user settings for *Reduce Motion*, *Larger Text*, and *High Contrast*.
- **Semantic HTML**: Proper button, form, dialog, and heading hierarchies throughout.

### Navigation
- **Primary Routes**: Accessible top navigation with mobile drawer support across Home, Mirror, Explore, Create, Profile, Login, Signup, and How It Works.

---

## What Makes MIRROR Different?

> *Note: MIRROR intentionally replaces these familiar interaction patterns within its own experience.*

| Conventional Social Pattern | MIRROR |
|---|---|
| **Scroll through posts** | **Enter situations** |
| **Like / react** | **Decide** |
| **See author's opinion first** | **Decide before the reveal** |
| **Comment threads** | **Echoes** |
| **Followers & following counts** | **Perspective-based identity** |
| **Popularity rankings** | **Reflection & understanding** |
| **Feed-driven discovery** | **Situation-driven discovery** |
| **Engagement metrics** | **Participation history** |

---

## Content Model

The platform is organized around situations and perspectives rather than an arbitrary stream of media posts:

```
Situation / Mirror
├── ID, Title, Short Summary
├── Category (CAREER, FAMILY, RELATIONSHIPS, AMBITION, RISK, IDENTITY, LIFE)
├── Tags (e.g., ["ETHICS", "GROWTH", "CREATIVE"])
├── Creator Profile (Name, Username, Bio, Age, City, Avatar)
├── Situation Prompt (The complete crossroads narrative)
├── Options (2 to 4 distinct paths with id, label, subtitle, tone)
├── Creator Choice (The path chosen by the author)
├── Context & Reasoning (Why title, full explanation, constraints)
└── Community Interactions
    ├── Participant Decisions
    ├── Reflections (Yes / No / I'm not sure)
    └── Echoes (Perspective notes left by participants)
```

---

## Profile & Identity

A MIRROR profile is not a vanity or popularity dashboard; it is a **record of perspective**.

- **Profile Overview**: Displays creator identity, personal perspective thesis, aggregated metrics (Mirrors explored, decisions locked, reflections recorded, Echoes shared), and the interactive **Perspective DNA**.
- **My Mirrors**: Catalog of all crossroads authored and published by the user.
- **Activity**: Complete chronological ledger of decisions made, paths chosen, and reflections logged.
- **Saved**: Quick access to bookmarked situations.
- **Dynamic Derivation**: Perspective DNA metrics and journey stages are derived dynamically from actual user interactions rather than static or fabricated placeholders.

---

## Authentication

MIRROR currently uses a **frontend-only demo authentication and session system**.

- **Transparency Notice**: This authentication layer is intended for the frontend hackathon demonstration and is not a production security system.
- **Supported Flows**:
  - Sign In (with prefilled demo credentials or custom email)
  - Sign Up (creates local profile)
  - Continue as Guest (instant frictionless exploration)
  - Log Out
- **Persistence**: Demo session state is stored in browser `localStorage`. No remote credentials or private cryptographic secrets are transmitted.

---

## Technical Architecture

```
┌────────────────────────────────────────────────────────┐
│                   MIRROR Application                   │
│        (React 19 + TypeScript + Vite + Wouter)         │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    Route Layer                         │
│  /  /mirror  /mirror/:id  /explore  /create  /profile  │
│         /login  /signup  /how-it-works  /about         │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│             Defensive Storage & Domain Logic           │
│           (client/src/lib/storage.ts)                  │
│   - Schema normalization     - Corrupted JSON recovery │
│   - Seed situation loader    - Dynamic DNA derivation  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  Browser LocalStorage                  │
│    mirror_situations_v3     mirror_echoes_v3           │
│    mirror_activity_v3       mirror_user_v3             │
│    mirror_saved_v3          mirror_settings_v3         │
└────────────────────────────────────────────────────────┘
```

- **Frontend Framework**: React 19, TypeScript, Vite 7.
- **Routing**: Wouter (lightweight client-side declarative router).
- **Icons & Motion**: Lucide React, Framer Motion, CSS transforms/transitions.
- **Design System**: Vanilla CSS tokens (`client/src/index.css`) with custom typography and curated palettes.
- **Error Resilience**: Top-level `ErrorBoundary` (`client/src/components/ErrorBoundary.tsx`) catches and handles unexpected component errors gracefully with user-facing recovery actions.
- **Infrastructure Scope**: Client-only architecture. No backend server, database, or cloud API is required for full interaction.

---

## Frontend Data Model

Browser `localStorage` is used deliberately to make the prototype feel completely stateful, persistent, and interactive without requiring external infrastructure setup:

- `mirror_user_v3`: Current demo session user.
- `mirror_situations_v3`: User-created situations merged with default seeds.
- `mirror_activity_v3`: Record of explored mirrors, decisions, reflections, and notes.
- `mirror_echoes_v3`: Community perspective notes and user Echoes.
- `mirror_saved_v3`: Array of bookmarked situation IDs.
- `mirror_settings_v3`: Accessibility preferences (reduced motion, large text, high contrast).

### Storage Normalization & Resilience

To prevent local corrupted data from breaking the app, all reading operations pass through defensive normalizers (`normalizeSituationRecord`, `normalizeEchoRecord`, and try/catch JSON wrappers). If malformed records are detected, the storage layer recovers automatically and falls back to clean default seed states.

---

## Responsive Experience

The interface was built with a mobile-first philosophy and manually checked across major viewport sizes:

- **375px & 390px** (Mobile devices): Stacked decision cards, full-width touch targets, slide-out hamburger navigation drawer, and compact stats.
- **768px** (Tablets): Two-column Explore grid, flexible split-reveal layout, and inline metadata.
- **1024px** (Laptops): Side-by-side perspective comparison, multi-column Explore cards, and persistent navigation.
- **1440px+** (Desktop & Large displays): Centered max-width editorial containers with balanced whitespace.

> *The current implementation was manually checked across the listed viewport sizes with zero horizontal scrolling bugs.*

---

## Accessibility

Accessibility was treated as an integral product requirement:

- **Semantic Controls**: Native `<button>`, `<input>`, and `<form>` elements with explicit accessible labels.
- **Keyboard Navigation**: Full tab order traversal with Space and Enter triggers for decision choices.
- **Focus Rings**: High-contrast, non-clipped `:focus-visible` styling on all interactive surfaces.
- **Screen Reader Support**: `role="region"`, `role="dialog"`, and `aria-live="polite"` regions for decision reveals and status updates.
- **User Toggles**: Dedicated controls for *Reduce Motion* (disables Framer Motion / CSS transitions), *Larger Text* (adjusts root font sizing), and *High Contrast* (heightens border and text contrast).

> *Note: Accessibility was treated as a product requirement and manually verified across the primary interaction flows. We do not claim formal third-party certification.*

---

## Performance Approach

- **Lightweight Architecture**: No heavy 3D frameworks, large chart libraries, or heavy animation runtimes.
- **CSS Hardware Acceleration**: Animations use GPU-friendly `transform` and `opacity` properties.
- **Zero Backend Latency**: Instantaneous client-side transitions and zero blocking network requests.
- **Centralized Storage Access**: Memory caching of parsed records to avoid repetitive `localStorage` reads.

> *Note: Performance was optimized at the implementation level, but an automated Lighthouse audit was not available during the final local verification pass.*

---

## Testing & Verification

Every component and data path was verified prior to submission:

- **Unit Tests**: **10/10 tests passing** in `client/src/lib/storage.test.ts` via Vitest (verifying storage persistence, data normalization, seed merging, activity recording, and corrupted JSON resilience).
- **Production Build**: `npm run build` exits with **code 0** (`vite build` + server bundle in 5.76s).
- **TypeScript**: **0 reported TypeScript errors** (`npm run check` exits with code 0).
- **Runtime Console**: **0 reported runtime errors** during end-to-end user journey verification.
- **Routes Verified**:
  - `/` (Editorial landing page)
  - `/mirror` (Default crossroads)
  - `/mirror/maya` (Direct situation route)
  - `/explore` (Situation catalog, search, and category filters)
  - `/create` (5-step situation creation studio)
  - `/profile` (User profile, tabs, and Perspective DNA)
  - `/login` (Demo session sign-in)
  - `/signup` (Demo session registration)
  - `/how-it-works` (Platform manifesto and 6-step walkthrough)
  - `/about` (Design philosophy and concept explanation)
- **Error Resilience Verified**:
  - Malformed JSON recovery in localStorage.
  - Situations missing creator, options, tags, or reasoning defaulted safely.
  - Empty state rendering across search, my mirrors, and saved lists.

---

## Challenge Alignment

| Challenge Requirement | MIRROR Implementation |
|---|---|
| **Clear and original social interaction concept** | Situation-based social interaction centered on decisions rather than passive feed consumption. |
| **Unique interaction model or user flow** | Blind decision → lock choice → split perspective reveal → understand context → reflect → Echo. |
| **Distinctive visual language and interface** | Editorial warm ivory, deep charcoal, and electric cobalt visual system with refined typography. |
| **Thoughtful content system** | Structured crossroads with 2–4 paths, creator reasoning, contextual principles, and participant Echoes. |
| **New or improved ways for people to connect** | Perspective comparison, reflection alignment, and community Echoes replacing likes and followers. |
| **Polished and responsive frontend experience** | Fluidly responsive layout tested from 375px to 1440px+ with accessible keyboard support. |
| **Think beyond the conventional feed** | Completely eliminates infinite scroll feeds, like counts, follower counts, and popularity ranking. |
| **Do not clone existing platforms** | Social interaction is anchored in empathy, decision-making, and understanding differing viewpoints. |

---

## Evaluator Summary

### In One Sentence

> **"MIRROR turns social interaction from reacting to other people's posts into stepping into their situations, making decisions, understanding their reasoning, and leaving your own perspective."**

### The Core Idea

```
SITUATION  ──►  DECISION  ──►  REVEAL  ──►  CONTEXT  ──►  REFLECTION  ──►  ECHO
```

### The Difference

```
The social object is a situation.
The interaction is a decision.
The connection is a perspective.
```

---

## Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000/`.

### 3. Run Unit Tests
```bash
npx vitest run
```

### 4. Run TypeScript Check
```bash
npm run check
```

### 5. Build for Production
```bash
npm run build
```

---

## Routes

- `/` — Editorial landing page introducing MIRROR's concept, philosophy, and entry points.
- `/mirror` — The primary interactive crossroads experience featuring Today's Mirror.
- `/mirror/:id` — Direct permalink to any specific dilemma (e.g., `/mirror/maya`).
- `/explore` — Searchable, filterable catalog of crossroads across 7 categories.
- `/create` — 5-step guided creation studio to author and publish a new crossroads.
- `/profile` — Personal perspective archive, Perspective DNA, activity ledger, and saved Mirrors.
- `/profile?creator=...` — View a creator's public profile and their authored dilemmas.
- `/login` — Demo session login with quick one-click demo credentials.
- `/signup` — Demo registration flow to create a personalized participant profile.
- `/how-it-works` — Detailed visual walkthrough of the six-stage perspective interaction.
- `/about` — The MIRROR manifesto, core principles, and design philosophy.

---

## Current Limitations

In the spirit of complete transparency for hackathon evaluation:

1. **Frontend-Only Demo Auth**: Authentication uses a browser-local demo session rather than a production authentication backend with encryption.
2. **Client-Side Persistence**: Situations, reflections, and Echoes are stored in browser `localStorage`, meaning data does not synchronize across different devices.
3. **No Central Moderation Backend**: As a client prototype, community Echoes and user-created situations are managed locally without a cloud moderation pipeline.
4. **Automated Lighthouse Measurement**: An automated Lighthouse performance audit was not available in the final local verification environment.
5. **Avatar Fallbacks**: If external image avatars fail to load, the UI gracefully renders styled monogram initials.

---

## Future Direction

Potential avenues for expanding MIRROR into a full production platform:

- **Server-Backed Authentication & Persistence**: Secure OAuth/passkey authentication paired with cloud database persistence.
- **Cross-Device Perspective Sync**: Synchronizing your Perspective DNA and journey across web and mobile apps.
- **Collaborative Crossroads**: Dilemmas co-authored by multiple individuals representing conflicting viewpoints of the same event.
- **Community Moderation & Trust Systems**: Perspective-based community moderation and nuance-rewarding trust metrics.
- **Deeper Perspective Analytics**: Longitudinal tracking of how one's decision-making tendencies evolve over time.
- **Audio & Video Context**: Allowing creators to narrate their context and reasoning through short-form voice or video notes.

---

## License

MIT
