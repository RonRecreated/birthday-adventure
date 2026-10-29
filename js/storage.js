window.BirthdayStorage = (() => {
  const KEY = "birthday-adventure-v1";
  function load() { try { const value = JSON.parse(localStorage.getItem(KEY)); return value && typeof value === "object" ? value : null; } catch { return null; } }
  function save(value) { try { localStorage.setItem(KEY, JSON.stringify(value)); } catch { /* Private mode may block storage. */ } }
  function clear() { try { localStorage.removeItem(KEY); } catch {} }
  return { load, save, clear };
})();
