<script>

    import { currentTheme } from "$lib/stores/stores";

</script>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg
    width="67"
    height="265"
    viewBox="0 0 67 265"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={$$props.class}
>
    <circle on:click={() => {
	$currentTheme = "default";
    }} cx="33.125" cy="231.875" r="33.125" class="fill-theme-obj cursor-pointer" />
    <circle on:click={() => {
	$currentTheme = "pink";
    }} cx="33.125" cy="165.625" r="33.125" class="fill-theme-obj cursor-pointer" />
    <circle on:click={() => {
	$currentTheme = "blue";
    }} cx="33.125" cy="99.375" r="33.125" class="fill-theme-obj cursor-pointer" />
    <circle on:click={() => {
	$currentTheme = "default";
    }} cx="33.125" cy="33.125" r="33.125" class="fill-theme-obj cursor-pointer" />
</svg>
