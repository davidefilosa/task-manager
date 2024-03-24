import { Task } from "@prisma/client";
import { create } from "zustand";

type ModalStore = {
  initialData?: Task;
  isOpen: boolean;
  onOpen: (task: Task) => void;
  onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
  initialData: undefined,
  isOpen: false,
  onOpen: (task) => set({ isOpen: true, initialData: task }),
  onClose: () => set({ isOpen: false }),
}));
