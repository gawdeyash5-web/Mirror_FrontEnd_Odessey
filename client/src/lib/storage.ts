export interface MirrorOption {
  id: string;
  label: string;
  sub: string;
  tone: "cobalt" | "peach" | "sage" | "sand";
}

export interface Echo {
  id: string;
  mirrorId: string;
  reflection: "Yes" | "No" | "I'm not sure";
  path: string; // The selected path/option label
  text: string;
  timestamp: number;
  author: string;
  authorAvatar?: string;
  authorTag?: string;
  isCurrentUser?: boolean;
}

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
  original: string; // matches option.label
  whyTitle: string;
  why: string;
  context: string;
  tags: string[];
  person?: string;
  avatar?: string;
  age?: string;
  city?: string;
  isUserCreated?: boolean;
  createdAt?: number;
}

export interface DemoUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarInitials: string;
  bio: string;
  perspectiveDescription: string;
  isGuest?: boolean;
}

export interface AppSettings {
  reduceMotion: boolean;
  largerText: boolean;
  highContrast: boolean;
}

export interface UserActivity {
  exploredMirrorIds: string[];
  decisions: Record<string, { choice: string; timestamp: number }>;
  reflections: Record<string, { reflection: "Yes" | "No" | "I'm not sure"; timestamp: number }>;
  createdMirrorIds: string[];
  echoesCount: number;
  perspectiveShifts?: Record<string, { note: string; timestamp: number }>;
}

export const defaultSituations: Situation[] = [
  {
    id: "maya",
    creator: "Maya Shah",
    creatorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=85",
    creatorBio: "Trying to understand people before judging decisions.",
    creatorAge: "32",
    creatorCity: "Bengaluru",
    category: "Career / Ethics",
    title: "The promotion that requires managing out your mentor.",
    short: "A career leap arrives with an impossible condition attached.",
    prompt:
      "You are offered the leadership role you worked seven years to reach. The executive sponsor makes one private condition: your first mandate must be phasing out the senior director who hired and mentored you.",
    options: [
      {
        id: "opt-1",
        label: "Accept the role with conditions",
        sub: "Step into the role and advocate internally to protect your mentor.",
        tone: "cobalt",
      },
      {
        id: "opt-2",
        label: "Decline the promotion entirely",
        sub: "Refuse advancement built on the forced disposal of loyalty.",
        tone: "peach",
      },
      {
        id: "opt-3",
        label: "Take the role and execute the transition with dignity",
        sub: "Control the severance package and transition rather than leaving it to a stranger.",
        tone: "sand",
      },
    ],
    original: "Decline the promotion entirely",
    whyTitle: "Loyalty before the ladder",
    why: "A title won by betraying the person who opened the door for you is a title that robs you of who you are. I would rather build slower on ground I can respect.",
    context:
      "Maya's mentor had stood by her through two failed product launches when company politics favored replacing her. Turning the blade on him for corporate convenience felt like sacrificing the foundational principle of why she loved building teams.",
    tags: ["CAREER", "LOYALTY", "AMBITION", "ETHICS"],
  },
  {
    id: "arjun",
    creator: "Arjun Mehta",
    creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=85",
    creatorBio: "Exploring the fragile line between personal ambition and family duty.",
    creatorAge: "29",
    creatorCity: "Pune",
    category: "Family / Career",
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
    creator: "Mira Sen",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85",
    creatorBio: "Living gently with boundaries and preserving friendships that matter.",
    creatorAge: "34",
    creatorCity: "Mumbai",
    category: "Relationships / Risk",
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
    tags: ["RELATIONSHIPS", "TRUST", "BOUNDARIES", "RISK"],
  },
  {
    id: "noah",
    creator: "Noah Vance",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85",
    creatorBio: "Designing equitable teams and speaking up in high-stakes rooms.",
    creatorAge: "31",
    creatorCity: "London",
    category: "Career / Ethics",
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
    tags: ["CAREER", "CREDIT", "COURAGE", "ETHICS"],
  },
  {
    id: "elena",
    creator: "Elena Rostova",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=85",
    creatorBio: "Navigating startup survival without losing our original compass.",
    creatorAge: "36",
    creatorCity: "Berlin",
    category: "Ambition / Risk",
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
    tags: ["AMBITION", "INTEGRITY", "RISK", "LEADERSHIP"],
  },
];

