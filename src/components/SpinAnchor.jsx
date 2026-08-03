import React, { useEffect, useRef } from "react";

const SPIN_SPEED = 90; // derajat per detik pas lagi di-hover
const TAU = 0.25; // makin gede angkanya, makin "kenyal"/smooth pas mulai & berhenti

const SpinAnchor = ({ children, href = "#", target, rel, className = "", ariaLabel }) => {
  const hoveredRef = useRef(false);
  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const currentScaleRef = useRef(1);
  const lastTsRef = useRef(null);
  const rafRef = useRef(null);
  const elRef = useRef(null);

  const stopLoop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastTsRef.current = null;
  };

  const tick = (ts) => {
    if (lastTsRef.current == null) lastTsRef.current = ts;
    const dt = (ts - lastTsRef.current) / 1000;
    lastTsRef.current = ts;

    if (hoveredRef.current) {
      targetAngleRef.current += SPIN_SPEED * dt;
    }
    const targetScale = hoveredRef.current ? 1.1 : 1;

    const k = 1 - Math.exp(-dt / TAU);
    currentAngleRef.current += (targetAngleRef.current - currentAngleRef.current) * k;
    currentScaleRef.current += (targetScale - currentScaleRef.current) * k;

    if (elRef.current) {
      elRef.current.style.transform = `rotate(${currentAngleRef.current}deg) scale(${currentScaleRef.current})`;
    }

    const angleSettled = Math.abs(targetAngleRef.current - currentAngleRef.current) < 0.05;
    const scaleSettled = Math.abs(targetScale - currentScaleRef.current) < 0.002;

    if (!hoveredRef.current && angleSettled && scaleSettled) {
      stopLoop();
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const startLoop = () => {
    if (rafRef.current) return;
    lastTsRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleEnter = () => {
    hoveredRef.current = true;
    startLoop();
  };

  const handleLeave = () => {
    hoveredRef.current = false;
    startLoop();
  };

  // PENTING: stop loop-nya kalau komponen ke-unmount, biar gak nyisain rAF nyala terus (ini yang kelewat kemarin)
  useEffect(() => stopLoop, []);

  const handleClick = (e) => {
    // href kosong / placeholder ("#" atau "") -> jangan reload halaman
    if (!href || href === "#") {
      e.preventDefault();
    }
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={className}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span ref={elRef} style={{ display: "inline-flex", willChange: "transform" }}>
        {children}
      </span>
    </a>
  );
};

export default SpinAnchor;