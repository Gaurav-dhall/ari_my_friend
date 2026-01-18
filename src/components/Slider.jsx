import * as SliderPrimitive from "@radix-ui/react-slider";

export default function Slider({ 
  label, 
  description,
  leftLabel,
  rightLabel,
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1 
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
          <span className="text-main font-semibold text-lg">{label}</span>
          <span className="text-[rgb(var(--accent))] font-medium">{value}%</span>
        </div>
        {description && (
          <p className="text-muted text-sm leading-relaxed">{description}</p>
        )}
      </div>

      <div className="pt-2 pb-1">
        <SliderPrimitive.Root
          value={[value]}
          max={max}
          step={step}
          onValueChange={([v]) => onChange(v)}
          className="relative flex items-center select-none touch-none w-full h-5"
        >
          <SliderPrimitive.Track className="bg-white/10 relative grow rounded-full h-2 overflow-hidden">
            <SliderPrimitive.Range className="absolute bg-[rgb(var(--accent))] h-full rounded-full" />
          </SliderPrimitive.Track>

          <SliderPrimitive.Thumb
            className="
              block w-5 h-5 bg-white rounded-full
              shadow-lg border-2 border-[rgb(var(--accent))]
              focus:outline-none focus:scale-110 transition-transform
              hover:scale-110 cursor-grab active:cursor-grabbing
            "
          />
        </SliderPrimitive.Root>
      </div>

      {(leftLabel || rightLabel) && (
        <div className="flex justify-between text-xs font-medium text-muted uppercase tracking-wider">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  );
}
