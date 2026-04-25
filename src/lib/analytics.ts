export const trackEvent = (name: string, payload: Record<string, unknown> = {}) => {
  const event = { name, payload, at: new Date().toISOString() };
  try {
    const key = "y7x_analytics";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    prev.push(event);
    localStorage.setItem(key, JSON.stringify(prev.slice(-200)));
  } catch {}
  if (import.meta.env.DEV) console.info("[analytics]", event);
};

export const trackSectionView = (sectionId: string) => {
  trackEvent("section_view", { sectionId });
};
