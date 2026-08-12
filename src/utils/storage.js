export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    );
    // eslint-disable-next-line no-empty
  } catch {}
}

export function getLocalStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch {
    return null;
  }
}

export function deleteLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    // eslint-disable-next-line no-empty
  } catch {}
}
