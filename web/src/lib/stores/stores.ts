import { writable } from "svelte/store";


export type Theme = "default" | "blue" | "pink";

export const currentTheme = writable<Theme>("blue");

