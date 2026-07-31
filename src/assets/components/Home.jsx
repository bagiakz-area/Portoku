import { useState, useRef, useEffect } from "react";
import GlassSurface from "../../components/ui/GlassSurface";
import MetallicPaint from "../../components/MetallicPaint";
import GooeyNav from "../../components/GooeyNav";
import GlareHover from "../../components/GlareHover";
import Ferrofluid from "../../components/Ferrofluid";
import SpecularButton from "../../components/SpecularButton";
import Preloader from "../../components/Preloader";
import wbagiaLogo from "../wbagia-logo.webp";
import cvFile from "@/assets/CV_WahyuBagia.pdf";
import { Icon } from "@iconify/react";

const HERO_DESC = [
  { text: "A ", highlight: false },
  { text: "full-stack", highlight: true },
  { text: " developer who can help develop your ", highlight: false },
  { text: "website", highlight: true },
  { text: " and keep the ", highlight: false },
  { text: "server", highlight: true },
  { text: " secure and ", highlight: false },
  { text: "well-managed.", highlight: true },
];

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navLogoRef = useRef(null);

  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    if (heroVisible) return;

    // Reveal the hero once the preloader finishes - this is a trigger we
    // already know fires reliably (the nav logo's fade-in depends on the
    // same isLoading flag). Previously this used an IntersectionObserver
    // on the hero element, but in production that observer apparently
    // never reported "visible", leaving the entire hero section stuck at
    // opacity-0 forever - the bug behind the missing hero content.
    if (!isLoading) {
      setHeroVisible(true);
      return;
    }

    // Hard safety net: no matter what, never let the hero stay invisible
    // for more than a few seconds.
    const timeoutId = setTimeout(() => setHeroVisible(true), 4000);
    return () => clearTimeout(timeoutId);
  }, [isLoading, heroVisible]);

  return (
    <div className="home-section relative min-h-screen bg-slate-950 text-white font-[syne] antialiased overflow-x-hidden">
      {isLoading && (
        <Preloader
          logoSrc={wbagiaLogo}
          targetRef={navLogoRef}
          onComplete={() => setIsLoading(false)}
        />
      )}

      <nav className="fixed w-full top-0 z-40 pt-3 px-6 3xl:px-70 sm:px-40  lg:pt-7">
        <GlassSurface
          width="100%"
          height={64}
          borderRadius={32}
          backdrop-blur-lg
        >
          <div className="w-full px-1 flex items-center justify-between">
            <div
              ref={navLogoRef}
              className="w-44 h-11 transition-opacity duration-300"
              style={{ opacity: isLoading ? 0 : 1 }}
            >
              <MetallicPaint
                imageSrc={wbagiaLogo}
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

            <div
              className="hidden sm:flex items-center font-[syne] font-bold uppercase text-sm"
              style={{
                "--color-1": "#88dbff",
                "--color-2": "#88dbff",
                "--color-3": "#ffffff",
                "--color-4": "#88dbff",
              }}
            >
              <GooeyNav
                items={[
                  { label: "Home", href: "#hero" },
                  { label: "About", href: "#about" },
                  { label: "Project", href: "#proyek" },
                  { label: "Contact", href: "#kontak" },
                ]}
                restTextColor="#ffffff"
                activeTextColor="#4092f3"
                particleCount={12}
                animationTime={500}
              />
              <GlareHover
                width="auto"
                height="auto"
                background="transparent"
                borderRadius="999px"
                borderColor="transparent"
                glareColor="#ffffff"
                glareOpacity={0.4}
                glareAngle={-45}
                glareSize={250}
                transitionDuration={650}
                className="ml-2"
              >
                <a
                  href={cvFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500/10 text-white rounded-full px-10 py-3 transition-colors"
                >
                  CV
                </a>
              </GlareHover>
            </div>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="sm:hidden p-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-500/20 text-slate-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </GlassSurface>
      </nav>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 sm:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-64 bg-white/20 backdrop-blur-[1px]
                  border border-white/10 shadow-2xl z-50 p-6 transform transition-transform duration-300 ease-in-out sm:hidden ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                  }`}
      >
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 transition duration-300 ease-in-out rounded-full hover:bg-slate-100 text-slate-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex font-[manrope] uppercase gap-2.5 flex-col space-y-6 text-lg font-medium teblue-400">
          <a
            href="#hero"
            onClick={() => setIsMenuOpen(false)}
            className="transform transition-transform duration-300 ease-in-out hover:text-blue-400"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="transform transition-transform duration-300 ease-in-out hover:text-blue-400"
          >
            About
          </a>
          <a
            href="#proyek"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-blue-400"
          >
            Project
          </a>
          <a
            href="#kontak"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-blue-400"
          >
            Contact
          </a>
          <a
            href={cvFile}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="transition-transform duration-300 ease-in-out hover:text-blue-400"
          >
            CV
          </a>
        </div>
      </div>

      <div style={{ width: "100%", height: "800px", position: "relative" }}>
        <Ferrofluid
          colors={["#0098ff", "#0098ff", "#0098ff"]}
          speed={0.5}
          scale={1.6}
          turbulence={0.2}
          fluidity={0.1}
          rimWidth={0.23}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
        />

        <header
          id="hero"
          ref={heroRef}
          className={`absolute inset-0 z-10 flex flex-col items-center justify-top py-60 text-center px-6 sm:px-12 sm:py-45 lg:px-24 scroll-mt-24 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="Title">
            <h1 className="font-[syne] text-5xl mb-1.5 font-extrabold sm:text-8xl -mt-10">
              <span className="block overflow-hidden">
                <span
                  className={`block transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    heroVisible ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  WAHYU
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={`block text-blue-400 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
                    heroVisible ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  BAGIA
                </span>
              </span>
            </h1>
            <p className="text-lg font-semibold mb-3.5 sm:text-3xl mx-auto max-w-140">
              {HERO_DESC.map((seg, i) =>
                seg.highlight ? (
                  <span key={i} className="text-gray-400 font-extrabold">
                    {seg.text}
                  </span>
                ) : (
                  seg.text
                )
              )}
            </p>
            <p className="location mb-2.5 text-xl flex gap-1.5 items-center justify-center">
              <Icon icon="boxicons:location" width="20" />
              Bali, Gianyar Regency
            </p>
            <SpecularButton
              size="lg"
              radius={30}
              tint="#4092f3"
              tintOpacity={0}
              blur={1}
              textColor="#ffffff"
              lineColor="#4092f3"
              baseColor="#ffffff"
              intensity={1}
              shineSize={10}
              shineFade={40}
              thickness={1.6}
              speed={0.35}
              followMouse
              proximity={340}
              autoAnimate={false}
            >
              <div className="btn-project mb">
                <a href="#proyek" className="flex items-center justify-center ">
                  See my Work
                  <Icon icon="solar:arrow-right-broken" width="24" />
                </a>
              </div>
            </SpecularButton>
            <div className="social flex gap-5 justify-center mt-2.5">
              <a href="https://github.com/bagiakz-area" className="hover:transform hover:scale-110 transition duration-300 ease-in-out"><Icon icon="line-md:github" width="30" /></a>
              <a href="https://www.linkedin.com/in/i-gusti-ngurah-kadek-wahyu-bagia-a0a53141b/" className="hover:transform hover:scale-110 transition duration-300 ease-in-out"><Icon icon="line-md:linkedin" width="30" /></a>
              <a href="mailto:ngurahwahyubagia@gmail.com?subject=Halo&body=Wahyu%20apakah%20anda%20bersedia%20untuk%20kerjasama..?" className="hover:transform hover:scale-110 transition duration-300 ease-in-out"><Icon icon="line-md:email" width="30" /></a>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Home;