export const defaultEchoes: Record<string, Echo[]> = {
  maya: [
    {
      id: "echo-maya-1",
      mirrorId: "maya",
      reflection: "Yes",
      path: "Decline the promotion entirely",
      text: "I chose to decline as well. Stepping on the shoulder of the person who lifted you is a debt that never washes off.",
      timestamp: Date.now() - 1000 * 60 * 60 * 18,
      author: "Kavita Rao",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-maya-2",
      mirrorId: "maya",
      reflection: "No",
      path: "Accept the role with conditions",
      text: "I initially wanted to fight for the mentor from the inside. But seeing Maya's conviction made me realize sponsor demands are rarely negotiable once accepted.",
      timestamp: Date.now() - 1000 * 60 * 60 * 30,
      author: "David Chen",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-maya-3",
      mirrorId: "maya",
      reflection: "I'm not sure",
      path: "Take the role and execute the transition with dignity",
      text: "If an outside executive comes in, the mentor might be treated far worse. Protecting someone sometimes requires doing the heartbreaking job yourself.",
      timestamp: Date.now() - 1000 * 60 * 60 * 8,
      author: "Sarah Lind",
      authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    },
  ],
  arjun: [
    {
      id: "echo-arjun-1",
      mirrorId: "arjun",
      reflection: "No",
      path: "Take the job overseas",
      text: "I thought I would choose the job immediately. After reading the context, I'm not sure anymore. Career acceleration can wait, but early-stage Alzheimer's doesn't give you time back.",
      timestamp: Date.now() - 1000 * 60 * 60 * 36,
      author: "Rohan Patel",
      authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-arjun-2",
      mirrorId: "arjun",
      reflection: "Yes",
      path: "Stay in Pune with family",
      text: "I chose STAY because I imagined my own family in the same situation. Some promotions arrive twice in a career; parents don't.",
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
      author: "Ananya Iyer",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-arjun-3",
      mirrorId: "arjun",
      reflection: "I'm not sure",
      path: "Negotiate a 6-month delay",
      text: "I wanted the opportunity, but I couldn't justify making the decision irreversible without exploring whether compromise was possible first.",
      timestamp: Date.now() - 1000 * 60 * 60 * 14,
      author: "Vikram Das",
      authorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-arjun-4",
      mirrorId: "arjun",
      reflection: "Yes",
      path: "Take the job overseas",
      text: "Providing long-term financial security through higher income is often the only sustainable way to fund continuous private medical care in Pune.",
      timestamp: Date.now() - 1000 * 60 * 60 * 6,
      author: "Marcus Aurel",
      authorAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80",
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
      author: "Pooja Varma",
      authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-mira-2",
      mirrorId: "mira",
      reflection: "No",
      path: "Lend the full amount",
      text: "I instinctively wanted to say yes to the full loan. But learning that Mira was carrying private fear for her first home changed everything for me.",
      timestamp: Date.now() - 1000 * 60 * 60 * 20,
      author: "Tara Sen",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-mira-3",
      mirrorId: "mira",
      reflection: "I'm not sure",
      path: "Give a smaller gift",
      text: "Gifting what you can afford protects both your savings and the relationship, though it leaves the larger problem unresolved.",
      timestamp: Date.now() - 1000 * 60 * 60 * 8,
      author: "Nikhil Joshi",
      authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
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
      author: "Elena Rostova",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-noah-2",
      mirrorId: "noah",
      reflection: "I'm not sure",
      path: "Send a written correction",
      text: "Public confrontation in a meeting often triggers defensive backlash. A paper trail preserves team equity while leaving room for diplomatic resolution.",
      timestamp: Date.now() - 1000 * 60 * 60 * 18,
      author: "Maya Shah",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-noah-3",
      mirrorId: "noah",
      reflection: "No",
      path: "Accept the credit quietly",
      text: "I thought about taking the promotion and pulling the team up later, but the erosion of trust in the room happens the minute that meeting ends.",
      timestamp: Date.now() - 1000 * 60 * 60 * 4,
      author: "Liam Thorne",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
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
      author: "Arjun Mehta",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-elena-2",
      mirrorId: "elena",
      reflection: "No",
      path: "Wait until the round closes",
      text: "Twelve people depend on payroll next Tuesday. I chose the company's survival first, but now see how poisonous that compromise is.",
      timestamp: Date.now() - 1000 * 60 * 60 * 12,
      author: "Rachel Green",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "echo-elena-3",
      mirrorId: "elena",
      reflection: "I'm not sure",
      path: "Confront immediately",
      text: "Principles are easy from the sidelines. When payroll is 48 hours away and lives depend on the wire, every decision feels like an existential agony.",
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
      author: "Noah Vance",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
  ],
};

const STORAGE_KEY = "mirror_custom_situations_v1";
const ECHOES_STORAGE_KEY = "mirror_echoes_v1";
const ACTIVITY_STORAGE_KEY = "mirror_user_activity_v1";

export function normalizeSituation(raw: any): Situation {
  if (!raw || typeof raw !== "object") {
    return defaultSituations[0];
  }
  const creator = raw.creator || raw.person || "Maya Shah";
  const creatorAvatar =
    raw.creatorAvatar ||
    raw.avatar ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=85";
  const creatorCity = raw.creatorCity || raw.city || "Global";
  const creatorAge = String(raw.creatorAge || raw.age || "30");
  const creatorBio =
    raw.creatorBio || "Trying to understand people before judging decisions.";
  const title = raw.title || "A crossroads of perspectives";
  const short = raw.short || raw.title || "A crossroads that changed how they think.";
  const prompt = raw.prompt || raw.situation || "What would you choose in this situation?";
  const category = raw.category || "Career / Ethics";
  const options: MirrorOption[] =
    Array.isArray(raw.options) && raw.options.length > 0
      ? raw.options.map((opt: any, idx: number) => ({
          id: String(opt?.id || `opt-${idx + 1}`),
          label: String(opt?.label || `Option ${String.fromCharCode(65 + idx)}`),
          sub: String(opt?.sub || "Consider this path carefully."),
          tone: opt?.tone || "cobalt",
        }))
      : [
          { id: "opt-1", label: "Take the first path", sub: "Step into this alternative.", tone: "cobalt" },
          { id: "opt-2", label: "Take the second path", sub: "Hold your ground.", tone: "peach" },
        ];
  const original = raw.original || raw.creatorChoice || (options[0] ? options[0].label : "First choice");
  const whyTitle = raw.whyTitle || "The principle behind the choice";
  const why = raw.why || raw.reasoning || "Every choice carries its own reason.";
  const context = raw.context || "";
  const tags = Array.isArray(raw.tags) && raw.tags.length > 0
    ? raw.tags.map((t: any) => String(t || "").toUpperCase())
    : ["CAREER", "ETHICS"];

  return {
    id: String(raw.id || `mirror-${Math.random().toString(36).slice(2, 8)}`),
    creator,
    person: creator,
    creatorAvatar,
    avatar: creatorAvatar,
    creatorBio,
    creatorAge,
    age: creatorAge,
    creatorCity,
    city: creatorCity,
    category,
    title,
    short,
    prompt,
    options,
    original,
    whyTitle,
    why,
    context,
    tags,
    isUserCreated: !!raw.isUserCreated,
    createdAt: raw.createdAt || Date.now(),
  };
}

export function loadAllSituations(): Situation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSituations.map(normalizeSituation);
    const custom = JSON.parse(raw);
    if (Array.isArray(custom)) {
      const normalizedCustom = custom
        .filter((c) => c && typeof c === "object")
        .map(normalizeSituation);
      const customIds = new Set(normalizedCustom.map((c) => c.id));
      const filteredDefaults = defaultSituations
        .map(normalizeSituation)
        .filter((d) => !customIds.has(d.id));
      return [...normalizedCustom, ...filteredDefaults];
    }
  } catch (e) {
    console.error("Failed to load custom situations from localStorage:", e);
  }
  return defaultSituations.map(normalizeSituation);
}

