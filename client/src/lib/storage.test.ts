import { describe, it, expect, beforeEach } from "vitest";
import {
  loadAllSituations,
  normalizeSituation,
  getUserActivity,
  recordExplored,
  recordDecision,
  recordReflection,
  saveCustomSituation,
  loadAllEchoes,
  saveEchoToStorage,
  Situation,
  getDemoUser,
  signupDemoUser,
  updateDemoUserProfile,
  continueAsGuest,
  isMirrorSaved,
  toggleSaveMirror,
  getSavedMirrorIds,
  recordPerspectiveShiftNote,
  saveAppSettings,
  getAppSettings,
  exportAllUserData,
  getTodaysMirror,
} from "./storage";

// Setup localStorage mock for Node environment
const store = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (key: string) => store.get(key) || null,
  setItem: (key: string, val: string) => store.set(key, val),
  removeItem: (key: string) => store.delete(key),
  clear: () => store.clear(),
  key: (i: number) => Array.from(store.keys())[i] || null,
  length: store.size,
};

describe("Storage & Data Integrity", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads default situations when localStorage is empty", () => {
    const situations = loadAllSituations();
    expect(situations.length).toBeGreaterThanOrEqual(5);
    expect(situations[0].creator).toBe("Maya Shah");
    expect(situations[0].category).toBeDefined();
    expect(situations[0].options.length).toBeGreaterThanOrEqual(2);
    expect(Array.isArray(situations[0].tags)).toBe(true);
  });

  it("handles legacy/malformed situation objects gracefully without crashing", () => {
    const legacy = [
      {
        id: "legacy-1",
        person: "Old Person", // legacy property name
        city: "Old City",
        prompt: "Old prompt",
        options: [{ id: "1", label: "A", sub: "B", tone: "cobalt" }],
        // Missing creator, tags, whyTitle, etc.
      },
      null,
      undefined,
      {},
    ];
    localStorage.setItem("mirror_custom_situations_v1", JSON.stringify(legacy));

    const situations = loadAllSituations();
    expect(situations.length).toBeGreaterThan(0);
    const legacyFound = situations.find((s) => s.id === "legacy-1");
    expect(legacyFound).toBeDefined();
    expect(legacyFound?.creator).toBe("Old Person");
    expect(legacyFound?.creatorCity).toBe("Old City");
    expect(Array.isArray(legacyFound?.tags)).toBe(true);
    expect(legacyFound?.tags.length).toBeGreaterThan(0);
  });

  it("normalizes situations completely", () => {
    const emptyNorm = normalizeSituation({});
    expect(emptyNorm.creator).toBeDefined();
    expect(emptyNorm.title).toBeDefined();
    expect(emptyNorm.options.length).toBeGreaterThanOrEqual(2);
    expect(Array.isArray(emptyNorm.tags)).toBe(true);
  });

  it("tracks user activity correctly", () => {
    recordExplored("maya");
    recordDecision("maya", "Decline the promotion entirely");
    recordReflection("maya", "Yes");

    const activity = getUserActivity();
    expect(activity.exploredMirrorIds).toContain("maya");
    expect(activity.decisions["maya"]?.choice).toBe("Decline the promotion entirely");
    expect(activity.reflections["maya"]?.reflection).toBe("Yes");
  });

  it("saves and persists custom mirrors and echoes", () => {
    const newMirror: Situation = {
      id: "test-mirror-1",
      creator: "Test User",
      creatorAvatar: "",
      creatorAge: "25",
      creatorCity: "Delhi",
      category: "Risk",
      title: "Testing mirror",
      short: "Short test",
      prompt: "What would you choose?",
      options: [
        { id: "1", label: "Path 1", sub: "Sub 1", tone: "cobalt" },
        { id: "2", label: "Path 2", sub: "Sub 2", tone: "peach" },
      ],
      original: "Path 1",
      whyTitle: "Why title",
      why: "Why reason",
      context: "Story context",
      tags: ["RISK"],
      isUserCreated: true,
    };

    saveCustomSituation(newMirror);
    const loaded = loadAllSituations();
    expect(loaded.some((s) => s.id === "test-mirror-1")).toBe(true);

    saveEchoToStorage("test-mirror-1", {
      id: "echo-1",
      mirrorId: "test-mirror-1",
      reflection: "Yes",
      path: "Path 1",
      text: "Perspective echo test",
      timestamp: Date.now(),
      author: "Test User",
    });

    const echoes = loadAllEchoes();
    expect(echoes["test-mirror-1"]).toBeDefined();
    expect(echoes["test-mirror-1"][0].text).toBe("Perspective echo test");
  });

  it("handles demo user auth and session persistence", () => {
    expect(getDemoUser()?.name).toBe("Yash Gawde");

    const signedUp = signupDemoUser("Aarav Patel", "aarav", "aarav@test.com", "secret");
    expect(signedUp.name).toBe("Aarav Patel");
    expect(signedUp.username).toBe("aarav");
    expect(getDemoUser()?.name).toBe("Aarav Patel");

    const updated = updateDemoUserProfile({ bio: "Updated Bio" });
    expect(updated.bio).toBe("Updated Bio");
    expect(getDemoUser()?.bio).toBe("Updated Bio");

    continueAsGuest();
    expect(getDemoUser()?.isGuest).toBe(true);
  });

  it("manages saved mirrors correctly", () => {
    expect(isMirrorSaved("maya")).toBe(false);
    const saved = toggleSaveMirror("maya");
    expect(saved).toBe(true);
    expect(isMirrorSaved("maya")).toBe(true);
    expect(getSavedMirrorIds()).toContain("maya");

    const unsaved = toggleSaveMirror("maya");
    expect(unsaved).toBe(false);
    expect(isMirrorSaved("maya")).toBe(false);
  });

  it("manages perspective shift notes and settings", () => {
    recordPerspectiveShiftNote("maya", "Hearing their backstory changed my outlook.");
    const act = getUserActivity();
    expect(act.perspectiveShifts?.["maya"]?.note).toBe("Hearing their backstory changed my outlook.");

    const settings = saveAppSettings({ reduceMotion: true, largerText: true });
    expect(settings.reduceMotion).toBe(true);
    expect(getAppSettings().largerText).toBe(true);

    const exported = exportAllUserData();
    expect(typeof exported).toBe("string");
    expect(exported.length).toBeGreaterThan(50);
  });

  it("returns deterministic daily mirror", () => {
    const todayMirror1 = getTodaysMirror();
    const todayMirror2 = getTodaysMirror();
    expect(todayMirror1.id).toBe(todayMirror2.id);
    expect(todayMirror1.title).toBeDefined();
  });

  it("resists all forms of corrupted/malformed localStorage without crashing", () => {
    // 1. Invalid JSON
    localStorage.setItem("mirror_custom_situations_v1", "{invalid json syntax!");
    expect(() => loadAllSituations()).not.toThrow();
    const fallbackList = loadAllSituations();
    expect(fallbackList.length).toBeGreaterThan(0);

    // 2. Missing creator, missing options, missing tags, missing title
    const corruptedArray = [
      { id: "corrupt-1" }, // completely empty object
      { id: "corrupt-2", creator: null, title: undefined, options: null, tags: null },
      { id: "corrupt-3", options: "not an array", tags: "not an array" },
      null,
      undefined,
      12345,
      "random-string",
    ];
    localStorage.setItem("mirror_custom_situations_v1", JSON.stringify(corruptedArray));
    expect(() => loadAllSituations()).not.toThrow();
    const cleaned = loadAllSituations();
    expect(cleaned.length).toBeGreaterThan(0);

    for (const sit of cleaned) {
      expect(typeof sit.creator).toBe("string");
      expect(sit.creator.length).toBeGreaterThan(0);
      expect(typeof sit.title).toBe("string");
      expect(Array.isArray(sit.options)).toBe(true);
      expect(sit.options.length).toBeGreaterThanOrEqual(2);
      expect(Array.isArray(sit.tags)).toBe(true);
      expect(sit.tags.length).toBeGreaterThan(0);
    }
  });
});


