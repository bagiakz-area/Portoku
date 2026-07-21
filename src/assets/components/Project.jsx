import { useState, useRef, useEffect } from "react";
import ros from "@/assets/img/ros.png";
import jurnal from "@/assets/img/jurnal.png"
import Beams from '@/components/Beams';

const projects = [
  {
    id: "Restaurant",
    title: "Ro's Restaurant",
    description:
      "An internship project — a restaurant website with an online menu and table reservation feature.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: ros,
    link: "https://bagiakz-area.github.io/Ro-s-Restaurant/",
  },
  {
    id: "Jurnal",
    title: "Jurnal PKL",
    description:
      "A web-based activity journal app with secure login & register, letting users add and track a list of tasks completed each day.",
    tags: ["HTML", "CSS", "JavaScript", "FireBase"],
    image: jurnal,
    link: "https://bagiakz-area.github.io/JurnalKu/",
  },
];

const useRevealOnScroll = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

const REVEAL_BASE =
  "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
const REVEAL_HIDDEN = "opacity-0 translate-y-10 blur-sm";
const REVEAL_VISIBLE = "opacity-100 translate-y-0 blur-none";

const ChevronIcon = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    {direction === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

const Project = () => {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const total = projects.length;

  const [headerRef, headerVisible] = useRevealOnScroll();
  const [carouselRef, carouselVisible] = useRevealOnScroll();
  const [controlsRef, controlsVisible] = useRevealOnScroll();

  const goTo = (i) => setIndex(((i % total) + total) % total);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const handlePointerDown = (e) => {
    startXRef.current = e.clientX;
    hasDraggedRef.current = false;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) > 6) hasDraggedRef.current = true;
    setDragOffset(delta);
  };

  const endDrag = () => {
    if (!isDragging) return;
    const threshold = 60;
    if (dragOffset < -threshold) {
      next();
    } else if (dragOffset > threshold) {
      prev();
    } else if (!hasDraggedRef.current) {
      window.open(projects[index].link, "_blank", "noopener,noreferrer");
    }
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const handleCardClick = (e) => {
    if (e.detail !== 0) e.preventDefault();
  };

  if (total === 0) {
    return (
      <section id="proyek" className="scroll-mt-24 bg-[#161019] py-24 text-center text-[#F1EAD9]">
        Belum ada proyek untuk ditampilkan.
      </section>
    );
  }

  return (
    <section id="proyek" className="relative scroll-mt-24 overflow-hidden bg-[#161019] px-6 py-20 md:px-12">
      <div className="pointer-events-none absolute inset-0">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#88dbff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <div
          ref={headerRef}
          className={`mb-10 flex flex-col gap-2 ${REVEAL_BASE} ${
            headerVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#38bdf8]">
            Project Archive
          </span>
          <h2 className="text-3xl font-extrabold font-[syne] tracking-tight text-[#F1EAD9] md:text-4xl">
            MY PROJECT
          </h2>
          <p className="text-sm text-[#F1EAD9]/60 md:hidden">
            Swipe or use the arrows to explore my other projects.
          </p>
        </div>

        <div
          ref={carouselRef}
          className={`overflow-hidden rounded-2xl delay-150 ${REVEAL_BASE} ${
            carouselVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
          }`}
          role="region"
          aria-roledescription="carousel"
          aria-label="Daftar proyek"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div
            className={`flex select-none ${
              isDragging ? "" : "transition-transform duration-500 ease-out motion-reduce:duration-0"
            }`}
            style={{
              transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
              touchAction: "pan-y",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="w-full shrink-0 px-1"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} dari ${total}`}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCardClick}
                  onDragStart={(e) => e.preventDefault()}
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                  className="group block overflow-hidden rounded-2xl border border-[#38bdf8]/30 bg-[#0B0F19]/60 shadow-[0_0_40px_-12px_#38bdf8] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161019]"
                >
                  <div className="flex items-center justify-between border-b border-dashed border-[#F1EAD9]/15 px-5 py-2.5">
                    <span className="font-mono text-xs tracking-widest text-[#F1EAD9]/50">
                      No. {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-wrap justify-end gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#F1EAD9]/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[#F1EAD9]/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="aspect-[16/9] md:aspect-[16/8] w-full overflow-hidden bg-[#F1EAD9]/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      draggable={false}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>

                  <div className="p-5 md:p-6">
                    <h3 className="text-lg font-bold tracking-tight text-[#F1EAD9] md:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#F1EAD9]/70">
                      {project.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#38bdf8]">
                      See Project
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColo`r"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      >
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={controlsRef}
          className={`mt-6 flex items-center gap-4 delay-300 ${REVEAL_BASE} ${
            controlsVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
          }`}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Proyek sebelumnya"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F1EAD9]/20 text-[#F1EAD9] transition-colors hover:bg-blue-300/50 hover:text-[#161019] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161019]"
          >
            <ChevronIcon direction="left" />
          </button>

          <div className="flex flex-1 items-center gap-3">
            <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#F1EAD9]/15">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#38bdf8] transition-transform duration-500 ease-out motion-reduce:duration-0"
                style={{
                  width: `${100 / total}%`,
                  transform: `translateX(${index * 100}%)`,
                }}
              />
            </div>
            <span className="font-mono text-xs tracking-widest text-[#F1EAD9]/50">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Proyek berikutnya"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F1EAD9]/20 text-[#F1EAD9] transition-colors  hover:bg-blue-300/50 hover:text-[#161019] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161019]"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Project;