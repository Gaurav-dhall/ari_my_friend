import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";

export default function FriendToast() {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider>
      <button
        onClick={() => setOpen(true)}
        className="text-muted"
      >
        Simulate Typing
      </button>

      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className="bg-card rounded-xl p-4 shadow-lg"
      >
        <Toast.Title className="font-semibold">
          Ari is typing…
        </Toast.Title>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-4 right-4 w-72" />
    </Toast.Provider>
  );
}
