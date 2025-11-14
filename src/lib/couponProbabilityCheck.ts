const DAILY_LIMIT = 6;
const EXPECTED_VISITORS = 50; // rough guess
const PROBABILITY = DAILY_LIMIT / EXPECTED_VISITORS; // = 0.06

export function isLucky() {
  return Math.random() < PROBABILITY;
}