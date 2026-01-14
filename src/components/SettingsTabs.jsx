import * as Tabs from "@radix-ui/react-tabs";

export default function SettingsTabs() {
  return (
    <Tabs.Root defaultValue="personality" className="w-full">
      
      <Tabs.List className="flex bg-main rounded-xl p-1">
        <Tabs.Trigger
          value="personality"
          className="
            flex-1 py-2 rounded-lg
            data-[state=active]:bg-card
          "
        >
          Personality
        </Tabs.Trigger>

        <Tabs.Trigger
          value="memory"
          className="
            flex-1 py-2 rounded-lg
            data-[state=active]:bg-card
          "
        >
          Memory
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="personality" className="mt-4 space-y-4">
        <p className="text-muted">Adjust how Ari talks</p>
      </Tabs.Content>

      <Tabs.Content value="memory" className="mt-4 space-y-4">
        <p className="text-muted">Manage what Ari remembers</p>
      </Tabs.Content>

    </Tabs.Root>
  );
}
