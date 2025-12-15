export function AccordionItem({
    title,
    isOpen,
    onToggle,
    children,
  }: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) {
    return (
      <div className="border-b border-slate-800">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between py-3 px-4 text-xs font-medium uppercase tracking-wide  hover:bg-slate-900/60"
        >
          <span>{title}</span>
          <span
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            {/* simple chevron */}
            <svg
              className="w-3 h-3"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 3.5L11 8L6 12.5" />
            </svg>
          </span>
        </button>
  
        <div
          className={`grid transition-all duration-200 ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden px-4 pb-4 pt-1">{children}</div>
        </div>
      </div>
    );
  }
  