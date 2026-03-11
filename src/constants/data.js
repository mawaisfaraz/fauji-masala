// ─── EMOJI OPTIONS ────────────────────────────────────────────────────────────
export const EMOJIS = [
  "🌾",
  "🍚",
  "🥛",
  "🧈",
  "🫒",
  "🌶",
  "🧄",
  "🧅",
  "🥬",
  "🍅",
  "🥔",
  "🌽",
  "🫘",
  "🍋",
  "🍊",
  "🥩",
  "🐟",
  "🥚",
  "🧂",
  "🫙",
  "☕",
  "🫖",
  "🍬",
  "🧃",
  "🧁",
  "📦",
];

// ─── CATEGORY LABELS ─────────────────────────────────────────────────────────
export const CATEGORIES = {
  spices: "Spices",
  other: "Other",
};

// ─── SEED PRODUCTS ────────────────────────────────────────────────────────────
export const INITIAL_PRODUCTS = [];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
/** Format as PKR whole number e.g. ₨ 1,200 */
export function fmt(n) {
  return "₨ " + Number(n).toLocaleString();
}

/** Format as PKR with 2 decimals e.g. ₨ 34.67 */
export function fmtD(n) {
  return "₨ " + Number(n).toFixed(2);
}
