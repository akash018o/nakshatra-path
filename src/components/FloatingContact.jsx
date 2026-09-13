const PHONE = "918630352867"; // +91 8630352867, no + or spaces

export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/40 transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="white">
          <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.374.656 4.593 1.795 6.49L3 29l7.216-2.256A12.44 12.44 0 0016 28c6.904 0 12.5-5.596 12.5-12.5S22.905 3 16.001 3zm7.29 17.826c-.31.874-1.53 1.6-2.51 1.81-.67.14-1.545.252-4.49-.964-3.77-1.56-6.2-5.39-6.39-5.64-.18-.25-1.53-2.04-1.53-3.89 0-1.85.97-2.76 1.31-3.14.34-.37.75-.46 1-.46.25 0 .5 0 .72.01.23.01.54-.09.84.64.31.75 1.06 2.6 1.15 2.79.09.19.15.42.03.67-.12.25-.18.4-.36.62-.18.22-.38.49-.54.65-.18.18-.37.38-.16.75.21.37.93 1.53 2 2.48 1.37 1.22 2.53 1.6 2.9 1.78.37.18.58.15.8-.09.22-.24.94-1.09 1.19-1.47.25-.37.5-.31.83-.19.34.12 2.16 1.02 2.53 1.21.37.18.61.28.7.43.09.16.09.9-.22 1.78z"/>
        </svg>
      </a>
      <a
        href={`https://t.me/+${PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message on Telegram"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] shadow-lg shadow-black/40 transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="white">
          <path d="M28.882 6.223 24.65 26.4c-.32 1.42-1.156 1.77-2.343 1.104l-6.47-4.767-3.122 3.005c-.345.345-.635.635-1.302.635l.466-6.606L23.94 8.71c.56-.5-.122-.777-.87-.278L9.39 17.24l-6.39-2c-1.39-.434-1.416-1.39.29-2.06l24.98-9.63c1.157-.434 2.17.278 1.61 2.673z"/>
        </svg>
      </a>
    </div>
  );
}
