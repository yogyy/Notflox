import { atom } from "jotai";

export const authState = atom<"login" | "register">("login");
export const providerState = atom<"google" | "github" | null>(null);
