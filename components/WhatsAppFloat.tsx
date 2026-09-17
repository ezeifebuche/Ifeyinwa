// TODO: replace with the real WhatsApp business number, no dashes/spaces, country code first
const WHATSAPP_NUMBER = "2340000000000";
const WHATSAPP_MESSAGE = "Hi Ifeyinwa, I'd like to know more about your packages.";

export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4.02 8.38 4.02 15c0 2.22.62 4.32 1.7 6.1L4 29l8.1-1.68A11.94 11.94 0 0 0 16.02 27C22.64 27 28 21.62 28 15S22.64 3 16.02 3Zm6.9 16.98c-.29.82-1.7 1.56-2.35 1.65-.6.09-1.35.13-2.18-.14-.5-.16-1.15-.37-1.98-.73-3.5-1.51-5.78-5.05-5.96-5.29-.17-.24-1.42-1.89-1.42-3.6s.9-2.56 1.22-2.91c.32-.35.7-.44.93-.44.23 0 .47 0 .67.01.21.01.5-.08.78.6.29.7.99 2.4 1.08 2.58.09.17.14.37.03.6-.11.24-.17.38-.34.58-.17.2-.36.45-.51.6-.17.17-.35.35-.15.7.2.35.87 1.44 1.87 2.33 1.29 1.15 2.37 1.51 2.72 1.68.35.17.55.14.75-.08.21-.23.87-1.01 1.1-1.36.23-.35.46-.29.78-.17.32.11 2.02.95 2.37 1.13.35.17.58.26.66.4.09.15.09.85-.2 1.66Z" />
      </svg>
    </a>
  );
}
