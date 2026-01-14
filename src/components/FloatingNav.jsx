import * as Popover from "@radix-ui/react-popover";
import { MessageCircle, SlidersHorizontal } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FloatingNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="
            fixed bottom-6 right-6
            h-12 px-4
            rounded-full
            bg-main text-bg
            shadow-lg
            flex items-center gap-2
            hover:scale-105 transition
          "
        >
          <MessageCircle size={18} />
          <span className="text-sm font-medium">Ari</span>
        </button>
      </Popover.Trigger>

      <Popover.Content
        side="top"
        align="end"
        className="
          mb-3 w-44
          rounded-xl
          bg-bg
          border border-border
          shadow-xl
          p-2
          space-y-1
        "
      >
        <NavItem
          icon={<MessageCircle size={16} />}
          label="Chat"
          active={location.pathname === "/chat"}
          onClick={() => navigate("/chat")}
        />

        <NavItem
          icon={<SlidersHorizontal size={16} />}
          label="Behavior"
          active={location.pathname === "/behavior"}
          onClick={() => navigate("/behavior")}
        />
      </Popover.Content>
    </Popover.Root>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3
        px-3 py-2
        rounded-lg
        text-sm
        transition
        ${active ? "bg-green-500 text-main font-medium" : "text-text-secondary hover:bg-surface/50"}
      `}
    >
      {icon}
      {label}
    </button>
  );
}
