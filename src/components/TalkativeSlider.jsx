import * as Slider from "@radix-ui/react-slider";

export default function TalkativeSlider({ value, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-main">Talkative Level</p>

      <Slider.Root
        value={[value]}
        max={100}
        step={1}
        onValueChange={([v]) => onChange(v)}
        className="relative flex items-center select-none touch-none w-full h-5"
      >
        <Slider.Track className="bg-main relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-[rgb(var(--accent))] h-full rounded-full" />
        </Slider.Track>

        <Slider.Thumb
          className="
            block w-4 h-4 bg-white rounded-full
            shadow focus:outline-none
          "
        />
      </Slider.Root>
    </div>
  );
}
