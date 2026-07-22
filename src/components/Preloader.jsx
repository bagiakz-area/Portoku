import React, { useEffect, useRef, useState } from "react";
import MetallicPaint from "./MetallicPaint";

const COUNT_DURATION = 2600;
const COUNT_HOLD = 550;
const HELLO_DURATION = 1500;
const BAGIA_DURATION = 1500;
const WELCOME_DURATION = 2000;
const LOGO_MIN_HOLD = 1400;
const EXIT_LOGO_DURATION = 1500;
const EXIT_OVERLAY_DELAY = 450;
const EXIT_OVERLAY_DURATION = 1200;

const PhaseBlock = ({ active, children, className = "" }) => (
  <div
    className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
    } ${className}`}
  >
    {children}
  </div>
);

const Preloader = ({ logoSrc, targetRef, onComplete }) => {
  const logoBoxRef = useRef(null);

  const [phase, setPhase] = useState("count");
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [overlayHidden, setOverlayHidden] = useState(false);
  const [flyTransform, setFlyTransform] = useState("translate(0px, 0px) scale(1)");

  useEffect(() => {
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const t = Math.min((now - start) / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPercent(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const t1 = COUNT_DURATION + COUNT_HOLD;
    const t2 = t1 + HELLO_DURATION;
    const t3 = t2 + BAGIA_DURATION;
    const t4 = t3 + WELCOME_DURATION;

    const timers = [
      setTimeout(() => setPhase("hello"), t1),
      setTimeout(() => setPhase("bagia"), t2),
      setTimeout(() => setPhase("welcome"), t3),
      setTimeout(() => setPhase("logo"), t4),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "logo") return;

    let cancelled = false;
    const start = performance.now();

    const scheduleExit = () => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      const wait = Math.max(LOGO_MIN_HOLD - elapsed, 0);
      setTimeout(() => {
        if (!cancelled) beginExit();
      }, wait);
    };

    if (document.readyState === "complete") {
      scheduleExit();
    } else {
      window.addEventListener("load", scheduleExit, { once: true });
    }

    const safety = setTimeout(() => {
      if (!cancelled) beginExit();
    }, LOGO_MIN_HOLD + 4000);

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleExit);
      clearTimeout(safety);
    };
  }, [phase]);

  const beginExit = () => {
    const logoRect = logoBoxRef.current?.getBoundingClientRect();
    const destRect = targetRef.current?.getBoundingClientRect();

    if (logoRect && destRect) {
      const scale = destRect.width / logoRect.width;
      const dx =
        destRect.left + destRect.width / 2 - (logoRect.left + logoRect.width / 2);
      const dy =
        destRect.top + destRect.height / 2 - (logoRect.top + logoRect.height / 2);
      setFlyTransform(`translate(${dx}px, ${dy}px) scale(${scale})`);
    }

    setExiting(true);
    setTimeout(() => setOverlayHidden(true), EXIT_OVERLAY_DELAY);
    setTimeout(() => onComplete(), EXIT_LOGO_DURATION);
  };

  const logoActive = phase === "logo" || phase === "exiting";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950 transition-opacity ${
        overlayHidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        transitionDuration: `${EXIT_OVERLAY_DURATION}ms`,
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="absolute h-72 w-72 rounded-full bg-[#0078ff]/15 blur-3xl"
        style={{ animation: "pulse 3.5s ease-in-out infinite" }}
      />

      <div className="relative h-40 w-full max-w-md">
        <PhaseBlock active={phase === "count"}>
          <span className="font-[fira_code] text-6xl font-extrabold text-white tabular-nums">
            {percent}%
          </span>
          <div className="mt-4 h-[2px] w-40 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-[#0078ff]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </PhaseBlock>

        <PhaseBlock active={phase === "hello"}>
          <span className="font-[syne] text-5xl font-extrabold text-white sm:text-6xl">
            Hello!
          </span>
        </PhaseBlock>

        <PhaseBlock active={phase === "bagia"}>
          <span className="font-[syne] text-5xl font-extrabold text-white sm:text-6xl">
            Bagia here!
          </span>
        </PhaseBlock>

        <PhaseBlock active={phase === "welcome"}>
          <span className="font-[syne] text-3xl font-extrabold text-white sm:text-4xl">
            Welcome to my personal website
          </span>
        </PhaseBlock>

        <div
          ref={logoBoxRef}
          className="absolute left-1/2 top-1/2 w-64 h-16"
          style={{
            transitionProperty: "transform, opacity",
            transitionDuration: exiting ? `${EXIT_LOGO_DURATION}ms` : "1400ms",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            transform: exiting
              ? `translate(-50%, -50%) ${flyTransform}`
              : logoActive
              ? "translate(-50%, -50%) translateY(0px) scale(1)"
              : "translate(-50%, -50%) translateY(16px) scale(0.85)",
            opacity: logoActive ? 1 : 0,
            pointerEvents: "none",
          }}
        >
          <MetallicPaint
            imageSrc={logoSrc}
            aspectRatio={4}
            seed={7}
            scale={2.2}
            patternSharpness={1}
            noiseScale={0.6}
            speed={0.4}
            liquid={0.6}
            mouseAnimation={false}
            brightness={1.7}
            contrast={0.6}
            refraction={0.014}
            blur={0.01}
            chromaticSpread={1.5}
            fresnel={1}
            angle={0}
            waveAmplitude={1}
            distortion={0.8}
            contour={0.15}
            lightColor="#ffffff"
            darkColor="#ffffff"
            tintColor="#0078ff"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;