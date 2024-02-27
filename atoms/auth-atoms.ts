import { atom } from "jotai";

export const loginState = atom<boolean>(true);

export const changeLoginState = atom(null, (get, set, newState: boolean) => {
  set(loginState, newState);
});
