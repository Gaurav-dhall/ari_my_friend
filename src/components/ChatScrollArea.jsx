import * as ScrollArea from "@radix-ui/react-scroll-area";

export default function ChatScrollArea({ children }) {
  return (
    <ScrollArea.Root className="h-full w-full overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full pr-4">
        {children}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        orientation="vertical"
        className="flex select-none touch-none p-0.5 bg-transparent"
      >
        <ScrollArea.Thumb className="flex-1 bg-card rounded-full" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
