import * as Dialog from "@radix-ui/react-dialog";

export default function SettingsDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 rounded-xl bg-card text-main">
          Customize Friend
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <Dialog.Content className="
          fixed top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          bg-card text-main
          rounded-2xl p-6 w-[90vw] max-w-md
        ">
          <Dialog.Title className="text-lg font-semibold">
            Customize Ari
          </Dialog.Title>

          <Dialog.Description className="text-muted mt-1">
            Adjust personality & tone
          </Dialog.Description>

          <div className="mt-6 space-y-3">
            <button className="w-full bubble-user py-2 rounded-xl text-white">
              Friendly
            </button>
            <button className="w-full bg-main py-2 rounded-xl">
              Calm
            </button>
          </div>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-muted">
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
