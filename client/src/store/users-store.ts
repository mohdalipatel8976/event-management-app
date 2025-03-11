import { create } from "zustand";
import { UserType } from "../interfaces";

const useUsersGlobalStore = create<UsersStoreType>((set) => ({
  currentUser: null,
  setCurrentUser: (user: UserType) => set({ currentUser: user }),
}));

export default useUsersGlobalStore;

export interface UsersStoreType {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType) => void;
}
