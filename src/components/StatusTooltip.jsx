import * as Tooltip from "@radix-ui/react-tooltip";

export default function StatusTooltip() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="cursor-pointer text-muted">🟢 Online</span>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            className="bg-card px-3 py-1 rounded-lg text-sm"
          >
            Ari is active right now
            <Tooltip.Arrow className="fill-[rgb(var(--bg-card))]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
