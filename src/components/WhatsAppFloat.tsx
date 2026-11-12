import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./ui";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ruhaniat Studio on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-whatsapp p-3.5 text-white shadow-[0_12px_30px_-8px_rgba(31,143,78,0.6)] transition-transform hover:scale-105 md:bottom-7 md:right-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.6s]" />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden pr-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] md:inline">Chat with us</span>
    </a>
  );
}
