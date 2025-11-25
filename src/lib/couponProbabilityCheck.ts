const DAILY_LIMIT = 6;
const EXPECTED_VISITORS = 150; // rough guess
const PROBABILITY = DAILY_LIMIT / EXPECTED_VISITORS;
export function isLucky() {
  return Math.random() < PROBABILITY;
}