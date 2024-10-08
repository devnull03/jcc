<script lang="ts">
    import { spring } from "svelte/motion";
    import {
        hoveredElement,
        clickableElements,
        cursorProperties,
    } from "$lib/stores/cursor";
    import { onMount } from "svelte";

    const mouseCoords = spring(
        { x: 0, y: 0 },
        {
            stiffness: 0.1,
            damping: 0.7,
        },
    );

    let dissable = false;

    const onMouseMove = (event: MouseEvent) => {
        mouseCoords.set({ x: event.x, y: event.y }, { hard: false });

        $hoveredElement = document.elementsFromPoint(
            $mouseCoords.x,
            $mouseCoords.y,
        );
    };

    $: isClickable =
        $hoveredElement &&
        $hoveredElement.some(
            (el) =>
                el.getAttribute("onclick") != null ||
                el.getAttribute("href") != null ||
		el.classList.contains("cursor-pointer") ||
                $clickableElements.includes(el.tagName),
        );

    onMount(() => {
        mouseCoords.set({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });
    });
</script>

<svelte:window on:mousemove={onMouseMove} />

<div
    class="fixed hidden lg:block md:block border-2 rounded-full transition-transform pointer-events-none bg-transparent z-[9999]"
    class:backdrop-invert={$cursorProperties.inverted}
    style:padding={`${$cursorProperties.radius}px`}
    style:top={`${$mouseCoords.y - $cursorProperties.radius}px`}
    style:left={`${$mouseCoords.x - $cursorProperties.radius}px`}
    style="border-color: {$cursorProperties.color};"
    style:transform={`scale(${isClickable ? 1.5 : 1})`}
>
    {#if isClickable}
        <div
            class="rounded-full border p-1.5"
            style="border-color: {$cursorProperties.color};"
        />
    {:else}
        <div class="rounded-full p-0.5 bg-black" />
    {/if}
</div>
