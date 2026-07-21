import { Icon } from "@iconify/react";


const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center gap-6 border-t border-white/10 px-10 pr-20 py-10 sm:flex-row sm:items-center sm:justify-between sm: sm:pr-0">
      {/* Blok info kiri */}
      <div className=" order-2 text-center text-1xl text-white/50 space-y-1 sm:order-1 sm:text-left">
        <p>&copy; <span className="font-[fira_code] sm:text-1xl">{year} Wahyu Bagia</span></p>
        <a href="mailto:ngurahwahyubagia@gmail.com?subject=Halo&body=Wahyu%20apakah%20anda%20bersedia%20untuk%20kerjasama..?" className="underline font-[fira_code] hover:text-white sm:text-sm">
        <p className="from sm:text-sm">Gianyar, Bali</p>
          ngurahwahyubagia@gmail.com
        </a>
      </div>

      <a
        href="#contact"

        className="order-1 flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black sm:order-2 sm:"
      >
        Contact Me ↗
      </a>
      <div className="order-3 flex gap-4 pr-20
       text-white/70 sm:order-3">
      <a href="https://github.com/bagiakz-area" className="hover:transform hover:scale-110 transition duration-300 ease-in-out"><Icon icon="line-md:github" width="30" /></a>

      <a href="https://www.linkedin.com/in/i-gusti-ngurah-kadek-wahyu-bagia-a0a53141b/" className="hover:transform hover:scale-110 transition duration-300 ease-in-out"><Icon icon="line-md:linkedin" width="30" /></a>
      <a href="mailto:ngurahwahyubagia@gmail.com?subject=Halo&body=Wahyu%20apakah%20anda%20bersedia%20untuk%20kerjasama..?" className="hover:transform hover:scale-110 transition duration-300 ease-in-out"><Icon icon="line-md:email" width="30" /></a>
      </div>
    </footer>
  );
};
export default Footer;

