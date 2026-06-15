/* =========================================
   ARCANE SELF - UTILITY FUNCTIONS
   Requires: storage.js
   Purpose: Shared helper functions only
   ========================================= */

/* ---------- Text Helpers ---------- */

function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatXP(xp) {
  return `${Number(xp).toLocaleString()} XP`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

/* ---------- Power System ---------- */

function getPowerLevel() {
  const data = getData();

  return Object.values(data.stats).reduce((total, stat) => {
    return total + (stat.level || 0);
  }, 0);
}

/* ---------- Level Helpers ---------- */

function getLevelProgress(xp) {
  return xp % 100;
}

function getLevelProgressPercent(xp) {
  return (getLevelProgress(xp) / 100) * 100;
}

function getXPToNextLevel(xp) {
  return 100 - (xp % 100);
}

/* ---------- Streak Helpers ---------- */

function getCurrentStreak() {
  return getData().streaks.current;
}

function getLongestStreak() {
  return getData().streaks.longest;
}

/* ---------- Character Helpers ---------- */

function characterExists() {
  const data = getData();

  return !!(
    data.character &&
    data.character.name &&
    data.character.class
  );
}

function getCharacterAgeDays() {
  const data = getData();

  if (!data.character.createdAt) return 0;

  const createdAt = new Date(data.character.createdAt);
  const today = new Date();

  return Math.floor(
    (today - createdAt) / (1000 * 60 * 60 * 24)
  );
}

/* ---------- Rank Helpers ---------- */

function getRankColor(rank) {
  const rankColors = {
    E: "#94a3b8",
    D: "#22d3ee",
    C: "#10b981",
    B: "#f59e0b",
    A: "#ef4444",
    S: "#7c3aed"
  };

  return rankColors[rank] || "#e2e8f0";
}

/* ---------- Check-In Helper ---------- */

function createCheckIn(habit, stat, xp = 30) {
  return {
    id: Date.now(),
    habit,
    stat,
    xp,
    date: new Date().toISOString()
  };
}

/* ---------- Validation ---------- */

function isEmpty(value) {
  return value === null ||
         value === undefined ||
         value === "";
}

/* ---------- Future UI Helpers ---------- */

function showToast(message) {
  console.log(`[Arcane Self] ${message}`);
}