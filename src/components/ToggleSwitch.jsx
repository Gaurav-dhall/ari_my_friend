import * as Switch from "@radix-ui/react-switch";

export default function ToggleSwitch({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4">
      <span className="text-main">{label}</span>

      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        className="
          w-11 h-6 bg-main rounded-full relative
          data-[state=checked]:bg-[rgb(var(--accent))]
          transition-colors
        "
      >
        <Switch.Thumb
          className="
            block w-5 h-5 bg-white rounded-full
            translate-x-0.5 data-[state=checked]:translate-x-5
            transition-transform
          "
        />
      </Switch.Root>
    </label>
  );
}
