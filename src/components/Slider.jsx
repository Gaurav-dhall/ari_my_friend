import * as SliderPrimitive from "@radix-ui/react-slider";

export default function Slider({ label, value, onChange, min = 0, max = 100, step = 1 }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-main font-medium">{label}</span>
        <span className="text-muted text-sm">{value}%</span>
      </div>

      <SliderPrimitive.Root
        value={[value]}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        className="relative flex items-center select-none touch-none w-full h-5"
      >
        <SliderPrimitive.Track className="bg-card relative grow rounded-full h-2 overflow-hidden">
          <SliderPrimitive.Range className="absolute bg-[rgb(var(--accent))] h-full rounded-full" />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb
          className="
            block w-5 h-5 bg-white rounded-full
            shadow-lg border-2 border-[rgb(var(--accent))]
            focus:outline-none focus:scale-110 transition-transform
            hover:scale-110
          "
        />
      </SliderPrimitive.Root>
    </div>
  );
}
