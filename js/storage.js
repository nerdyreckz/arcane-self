/* =========================================
   ARCANE SELF - STORAGE SYSTEM
   Single Source of Truth
   ========================================= */

const STORAGE_KEY = "arcaneSelfData";

/* ---------- Default Data ---------- */

const DEFAULT_DATA = {
  character: {
    name: "",
    class: "",
    avatar: "",
    createdAt: ""
  },

  stats: {
    mana: { xp: 0, level: 1 },
    strength: { xp: 0, level: 1 },
    wisdom: { xp: 0, level: 1 },
    vitality: { xp: 0, level: 1 },
    willpower: { xp: 0, level: 1 },

    custom1: {
      name: "",
      xp: 0,
      level: 0
    },

    custom2: {
      name: "",
      xp: 0,
      level: 0
    }
  },

  totalXP: 0,

  rank: "E",

  streaks: {
    current: 0,
    longest: 0,
    history: []
  },

  checkIns: []
};

/* ---------- Initialization ---------- */

function initializeData() {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (!existing) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(DEFAULT_DATA)
    );
  }

  return getData();
}

/* ---------- Basic Storage ---------- */

function getData() {
  const data = localStorage.getItem(STORAGE_KEY);

  return data
    ? JSON.parse(data)
    : JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

/* ---------- Level System ---------- */

function calculateLevel(xp) {
  return Math.floor(xp / 100) + 1;
}

/* ---------- Rank System ---------- */

function updateRank(totalXP) {
  if (totalXP >= 12000) return "S";
  if (totalXP >= 7000) return "A";
  if (totalXP >= 3500) return "B";
  if (totalXP >= 1500) return "C";
  if (totalXP >= 500) return "D";

  return "E";
}

/* ---------- XP System ---------- */

function addXP(statName, amount = 30) {
  const data = getData();

  if (!data.stats[statName]) {
    console.error(`Stat "${statName}" not found.`);
    return false;
  }

  data.stats[statName].xp += amount;

  data.stats[statName].level = calculateLevel(
    data.stats[statName].xp
  );

  data.totalXP += amount;

  data.rank = updateRank(data.totalXP);

  saveData(data);

  return data;
}

/* ---------- Character Creation ---------- */

function createCharacter({
  name,
  className,
  avatar = ""
}) {
  const data = getData();

  data.character = {
    name,
    class: className,
    avatar,
    createdAt: new Date().toISOString()
  };

  /* Starting Class Bonuses */

  switch (className) {
    case "Mage":
      data.stats.mana.level = 3;
      data.stats.wisdom.level = 2;

      data.stats.mana.xp = 200;
      data.stats.wisdom.xp = 100;
      break;

    case "Warrior":
      data.stats.strength.level = 3;
      data.stats.willpower.level = 2;

      data.stats.strength.xp = 200;
      data.stats.willpower.xp = 100;
      break;

    case "Scholar":
      data.stats.wisdom.level = 3;
      data.stats.vitality.level = 2;

      data.stats.wisdom.xp = 200;
      data.stats.vitality.xp = 100;
      break;

    case "Shadow":
      data.stats.willpower.level = 3;
      data.stats.mana.level = 2;

      data.stats.willpower.xp = 200;
      data.stats.mana.xp = 100;
      break;
  }

  data.totalXP =
    Object.values(data.stats)
      .reduce((sum, stat) => sum + (stat.xp || 0), 0);

  data.rank = updateRank(data.totalXP);

  saveData(data);

  return data;
}

/* ---------- Reset System ---------- */

function resetData() {
  localStorage.removeItem(STORAGE_KEY);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(DEFAULT_DATA)
  );
}

/* ---------- Auto Init ---------- */

initializeData();