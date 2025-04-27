import { atom } from "jotai";

export const loginState = atom<boolean>(true);
export const providerState = atom<"google" | "github" | null>(null);

export const changeLoginState = atom(null, (get, set, newState: boolean) => {
  set(loginState, newState);
});
