// import { useEffect, useRef, useState } from "react";

// /**
//  * Wrapper section yang otomatis fade-in saat mulai keliatan di viewport,
//  * dan fade-out lagi saat keluar viewport (opsional, lihat prop `fadeOut`).
//  *
//  * Cara pakai:
//  * <FadeSection id="about">
//  *   <h2>About</h2>
//  *   <p>...</p>
//  * </FadeSection>
//  */
// export default function FadeSection({
//   id,
//   children,
//   className = "",
//   fadeOut = false, // true = memudar lagi saat discroll lewat (in & out), false = sekali muncul tetap kelihatan
// }) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//         } else if (fadeOut) {
//           setVisible(false);
//         }
//       },
//       { threshold: 0.2 } // section dianggap "muncul" kalau 20% udah keliatan
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [fadeOut]);

//   return (
//     <section
//       id={id}
//       ref={ref}
//       className={`transition-all duration-700 ease-out ${
//         visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//       } ${className}`}
//     >
//       {children}
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* CONTOH PEMAKAIAN                                                    */
// /* ------------------------------------------------------------------ */
// //
// // <FadeSection id="about" className="h-screen flex items-center justify-center">
// //   <h2 className="text-3xl">About Us</h2>
// // </FadeSection>