export function saveCustomSituation(newSit: Situation): void {
  try {
    const normalized = normalizeSituation(newSit);
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: Situation[] = raw ? JSON.parse(raw) : [];
    const filtered = Array.isArray(existing)
      ? existing.filter((s) => s && s.id !== normalized.id).map(normalizeSituation)
      : [];
    filtered.unshift(normalized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    // Record created mirror in user activity
    recordCreatedMirror(normalized.id);
  } catch (e) {
    console.error("Failed to save custom situation:", e);
  }
}

export function loadAllEchoes(): Record<string, Echo[]> {
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

export function saveEchoToStorage(mirrorId: string, newEcho: Echo): void {
  try {
    const raw = localStorage.getItem(ECHOES_STORAGE_KEY);
    const customEchoes: Record<string, Echo[]> = raw ? JSON.parse(raw) : {};
    const list = customEchoes[mirrorId] ? [...customEchoes[mirrorId]] : [];
    list.unshift(newEcho);
    customEchoes[mirrorId] = list;
    localStorage.setItem(ECHOES_STORAGE_KEY, JSON.stringify(customEchoes));

    // Update user activity count
    incrementUserEchoCount();
  } catch (e) {
    console.error("Failed to save echo to localStorage:", e);
  }
}

// Activity Tracking for Personalization
export function getUserActivity(): UserActivity {
  try {
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        exploredMirrorIds: parsed.exploredMirrorIds || [],
        decisions: parsed.decisions || {},
        reflections: parsed.reflections || {},
        createdMirrorIds: parsed.createdMirrorIds || [],
        echoesCount: parsed.echoesCount || 0,
        perspectiveShifts: parsed.perspectiveShifts || {},
      };
    }
  } catch (e) {
    console.error("Failed to load user activity:", e);
  }
  return {
    exploredMirrorIds: [],
    decisions: {},
    reflections: {},
    createdMirrorIds: [],
    echoesCount: 0,
    perspectiveShifts: {},
  };
}

