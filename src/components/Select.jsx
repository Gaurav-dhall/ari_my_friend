import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function Select({ label, value, options, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-main font-medium">{label}</span>
      <Dropdown.Root>
        <Dropdown.Trigger className="flex items-center gap-2 px-3 py-2 bg-card rounded-xl text-main hover:bg-white/5 transition-colors outline-none">
          {value}
          <ChevronDownIcon />
        </Dropdown.Trigger>

        <Dropdown.Portal>
          <Dropdown.Content 
            className="bg-card rounded-xl p-1 min-w-[120px] shadow-lg border border-white/5 z-50 animate-in fade-in zoom-in-95 duration-200"
            sideOffset={5}
          >
            {options.map((option) => (
              <Dropdown.Item
                key={option}
                className="
                  px-3 py-2 rounded-lg text-main cursor-pointer outline-none
                  data-[highlighted]:bg-white/10 transition-colors
                "
                onSelect={() => onChange(option)}
              >
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown.Root>
    </div>
  );
}
