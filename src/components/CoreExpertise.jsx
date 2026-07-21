import React, { useEffect, useRef, useState } from "react";

// Ganti angka `percent` di sini (atau kirim lewat props `skills`) buat atur progress bar-nya
const DEFAULT_SKILLS = [
  { name: "Frontend Development", percent: 95 },
  { name: "Backend Development", percent: 90 },
  { name: "UI/UX Design", percent: 85 },
];

const CoreExpertise = ({
  title = "Core Expertise",
  skills = DEFAULT_SKILLS,
  accentColor = "#38bdf8", // biru laut / ocean blue — ganti hex ini buat ubah warna aksen
}) => {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [progress, setProgress] = useState(() => skills.map(() => 0));

  // Reset progress kalau props `skills` berubah (misal dari parent)
  useEffect(() => {
    setProgress(skills.map(() => 0));
    setHasAnimated(false);
  }, [skills]);

  // Deteksi kapan card ini masuk viewport (di-scroll ke arah situ)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // trigger begitu 30% card-nya keliatan
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Jalanin animasi angka + bar dari 0 -> target, sekali pas hasAnimated jadi true
  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 900; // ms
    const start = performance.now();
    let rafId;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic

      setProgress(skills.map((skill) => Math.round(skill.percent * eased)));

      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [hasAnimated, skills]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border border-gray-500/50 bg-transparent p-6"
      style={{ boxShadow: `0 0 40px -12px ${accentColor}55` }}
    >
      <h3
        className="mb-5 text-sm font-bold tracking-[0.15em] uppercase"
        style={{ color: accentColor }}
      >
        {title}
      </h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
        {skills.map((skill, i) => (
          <div key={i}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-white/80">{skill.name}</span>
              <span className="font-semibold" style={{ color: accentColor }}>
                {progress[i]}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress[i]}%`,
                  background: `linear-gradient(90deg, ${accentColor}99, ${accentColor})`,
                  boxShadow: `0 0 8px ${accentColor}aa`,
                  transition: "width 0.1s linear",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreExpertise;

// Contoh pemakaian di halaman lain:
//
// <CoreExpertise
//   skills={[
//     { name: "Frontend Development", percent: 95 },
//     { name: "Backend Development", percent: 90 },
//     { name: "UI/UX Design", percent: 85 },
//     { name: "DevOps", percent: 70 },
//   ]}
//   accentColor="#0ea5e9" // ganti sesuai selera, masih di rentang biru laut
// />