function saveUserActivity(act: UserActivity): void {
  try {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(act));
  } catch (e) {
    console.error("Failed to save user activity:", e);
  }
}

export function recordExplored(mirrorId: string): void {
  const act = getUserActivity();
  if (!act.exploredMirrorIds.includes(mirrorId)) {
    act.exploredMirrorIds.push(mirrorId);
    saveUserActivity(act);
  }
}

export function recordDecision(mirrorId: string, choice: string): void {
  const act = getUserActivity();
  act.decisions[mirrorId] = { choice, timestamp: Date.now() };
  if (!act.exploredMirrorIds.includes(mirrorId)) {
    act.exploredMirrorIds.push(mirrorId);
  }
  saveUserActivity(act);
}

export function recordReflection(mirrorId: string, reflection: "Yes" | "No" | "I'm not sure"): void {
  const act = getUserActivity();
  act.reflections[mirrorId] = { reflection, timestamp: Date.now() };
  saveUserActivity(act);
}

export function recordCreatedMirror(mirrorId: string): void {
  const act = getUserActivity();
  if (!act.createdMirrorIds.includes(mirrorId)) {
    act.createdMirrorIds.unshift(mirrorId);
    saveUserActivity(act);
  }
}

function incrementUserEchoCount(): void {
  const act = getUserActivity();
  act.echoesCount = (act.echoesCount || 0) + 1;
  saveUserActivity(act);
}

// ---------------------------------------------------------------------------
// Perspective Shift Notes
// ---------------------------------------------------------------------------
export function recordPerspectiveShiftNote(mirrorId: string, note: string): void {
  const act = getUserActivity();
  if (!act.perspectiveShifts) act.perspectiveShifts = {};
  act.perspectiveShifts[mirrorId] = { note, timestamp: Date.now() };
  saveUserActivity(act);
}

// ---------------------------------------------------------------------------
// Demo User Authentication & Profile
// ---------------------------------------------------------------------------
export const AUTH_USER_KEY = "mirror_demo_current_user_v1";

export const DEFAULT_USER: DemoUser = {
  id: "user-yash",
  name: "Yash Gawde",
  username: "yash",
  email: "yash@perspective.mirror",
  avatarInitials: "YG",
  bio: "Living at the intersection of product architecture and human psychology.",
  perspectiveDescription: "I look for choices that preserve human relationships before career momentum.",
  isGuest: false,
};

export function getDemoUser(): DemoUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed) return parsed;
    }
  } catch {}
  return DEFAULT_USER;
}

