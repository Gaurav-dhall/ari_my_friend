import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Trash2 } from 'lucide-react';

const ClearChatDialog = ({ onClear }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button 
        className="p-2 mr-2 text-muted hover:text-red-400 hover:bg-white/5 rounded-full transition-colors flex items-center gap-2 group"
        title="Clear conversation"
      >
        <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-black/50 fixed inset-0 backdrop-blur-sm z-50 animate-overlayShow" />
      <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-card p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50 animate-contentShow border border-white/5">
        <AlertDialog.Title className="text-main m-0 text-[17px] font-semibold">
          Clear Conversation?
        </AlertDialog.Title>
        <AlertDialog.Description className="text-muted mt-4 mb-5 text-[15px] leading-normal">
          This will delete your entire chat history with Ari. This action cannot be undone and Ari will forget what you've talked about.
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="text-main hover:bg-white/5 focus:shadow-white/10 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button 
                onClick={onClear}
                className="text-white bg-red-500 hover:bg-red-600 focus:shadow-red-500/50 inline-flex h-[35px] items-center justify-center rounded-[8px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] transition-colors"
            >
              Clear Chat
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default ClearChatDialog;
