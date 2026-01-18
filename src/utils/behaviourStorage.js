import { DEFAULT_BEHAVIOR, BEHAVIOR_STORAGE_KEY } from "../config/ariBehavior";

export function loadBehavior() {
  try {
    const raw = localStorage.getItem(BEHAVIOR_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_BEHAVIOR;
  } catch {
    return DEFAULT_BEHAVIOR;
  }
}

export function saveBehavior(behavior) {
  localStorage.setItem(
    BEHAVIOR_STORAGE_KEY,
    JSON.stringify(behavior)
  );
}
