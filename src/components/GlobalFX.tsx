import { useEffect, useMemo, useState } from "react";

type Ripple = { id: number; x: number; y: number };

const GlobalFX = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const particles = useMemo(() => Array.from({ length: 16 }, (_, i) => ({ id: i, left: `${6 + i * 6}%`, dur: 9 + (i % 5) * 2 })), []);

  useEffect(() => {
    document.documentElement.style.setProperty("--tilt-x", "0deg");
    document.documentElement.style.setProperty("--tilt-y", "0deg");
    document.documentElement.style.setProperty("--offcenter", "0");

    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const t = performance.now();
      const v = Math.abs((window.scrollY - lastY) / Math.max(1, t - lastT)) * 1200;
      document.documentElement.style.setProperty("--vel", `${Math.min(110, v).toFixed(2)}`);
      lastY = window.scrollY;
      lastT = t;
    };

    const onClick = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 820);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[2]">
        {particles.map((p) => (
          <span
            key={p.id}
            className="glass-shard float-blob absolute h-2 w-2 rounded-sm opacity-35"
            style={{ left: p.left, top: `${(p.id * 13) % 90}%`, animationDuration: `${p.dur}s` }}
          />
        ))}
      </div>
      <div className="pointer-events-none fixed inset-0 z-[3]">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute h-4 w-4 rounded-full border border-[#89AACC]/70"
            style={{ left: r.x - 8, top: r.y - 8, animation: "ripple-out 0.8s ease-out forwards" }}
          />
        ))}
      </div>
    </>
  );
};

export default GlobalFX;
