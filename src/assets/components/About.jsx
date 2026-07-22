import React, { useEffect, useRef, useState } from "react";
import ScrollFloat from "../../components/ScrollFloat";
import ProfileCard from "../../components/ProfileCard";
import CoreExpertise from "../../components/CoreExpertise";
import Guwa from "../guwa.webp";
import PlainCard from "@/components/Plaincard";
import SpinAnchor from "@/components/SpinAnchor";
import { Icon } from "@iconify/react";

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

const About = () => {
  const [profileRef, profileVisible] = useRevealOnScroll();
  const [factRef, factVisible] = useRevealOnScroll();
  const [expertiseRef, expertiseVisible] = useRevealOnScroll();
  const [skillRef, skillVisible] = useRevealOnScroll();

  return (
    <section id="about" className="hero scroll-mt-24 text-center py-10">
      <ScrollFloat
        animationDuration={0.3}
        ease="back.inOut(2)"
        scrollStart="center bottom+=40%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
        containerClassName="!my-0"
        textClassName="font-[syne]  text-gray-200 font-extrabold text-2xl"
      >
        ABOUT ME
      </ScrollFloat>

      <div className="aboutku sm:flex sm:mt-20 sm:gap-x-8">
        <div
          ref={profileRef}
          className={`profile-card w-fit mx-auto scale-76 -mt-5 sm:mx-0 sm:scale-100 sm:pl-20 ${REVEAL_BASE} ${
            profileVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
          }`}
        >
          <ProfileCard
            name="Wahyu Bagia"
            title="Software Engineer"
            handle="giakcode"
            status="Online ntar"
            contactText="Contact Me"
            avatarUrl={Guwa}
            showUserInfo
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => console.log("Contact clicked")}
            behindGlowColor="rgba(125, 190, 255, 0.67)"
            iconUrl=""
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
          />
        </div>

        <div
          ref={factRef}
          className={`fact px-8 w-full mb-20 mx-auto text-center sm:mx-0 sm:max-w-150 sm:text-start sm:mt-0 delay-150 ${REVEAL_BASE} ${
            factVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
          }`}
        >
          <h2 className="text-gray-100 font-bold text-4xl mb-4 sm:text-6xl">
            Who am i?
          </h2>
          <p className="text-shadow-white font-semibold text-sm sm:pt-12 sm:text-2xl">
            I'm Wahyu Bagia <br />
            —I Gusti Ngurah Kadek Wahyu Bagia — <br />
            from Gianyar, Bali. I'm studying Information Systems at Universitas
            Indonesia while building web experiences as a front-end developer on
            the side.
          </p>
        </div>
      </div>

      <div
        ref={expertiseRef}
        className={`core-expertise w-full mt-8 px-8 lg:px-16 font-[fira_code] ${REVEAL_BASE} ${
          expertiseVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <CoreExpertise
          skills={[
            { name: "Frontend Development", percent: 90 },
            { name: "Backend Development", percent: 40 },
            { name: "UI/UX Design", percent: 75 },
          ]}
        />
      </div>

      <div
        ref={skillRef}
        className={`skill w-full mt-5 px-7 lg:px-16 delay-150 ${REVEAL_BASE} ${
          skillVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <PlainCard accentColor="#0ea5e9">
          <h1 className="text-gray-100 font-bold text-3xl mb-4 font-[syne]">
            SKILLS
          </h1>
          <div className="work w-full grid grid-cols-3 gap-y-6 gap-x-3 place-items-center lg:flex lg:flex-nowrap lg:items-center lg:justify-between lg:gap-y-0">
            <p className="flex flex-col items-center">
              <a
                href="https://www.w3schools.com/html/html_intro.asp"
                className="hover:transform hover:scale-110 transition duration-300 ease-in-out"
              >
                <Icon icon="flowbite:html-solid" width="60" color="#00c8fc" />
              </a>
              <span className="">HTML</span>
            </p>
            <p className="flex flex-col items-center">
              <a
                href="https://www.w3schools.com/js/default.asp"
                className="hover:transform hover:scale-110 transition duration-300 ease-in-out"
              >
                <Icon icon="akar-icons:javascript-fill" width="60" />
              </a>
              <span className="text-blue-400">JavaScript</span>
            </p>
            <p className="flex flex-col items-center">
              <a
                href="https://www.w3schools.com/css/default.asp"
                className="hover:transform hover:scale-110 transition duration-300 ease-in-out"
              >
                <Icon icon="flowbite:css-solid" width="60" color="#00c8fc" />
              </a>
              <span className=" ">CSS</span>
            </p>
            <p className="flex flex-col items-center">
              <a
                href="https://www.mysql.com/"
                className="hover:transform hover:scale-110 transition duration-300 ease-in-out"
              >
                <Icon icon="lineicons:mysql" width="60" />
              </a>
              <span className="text-blue-400">MySQL</span>
            </p>
            <p className="flex flex-col items-center">
              <SpinAnchor href="https://react.dev/">
                <Icon icon="akar-icons:react-fill" width="60" color="#00c8fc" />
              </SpinAnchor>
              React
            </p>
            <p className="flex flex-col items-center">
              <a
                href="https://wordpress.org/"
                className="hover:transform hover:scale-110 transition duration-300 ease-in-out"
              >
                <Icon icon="mdi:wordpress" width="60" />
              </a>
              <span className="text-blue-400">WordPress</span>
            </p>
            <p className="flex flex-col items-center">
              <a
                href="https://tailwindcss.com/"
                className="hover:transform hover:scale-110 transition duration-300 ease-in-out"
              >
                <Icon icon="mdi:tailwind" width="60" color="#00c8fc" />
              </a>
              TailWind
            </p>
            <p className="flex flex-col items-center">
              <a
                href="https://supabase.com/"
                className="hover:transform hover:scale-110 transition duration-300 ease-in-out"
              >
                <Icon icon="devicon-plain:supabase" width="60" />
              </a>
              <span className=" text-blue-400">SupaBase</span>
            </p>
            <p className="flex flex-col items-center">
              <a
                href="https://www.figma.com/"
                className="hover:transform hover:scale-110 transition duration-300 ease-in-out"
              >
                <Icon icon="solar:figma-bold" width="60" color="#00c8fc" />
              </a>
              Figma
            </p>
          </div>
        </PlainCard>
      </div>
    </section>
  );
};

export default About;