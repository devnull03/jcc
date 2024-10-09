<script>
    import { PUBLIC_COMPANY_NAME } from "$env/static/public";
    import Cursor from "$lib/components/Cursor.svelte";
    import { onMount } from "svelte";
    import "../app.css";
    import { cursorProperties } from "$lib/stores/cursor";

    onMount(() => {
        $cursorProperties.hidden = true;
        $cursorProperties.inverted = true;
    });
</script>

<svelte:head>
    <title>{PUBLIC_COMPANY_NAME}</title>
    <link
        href="https://fonts.cdnfonts.com/css/jsmath-cmmi10"
        rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&family=Rampart+One&display=swap"
        rel="stylesheet"
    />
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/InertiaPlugin.min.js"></script> -->
</svelte:head>

<!-- <div class="h-screen flex flex-col justify-between">
  <Header /> 
  <main class="h-full mt-16">
    <slot />
  </main>
  <Footer />
</div> -->
<Cursor />

<slot />
