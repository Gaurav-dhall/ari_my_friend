import * as Dropdown from "@radix-ui/react-dropdown-menu";

export default function MoodDropdown() {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="px-3 py-2 bg-card rounded-xl">
        Mood
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content className="bg-card rounded-xl p-2 space-y-1">
          {["Friendly", "Calm", "Motivational"].map(mood => (
            <Dropdown.Item
              key={mood}
              className="px-3 py-2 rounded-lg hover:bg-main cursor-pointer"
            >
              {mood}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
