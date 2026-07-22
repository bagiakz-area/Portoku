import { Icon } from "@iconify/react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="flex flex-col items-center gap-6 border-t border-white/10 px-6 py-10 text-center sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:px-10 sm:text-left">
      <div className="order-2 text-white/50 space-y-1 sm:order-1 sm:justify-self-start">
        <p className="font-[fira_code] text-base">
          &copy; {year} Wahyu Bagia
        </p>
        <p className="text-sm">Gianyar, Bali</p>
        <a
          href="mailto:ngurahwahyubagia@gmail.com?subject=Halo&body=Wahyu%20apakah%20anda%20bersedia%20untuk%20kerjasama..?"
          className="font-[fira_code] text-sm underline decoration-white/30 transition-colors duration-300 hover:text-[#0078ff] hover:decoration-[#0078ff]"
        >
          ngurahwahyubagia@gmail.com
        </a>
      </div>

      <a
        href="https://wa.me/6289525996024?text=Hi%20Wahyu"
        target="_blank"
        rel="noopener noreferrer"
        className="order-1 flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(0,120,255,0.45)] sm:order-2 sm:justify-self-center"
      >
        Contact Me ↗
      </a>

      <div className="order-3 flex gap-4 text-white/70 sm:order-3 sm:justify-self-end">
        <a
          href="https://github.com/bagiakz-area"
          className="transition-all duration-300 hover:scale-110 hover:text-[#0078ff]"
        >
          <Icon icon="line-md:github" width="30" />
        </a>
        <a
          href="https://www.linkedin.com/in/i-gusti-ngurah-kadek-wahyu-bagia-a0a53141b/"
          className="transition-all duration-300 hover:scale-110 hover:text-[#0078ff]"
        >
          <Icon icon="line-md:linkedin" width="30" />
        </a>
        <a
          href="mailto:ngurahwahyubagia@gmail.com?subject=Halo&body=Wahyu%20apakah%20anda%20bersedia%20untuk%20kerjasama..?"
          className="transition-all duration-300 hover:scale-110 hover:text-[#0078ff]"
        >
          <Icon icon="line-md:email" width="30" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;