import { writable } from "svelte/store";

export const hoveredElement = writable<Element[] | null>();
export const clickableElements = writable(["A", "BUTTON", "INPUT", "TEXTAREA"]);
export const defaultCursorProperties = {
	radius: 32,
	color: "#000000",
	inverted: false,
	hidden: false	
};
export const cursorProperties = writable(defaultCursorProperties);