export function setDemoUser(user: DemoUser | null): void {
  try {
    if (!user) {
      localStorage.removeItem(AUTH_USER_KEY);
    } else {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error("Failed to set demo user in localStorage:", e);
  }
}

export function loginDemoUser(email: string, _pass: string): DemoUser {
  const existing = getDemoUser();
  const initials = existing?.avatarInitials || "YG";
  const user: DemoUser = {
    id: existing?.id && !existing.isGuest ? existing.id : "user-demo",
    name: existing?.name && !existing.isGuest ? existing.name : "Yash Gawde",
    username: existing?.username && !existing.isGuest ? existing.username : "yash",
    email: email || "yash@perspective.mirror",
    avatarInitials: initials,
    bio: existing?.bio || "Living at the intersection of product architecture and human psychology.",
    perspectiveDescription:
      existing?.perspectiveDescription || "I look for choices that preserve human relationships before career momentum.",
    isGuest: false,
  };
  setDemoUser(user);
  return user;
}

export function signupDemoUser(name: string, username: string, email: string, _pass: string): DemoUser {
  const cleanUsername = username.replace(/^@/, "").trim() || "newperspectives";
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("") || "ME";
  const user: DemoUser = {
    id: `user-${Date.now()}`,
    name: name.trim() || "Perspective Creator",
    username: cleanUsername,
    email: email.trim() || `${cleanUsername}@perspective.mirror`,
    avatarInitials: initials,
    bio: "Exploring crossroads and understanding other perspectives.",
    perspectiveDescription: "Discovering what matters when choices carry weight.",
    isGuest: false,
  };
  setDemoUser(user);
  return user;
}

export function continueAsGuest(): DemoUser {
  const guest: DemoUser = {
    id: "guest-user",
    name: "Guest Explorer",
    username: "guest",
    email: "guest@perspective.mirror",
    avatarInitials: "G",
    bio: "Browsing perspectives as a guest.",
    perspectiveDescription: "Observing crossroads from all angles.",
    isGuest: true,
  };
  setDemoUser(guest);
  return guest;
}

export function logoutDemoUser(): void {
  setDemoUser(null);
}

export function updateDemoUserProfile(updates: Partial<DemoUser>): DemoUser {
  const current = getDemoUser() || DEFAULT_USER;
  const updated: DemoUser = { ...current, ...updates };
  setDemoUser(updated);
  return updated;
}

// ---------------------------------------------------------------------------
// Saved Mirrors
// ---------------------------------------------------------------------------
export const SAVED_MIRRORS_KEY = "mirror_saved_mirrors_v1";

export function getSavedMirrorIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_MIRRORS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isMirrorSaved(id: string): boolean {
  return getSavedMirrorIds().includes(id);
}

export function toggleSaveMirror(id: string): boolean {
  const list = getSavedMirrorIds();
  const idx = list.indexOf(id);
  let saved = false;
  if (idx >= 0) {
    list.splice(idx, 1);
    saved = false;
  } else {
    list.unshift(id);
    saved = true;
  }
  try {
    localStorage.setItem(SAVED_MIRRORS_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save mirror toggle:", e);
  }
  return saved;
}

// ---------------------------------------------------------------------------
// Settings & Data Export / Clear
// ---------------------------------------------------------------------------
export const SETTINGS_KEY = "mirror_app_settings_v1";

export function getAppSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    reduceMotion: false,
    largerText: false,
    highContrast: false,
  };
}

export function saveAppSettings(settings: Partial<AppSettings>): AppSettings {
  const current = getAppSettings();
  const updated = { ...current, ...settings };
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  } catch {}
  applyAppSettingsToDOM(updated);
  return updated;
}

export function applyAppSettingsToDOM(settings: AppSettings): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (settings.reduceMotion) {
    root.classList.add("reduce-motion");
  } else {
    root.classList.remove("reduce-motion");
  }

  if (settings.largerText) {
    root.classList.add("larger-text");
  } else {
    root.classList.remove("larger-text");
  }

  if (settings.highContrast) {
    root.classList.add("high-contrast");
  } else {
    root.classList.remove("high-contrast");
  }
}

export function exportAllUserData(): string {
  const data = {
    exportDate: new Date().toISOString(),
    user: getDemoUser(),
    activity: getUserActivity(),
    savedMirrorIds: getSavedMirrorIds(),
    customSituations: (function () {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      } catch {
        return [];
      }
    })(),
    echoes: (function () {
      try {
        return JSON.parse(localStorage.getItem(ECHOES_STORAGE_KEY) || "{}");
      } catch {
        return {};
      }
    })(),
    settings: getAppSettings(),
  };
  return JSON.stringify(data, null, 2);
}

export function clearLocalActivity(): void {
  try {
    localStorage.removeItem(ACTIVITY_STORAGE_KEY);
    localStorage.removeItem(SAVED_MIRRORS_KEY);
  } catch (e) {
    console.error("Failed to clear local activity:", e);
  }
}

// ---------------------------------------------------------------------------
// Deterministic Daily Mirror
// ---------------------------------------------------------------------------
export function getTodaysMirror(): Situation {
  const situations = defaultSituations;
  const todayStr = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    hash = (hash * 31 + todayStr.charCodeAt(i)) >>> 0;
  }
  const index = hash % situations.length;
  return normalizeSituation(situations[index]);
}

