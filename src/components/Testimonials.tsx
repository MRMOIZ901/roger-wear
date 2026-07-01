"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Ahmed Raza",
    city: "Lahore",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Yaar, honestly the best leather shoes I've bought in Pakistan. Quality is top-notch and delivery was super fast. Bilkul value for money!",
  },
  {
    name: "Usman Tariq",
    city: "Karachi",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    text: "Ordered the black pair for my cousin's shaadi and got so many compliments. The leather is soft and comfortable. Delivery could've been a bit faster but overall very happy.",
  },
  {
    name: "Hamza Malik",
    city: "Islamabad",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    text: "Roger Wear ne dil jeet liya! Pehle dar tha online order karne se but Cash on Delivery option ne trust dila diya. Bhai sach mein zabardast shoes hain.",
  },
  {
    name: "Bilal Hussain",
    city: "Faisalabad",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 4,
    text: "These shoes look even better in person than in the photos. Very premium feel, exactly like a branded shoe. Sizing runs slightly large so order one size down.",
  },
  {
    name: "Zain ul Abideen",
    city: "Multan",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    rating: 5,
    text: "Maine 3 pairs already order kar chuke hain. Har baar same quality aur same amazing experience. Roger Wear is my go-to shoe brand now.",
  },
  {
    name: "Saad Iqbal",
    city: "Rawalpindi",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 5,
    text: "Office ke liye ek pair liya tha, itna comfortable hai ke pura din kaam karo thakaan nahi hoti. Highly recommend to everyone!",
  },
  {
    name: "Fahad Khan",
    city: "Peshawar",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    rating: 4,
    text: "Genuine leather quality at this price is unbeatable in Pakistan. My friends thought I bought from abroad. Packaging was simple but the shoe itself is excellent.",
  },
  {
    name: "Ali Hassan",
    city: "Sialkot",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    rating: 5,
    text: "Delivery was on time and the packaging was very professional. Shoes are exactly as described. Very happy with my purchase!",
  },
  {
    name: "Danyal Sheikh",
    city: "Gujranwala",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 4,
    text: "Yeh shoes meri shadi ke liye perfect thay. Sari raat pehne, pair bilkul nahi dukha. Ek cheez — color was slightly darker than photo but still looked great.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            fill={i < count ? "#b45309" : "none"}
            stroke={i < count ? "#b45309" : "#52525b"}
            strokeWidth="1.5"
            width="15"
            height="15"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-zinc-400 font-medium">{count}.0</span>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (newDir: number) => {
    setDirection(newDir);
    setActive((prev) => (prev + newDir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const id = setInterval(() => paginate(1), 4000);
    return () => clearInterval(id);
  }, []);

  // Show 3 cards at a time on desktop
  const visible = [
    testimonials[(active) % testimonials.length],
    testimonials[(active + 1) % testimonials.length],
    testimonials[(active + 2) % testimonials.length],
  ];

  return (
    <section className="px-6 sm:px-12 py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="text-amber-700 font-semibold tracking-widest uppercase text-sm">
            Customer Reviews
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-center mb-4"
        >
          What Our <span className="text-amber-700">Customers</span> Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-zinc-400 mb-14"
        >
          Trusted by thousands of customers across Pakistan
        </motion.p>

        {/* Cards */}
        <div className="relative">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 120 : -120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -120 : 120 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid sm:grid-cols-3 gap-5"
            >
              {visible.map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-amber-700/30 transition-colors"
                >
                  <StarRating count={t.rating} />
                  <p className="text-zinc-300 text-sm leading-relaxed flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 bg-white/10">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-zinc-500 text-xs">{t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => paginate(-1)}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-amber-700/50 hover:text-amber-700 transition-colors"
          >
            ←
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-amber-700" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => paginate(1)}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-amber-700/50 hover:text-amber-700 transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
