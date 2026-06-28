import { Camera, Share, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 sm:px-12 py-12 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="text-xl font-extrabold">
          ROGER<span className="text-amber-700">WEAR</span>
        </span>
        <div className="flex gap-6 text-sm text-zinc-400">
          <a href="#" className="hover:text-amber-700 transition-colors">Privacy</a>
          <a href="#" className="hover:text-amber-700 transition-colors">Terms</a>
          <a href="#" className="hover:text-amber-700 transition-colors">Contact</a>
        </div>
        <div className="flex gap-4 text-zinc-400">
          <Camera size={18} className="hover:text-amber-700 cursor-pointer transition-colors" />
          <Share size={18} className="hover:text-amber-700 cursor-pointer transition-colors" />
          <Mail size={18} className="hover:text-amber-700 cursor-pointer transition-colors" />
        </div>
      </div>
      <p className="text-center text-zinc-500 text-xs mt-8">
        © {new Date().getFullYear()} Roger Wear. All rights reserved.
      </p>
    </footer>
  );
}
